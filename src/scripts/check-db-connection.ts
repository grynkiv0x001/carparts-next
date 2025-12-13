#!/usr/bin/env bun
/**
 * Script to check database connection
 *
 * Usage:
 *   bun run src/scripts/check-db-connection.ts
 */

import { sql } from 'drizzle-orm';

import { db } from '@/db';

async function checkConnection() {
  console.log('🔍 Checking database connection...\n');

  try {
    const result = await db.execute(
      sql`SELECT version(), current_database(), current_user`,
    );

    console.log('✅ Database connection successful!\n');
    console.log('Database Information:');
    console.log(`  Version: ${result.rows[0]?.version || 'Unknown'}`);
    console.log(`  Database: ${result.rows[0]?.current_database || 'Unknown'}`);
    console.log(`  User: ${result.rows[0]?.current_user || 'Unknown'}\n`);

    // Check if tables exist
    const tablesResult = await db.execute(
      sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`,
    );

    const tables = tablesResult.rows.map((row: any) => row.table_name);

    if (tables.length === 0) {
      console.log(
        "⚠️  No tables found. Run 'bun run db:push' or 'bun run db:migrate' to create tables.",
      );
    } else {
      console.log(`✅ Found ${tables.length} table(s):`);
      tables.forEach((table) => {
        console.log(`  - ${table}`);
      });
    }

    process.exit(0);
  } catch (error: any) {
    console.error('❌ Database connection failed!\n');
    console.error('Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure PostgreSQL is running');
    console.error('2. Check your DATABASE_URL in .env.local');
    console.error('3. Verify the database exists: psql -l | grep carparts');
    console.error('4. Test connection manually: psql $DATABASE_URL');
    process.exit(1);
  }
}

checkConnection();
