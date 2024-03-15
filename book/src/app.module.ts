import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataBaseErrorInterceptor } from './error/error.interceptor';
import { BookModule } from './modules/book/book.module';
import { routes } from './routes';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { BookRepository } from './modules/book/book.repository';
@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    RouterModule.forRoutes(routes),
    BookModule,
  ],
  controllers: [AppController],
  providers: [
    BookRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataBaseErrorInterceptor,
    },
  ],
})
export class AppModule {}
