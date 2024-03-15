import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataBaseErrorInterceptor } from './error/error.interceptor';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { routes } from './routes';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { PurchaseRepository } from './modules/purchase/purchase.repository';
@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    RouterModule.forRoutes(routes),
    PurchaseModule,
  ],
  controllers: [AppController],
  providers: [
    PurchaseRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataBaseErrorInterceptor,
    },
  ],
})
export class AppModule {}
