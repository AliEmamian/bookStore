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
import { UserService } from './user.service';
import { User } from '@entities/user.entity';


@Controller()
export class UserController {

  @Inject(UserService)
  private readonly service: UserService;

  @MessagePattern({ cmd: 'addUser' })
  private async createUser(user:User) {
    let res = await this.service.createUser(user);
    return res;
  }

  @MessagePattern({ cmd: 'user' })
  private async findUser(user:User) {

    let res = await this.service.getUser(user);;
    return res;
  }

  @MessagePattern({ cmd: 'userById' })
  private async findUserById(id) {

    let res = await this.service.getUserById(id);;
    return res;
  }

  @MessagePattern({ cmd: 'updateUser' })
  private async editUser(updateUser) {

    let res = await this.service.editUser(updateUser.id, updateUser.user);;
    return res;
  }

  @MessagePattern({ cmd: 'favoritesOfUser' })
  private async getFavoritesOfUser(userId) {

    let res = await this.service.getFavoritesOfUser(userId);;
    return res;
  }
  
  @MessagePattern({ cmd: 'removeFavorite' })
  private async removeFavorite(updateUser) {
    console.log('removeFavorite');

    let res = await this.service.removeFavorite(updateUser.id, updateUser.user);;
    return res;
  }

}