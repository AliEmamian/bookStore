import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/book/book.module';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { UserModule } from './modules/user/user.module';
import { PurchaseModule } from './modules/purchase/purchase.module';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    BookModule,
    UserModule,
    PurchaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
