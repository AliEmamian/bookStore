import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataBaseErrorInterceptor } from './error/error.interceptor';
import { dbEnvironmentValidation } from './config/database.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Environment Configuration & Validation
  dbEnvironmentValidation();

  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users_queue',
      queueOptions: {
        durable: false
      }
    }
  })
  app.useGlobalInterceptors(new DataBaseErrorInterceptor());
  // app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen();
  console.log('microservice user start ')
}

bootstrap();
