import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
  
  export class UserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    phone: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  
    @IsOptional()
    address?: string;
  
    @IsString()
    favorites: string[]; 
  }