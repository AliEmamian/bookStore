import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  // constructor(@Inject('BOOK_STORE') private client: ClientProxy) { }

 


  async publishEvent() {
    // this.client.emit('book-created', { 'bookName': 'The Way Of Kings', 'author': 'Brandon Sanderson' });
  }
}
