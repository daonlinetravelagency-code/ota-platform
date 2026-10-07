# BACKEND FILES - Копируй в packages/backend/

## 1. packages/backend/package.json
```json
{
  "name": "ota-backend",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "node --loader tsx --watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "fastify": "^4.25.0",
    "@fastify/cors": "^8.4.0",
    "@fastify/jwt": "^7.1.0",
    "pg": "^8.11.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/pg": "^8.10.0",
    "typescript": "^5.3.0",
    "tsx": "^4.7.0"
  }
}
```

## 2. packages/backend/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "bundler",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 3. packages/backend/wrangler.toml
```toml
name = "ota-platform-api-dev"
type = "service"
account_id = "YOUR_ACCOUNT_ID"
workers_dev = true
main = "dist/index.js"
compatibility_date = "2024-01-01"

[env.development]
name = "ota-platform-api-dev"
routes = [
    { pattern = "api.dev-example.com/*", zone_name = "example.com" }
]

[env.production]
name = "ota-platform-api-prod"
routes = [
    { pattern = "api.example.com/*", zone_name = "example.com" }
]
```

## 4. packages/backend/src/index.ts
```typescript
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
```

## 5. packages/backend/src/db/pool.ts
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ota_dev',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export const initDb = async () => {
  try {
    const client = await pool.connect();
    console.log('✓ Database connected');
    client.release();
    return pool;
  } catch (err) {
    console.error('Failed to connect to database:', err);
    throw err;
  }
};

export { pool };
```

## 6. packages/backend/src/routes/health.ts
```typescript
import { FastifyInstance } from 'fastify';

export const registerHealthRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/health', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  });

  fastify.get('/api/health', async (request, reply) => {
    try {
      const result = await fastify.pgPool.query('SELECT NOW()');
      return {
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      reply.code(503);
      return {
        status: 'error',
        database: 'disconnected',
        error: (err as Error).message,
      };
    }
  });
};
```

## 7. packages/backend/src/types/fastify.ts
```typescript
import { FastifyInstance } from 'fastify';
import { Pool } from 'pg';

declare module 'fastify' {
  interface FastifyInstance {
    pgPool: Pool;
  }
}
```
