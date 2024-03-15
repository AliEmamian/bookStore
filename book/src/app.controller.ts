import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { BookRepository } from './modules/book/book.repository';

@Controller()
export class AppController {
  constructor(private bookRepository: BookRepository) {}

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
