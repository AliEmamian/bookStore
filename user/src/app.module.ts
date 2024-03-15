import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataBaseErrorInterceptor } from './error/error.interceptor';
import { UserModule } from './modules/user/user.module';
import { routes } from './routes';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { UserRepository } from './modules/user/user.repository';
@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    RouterModule.forRoutes(routes),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    UserRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataBaseErrorInterceptor,
    },
  ],
})
export class AppModule {}
