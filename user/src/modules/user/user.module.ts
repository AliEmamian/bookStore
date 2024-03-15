import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { RedisModule } from '@modules/redis/redis.module';


@Module({
  imports: [RedisModule],
  exports: [UserService, UserRepository],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService, 
  ],
})
export class UserModule { }
