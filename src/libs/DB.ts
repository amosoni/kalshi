import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import path from 'node:path';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as schema from '@/models/Schema';
import { Env } from './Env';

// Stores the db connection in the global scope to prevent multiple instances due to hot reloading with Next.js
const globalForDb = globalThis as unknown as {
  drizzle: NodePgDatabase<typeof schema> | null;
};

// Need a database for production? Check out https://www.prisma.io/?via=nextjsboilerplate
// Tested and compatible with Next.js Boilerplate
const createDbConnection = () => {
  return drizzle({
    connection: {
      connectionString: Env.DATABASE_URL,
      ssl:
        !Env.DATABASE_URL.includes('localhost') && !Env.DATABASE_URL.includes('127.0.0.1')
          ? { rejectUnauthorized: false }
          : false,
    },
    schema,
  });
};

// Skip database connection during build time
const isBuildTime = process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build';

const db: NodePgDatabase<typeof schema> | null = isBuildTime ? null : (globalForDb.drizzle || createDbConnection());

// Only store in global during development to prevent hot reload issues
if (Env.NODE_ENV !== 'production' && !isBuildTime) {
  globalForDb.drizzle = db;
}

// Lazy migration execution - only run when needed and not during build
let migrationPromise: Promise<void> | null = null;
const runMigrations = async () => {
  if (isBuildTime || !db) {
    return; // Skip migrations during build or if db is null
  }

  if (!migrationPromise) {
    migrationPromise = migrate(db, {
      migrationsFolder: path.join(process.cwd(), 'migrations'),
    });
  }
  return migrationPromise;
};

export { db, runMigrations };
