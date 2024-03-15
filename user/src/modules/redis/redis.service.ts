import Redis from 'ioredis';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_KEY,
  REDIS_TTL,
} from '../../config/redis.config';
import { server } from '../../config/server.config';

export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly redis = new Redis(REDIS_PORT, REDIS_HOST, {
    lazyConnect: true,
  });

  async onModuleInit() {
    if (['connecting', 'ready', 'connect'].includes(this.redis.status)) {
      return; // already connected, do nothing
    }
    await this.redis.connect();
  }

  private genKey(extension: string): string {
    return `${REDIS_KEY}_${extension}`;
  }

  public async get<T = any>(extension: string): Promise<T | null> {

    const key = this.genKey(extension);
    
    const res = (await this.redis.get(key)) || null;
    return JSON.parse(res);
  }

  public async set<T = any>(
    extension: string,
    data: T,
    ttl = REDIS_TTL.default,
  ): Promise<boolean> {
    const key = this.genKey(extension);
    const value = JSON.stringify(data);

    const result = await this.redis.set(key, value, 'EX', ttl);
    
    return result === 'OK';
  }

  onModuleDestroy() {
    this.redis.disconnect();
  }
}