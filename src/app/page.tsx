import Link from 'next/link';

import { getProductsWithRelations } from '@/lib/db-queries';
import { CategoryPreview, Hero, ProductCard } from '@/components';

export default async function Home() {
  let products: Awaited<ReturnType<typeof getProductsWithRelations>> = [];
  let error: string | null = null;

  try {
    products = await getProductsWithRelations(12);
  } catch (err) {
    console.error('Error fetching products:', err);
    error =
      err instanceof Error
        ? err.message
        : 'Failed to load products.';
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Hero />

      <CategoryPreview />

      <section className="py-12 bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Featured Products
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Popular parts from our catalog
              </p>
            </div>
            <Link
              href="/products"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all
            </Link>
          </div>

          {/* TODO: Add proper error handling */}
          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
              <h3 className="mb-2 text-lg font-semibold text-red-800 dark:text-red-400">
                Error Fetching Products
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
              <h3 className="mb-2 text-lg font-semibold text-yellow-800 dark:text-yellow-400">
                No Products Found
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  part={{
                    ...product,
                    specifications: product.specifications ?? undefined,
                    images: product.images ?? undefined,
                  }}
                  manufacturerName={product.manufacturerName}
                  categoryName={product.categoryName}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
