import { User, UserTypeEnum } from '../../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getManager } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(payload: User) {
    try {
      if (!payload.type)
        payload.type = UserTypeEnum.NORMAL;
      let res = await this.save(payload)

      return res.id;
    }
    catch (e) {
      console.log(e);

      throw e;
    }
  }

  async get(userQuery): Promise<User[]> {
    const query: any = {};

    for (const [key, value] of Object.entries(userQuery)) {
      if (value !== undefined && value !== null) { // Check for both undefined and null
        query[key] = value; // Add valid key-value pairs to the query object
      }
    }
    const user = await this.find(query) 
    return user
  }

  async getById(userQuery): Promise<User> {
     
    const user = await this.findOne(userQuery.id)
    return user
  }

  async edit(id, filter): Promise<boolean> {
    let {
      password,
      type,
      name,
      address,
      favorites
    } =
      filter;
    let user = await this.findOne(id);
    try {
      if (favorites) {
        if (!user.favorites)
          user.favorites = []
        favorites.push(...user.favorites)
        favorites = [...new Set(favorites)]// for remove duplicate fav list
      }

      if(!password) password = user.password
      if(!address) address = user.address
      if(!name) name = user.name
      if(!type) type = user.type
      
      let res = await this.update(id, {
        password,
        type,
        name,
        address,
        favorites
      });

      if (!res.affected) {
        throw new NotFoundException('User Not affected!');
      }
      return true;
    }
    catch (e) {
      console.log(e);
      return false
    }
  }

  async removeFavorite(id, filter): Promise<boolean> {
    let {
      favorites
    } =
      filter;

    let finalFavorites = []
    try {
      let user = await this.findOne(id);
      finalFavorites = user.favorites.filter(item => !favorites.includes(item));

      let res = await this.update(id, {
        favorites: finalFavorites
      });

      if (!res.affected) {
        throw new NotFoundException('User Not affected!');
      }
      return true;
    }
    catch (e) {
      console.log(e);
      return false
    }
  }
  async getFavoritesOfUser(id) {
    if (id.length != 24) {
      throw new NotFoundException('id is invalid')
    }
    let user = await this.findOne(id);
    if (user) {
      if (user.favorites) {
        return user.favorites
      }
      else
        return [];
    }
    else
      throw new NotFoundException('user not found')
  }
 
}
