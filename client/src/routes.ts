
import { Routes } from 'nest-router';
import { BookModule } from './modules/book/book.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { UserModule } from './modules/user/user.module';


export const routes: Routes = [
  {
    path: '/book',
    module: BookModule,
  },
  {
    path: '/user',
    module: UserModule,
  },{
    path: '/purchase',
    module: PurchaseModule,
  },
];
