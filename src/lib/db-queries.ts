import { db } from '@/db';
import { carParts, manufacturers, partCategories } from '@/db/schema';
import { inArray, desc } from 'drizzle-orm';

export async function getProductsWithRelations(limit = 12) {
  const products = await db
    .select()
    .from(carParts)
    .limit(limit)
    .orderBy(desc(carParts.createdAt));

  // Get all unique IDs
  const manufacturerIds = [...new Set(products.map((p) => p.manufacturerId))];
  const categoryIds = [...new Set(products.map((p) => p.categoryId))];

  // Fetch all manufacturers and categories
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

  // Create lookup maps
  const manufacturerMap = new Map(allManufacturers.map((m) => [m.id, m.name]));
  const categoryMap = new Map(allCategories.map((c) => [c.id, c.name]));

  // Enhance products with related data
  return products.map((product) => ({
    ...product,
    manufacturerName: manufacturerMap.get(product.manufacturerId),
    categoryName: categoryMap.get(product.categoryId),
  }));
}
