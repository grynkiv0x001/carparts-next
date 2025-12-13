import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL environment variable is not set. Please create a .env.local file with your database connection string.',
  );
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(databaseUrl, { max: 1 });

export const db = drizzle(client, { schema });
