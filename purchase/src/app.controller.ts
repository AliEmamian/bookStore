import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { PurchaseRepository } from './modules/purchase/purchase.repository';

@Controller()
export class AppController {
  constructor(private bookRepository: PurchaseRepository) {}

  @Get('/heartbeat') 
  public async heartBeat(): Promise<void> {
    // Check that the connection to db is established
    try {
      console.log('heartBeat');
      
      await this.bookRepository.findOne({ where: {} });
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
