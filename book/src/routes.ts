
import { Routes } from 'nest-router';
import { BookModule } from './modules/book/book.module';


export const routes: Routes = [
  {
    path: '/book',
    module: BookModule,
  },
];
