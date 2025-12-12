#!/usr/bin/env bun
/**
 * Script to generate car parts data and populate the database
 * 
 * Usage:
 *   bun run src/scripts/generate-data.ts [count]
 * 
 * Examples:
 *   bun run src/scripts/generate-data.ts 100    # Generate 100 parts
 *   bun run src/scripts/generate-data.ts 500    # Generate 500 parts
 */

import { generateUniqueCarParts } from "@/lib/data-generator";
import { sampleProducts } from "@/fixtures/sample-products";
import type { CarPart } from "@/types/car-parts";

// Get count from command line arguments or use default
const count = process.argv[2] ? parseInt(process.argv[2], 10) : 100;

if (isNaN(count) || count < 0) {
  console.error("Error: Count must be a positive number");
  process.exit(1);
}

console.log(`Generating ${count} car parts...`);

// Generate the parts
const generatedParts = generateUniqueCarParts(count);

// Combine with sample products
const allParts: CarPart[] = [...sampleProducts, ...generatedParts];

// Output statistics
console.log("\n=== Generation Statistics ===");
console.log(`Total parts: ${allParts.length}`);
console.log(`Sample products: ${sampleProducts.length}`);
console.log(`Generated parts: ${generatedParts.length}`);

// Count by category
const categoryCounts = new Map<string, number>();
allParts.forEach((part) => {
  categoryCounts.set(
    part.categoryId,
    (categoryCounts.get(part.categoryId) || 0) + 1,
  );
});

console.log("\n=== Parts by Category ===");
categoryCounts.forEach((count, categoryId) => {
  console.log(`${categoryId}: ${count} parts`);
});

// Count by manufacturer
const manufacturerCounts = new Map<string, number>();
allParts.forEach((part) => {
  manufacturerCounts.set(
    part.manufacturerId,
    (manufacturerCounts.get(part.manufacturerId) || 0) + 1,
  );
});

console.log("\n=== Parts by Manufacturer ===");
manufacturerCounts.forEach((count, manufacturerId) => {
  console.log(`${manufacturerId}: ${count} parts`);
});

// Stock statistics
const inStockCount = allParts.filter((p) => p.availability.inStock).length;
const outOfStockCount = allParts.length - inStockCount;

console.log("\n=== Stock Statistics ===");
console.log(`In stock: ${inStockCount} (${((inStockCount / allParts.length) * 100).toFixed(1)}%)`);
console.log(`Out of stock: ${outOfStockCount} (${((outOfStockCount / allParts.length) * 100).toFixed(1)}%)`);

// Price statistics
const prices = allParts.map((p) => p.pricing.dealerPrice);
const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

console.log("\n=== Price Statistics ===");
console.log(`Average price: $${avgPrice.toFixed(2)}`);
console.log(`Min price: $${minPrice.toFixed(2)}`);
console.log(`Max price: $${maxPrice.toFixed(2)}`);

// Export the data
const outputPath = "./src/fixtures/generated-parts.json";
const fs = await import("fs/promises");
await fs.writeFile(
  outputPath,
  JSON.stringify(allParts, null, 2),
  "utf-8",
);

console.log(`\n✅ Data exported to: ${outputPath}`);

// Also export as TypeScript for direct import
const tsOutputPath = "./src/fixtures/generated-parts.ts";

// Convert parts to TypeScript format with proper Date handling
function formatPartForTS(part: CarPart, indent = 2): string {
  const spaces = " ".repeat(indent);
  return `${spaces}{\n${spaces}  id: "${part.id}",\n${spaces}  partNumber: "${part.partNumber}",\n${spaces}  name: "${part.name}",\n${spaces}  description: ${JSON.stringify(part.description)},\n${spaces}  categoryId: "${part.categoryId}",\n${spaces}  manufacturerId: "${part.manufacturerId}",\n${spaces}  compatibleModels: ${JSON.stringify(part.compatibleModels)},\n${spaces}  pricing: ${JSON.stringify(part.pricing)},\n${spaces}  availability: ${JSON.stringify(part.availability)},\n${spaces}  specifications: ${part.specifications ? JSON.stringify(part.specifications) : "undefined"},\n${spaces}  images: ${part.images ? JSON.stringify(part.images) : "undefined"},\n${spaces}  createdAt: new Date("${part.createdAt.toISOString()}"),\n${spaces}  updatedAt: new Date("${part.updatedAt.toISOString()}"),\n${spaces}}`;
}

const partsTS = allParts.map((part) => formatPartForTS(part)).join(",\n");

const tsContent = `// Auto-generated car parts data
// Generated at: ${new Date().toISOString()}
// Total parts: ${allParts.length}

import type { CarPart } from "@/types/car-parts";

export const generatedParts: CarPart[] = [
${partsTS}
];
`;

await fs.writeFile(tsOutputPath, tsContent, "utf-8");
console.log(`✅ TypeScript export created: ${tsOutputPath}`);

console.log("\n✨ Data generation complete!");

