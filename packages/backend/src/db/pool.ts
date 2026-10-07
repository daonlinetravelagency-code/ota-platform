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
