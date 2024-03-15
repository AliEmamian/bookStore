import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Purchase } from '../entities/purchase.entity';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();
   
export function dbEnvironmentValidation() {
  // if (
  //   !(
  //     process.env.DB_USER &&
  //     process.env.DB_PASSWORD &&
  //     process.env.DB_DATABASE
  //   )
  // ) {
  //   console.log(
  //       'Postgres Username, Password or DB Name not provided!\nExiting...',
  //   );
  //   process.exit(1);
  // }
}
export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: 'mongodb',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      Purchase
     ],
    autoLoadEntities: true,
    synchronize: true,
    
  }),
};

export default new DataSource({
  type: 'mongodb',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../entities/*{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
