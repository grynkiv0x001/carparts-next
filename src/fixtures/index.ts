// Export all fixture data
export * from "./base-data";
export * from "./sample-products";

// Export types
export type {
  Warehouse,
  CarManufacturer,
  CarModel,
  PartCategory,
  CarPart,
} from "@/types/car-parts";

// Re-export data generator utilities
export {
  generateCarPart,
  generateCarParts,
  generateUniqueCarParts,
} from "@/lib/data-generator";

