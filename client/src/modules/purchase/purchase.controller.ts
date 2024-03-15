import {
  Controller, Inject, UseInterceptors,
  Post,
  Param,
  Query,
  Body,
  Get,
  Delete,
  Put,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PurchaseService } from './purchase.service';
import { GetPurchaseDto } from './dto/get-purchase.dto';
import { PurchaseDto } from './dto/purchase.dto';
import { GeneratePaymentLinkDto } from './dto/generate-payment-link.dto';
import { CallbackUrlDto } from './dto/callback.dto';

@Controller()
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post()
  async addToBasket(@Body() purchase:PurchaseDto) {
    let basket = await this.purchaseService.addToBasket(purchase);  
    return basket
  }

  @Delete()
  async removeFromBasket(@Body() purchase:PurchaseDto) {
    let basket = await this.purchaseService.removeFromBasket(purchase);
    return basket
  }

  @Get()
  async getBasket(@Query() payload:GetPurchaseDto) {
    let basket = await this.purchaseService.getBasket(payload);
    return basket
  }

  @Get('/paymentLink')
  async generatePaymentLink(@Query() payload:GeneratePaymentLinkDto) {
    return await this.purchaseService.createPaymentLink(payload.userId, payload.amount, payload.callbackUrl);
  }

  @Get('/callbackUrl')
  async paymentCallbackUrl(@Query() payload:CallbackUrlDto) {
    return await this.purchaseService.handlePaymentCallback(payload.authority, payload.isOk);
  }
}
