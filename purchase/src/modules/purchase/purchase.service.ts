import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PurchaseRepository } from './purchase.repository';
import { Purchase, StatusEnum } from '../../entities/purchase.entity';
import { FindOneOptions, ObjectId } from 'typeorm';
import { error } from 'console';

@Injectable()
export class PurchaseService {
  constructor(
    private repository: PurchaseRepository,
  ) { }

  onModuleInit() {

  }
  public async addToBasket(payload) {
    try {
      let purchaseInfo = await this.repository.get({ userId: payload.user.id, status: StatusEnum.INCOMPLETE })

      let purchase;
      //add first item to basket
      if (purchaseInfo.length === 0) {

        let off = 0;
        if (payload.user.type == 'premium') {
          off = parseInt(payload.book.price) / 10
        }

        purchase = {
          userId: payload.user.id,
          status: StatusEnum.INCOMPLETE,
          totalPrice: +payload.book.price,
          discount: off,//if premium 10% off
          finalPrice: +(payload.book.price) - off,
          basket: [{
            id: payload.book.id,
            count: 1,
            price: +payload.book.price,
            totalPrice: +payload.book.price
          }]
        }

        await this.repository.createPurchase(purchase)
        return { data: purchase, error: null, status: HttpStatus.OK };

      }
      //The basket is already available .add other item to basket
      else {
        // Check whether a new item has been added or added to previous items
        let indexBookInBasket = purchaseInfo[0].basket.findIndex((item) => item.id === payload.book.id)

        //add to previous items
        if (indexBookInBasket != -1) {
          purchaseInfo[0].basket[indexBookInBasket].count++;
          purchaseInfo[0].basket[indexBookInBasket].totalPrice += +(payload.book.price);
          purchaseInfo[0].totalPrice += parseInt(payload.book.price)

          let off = 0;
          if (payload.user.type == 'premium') {
            off = purchaseInfo[0].totalPrice / 10
          }
          purchaseInfo[0].discount = off
          purchaseInfo[0].finalPrice = purchaseInfo[0].totalPrice - off

          await this.repository.edit(purchaseInfo[0].id, purchaseInfo[0])
        }
        //add new book to basket
        else {
          let basket = {
            id: payload.book.id,
            count: 1,
            price: +payload.book.price,
            totalPrice: +payload.book.price
          }
          purchaseInfo[0].basket.push(basket)
          purchaseInfo[0].totalPrice += parseInt(payload.book.price)

          let off = 0;
          if (payload.user.type == 'premium') {
            off = purchaseInfo[0].totalPrice / 10
          }
          purchaseInfo[0].discount = off
          purchaseInfo[0].finalPrice = purchaseInfo[0].totalPrice - off

          await this.repository.edit(purchaseInfo[0].id, purchaseInfo[0])
        }
      }

      // let res = await this.repository.addToBasket(payload);
      return { data: purchaseInfo[0], error: null, status: HttpStatus.OK };
    }
    catch (e) {
      console.log(e);
      throw new BadRequestException('');
    }
  }

  public async removeFromBasket(payload) {
    try {
      let purchaseInfo = await this.repository.get({ userId: payload.user.id, status: StatusEnum.INCOMPLETE })

      let purchase;
      //check basket is already available
      if (purchaseInfo.length === 0) {
        return { data: null, error: true, message: 'basket not exist' };
      }
      //The basket is already available 
      else {
        let indexBookInBasket = purchaseInfo[0].basket.findIndex((item) => item.id === payload.book.id)

        //decrement item count from basket
        if (indexBookInBasket != -1) {
          //if count=1 then remove item from basket
          if (purchaseInfo[0].basket[indexBookInBasket].count === 1) {

            let finalbasket = []
            finalbasket = purchaseInfo[0].basket.filter(
              item => item.id !== purchaseInfo[0].basket[indexBookInBasket].id
            );
            purchaseInfo[0].basket = finalbasket

            purchaseInfo[0].totalPrice -= parseInt(payload.book.price)
            let off = 0;
            if (payload.user.type == 'premium') {
              off = purchaseInfo[0].totalPrice / 10
            }
            purchaseInfo[0].discount = off
            purchaseInfo[0].finalPrice = purchaseInfo[0].totalPrice - off

            await this.repository.edit(purchaseInfo[0].id, purchaseInfo[0])
          }
          //else count-- 
          else {
            purchaseInfo[0].basket[indexBookInBasket].count--;
            purchaseInfo[0].basket[indexBookInBasket].totalPrice -= +(payload.book.price);
            purchaseInfo[0].totalPrice -= parseInt(payload.book.price)

            let off = 0;
            if (payload.user.type == 'premium') {
              off = purchaseInfo[0].totalPrice / 10
            }
            purchaseInfo[0].discount = off
            purchaseInfo[0].finalPrice = purchaseInfo[0].totalPrice - off

            await this.repository.edit(purchaseInfo[0].id, purchaseInfo[0])
          }
        }

        else {
          return { data: null, error: true, message: 'There are no items in the cart' };
        }
      }
      return { data: purchaseInfo[0], error: null, status: HttpStatus.OK };
    }
    catch (e) {
      console.log(e);
      throw new BadRequestException('');
    }
  }

  public async getBasket(purchase: Purchase) {
    try {
      const documents = await this.repository.get(purchase);
      return documents
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async successfulPayment(authority: string) {
    try {
      let purchase = await this.repository.get({authority:parseInt(authority)})
      
      purchase[0].status = StatusEnum.DONE
      const documents = await this.repository.edit(purchase[0].id,purchase[0]);
      
      return documents
    } catch (e) {
      console.log(e);
      throw e;
    }
  }


  public async editPurchase(id: string, body: Purchase) {
    try {

      let res = await this.repository.edit(id, body)
      return { res, error: null, status: HttpStatus.OK };
    } catch (e) {
      console.log(e);
      return { error: true, status: HttpStatus.INTERNAL_SERVER_ERROR };

    }
  }
  public async addAuthority(userId: string, authority: string) {
    try {
      let purchase = await this.repository.get({userId,status:StatusEnum.INCOMPLETE})
      purchase[0].authority=authority
      let res = await this.repository.edit(purchase[0].id, purchase[0])
      return { res, error: null, status: HttpStatus.OK };
    } catch (e) {
      console.log(e);
      return { error: true, status: HttpStatus.INTERNAL_SERVER_ERROR };

    }
  }
}
