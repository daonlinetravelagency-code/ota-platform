import { Pool } from 'pg';
import { createClient } from 'redis';

let pgPool: Pool;
let redisClient: ReturnType<typeof createClient>;

export async function initDb() {
  pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  try {
    // Test PostgreSQL connection
    const client = await pgPool.connect();
    await client.query('SELECT NOW()');
    client.release();

    // Test Redis connection
    await redisClient.connect();
    await redisClient.ping();

    console.log('Database connections established');
    return { pgPool, redisClient };
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export function getDb() {
  return { pgPool, redisClient };
}

export async function closeDb() {
  await pgPool.end();
  await redisClient.quit();
}
