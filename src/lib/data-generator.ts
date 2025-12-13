import { faker } from '@faker-js/faker';
import {
  carModels,
  manufacturers,
  partCategories,
  warehouses,
} from '@/fixtures/base-data';
import type { CarPart } from '@/types/car-parts';

/**
 * Generates a random car part with realistic data
 */
export function generateCarPart(): CarPart {
  const manufacturer = faker.helpers.arrayElement(manufacturers);
  const compatibleModels = carModels.filter(
    (model) => model.manufacturerId === manufacturer.id,
  );

  // If no compatible models, pick any model
  const selectedModels =
    compatibleModels.length > 0 ? compatibleModels : carModels;

  const model = faker.helpers.arrayElement(selectedModels);
  const category = faker.helpers.arrayElement(partCategories);

  // Generate compatible models (1-3 models)
  const numCompatibleModels = faker.number.int({ min: 1, max: 3 });
  const compatibleModelsList = faker.helpers
    .arrayElements(selectedModels, { min: 1, max: numCompatibleModels })
    .map((m) => ({
      modelId: m.id,
      years: faker.helpers.arrayElements(m.years, {
        min: 1,
        max: Math.min(5, m.years.length),
      }),
    }));

  const warehouse = faker.helpers.arrayElement(warehouses);
  const inStock = faker.datatype.boolean({ probability: 0.85 });
  const quantity = inStock ? faker.number.int({ min: 1, max: 500 }) : 0;
  const estimatedDeliveryDays = inStock
    ? faker.number.int({ min: 1, max: 7 })
    : faker.number.int({ min: 7, max: 30 });

  // Generate realistic pricing
  const basePrice = faker.number.float({
    min: 10,
    max: 1000,
    fractionDigits: 2,
  });
  const manufacturerPrice = basePrice;
  const dealerPrice =
    basePrice * faker.number.float({ min: 1.3, max: 1.8, fractionDigits: 2 });
  const transportationFee =
    basePrice < 50
      ? faker.number.float({ min: 4, max: 10, fractionDigits: 2 })
      : basePrice < 200
        ? faker.number.float({ min: 10, max: 25, fractionDigits: 2 })
        : faker.number.float({ min: 25, max: 60, fractionDigits: 2 });

  // Generate part name based on category and manufacturer
  const categoryName = category.name.toLowerCase();
  const partName = `${manufacturer.name} ${model.name} ${categoryName}`;

  // Generate part number
  const manufacturerPrefix = manufacturer.name.substring(0, 3).toUpperCase();
  const categoryCode = category.id.split('-')[1];
  const partNumber = `${manufacturerPrefix}-${categoryCode}-${faker.string.alphanumeric(3).toUpperCase()}`;

  // Generate specifications
  const hasDimensions = faker.datatype.boolean({ probability: 0.7 });
  const hasWeight = faker.datatype.boolean({ probability: 0.8 });
  const hasOEM = faker.datatype.boolean({ probability: 0.6 });

  const specifications: CarPart['specifications'] = {};

  if (hasWeight) {
    specifications.weight = faker.number.float({
      min: 0.1,
      max: 50,
      fractionDigits: 2,
    });
  }

  if (hasDimensions) {
    specifications.dimensions = {
      length: faker.number.float({ min: 2, max: 80, fractionDigits: 1 }),
      width: faker.number.float({ min: 1, max: 20, fractionDigits: 1 }),
      height: faker.number.float({ min: 0.5, max: 15, fractionDigits: 1 }),
      unit: 'inches',
    };
  }

  if (hasOEM) {
    specifications.oemNumber = faker.string.alphanumeric(10).toUpperCase();
  }

  // Material based on category
  const materials: Record<string, string[]> = {
    'cat-102': ['Synthetic Media', 'Cellulose', 'Microglass'],
    'cat-103': ['Synthetic Fiber', 'Cotton', 'Paper'],
    'cat-104': ['Iridium', 'Platinum', 'Copper'],
    'cat-201': ['Ceramic Composite', 'Semi-Metallic', 'Organic'],
    'cat-202': ['Cast Iron', 'Carbon Composite', 'Drilled & Slotted'],
    'cat-203': ['Steel & Oil', 'Gas Charged', 'Hydraulic'],
    'cat-204': ['Steel & Aluminum', 'Monotube', 'Twin-Tube'],
    'cat-301': ['Polycarbonate & LED', 'HID', 'Halogen'],
    'cat-303': ['AGM', 'Lead-Acid', 'Lithium'],
    'cat-304': ['Copper & Steel', 'Aluminum'],
    'cat-601': ['Aluminum', 'Copper & Brass'],
    'cat-701': ['Steel & Plastic', 'Aluminum'],
    'cat-801': ['Stainless Steel', 'Aluminized Steel'],
    'cat-802': ['Stainless Steel & Ceramic', 'Metal Substrate'],
  };

  if (materials[category.id]) {
    specifications.material = faker.helpers.arrayElement(
      materials[category.id],
    );
  } else {
    specifications.material = faker.helpers.arrayElement([
      'Steel',
      'Aluminum',
      'Plastic',
      'Rubber',
      'Composite',
    ]);
  }

  const createdAt = faker.date.past({ years: 1 });
  const updatedAt = faker.date.between({
    from: createdAt,
    to: new Date(),
  });

  return {
    id: `part-${faker.string.alphanumeric(8)}`,
    partNumber,
    name: partName,
    description: faker.lorem.paragraph({ min: 2, max: 4 }),
    categoryId: category.id,
    manufacturerId: manufacturer.id,
    compatibleModels: compatibleModelsList,
    pricing: {
      manufacturerPrice: Number(manufacturerPrice.toFixed(2)),
      dealerPrice: Number(dealerPrice.toFixed(2)),
      transportationFee: Number(transportationFee.toFixed(2)),
      currency: 'USD',
    },
    availability: {
      inStock,
      quantity,
      warehouseId: warehouse.id,
      estimatedDeliveryDays,
    },
    specifications:
      Object.keys(specifications).length > 0 ? specifications : undefined,
    images: faker.datatype.boolean({ probability: 0.3 })
      ? [faker.image.url({ width: 400, height: 300 })]
      : undefined,
    createdAt,
    updatedAt,
  };
}

/**
 * Generates multiple car parts
 */
export function generateCarParts(count: number): CarPart[] {
  return Array.from({ length: count }, () => generateCarPart());
}

/**
 * Generates a unique set of car parts (ensures no duplicate part numbers)
 */
export function generateUniqueCarParts(count: number): CarPart[] {
  const parts: CarPart[] = [];
  const partNumbers = new Set<string>();

  while (parts.length < count) {
    const part = generateCarPart();
    if (!partNumbers.has(part.partNumber)) {
      partNumbers.add(part.partNumber);
      parts.push(part);
    }
  }

  return parts;
}
