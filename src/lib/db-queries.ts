import { desc, eq, inArray } from 'drizzle-orm';

import { db } from '@/db';
import {
  carModels,
  carParts,
  manufacturers,
  partCategories,
  warehouses,
} from '@/db/schema';

export async function getProductsWithRelations(limit = 12) {
  const products = await db
    .select()
    .from(carParts)
    .limit(limit)
    .orderBy(desc(carParts.createdAt));

  const manufacturerIds = [...new Set(products.map((p) => p.manufacturerId))];
  const categoryIds = [...new Set(products.map((p) => p.categoryId))];

  const [allManufacturers, allCategories] = await Promise.all([
    manufacturerIds.length > 0
      ? db
          .select()
          .from(manufacturers)
          .where(inArray(manufacturers.id, manufacturerIds))
      : Promise.resolve([]),
    categoryIds.length > 0
      ? db
          .select()
          .from(partCategories)
          .where(inArray(partCategories.id, categoryIds))
      : Promise.resolve([]),
  ]);

  const manufacturerMap = new Map(allManufacturers.map((m) => [m.id, m.name]));
  const categoryMap = new Map(allCategories.map((c) => [c.id, c.name]));

  return products.map((product) => ({
    ...product,
    manufacturerName: manufacturerMap.get(product.manufacturerId),
    categoryName: categoryMap.get(product.categoryId),
  }));
}

export async function getProductById(id: string) {
  const product = await db
    .select()
    .from(carParts)
    .where(eq(carParts.id, id))
    .limit(1);

  if (product.length === 0) {
    return null;
  }

  const [manufacturer, category] = await Promise.all([
    db
      .select()
      .from(manufacturers)
      .where(eq(manufacturers.id, product[0].manufacturerId))
      .limit(1),
    db
      .select()
      .from(partCategories)
      .where(eq(partCategories.id, product[0].categoryId))
      .limit(1),
  ]);

  return {
    ...product[0],
    manufacturerName: manufacturer[0]?.name,
    categoryName: category[0]?.name,
  };
}

export async function getProductsByCategory(categoryId: string, limit = 20) {
  const products = await db
    .select()
    .from(carParts)
    .where(eq(carParts.categoryId, categoryId))
    .limit(limit)
    .orderBy(desc(carParts.createdAt));

  const manufacturerIds = [...new Set(products.map((p) => p.manufacturerId))];

  const allManufacturers =
    manufacturerIds.length > 0
      ? await db
          .select()
          .from(manufacturers)
          .where(inArray(manufacturers.id, manufacturerIds))
      : [];

  const manufacturerMap = new Map(allManufacturers.map((m) => [m.id, m.name]));

  const category = await db
    .select()
    .from(partCategories)
    .where(eq(partCategories.id, categoryId))
    .limit(1);

  return {
    products: products.map((product) => ({
      ...product,
      manufacturerName: manufacturerMap.get(product.manufacturerId),
      categoryName: category[0]?.name,
    })),
    category: category[0] || null,
  };
}

export async function getAllCategories() {
  return db.select().from(partCategories).orderBy(partCategories.name);
}

export async function getCategoryById(id: string) {
  const category = await db
    .select()
    .from(partCategories)
    .where(eq(partCategories.id, id))
    .limit(1);

  return category[0] || null;
}

export async function getAllManufacturers() {
  return db.select().from(manufacturers).orderBy(manufacturers.name);
}

export async function getManufacturerById(id: string) {
  const manufacturer = await db
    .select()
    .from(manufacturers)
    .where(eq(manufacturers.id, id))
    .limit(1);

  return manufacturer[0] || null;
}

export async function getAllCarModels() {
  return db.select().from(carModels).orderBy(carModels.name);
}

export async function getAllWarehouses() {
  return db.select().from(warehouses).orderBy(warehouses.name);
}
