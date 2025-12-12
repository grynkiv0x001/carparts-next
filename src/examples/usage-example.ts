/**
 * Example usage of the car parts fixtures and data generator
 * 
 * This file demonstrates how to use the fixtures and data generator
 * in your application.
 */

import {
  // Base data
  warehouses,
  manufacturers,
  carModels,
  partCategories,
  
  // Sample products
  sampleProducts,
  
  // Data generator functions
  generateCarPart,
  generateCarParts,
  generateUniqueCarParts,
} from "@/fixtures";

// Example 1: Use pre-defined sample products
console.log("Sample Products:", sampleProducts.length);
console.log("First product:", sampleProducts[0]);

// Example 2: Generate a single random part
const randomPart = generateCarPart();
console.log("\nRandom Part:", randomPart);

// Example 3: Generate multiple parts
const multipleParts = generateCarParts(10);
console.log("\nGenerated 10 parts");

// Example 4: Generate unique parts (no duplicate part numbers)
const uniqueParts = generateUniqueCarParts(50);
console.log("\nGenerated 50 unique parts");

// Example 5: Filter parts by manufacturer
const toyotaParts = sampleProducts.filter(
  (part) => part.manufacturerId === "mfg-001",
);
console.log("\nToyota parts:", toyotaParts.length);

// Example 6: Filter parts by category
const brakeParts = sampleProducts.filter(
  (part) => part.categoryId.startsWith("cat-2"),
);
console.log("\nBrake parts:", brakeParts.length);

// Example 7: Find parts compatible with a specific model and year
const camry2019Parts = sampleProducts.filter((part) =>
  part.compatibleModels.some(
    (model) =>
      model.modelId === "model-001" && model.years.includes(2019),
  ),
);
console.log("\nParts compatible with 2019 Camry:", camry2019Parts.length);

// Example 8: Find parts in a specific warehouse
const seattleParts = sampleProducts.filter(
  (part) => part.availability.warehouseId === "wh-001",
);
console.log("\nParts in Seattle warehouse:", seattleParts.length);

// Example 9: Find in-stock parts
const inStockParts = sampleProducts.filter(
  (part) => part.availability.inStock,
);
console.log("\nIn-stock parts:", inStockParts.length);

// Example 10: Get warehouse information for a part
const part = sampleProducts[0];
const warehouse = warehouses.find(
  (w) => w.id === part.availability.warehouseId,
);
console.log("\nPart warehouse:", warehouse?.name);

// Example 11: Get manufacturer information
const manufacturer = manufacturers.find(
  (m) => m.id === part.manufacturerId,
);
console.log("\nPart manufacturer:", manufacturer?.name);

// Example 12: Get category information
const category = partCategories.find((c) => c.id === part.categoryId);
console.log("\nPart category:", category?.name);

// Example 13: Calculate total price (dealer price + transportation)
const totalPrice =
  part.pricing.dealerPrice + part.pricing.transportationFee;
console.log("\nTotal price for part:", `$${totalPrice.toFixed(2)}`);

// Example 14: Generate parts for database seeding
// This is useful when you need to populate your database
export function seedDatabase(count: number) {
  const parts = generateUniqueCarParts(count);
  // Here you would insert these parts into your database
  // Example: await db.carParts.insertMany(parts);
  return parts;
}

