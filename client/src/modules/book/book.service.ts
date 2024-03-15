import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  
  constructor(@Inject('BOOK_STORE_1') private client: ClientProxy) { }

  async getBook(query:BookDto) {
    return await this.client.send({ cmd: 'book' }, query);
  }

  async getBookById(id) {
    return await this.client.send({ cmd: 'bookById' }, id);
  }

  async addBook(book:BookDto) {
    const message = await this.client.send({ cmd: 'addBook' }, book);
    return message;
  }

  async updateBook(id:string, book:BookDto) {
    try {
      let data = { id, book }
      const message = await this.client.send({ cmd: 'updateBook' }, data);
      return message;
    }catch(e){
      console.log(e);
      throw e
    }
  }

  
}
