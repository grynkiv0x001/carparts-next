import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/db-queries';

export const GET = async () => {
  try {
    const categories = await getAllCategories();

    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch categories',
      },
      { status: 500 },
    );
  }
};
