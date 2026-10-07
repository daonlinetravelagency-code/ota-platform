import './types/fastify.js';
import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import { initDb } from './db/pool.js';
import { registerHealthRoutes } from './routes/health.js';

const PORT = parseInt(process.env.PORT || '3001');
const HOST = '0.0.0.0';

const start = async () => {
  try {
    const db = await initDb();
    const fastify = Fastify({
      logger: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      },
    });

    await fastify.register(fastifyCors, { origin: true });
    await fastify.register(fastifyJwt, {
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    });

    fastify.decorate('pgPool', db);
    await registerHealthRoutes(fastify);

    await fastify.listen({ port: PORT, host: HOST });
    console.log(`✓ Server running at http://${HOST}:${PORT}`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
