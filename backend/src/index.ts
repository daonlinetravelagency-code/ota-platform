import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import { initDb } from './db/pool.js';
import { registerHealthRoutes } from './routes/health.js';
import { registerTestRoutes } from './routes/test.js';

const PORT = parseInt(process.env.PORT || '3001');
const HOST = '0.0.0.0';

const start = async () => {
  try {
    // Initialize database
    const db = await initDb();
    console.log('✓ Database connected');

    // Create Fastify instance
    const fastify = Fastify({
      logger: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      },
    });

    // Register plugins
    await fastify.register(fastifyCors, {
      origin: true,
    });

    await fastify.register(fastifyJwt, {
      secret: process.env.JWT_SECRET || 'your-secret-key',
    });

    // Make db available to all routes
    fastify.decorate('db', db);

    // Register routes
    await registerHealthRoutes(fastify);
    await registerTestRoutes(fastify);

    // Start server
    await fastify.listen({ port: PORT, host: HOST });

    console.log(`✓ Server listening at http://${HOST}:${PORT}`);
    console.log(`✓ Health check: http://localhost:${PORT}/health`);
  } catch (err) {
    console.error('Server start error:', err);
    process.exit(1);
  }
};

start();
