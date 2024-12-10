import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    // Check if project exists
    const project = await prisma.project.findUnique({
      where: {
        id: params.projectId,
      },
    });

    if (!project) {
      return errorResponse({ message: 'Project not found' }, 404);
    }

    // Delete the project
    // Note: Features will be automatically deleted due to the onDelete: Cascade relation
    await prisma.project.delete({
      where: {
        id: params.projectId,
      },
    });

    return successResponse({ message: 'Project deleted successfully' });
  } catch (error) {
    return errorResponse(error);
  }
}