import { decimal, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

// Need a database for production? Check out https://www.prisma.io/?via=nextjsboilerplate
// Tested and compatible with Next.js Boilerplate

export const counterSchema = pgTable('counter', {
  id: serial('id').primaryKey(),
  count: integer('count').default(0),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// 用户积分表
export const pointsSchema = pgTable('points', {
  id: serial('id').primaryKey(),
  user_id: text('user_id').notNull().unique(),
  balance: integer('balance').default(0).notNull(),
  total_earned: integer('total_earned').default(0).notNull(),
  total_spent: integer('total_spent').default(0).notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// 积分流水表
export const pointsLogSchema = pgTable('points_log', {
  id: serial('id').primaryKey(),
  user_id: text('user_id').notNull(),
  type: text('type').notNull(), // 'earn' | 'spend' | 'recharge'
  amount: integer('amount').notNull(),
  balance_after: integer('balance_after').notNull(),
  description: text('description'),
  metadata: text('metadata'), // JSON string for additional data
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// 支付订单表
export const ordersSchema = pgTable('orders', {
  id: serial('id').primaryKey(),
  user_id: text('user_id').notNull(),
  stripe_session_id: text('stripe_session_id').notNull(),
  amount: integer('amount').notNull(), // points amount
  price: decimal('price', { precision: 10, scale: 2 }).notNull(), // USD amount
  status: text('status').notNull(), // 'pending' | 'completed' | 'failed'
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
