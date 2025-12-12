import { pgTable, text, boolean, integer, doublePrecision, jsonb, timestamp } from "drizzle-orm/pg-core";
import { warehouses } from "./warehouses";
import { manufacturers } from "./manufacturers";
import { partCategories } from "./categories";

export const carParts = pgTable("car_parts", {
  id: text("id").primaryKey(),
  partNumber: text("part_number").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  categoryId: text("category_id")
    .notNull()
    .references(() => partCategories.id),
  manufacturerId: text("manufacturer_id")
    .notNull()
    .references(() => manufacturers.id),
  compatibleModels: jsonb("compatible_models").$type<{
    modelId: string;
    years: number[];
  }[]>().notNull(),
  pricing: jsonb("pricing").$type<{
    manufacturerPrice: number;
    dealerPrice: number;
    transportationFee: number;
    currency: string;
  }>().notNull(),
  availability: jsonb("availability").$type<{
    inStock: boolean;
    quantity: number;
    warehouseId: string;
    estimatedDeliveryDays: number;
  }>().notNull(),
  specifications: jsonb("specifications").$type<{
    material?: string;
    weight?: number;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
      unit: string;
    };
    oemNumber?: string;
  }>(),
  images: jsonb("images").$type<string[]>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

