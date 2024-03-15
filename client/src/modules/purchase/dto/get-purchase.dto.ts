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

export class GetPurchaseDto {

  @IsString()
  userId: string;

  @IsString()
  authority: string;

  @IsString()
  status: string;

  @IsNumber()
  totalPrice: number;

  @IsNumber()
  discount: number;

  @IsNumber()
  finalAmount: number;

  basket: Basket
}

interface Basket {
  id: string,
  count: number,
  price: number,
  totalPrice: number
}