import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [ClientsModule.register([{
    name: 'BOOK_STORE_2',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users_queue',
      queueOptions: {
        durable: false
      }
    }
  }])
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [
    UserService,
  ],
})
export class UserModule { }
