import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { BookDto } from 'src/modules/book/dto/book.dto';

export class GeneratePaymentLinkDto {

  @IsString()
  userId: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  callbackUrl: string;
 
}


