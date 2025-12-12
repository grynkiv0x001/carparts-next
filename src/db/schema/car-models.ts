import { pgTable, text, jsonb } from "drizzle-orm/pg-core";
import { manufacturers } from "./manufacturers";

export const carModels = pgTable("car_models", {
  id: text("id").primaryKey(),
  manufacturerId: text("manufacturer_id")
    .notNull()
    .references(() => manufacturers.id),
  name: text("name").notNull(),
  years: jsonb("years").$type<number[]>().notNull(),
});

