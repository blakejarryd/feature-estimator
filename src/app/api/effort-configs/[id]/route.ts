import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const config = await prisma.effortConfig.findUnique({
      where: { id: params.id },
    });
    if (!config) {
      return errorResponse('Effort configuration not found', 404);
    }
    return successResponse(config);
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
    const config = await prisma.effortConfig.update({
      where: { id: params.id },
      data: body,
    });
    return successResponse(config);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.effortConfig.delete({
      where: { id: params.id },
    });
    return successResponse({ message: 'Effort configuration deleted successfully' });
  } catch (error) {
    return errorResponse(error);
  }
}