import { Controller, Get, Param, Body,Post, Put,Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}





  @Get("/publish-event")
  async publishEvent() {
    this.appService.publishEvent();
  }
}
