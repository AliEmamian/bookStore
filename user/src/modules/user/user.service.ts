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
import { UserRepository } from './user.repository';
import { User } from '../../entities/user.entity';
import { RedisService } from '@modules/redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private redisService: RedisService
  ) { }

  onModuleInit() {

  }
  public async createUser(payload: User) {

    try {
      let res = await this.repository.createUser(payload);
      return { data: res, error: null, status: HttpStatus.OK };
    }
    catch (e) {
      console.log(e);
      throw new BadRequestException('');
    }
  }

  public async getUser(user: User) {
    try {
      const users = await this.repository.get(user);
      return users
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  public async getUserById(user: User) {
    try {
      const users = await this.repository.getById(user);
      return users
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async editUser(id: string, body: User) {
    try {

      let res = await this.repository.edit(id, body)
      let favorite = await this.repository.getFavoritesOfUser(id);
      await this.redisService.set(id, favorite)
      return { res, error: null, status: HttpStatus.OK };
    } catch (e) {
      console.log(e);
      return { error: true, status: HttpStatus.INTERNAL_SERVER_ERROR };

    }
  }

  public async removeFavorite(id: string, body: User) {
    try {

      let res = await this.repository.removeFavorite(id, body)
      return { res, error: null, status: HttpStatus.OK };
    } catch (e) {
      if (e.status == 404)
        return { error: true, status: HttpStatus.NOT_FOUND };
      return { error: true, status: HttpStatus.INTERNAL_SERVER_ERROR };

    }
  }
  public async getFavoritesOfUser(id: string) {
    try {

      let redisValue = await this.redisService.get(id)
      if (!redisValue) {
        let res = await this.repository.getFavoritesOfUser(id);
        await this.redisService.set(id, res)

        return { res, error: null, status: HttpStatus.OK };
      }
      return { res:redisValue, error: null, status: HttpStatus.OK };

    } catch (e) {
      if (e.status == 404)
        return { error: true, status: HttpStatus.NOT_FOUND };
      return { error: true, status: HttpStatus.INTERNAL_SERVER_ERROR };

    }
  }

}
