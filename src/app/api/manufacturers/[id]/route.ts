import { NextResponse } from 'next/server';
import { getManufacturerById } from '@/lib/db-queries';

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;

    const manufacturer = await getManufacturerById(id);

    if (!manufacturer) {
      return NextResponse.json(
        {
          success: false,
          error: 'Manufacturer not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: manufacturer,
    });
  } catch (error) {
    console.error('Error fetching manufacturer:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch manufacturer',
      },
      { status: 500 },
    );
  }
};
