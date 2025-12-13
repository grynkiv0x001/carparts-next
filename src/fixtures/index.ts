export * from './base-data';
export * from './sample-products';

export type {
  Warehouse,
  CarManufacturer,
  CarModel,
  PartCategory,
  CarPart,
} from '@/types/car-parts';

export {
  generateCarPart,
  generateCarParts,
  generateUniqueCarParts,
} from '@/lib/data-generator';
