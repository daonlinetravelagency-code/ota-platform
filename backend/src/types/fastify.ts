import { FastifyInstance } from 'fastify';
import { Pool } from 'pg';
import { RedisClientType } from 'redis';

declare module 'fastify' {
  interface FastifyInstance {
    pgPool: Pool;
    redisClient: RedisClientType;
  }
}