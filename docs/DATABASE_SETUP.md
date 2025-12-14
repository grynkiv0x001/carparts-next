# Database Setup Guide

This guide will help you set up PostgreSQL with Drizzle ORM for local development.

## Prerequisites

1. **PostgreSQL installed locally**
   - macOS: `brew install postgresql@15` or download from [postgresql.org](https://www.postgresql.org/download/)
   - Linux: `sudo apt-get install postgresql` (Ubuntu/Debian)
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)

2. **PostgreSQL service running**
   - macOS: `brew services start postgresql@15`
   - Linux: `sudo systemctl start postgresql`
   - Windows: PostgreSQL service should start automatically

## Setup Steps

### 1. Create the Database

Connect to PostgreSQL and create the database:

```bash
# Connect to PostgreSQL (default user is usually 'postgres')
psql postgres

# Create the database
CREATE DATABASE carparts;

# Exit psql
\q
```

Or using a single command:
```bash
createdb carparts
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root (if it doesn't exist):

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and set your database URL:

```env
# Format: postgresql://username:password@localhost:5432/database_name
# If no password: postgresql://postgres@localhost:5432/carparts
# With password: postgresql://postgres:yourpassword@localhost:5432/carparts

DATABASE_URL=postgresql://postgres@localhost:5432/carparts
```

**Common connection strings:**
- No password: `postgresql://postgres@localhost:5432/carparts`
- With password: `postgresql://postgres:mypassword@localhost:5432/carparts`
- Custom user: `postgresql://myuser:mypassword@localhost:5432/carparts`

### 3. Generate Database Schema

Generate the migration files from your schema:

```bash
bun run db:generate
```

This creates migration files in the `drizzle/` directory.

### 4. Apply Migrations

Apply the migrations to create the tables:

```bash
bun run db:migrate
```

Or use push to sync schema directly (useful for development):

```bash
bun run db:push
```

### 5. Seed the Database

Populate the database with fixture data:

```bash
# Seed with sample products only (20 parts)
bun run db:seed

# Seed with additional generated parts (e.g., 100 more)
SEED_COUNT=100 bun run db:seed
```

## Available Database Commands

- `bun run db:generate` - Generate migration files from schema
- `bun run db:migrate` - Apply migrations to database
- `bun run db:push` - Push schema changes directly (development only)
- `bun run db:studio` - Open Drizzle Studio (database GUI)
- `bun run db:seed` - Seed database with fixture data

## Database Schema

The database includes the following tables:

1. **warehouses** - Warehouse locations and information
2. **manufacturers** - Car manufacturers
3. **car_models** - Car models with year compatibility
4. **part_categories** - Part categories (hierarchical)
5. **car_parts** - Car parts with pricing, availability, and specifications

## Troubleshooting

### Connection Issues

1. **Check PostgreSQL is running:**
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status postgresql
   ```

2. **Verify database exists:**
   ```bash
   psql -l | grep carparts
   ```

3. **Test connection:**
   ```bash
   psql postgresql://postgres@localhost:5432/carparts
   ```

### Permission Issues

If you get permission errors, you may need to:

1. Create a PostgreSQL user:
   ```sql
   CREATE USER your_username WITH PASSWORD 'your_password';
   ALTER USER your_username CREATEDB;
   ```

2. Grant permissions:
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE carparts TO your_username;
   ```

### Reset Database

To start fresh:

```bash
# Drop and recreate database
psql postgres -c "DROP DATABASE IF EXISTS carparts;"
psql postgres -c "CREATE DATABASE carparts;"

# Run migrations and seed
bun run db:push
bun run db:seed
```

## Using Drizzle Studio

Drizzle Studio provides a visual interface to browse and edit your database:

```bash
bun run db:studio
```

This opens a web interface at `http://localhost:4983` where you can:
- View all tables and data
- Edit records
- Run queries
- Export data

