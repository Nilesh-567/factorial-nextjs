// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://myuser:uSfub3pbJM4MGK58DQkcW0oqG73hxG1Y@dpg-csq3ic9u0jms73fmoeig-a/mydb_hswv" ,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS numberr (
        id SERIAL PRIMARY KEY,
        number INT NOT NULL,
        calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    return { status: 'connected', message: 'Table initialized successfully.' };
  } catch (error) {
    return { status: 'error', message: error.message };
  } finally {
    client.release();
  }
}

export async function insertNumber(number) {
  const client = await pool.connect();
  try {
    await client.query('INSERT INTO numberr (number) VALUES ($1)', [number]);
    return { status: 'success', message: 'Number inserted successfully.' };
  } catch (error) {
    return { status: 'error', message: error.message };
  } finally {
    client.release();
  }
}

export async function calculateFactorial(number) {
  if (number < 0) return { error: 'Number must be non-negative.' };
  if (number === 0 || number === 1) return 1;
  let factorial = 1;
  for (let i = 2; i <= number; i++) {
    factorial *= i;
  }
  return factorial;
}
