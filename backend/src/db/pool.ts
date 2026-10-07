import { Pool } from 'pg';

let pgPool: Pool;

export async function initDb() {
  pgPool = new Pool({
    connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });

  try {
    // Test PostgreSQL connection
    const client = await pgPool.connect();
    await client.query('SELECT NOW()');
    client.release();

    console.log('✓ Database connection established');
    return pgPool;
  } catch (error) {
    console.error('✗ Database connection failed:', error);
    throw error;
  }
}

export function getDb() {
  return pgPool;
}

export async function closeDb() {
  await pgPool.end();
}
