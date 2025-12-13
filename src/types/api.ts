/**
 * Shared API response types
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

export type ProductWithRelations = Awaited<
  ReturnType<typeof import('@/lib/db-queries').getProductsWithRelations>
>[0];

export type ProductDetail = Awaited<
  ReturnType<typeof import('@/lib/db-queries').getProductById>
>;

export type CategoryWithProducts = {
  id: string;
  name: string;
  parentId: string | null;
  products: ProductWithRelations[];
};
