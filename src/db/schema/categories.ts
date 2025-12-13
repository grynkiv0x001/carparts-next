import { pgTable, text } from 'drizzle-orm/pg-core';

export const partCategories = pgTable('part_categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  parentId: text('parent_id'),
});
