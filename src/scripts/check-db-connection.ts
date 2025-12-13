#!/usr/bin/env bun
/**
 * Script to check database connection
 *
 * Usage:
 *   bun run src/scripts/check-db-connection.ts
 */

import { sql } from 'drizzle-orm';

import { db } from '@/db';

interface DatabaseInfo {
  version: string;
  current_database: string;
  current_user: string;
}

interface TableRow {
  table_name: string;
}

async function checkConnection() {
  console.log('🔍 Checking database connection...\n');

  try {
    const result = await db.execute(
      sql`SELECT version(), current_database(), current_user`,
    );

    const dbInfo = result[0] as unknown as DatabaseInfo | undefined;

    console.log('✅ Database connection successful!\n');
    console.log('Database Information:');
    console.log(`  Version: ${dbInfo?.version || 'Unknown'}`);
    console.log(`  Database: ${dbInfo?.current_database || 'Unknown'}`);
    console.log(`  User: ${dbInfo?.current_user || 'Unknown'}\n`);

    // Check if tables exist
    const tablesResult = await db.execute(
      sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`,
    );

    const tables: string[] = (tablesResult as unknown as TableRow[]).map(
      (row: TableRow) => row.table_name,
    );

    if (tables.length === 0) {
      console.log(
        "⚠️  No tables found. Run 'bun run db:push' or 'bun run db:migrate' to create tables.",
      );
    } else {
      console.log(`✅ Found ${tables.length} table(s):`);
      for (const table of tables) {
        console.log(`  - ${table}`);
      }
    }

    process.exit(0);
  } catch (error: unknown) {
    console.error('❌ Database connection failed!\n');

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error:', errorMessage);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure PostgreSQL is running');
    console.error('2. Check your DATABASE_URL in .env.local');
    console.error('3. Verify the database exists: psql -l | grep carparts');
    console.error('4. Test connection manually: psql $DATABASE_URL');
    process.exit(1);
  }
}

checkConnection();
