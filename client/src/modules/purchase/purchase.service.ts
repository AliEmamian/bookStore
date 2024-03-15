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
import { ClientProxy } from '@nestjs/microservices';
import { paymentInterface } from './interface/payment.interface';

@Injectable()
export class PurchaseService implements paymentInterface {

  constructor(
    @Inject('BOOK_STORE_1') private clientBook: ClientProxy,
    @Inject('BOOK_STORE_2') private clientUser: ClientProxy,
    @Inject('BOOK_STORE_3') private clientPurchase: ClientProxy,
  ) { }


  async addToBasket(purchase) {
    try {
      const book = this.clientBook.send({ cmd: 'book' }, purchase.book);
      const user = this.clientUser.send({ cmd: 'userById' }, { id: purchase.userId });
      const [bookResponse, userResponse] = await Promise.all([
        book.toPromise(),
        user.toPromise(),
      ]);
      const basket = this.clientPurchase.send({ cmd: 'addToBasket' }, { user: userResponse, book: bookResponse[0] });
      // const [basketResponse] = await Promise.all([
      //   basket.toPromise()
      // ]);
      const basketResponse = await basket.toPromise()
      return { ...basketResponse };
    } catch (e) {
      console.log(e);
      throw new BadRequestException('invalid')
    }
  }


  async removeFromBasket(purchase) {
    try {
      const book = this.clientBook.send({ cmd: 'book' }, purchase.book);
      const user = this.clientUser.send({ cmd: 'userById' }, { id: purchase.userId });
      const [bookResponse, userResponse] = await Promise.all([
        book.toPromise(),
        user.toPromise(),
      ]);
      const basket = this.clientPurchase.send({ cmd: 'removeFromBasket' }, { user: userResponse, book: bookResponse[0] });
      // const [basketResponse] = await Promise.all([
      //   basket.toPromise()
      // ]);
      const basketResponse = await basket.toPromise()

      return { ...basketResponse };
    } catch (e) {
      console.log(e);
      throw new BadRequestException('invalid')
    }
  }

  async getBasket(payload) {
    try {
      return await this.clientPurchase.send({ cmd: 'basket' }, payload);
    } catch (e) {
      console.log(e);
      throw new BadRequestException('invalid')
    }
  }

  async createPaymentLink(userId: string, amount: number, callbackUrl: string) {
    // throw new BadRequestException('Method not implemented.');
    //authority should be sent from gateway
    const randomauthority = Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;

    let payment =  this.clientPurchase.send({ cmd: 'addAuthority' }, {userId:userId,authority:randomauthority});
    const basketResponse = await payment.toPromise()
    return {link:'paymentLinkTest',authority:randomauthority}
  }

  async handlePaymentCallback(authority: string, isOk: boolean): Promise<void> {
    if (isOk) {
      let verify = await this.verifyPayment(authority)
      if (verify) {
        let payment =  this.clientPurchase.send({ cmd: 'successfulPayment' }, authority);
        const paymentResponse = await payment.toPromise()
        
        //send sms to user

      return { ...paymentResponse };
      }
      else {
        //handle unverified transaction
      }
    }
    else{
      //handle cancel payment
    }
  }
  async verifyPayment(purchaseId: string): Promise<boolean> {

    // throw new BadRequestException('Method not implemented.');
    return true;
  }
}
