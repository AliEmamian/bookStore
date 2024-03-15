import { Module ,forwardRef} from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';


@Module({
  imports: [],
  exports: [BookService, BookRepository],
  controllers: [BookController],
  providers: [
    BookRepository,
    BookService,
  ],
})
export class BookModule {}
