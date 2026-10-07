import { FastifyInstance } from 'fastify';

export async function registerHealthRoutes(fastify: FastifyInstance) {
  fastify.get('/health', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  });

  fastify.get('/health/ready', async (request, reply) => {
    try {
      const result = await fastify.pgPool.pgPool.query('SELECT NOW()');
      return {
        status: 'ready',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      reply.status(503).send({
        status: 'not ready',
        database: 'disconnected',
      });
    }
  });
}
