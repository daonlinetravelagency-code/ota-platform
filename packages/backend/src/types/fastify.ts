import { FastifyInstance } from 'fastify';
import { Pool } from 'pg';

declare module 'fastify' {
  interface FastifyInstance {
    pgPool: Pool;
  }
}
