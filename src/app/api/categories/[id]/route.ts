import { NextResponse } from 'next/server';
import { getCategoryById, getProductsByCategory } from '@/lib/db-queries';

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const includeProducts = searchParams.get('includeProducts') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const category = await getCategoryById(id);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category not found',
        },
        { status: 404 },
      );
    }

    if (includeProducts) {
      const { products } = await getProductsByCategory(id, limit);
      return NextResponse.json({
        success: true,
        data: {
          ...category,
          products,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch category',
      },
      { status: 500 },
    );
  }
};
