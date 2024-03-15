import {
  Controller, Inject, UseInterceptors,
  Post,
  Param,
  Query,
  Body,
  Get,
  Put,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { MessagePattern } from '@nestjs/microservices';
import { PurchaseService } from './purchase.service';
import { Purchase, StatusEnum } from '@entities/purchase.entity';


@Controller()
export class PurchaseController {

  @Inject(PurchaseService)
  private readonly service: PurchaseService;

  @MessagePattern({cmd: 'addToBasket'})
  private async addToBasket(purchase) {
    let res = await this.service.addToBasket(purchase);
    return res;
  }
  @MessagePattern({cmd: 'addAuthority'})
  private async addAuthority(purchase) {
    
    let res = await this.service.addAuthority(purchase.userId,purchase.authority);
    return res;
  }

  @MessagePattern({cmd: 'removeFromBasket'})
  private async removeFromBasket(purchase) {    
    let res = await this.service.removeFromBasket(purchase);;
    return res;
  }

  @MessagePattern({cmd: 'basket'})
  private async getBasket(purchase:Purchase) {   
    if(!purchase.status){
      purchase.status=StatusEnum.INCOMPLETE
    }
    let res = await this.service.getBasket(purchase);;
    return res;
  }

  @MessagePattern({cmd: 'successfulPayment'})
  private async successfulPayment(authority:string) {   
    let res = await this.service.successfulPayment(authority);;
    return res;
  }


}