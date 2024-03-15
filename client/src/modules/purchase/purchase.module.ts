import { Module, forwardRef } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [ClientsModule.register([{
    name: 'BOOK_STORE_1',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'books_queue',
      queueOptions: {
        durable: false
      }
    }
  }]),
  ClientsModule.register([{
    name: 'BOOK_STORE_2',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users_queue',
      queueOptions: {
        durable: false
      }
    }
  }]),
  ClientsModule.register([{
    name: 'BOOK_STORE_3',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'purchase_queue',
      queueOptions: {
        durable: false
      }
    }
  }])
  ],
  exports: [PurchaseService],
  controllers: [PurchaseController],
  providers: [
    PurchaseService,
  ],
})
export class PurchaseModule { }
