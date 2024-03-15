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
import { MessagePattern } from '@nestjs/microservices';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';


@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Get()
  async getBook(@Query() payload:BookDto) {
    return this.bookService.getBook(payload);
  }

  @Get('id')
  async getBookById(@Query() id:string) {
    return this.bookService.getBookById(id);
  }

  @Post()
  async addBook(@Body() book:BookDto) {
    return this.bookService.addBook(book);
  }

  @Put('/:id')
  async updateBook(@Param('id') id:string, @Body() book:BookDto) {
    return this.bookService.updateBook(id, book);
  }



}