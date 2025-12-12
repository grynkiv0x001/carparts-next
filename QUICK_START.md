# Quick Start Guide

## Database Setup (5 minutes)

### 1. Install PostgreSQL (if not already installed)

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux:**
```bash
sudo apt-get install postgresql
sudo systemctl start postgresql
```

**Windows:**
Download from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
createdb carparts
```

Or manually:
```bash
psql postgres
CREATE DATABASE carparts;
\q
```

### 3. Configure Environment

Create `.env.local`:
```bash
DATABASE_URL=postgresql://postgres@localhost:5432/carparts
```

(Adjust username/password if needed)

### 4. Setup Database Schema

```bash
# Generate and apply schema
bun run db:push

# Or use migrations
bun run db:generate
bun run db:migrate
```

### 5. Seed Database

```bash
# Seed with 20 sample products
bun run db:seed

# Seed with additional generated parts (e.g., 100 more)
SEED_COUNT=100 bun run db:seed
```

### 6. Verify Setup

```bash
# Check database connection
bun run db:check

# Open Drizzle Studio (database GUI)
bun run db:studio
```

## Available Commands

### Database Commands
- `bun run db:push` - Push schema to database (development)
- `bun run db:generate` - Generate migration files
- `bun run db:migrate` - Apply migrations
- `bun run db:studio` - Open Drizzle Studio
- `bun run db:seed` - Seed database with fixtures
- `bun run db:check` - Check database connection

### Data Generation
- `bun run generate:data [count]` - Generate car parts data files

## Project Structure

```
src/
├── db/
│   ├── schema/          # Database schema definitions
│   │   ├── warehouses.ts
│   │   ├── manufacturers.ts
│   │   ├── car-models.ts
│   │   ├── categories.ts
│   │   └── car-parts.ts
│   ├── index.ts         # Database connection
│   └── seed.ts          # Database seeding script
├── fixtures/            # Fixture data
│   ├── base-data.ts     # Base data (warehouses, manufacturers, etc.)
│   ├── sample-products.ts # 20 sample products
│   └── index.ts         # Fixture exports
├── lib/
│   └── data-generator.ts # Data generation utilities
└── types/
    └── car-parts.ts     # TypeScript type definitions
```

## Next Steps

1. **Explore the database:**
   ```bash
   bun run db:studio
   ```

2. **Use the database in your app:**
   ```typescript
   import { db } from "@/db";
   import { carParts } from "@/db/schema";
   
   const parts = await db.select().from(carParts);
   ```

3. **Generate more test data:**
   ```bash
   bun run generate:data 500
   SEED_COUNT=500 bun run db:seed
   ```

For detailed setup instructions, see [DATABASE_SETUP.md](./DATABASE_SETUP.md)

