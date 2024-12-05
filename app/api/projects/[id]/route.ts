import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        features: true
      }
    });
    if (!project) {
      return errorResponse('Project not found', 404);
    }
    return successResponse(project);
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
    const project = await prisma.project.update({
      where: { id: params.id },
      data: body,
      include: {
        features: true
      }
    });
    return successResponse(project);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: params.id },
    });
    return successResponse({ message: 'Project deleted successfully' });
  } catch (error) {
    return errorResponse(error);
  }
}