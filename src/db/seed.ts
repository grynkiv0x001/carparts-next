#!/usr/bin/env bun
/**
 * Seed script to populate the database with fixture data
 *
 * Usage:
 *   bun run src/db/seed.ts
 */

import { db } from '@/db';
import {
  carModels,
  manufacturers,
  partCategories,
  sampleProducts,
  warehouses,
} from '@/fixtures';
import { generateUniqueCarParts } from '@/lib/data-generator';
import {
  carModels as carModelsTable,
  carParts as carPartsTable,
  manufacturers as manufacturersTable,
  partCategories as partCategoriesTable,
  warehouses as warehousesTable,
} from './schema';

async function seed() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Clear existing data (in reverse order of dependencies)
    console.log('Clearing existing data...');
    await db.delete(carPartsTable);
    await db.delete(carModelsTable);
    await db.delete(partCategoriesTable);
    await db.delete(manufacturersTable);
    await db.delete(warehousesTable);
    console.log('✅ Cleared existing data\n');

    // Insert warehouses
    console.log(`Inserting ${warehouses.length} warehouses...`);
    await db.insert(warehousesTable).values(
      warehouses.map((w) => ({
        id: w.id,
        name: w.name,
        location: w.location,
        coordinates: w.coordinates,
      })),
    );
    console.log('✅ Warehouses inserted\n');

    // Insert manufacturers
    console.log(`Inserting ${manufacturers.length} manufacturers...`);
    await db.insert(manufacturersTable).values(
      manufacturers.map((m) => ({
        id: m.id,
        name: m.name,
        country: m.country,
      })),
    );
    console.log('✅ Manufacturers inserted\n');

    // Insert car models
    console.log(`Inserting ${carModels.length} car models...`);
    await db.insert(carModelsTable).values(
      carModels.map((m) => ({
        id: m.id,
        manufacturerId: m.manufacturerId,
        name: m.name,
        years: m.years,
      })),
    );
    console.log('✅ Car models inserted\n');

    // Insert part categories
    console.log(`Inserting ${partCategories.length} part categories...`);
    await db.insert(partCategoriesTable).values(
      partCategories.map((c) => ({
        id: c.id,
        name: c.name,
        parentId: c.parentId,
      })),
    );
    console.log('✅ Part categories inserted\n');

    // Insert sample products
    console.log(`Inserting ${sampleProducts.length} sample products...`);
    await db.insert(carPartsTable).values(
      sampleProducts.map((p) => ({
        id: p.id,
        partNumber: p.partNumber,
        name: p.name,
        description: p.description,
        categoryId: p.categoryId,
        manufacturerId: p.manufacturerId,
        compatibleModels: p.compatibleModels,
        pricing: p.pricing,
        availability: p.availability,
        specifications: p.specifications,
        images: p.images,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })),
    );
    console.log('✅ Sample products inserted\n');

    // Optionally generate and insert additional parts
    const generateCount = process.env.SEED_COUNT
      ? parseInt(process.env.SEED_COUNT, 10)
      : 0;

    if (generateCount > 0) {
      console.log(
        `Generating and inserting ${generateCount} additional parts...`,
      );
      const generatedParts = generateUniqueCarParts(generateCount);
      await db.insert(carPartsTable).values(
        generatedParts.map((p) => ({
          id: p.id,
          partNumber: p.partNumber,
          name: p.name,
          description: p.description,
          categoryId: p.categoryId,
          manufacturerId: p.manufacturerId,
          compatibleModels: p.compatibleModels,
          pricing: p.pricing,
          availability: p.availability,
          specifications: p.specifications,
          images: p.images,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        })),
      );
      console.log(`✅ ${generateCount} additional parts inserted\n`);
    }

    console.log('✨ Database seed completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log('\n✅ Seed script finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seed script failed:', error);
    process.exit(1);
  });
