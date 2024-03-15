import {
  Controller, Inject, UseInterceptors,
  Post,
  Param,
  Query,
  Body,
  Get,
  Put,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { MessagePattern } from '@nestjs/microservices';
import { BookService } from './book.service';
import { Book } from '@entities/book.entity';


@Controller()
export class BookController {

  @Inject(BookService)
  private readonly service: BookService;

  @MessagePattern({cmd: 'addBook'})
  private async createBook(book:Book) {
    let res = await this.service.createBook(book);
    return res;
  }

  @MessagePattern({cmd: 'book'})
  private async findBook(book:Book) {
    
    let res = await this.service.getBook(book);;
    return res;
  }

  @MessagePattern({cmd: 'bookById'})
  private async findBookById(id:string) {
    
    let res = await this.service.getBookById(id);;
    return res;
  }
  
  @MessagePattern({cmd: 'updateBook'})
  private async editBook(updateBook) {
    
    let res = await this.service.editBook(updateBook.id,updateBook.book);;
    return res;
  }

}