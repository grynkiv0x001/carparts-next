import { NextResponse } from 'next/server';
import { getAllManufacturers } from '@/lib/db-queries';

export const GET = async () => {
  try {
    const manufacturers = await getAllManufacturers();

    return NextResponse.json({
      success: true,
      data: manufacturers,
      count: manufacturers.length,
    });
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch manufacturers',
      },
      { status: 500 },
    );
  }
};
