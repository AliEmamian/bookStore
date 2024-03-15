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
import { BookRepository } from './book.repository';
import { Book } from '../../entities/book.entity';
import { FindOneOptions, ObjectId  } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    private repository: BookRepository,
  ) { }

  onModuleInit() {

  } 
  public async createBook(payload:Book) {

    try {
      let res = await this.repository.createBook(payload);
      return { data: res, error: null, status: HttpStatus.OK };
    }
    catch (e) {
      console.log(e);
      throw new BadRequestException('create book error');
    }
  }

  public async getBook(book: Book) {
    try {
      const documents = await this.repository.get(book);
      return documents
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async getBookById(id:string) {
    try {
      const documents = await this.repository.getById(id);
      return documents
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  
  public async editBook(id: string, body: Book ) {
    try {
 
      let res = await this.repository.edit(id, body)
      return { res, error: null, status: HttpStatus.OK };
    } catch (e) {
      console.log(e);
      return {   error: true, status: HttpStatus.INTERNAL_SERVER_ERROR };

    }
  }

}
