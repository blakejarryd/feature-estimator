import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const feature = await prisma.feature.findUnique({
      where: { id: params.id },
    });
    if (!feature) {
      return errorResponse('Feature not found', 404);
    }
    return successResponse(feature);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const feature = await prisma.feature.update({
      where: { id: params.id },
      data: body,
    });
    return successResponse(feature);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.feature.delete({
      where: { id: params.id },
    });
    return successResponse({ message: 'Feature deleted successfully' });
  } catch (error) {
    return errorResponse(error);
  }
}