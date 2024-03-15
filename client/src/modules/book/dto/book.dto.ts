import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
 
  export class BookDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    genre: string;
  
    @IsNotEmpty()
    @IsString()
    author: string;
  
    @IsOptional()
    year?: string;
  
    @IsString()
    price?: string; 
  }