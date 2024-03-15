import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
import { BookDto } from 'src/modules/book/dto/book.dto';
 
  export class PurchaseDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
  
    @IsNotEmpty()
    @IsString()
    book: BookDto;
  
  }