import { ProductCard } from '@/components/product-card';
import { getProductsWithRelations } from '@/lib/db-queries';

export const ProductsPage = async () => {
  const products = await getProductsWithRelations(20);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <section className="border-b bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-left">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-4xl dark:text-gray-100">
              All Products
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>
    </div>
  )
};

export default ProductsPage;
