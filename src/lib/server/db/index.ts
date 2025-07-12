// import 'dotenv/config';
import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const pool = new Pool({
	connectionString: env.DATABASE_URL,
  });
  
  export const db = drizzle(pool, { schema });

