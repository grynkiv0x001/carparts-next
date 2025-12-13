import Link from 'next/link';
import type { CarPart } from '@/types/car-parts';

interface ProductCardProps {
  part: CarPart;
  manufacturerName?: string;
  categoryName?: string;
}

export const ProductCard = ({
  part,
  manufacturerName,
  categoryName,
}: ProductCardProps) => {
  const totalPrice = part.pricing.dealerPrice + part.pricing.transportationFee;
  const inStock = part.availability.inStock;

  return (
    <Link
      href={`/parts/${part.id}`}
      className="group block rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Header */}
      <div className="mb-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
              {part.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Part #: {part.partNumber}
            </p>
          </div>
          {inStock ? (
            <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              In Stock
            </span>
          ) : (
            <span className="ml-2 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">
              Out of Stock
            </span>
          )}
        </div>

        {/* Manufacturer & Category */}
        {(manufacturerName || categoryName) && (
          <div className="mb-2 flex flex-wrap gap-2">
            {manufacturerName && (
              <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {manufacturerName}
              </span>
            )}
            {categoryName && (
              <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                {categoryName}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {part.description}
        </p>
      </div>

      {/* Compatible Models */}
      {part.compatibleModels.length > 0 && (
        <div className="mb-4">
          <p className="mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">
            Compatible Models:
          </p>
          <div className="flex flex-wrap gap-1">
            {part.compatibleModels.slice(0, 3).map((model, idx) => (
              <span
                key={idx}
                className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              >
                {model.years[0]}-{model.years[model.years.length - 1]}
              </span>
            ))}
            {part.compatibleModels.length > 3 && (
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                +{part.compatibleModels.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Pricing & Availability */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            ${totalPrice.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            + ${part.pricing.transportationFee.toFixed(2)} shipping
          </div>
        </div>
        <div className="text-right">
          {inStock ? (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div className="font-medium text-green-600 dark:text-green-400">
                {part.availability.quantity} available
              </div>
              <div className="text-xs">
                Ships in {part.availability.estimatedDeliveryDays} day
                {part.availability.estimatedDeliveryDays !== 1 ? 's' : ''}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Backorder
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
