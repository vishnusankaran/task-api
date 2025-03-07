// Make sure to install the 'pg' package
import { pgTable, text, pgEnum, jsonb, date } from 'drizzle-orm/pg-core';

// const statuses = pgEnum('text', ['pending', 'in-progress', 'completed']);

// This is a sample drizzle schema for your database
export const task = pgTable('task', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  dueDate: date('dueDate'),
  status: text('status').notNull().default('pending'),
  user: jsonb('user').default({
    id: 'asdfghjkl',
    name: 'Vishnu Sankaran',
    avatar: 'https://avatars.githubusercontent.com/u/4065909?v=4',
    email: 'vishnu88sankaran@gmail.com',
  }),
});
