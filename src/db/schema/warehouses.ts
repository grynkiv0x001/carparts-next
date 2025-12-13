import { jsonb, pgTable, text } from 'drizzle-orm/pg-core';

export const warehouses = pgTable('warehouses', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  location: jsonb('location')
    .$type<{
      city: string;
      state: string;
      country: string;
      zipCode: string;
      address: string;
    }>()
    .notNull(),
  coordinates: jsonb('coordinates').$type<{
    lat: number;
    lng: number;
  }>(),
});
