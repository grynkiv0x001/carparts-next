import Link from 'next/link';
import { partCategories } from '@/fixtures';

export const CategoryPreview = () => {
  // Get main categories (no parent)
  const mainCategories = partCategories.filter((cat) => !cat.parentId);
  // Get some popular subcategories
  const popularSubcategories = partCategories
    .filter((cat) => cat.parentId)
    .slice(0, 8);

  return (
    <section className="py-8 border-b bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Browse by Category
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Find the parts you need quickly
          </p>
        </div>

        {/* Main Categories */}
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
            Main Categories
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {mainCategories.slice(0, 12).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group rounded-lg border border-gray-200 bg-white p-4 text-center transition-all hover:border-blue-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-400"
              >
                <div className="mb-2 text-2xl">🔧</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Subcategories */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
            Popular Parts
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularSubcategories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
