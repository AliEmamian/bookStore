
import { Routes } from 'nest-router';
import { PurchaseModule } from './modules/purchase/purchase.module';


export const routes: Routes = [
  {
    path: '/book',
    module: PurchaseModule,
  },
];
