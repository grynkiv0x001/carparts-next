import { getProductsWithRelations } from "@/lib/db-queries";
import { CategoryPreview, ProductCard } from "@/components";
import Link from "next/link";

export default async function Home() {
  // Fetch products from database
  let products: Awaited<ReturnType<typeof getProductsWithRelations>> = [];
  let error: string | null = null;

  try {
    products = await getProductsWithRelations(12);
  } catch (err) {
    console.error("Error fetching products:", err);
    error =
      err instanceof Error
        ? err.message
        : "Failed to load products. Make sure the database is set up.";
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
              Find the Car Parts You Need
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
              Browse thousands of quality car parts from trusted manufacturers.
              Fast shipping and competitive prices.
            </p>
          </div>
        </div>
      </section>

      {/* Category Preview */}
      <CategoryPreview />

      {/* Featured Products */}
      <section className="py-12">
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
              View all →
            </Link>
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
              <h3 className="mb-2 text-lg font-semibold text-red-800 dark:text-red-400">
                Database Connection Error
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              <div className="mt-4 text-sm">
                <p className="mb-2 font-medium">To fix this:</p>
                <ol className="list-inside list-decimal space-y-1">
                  <li>Make sure PostgreSQL is running</li>
                  <li>Create the database: <code className="rounded bg-red-100 px-1 dark:bg-red-900/30">createdb carparts</code></li>
                  <li>Set up schema: <code className="rounded bg-red-100 px-1 dark:bg-red-900/30">bun run db:push</code></li>
                  <li>Seed the database: <code className="rounded bg-red-100 px-1 dark:bg-red-900/30">bun run db:seed</code></li>
                </ol>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
              <h3 className="mb-2 text-lg font-semibold text-yellow-800 dark:text-yellow-400">
                No Products Found
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                The database is empty. Run{" "}
                <code className="rounded bg-yellow-100 px-1 dark:bg-yellow-900/30">
                  bun run db:seed
                </code>{" "}
                to populate it with sample data.
              </p>
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
