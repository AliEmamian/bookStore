import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {

  constructor(
    @Inject('BOOK_STORE_2') private client: ClientProxy,
  ) { }

  async getUser(payload:UserDto) {

    return await this.client.send({ cmd: 'user' }, payload);
  }

  async getUserById(id:string) {

    return await this.client.send({ cmd: 'userById' }, id);
  }

  async addUser(user:UserDto) {
    const message = await this.client.send({ cmd: 'addUser' }, user);
    return message;
  }

  async updateUser(id:string, user:UserDto) {
    try {
      let data = { id, user }
      const message = await this.client.send({ cmd: 'updateUser' }, data);
      return message;
    } catch (e) {
      console.log(e);

      throw e
    }
  }
  async removeFavorite(id:string, user:UserDto) {
    try {
      let data = { id, user }
      const message = await this.client.send({ cmd: 'removeFavorite' }, data);
      return message;
    } catch (e) {
      console.log(e);

      throw e
    }
  }
  async getFavoritesOfUser(id:string) {
    try {
      const message = await this.client.send({ cmd: 'favoritesOfUser' }, id);

      return message;
    } catch (e) {
      console.log(e);

      throw e
    }
  }

}
