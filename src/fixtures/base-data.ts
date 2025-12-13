import type {
  Warehouse,
  CarManufacturer,
  CarModel,
  PartCategory,
} from '@/types/car-parts';

export const warehouses: Warehouse[] = [
  {
    id: 'wh-001',
    name: 'Northwest Distribution Center',
    location: {
      city: 'Seattle',
      state: 'Washington',
      country: 'USA',
      zipCode: '98101',
      address: '1234 Industrial Way',
    },
    coordinates: { lat: 47.6062, lng: -122.3321 },
  },
  {
    id: 'wh-002',
    name: 'Midwest Hub',
    location: {
      city: 'Chicago',
      state: 'Illinois',
      country: 'USA',
      zipCode: '60601',
      address: '5678 Commerce Blvd',
    },
    coordinates: { lat: 41.8781, lng: -87.6298 },
  },
  {
    id: 'wh-003',
    name: 'East Coast Warehouse',
    location: {
      city: 'Newark',
      state: 'New Jersey',
      country: 'USA',
      zipCode: '07102',
      address: '9012 Logistics Parkway',
    },
    coordinates: { lat: 40.7357, lng: -74.1724 },
  },
  {
    id: 'wh-004',
    name: 'Southern Distribution',
    location: {
      city: 'Atlanta',
      state: 'Georgia',
      country: 'USA',
      zipCode: '30301',
      address: '3456 Supply Chain Drive',
    },
    coordinates: { lat: 33.749, lng: -84.388 },
  },
  {
    id: 'wh-005',
    name: 'West Coast Logistics',
    location: {
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
      zipCode: '90001',
      address: '7890 Automotive Avenue',
    },
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: 'wh-006',
    name: 'Texas Central',
    location: {
      city: 'Dallas',
      state: 'Texas',
      country: 'USA',
      zipCode: '75201',
      address: '2345 Parts Plaza',
    },
    coordinates: { lat: 32.7767, lng: -96.797 },
  },
];

export const manufacturers: CarManufacturer[] = [
  { id: 'mfg-001', name: 'Toyota', country: 'Japan' },
  { id: 'mfg-002', name: 'Ford', country: 'USA' },
  { id: 'mfg-003', name: 'Chevrolet', country: 'USA' },
  { id: 'mfg-004', name: 'Honda', country: 'Japan' },
  { id: 'mfg-005', name: 'BMW', country: 'Germany' },
  { id: 'mfg-006', name: 'Mercedes-Benz', country: 'Germany' },
  { id: 'mfg-007', name: 'Volkswagen', country: 'Germany' },
  { id: 'mfg-008', name: 'Audi', country: 'Germany' },
  { id: 'mfg-009', name: 'Nissan', country: 'Japan' },
  { id: 'mfg-010', name: 'Hyundai', country: 'South Korea' },
  { id: 'mfg-011', name: 'Kia', country: 'South Korea' },
  { id: 'mfg-012', name: 'Mazda', country: 'Japan' },
  { id: 'mfg-013', name: 'Subaru', country: 'Japan' },
  { id: 'mfg-014', name: 'Jeep', country: 'USA' },
  { id: 'mfg-015', name: 'Ram', country: 'USA' },
  { id: 'mfg-016', name: 'GMC', country: 'USA' },
  { id: 'mfg-017', name: 'Dodge', country: 'USA' },
  { id: 'mfg-018', name: 'Lexus', country: 'Japan' },
  { id: 'mfg-019', name: 'Acura', country: 'Japan' },
  { id: 'mfg-020', name: 'Infiniti', country: 'Japan' },
];

export const carModels: CarModel[] = [
  // Toyota
  {
    id: 'model-001',
    manufacturerId: 'mfg-001',
    name: 'Camry',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-002',
    manufacturerId: 'mfg-001',
    name: 'Corolla',
    years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-003',
    manufacturerId: 'mfg-001',
    name: 'RAV4',
    years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-004',
    manufacturerId: 'mfg-001',
    name: 'Highlander',
    years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-005',
    manufacturerId: 'mfg-001',
    name: 'Tacoma',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },

  // Ford
  {
    id: 'model-006',
    manufacturerId: 'mfg-002',
    name: 'F-150',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-007',
    manufacturerId: 'mfg-002',
    name: 'Mustang',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-008',
    manufacturerId: 'mfg-002',
    name: 'Explorer',
    years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-009',
    manufacturerId: 'mfg-002',
    name: 'Escape',
    years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },

  // Chevrolet
  {
    id: 'model-010',
    manufacturerId: 'mfg-003',
    name: 'Silverado',
    years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-011',
    manufacturerId: 'mfg-003',
    name: 'Equinox',
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-012',
    manufacturerId: 'mfg-003',
    name: 'Malibu',
    years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },

  // Honda
  {
    id: 'model-013',
    manufacturerId: 'mfg-004',
    name: 'Civic',
    years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-014',
    manufacturerId: 'mfg-004',
    name: 'Accord',
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-015',
    manufacturerId: 'mfg-004',
    name: 'CR-V',
    years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },

  // BMW
  {
    id: 'model-016',
    manufacturerId: 'mfg-005',
    name: '3 Series',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-017',
    manufacturerId: 'mfg-005',
    name: '5 Series',
    years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-018',
    manufacturerId: 'mfg-005',
    name: 'X5',
    years: [2019, 2020, 2021, 2022, 2023, 2024],
  },

  // Mercedes-Benz
  {
    id: 'model-019',
    manufacturerId: 'mfg-006',
    name: 'C-Class',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-020',
    manufacturerId: 'mfg-006',
    name: 'E-Class',
    years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },

  // Volkswagen
  {
    id: 'model-021',
    manufacturerId: 'mfg-007',
    name: 'Jetta',
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-022',
    manufacturerId: 'mfg-007',
    name: 'Passat',
    years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },

  // Nissan
  {
    id: 'model-023',
    manufacturerId: 'mfg-009',
    name: 'Altima',
    years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-024',
    manufacturerId: 'mfg-009',
    name: 'Rogue',
    years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },

  // Hyundai
  {
    id: 'model-025',
    manufacturerId: 'mfg-010',
    name: 'Elantra',
    years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'model-026',
    manufacturerId: 'mfg-010',
    name: 'Tucson',
    years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
  },
];

export const partCategories: PartCategory[] = [
  // Main categories
  { id: 'cat-001', name: 'Engine & Powertrain' },
  { id: 'cat-002', name: 'Brakes & Suspension' },
  { id: 'cat-003', name: 'Electrical & Lighting' },
  { id: 'cat-004', name: 'Body & Exterior' },
  { id: 'cat-005', name: 'Interior & Comfort' },
  { id: 'cat-006', name: 'Cooling & Heating' },
  { id: 'cat-007', name: 'Fuel System' },
  { id: 'cat-008', name: 'Exhaust System' },
  { id: 'cat-009', name: 'Transmission' },
  { id: 'cat-010', name: 'Steering & Alignment' },

  // Subcategories
  { id: 'cat-101', name: 'Engine Parts', parentId: 'cat-001' },
  { id: 'cat-102', name: 'Oil Filters', parentId: 'cat-001' },
  { id: 'cat-103', name: 'Air Filters', parentId: 'cat-001' },
  { id: 'cat-104', name: 'Spark Plugs', parentId: 'cat-001' },
  { id: 'cat-105', name: 'Belts & Pulleys', parentId: 'cat-001' },

  { id: 'cat-201', name: 'Brake Pads', parentId: 'cat-002' },
  { id: 'cat-202', name: 'Brake Rotors', parentId: 'cat-002' },
  { id: 'cat-203', name: 'Shock Absorbers', parentId: 'cat-002' },
  { id: 'cat-204', name: 'Struts', parentId: 'cat-002' },

  { id: 'cat-301', name: 'Headlights', parentId: 'cat-003' },
  { id: 'cat-302', name: 'Taillights', parentId: 'cat-003' },
  { id: 'cat-303', name: 'Batteries', parentId: 'cat-003' },
  { id: 'cat-304', name: 'Alternators', parentId: 'cat-003' },

  { id: 'cat-401', name: 'Bumpers', parentId: 'cat-004' },
  { id: 'cat-402', name: 'Mirrors', parentId: 'cat-004' },
  { id: 'cat-403', name: 'Doors & Panels', parentId: 'cat-004' },

  { id: 'cat-501', name: 'Seats', parentId: 'cat-005' },
  { id: 'cat-502', name: 'Dashboards', parentId: 'cat-005' },
  { id: 'cat-503', name: 'Floor Mats', parentId: 'cat-005' },

  { id: 'cat-601', name: 'Radiators', parentId: 'cat-006' },
  { id: 'cat-602', name: 'Thermostats', parentId: 'cat-006' },
  { id: 'cat-603', name: 'Water Pumps', parentId: 'cat-006' },

  { id: 'cat-701', name: 'Fuel Pumps', parentId: 'cat-007' },
  { id: 'cat-702', name: 'Fuel Filters', parentId: 'cat-007' },
  { id: 'cat-703', name: 'Fuel Injectors', parentId: 'cat-007' },

  { id: 'cat-801', name: 'Mufflers', parentId: 'cat-008' },
  { id: 'cat-802', name: 'Catalytic Converters', parentId: 'cat-008' },
  { id: 'cat-803', name: 'Exhaust Pipes', parentId: 'cat-008' },

  { id: 'cat-901', name: 'Transmission Fluid', parentId: 'cat-009' },
  { id: 'cat-902', name: 'Clutch Components', parentId: 'cat-009' },

  { id: 'cat-1001', name: 'Tie Rods', parentId: 'cat-010' },
  { id: 'cat-1002', name: 'Control Arms', parentId: 'cat-010' },
  { id: 'cat-1003', name: 'Power Steering Pumps', parentId: 'cat-010' },
];
