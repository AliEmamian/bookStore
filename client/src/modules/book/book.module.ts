import { Module ,forwardRef} from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
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
  ],
  exports: [BookService],
  controllers: [BookController],
  providers: [
    BookService,
  ],
})
export class BookModule {}
