import {
  Controller, Inject, UseInterceptors,
  Post,
  Param,
  Query,
  Body,
  Get,
  Delete,
  Put,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';


@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getUser(@Query() payload: UserDto) {
    return this.userService.getUser(payload);
  }

  @Get('id')
  async getUserById(@Query() id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  async addUser(@Body() user: UserDto) {
    return this.userService.addUser(user);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() user: UserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete('favorite/:id')
  async removeFavorite(@Param('id') id: string, @Body() user: UserDto) {
    return this.userService.removeFavorite(id, user);
  }

  @Get('favorites/:id')
  async getFavoritesOfUser(@Param('id') id: string) {
    return this.userService.getFavoritesOfUser(id);
  }



}