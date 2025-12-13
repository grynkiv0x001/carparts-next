# API Documentation

This document describes the API structure and how data flows through the application.

## Architecture Overview

The application follows Next.js best practices:

1. **Server Components**: Directly query the database using functions from `@/lib/db-queries`
2. **API Routes**: Available for client-side components or external access
3. **Type Safety**: Shared types ensure consistency across the application

## API Routes

All API routes are located in `/src/app/api/` and follow RESTful conventions.

### Products

#### GET `/api/products`
Get a list of products with relations (manufacturer and category names).

**Query Parameters:**
- `limit` (optional): Number of products to return (default: 12)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "part-001",
      "partNumber": "TOY-ENG-001",
      "name": "Toyota Camry Engine Air Filter",
      "description": "...",
      "categoryId": "cat-103",
      "manufacturerId": "mfg-001",
      "manufacturerName": "Toyota",
      "categoryName": "Engine Parts",
      "pricing": { ... },
      "availability": { ... },
      ...
    }
  ],
  "count": 12
}
```

#### GET `/api/products/[id]`
Get a single product by ID with relations.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "part-001",
    "partNumber": "TOY-ENG-001",
    "name": "Toyota Camry Engine Air Filter",
    "manufacturerName": "Toyota",
    "categoryName": "Engine Parts",
    ...
  }
}
```

### Categories

#### GET `/api/categories`
Get all categories.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cat-101",
      "name": "Engine",
      "parentId": null
    },
    ...
  ],
  "count": 25
}
```

#### GET `/api/categories/[id]`
Get a single category by ID.

**Query Parameters:**
- `includeProducts` (optional): Set to `true` to include products in this category
- `limit` (optional): Number of products to return if `includeProducts=true` (default: 20)

**Response (without products):**
```json
{
  "success": true,
  "data": {
    "id": "cat-101",
    "name": "Engine",
    "parentId": null
  }
}
```

**Response (with products):**
```json
{
  "success": true,
  "data": {
    "id": "cat-101",
    "name": "Engine",
    "parentId": null,
    "products": [ ... ]
  }
}
```

### Manufacturers

#### GET `/api/manufacturers`
Get all manufacturers.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "mfg-001",
      "name": "Toyota",
      "country": "Japan"
    },
    ...
  ],
  "count": 10
}
```

#### GET `/api/manufacturers/[id]`
Get a single manufacturer by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "mfg-001",
    "name": "Toyota",
    "country": "Japan"
  }
}
```

## Database Query Functions

All database queries are centralized in `/src/lib/db-queries.ts`:

- `getProductsWithRelations(limit)` - Get products with manufacturer and category names
- `getProductById(id)` - Get a single product with relations
- `getProductsByCategory(categoryId, limit)` - Get products for a category
- `getAllCategories()` - Get all categories
- `getCategoryById(id)` - Get a single category
- `getAllManufacturers()` - Get all manufacturers
- `getManufacturerById(id)` - Get a single manufacturer
- `getAllCarModels()` - Get all car models
- `getAllWarehouses()` - Get all warehouses

## Usage Patterns

### Server Components (Recommended)

For server components, directly use database query functions:

```tsx
import { getProductsWithRelations } from '@/lib/db-queries';

export default async function ProductsPage() {
  const products = await getProductsWithRelations(20);
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Client Components

For client components, use the API routes:

```tsx
'use client';

import { useEffect, useState } from 'react';
import type { ApiResponse, ProductWithRelations } from '@/types/api';

export function ProductsList() {
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  
  useEffect(() => {
    fetch('/api/products?limit=20')
      .then(res => res.json())
      .then((data: ApiResponse<ProductWithRelations[]>) => {
        if (data.success && data.data) {
          setProducts(data.data);
        }
      });
  }, []);
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## Type Safety

All API responses use the `ApiResponse<T>` type from `/src/types/api.ts`:

```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}
```

Product types are available from `/src/types/car-parts.ts` and can be extended with relations using the types in `/src/types/api.ts`.

## Error Handling

All API routes return consistent error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

HTTP status codes:
- `200` - Success
- `404` - Resource not found
- `500` - Server error

## Notes

- The application no longer uses fixtures directly in components
- All data comes from the database
- Fixtures are only used for seeding the database (`src/db/seed.ts`)
- Server components should prefer direct database queries for better performance
- API routes are available for client-side components and external access
