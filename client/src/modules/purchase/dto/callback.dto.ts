import {
  IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
import { BookDto } from 'src/modules/book/dto/book.dto';
 
  export class CallbackUrlDto {
    @IsNotEmpty()
    @IsString()
    authority: string;
  
    @IsNotEmpty()
    @IsBoolean()
    isOk: boolean;
  
  }