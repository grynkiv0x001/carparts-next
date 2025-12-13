import { NextResponse } from 'next/server';
import { getProductsWithRelations } from '@/lib/db-queries';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const products = await getProductsWithRelations(limit);

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch products',
      },
      { status: 500 },
    );
  }
};
