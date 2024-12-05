import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get projectId from query params if provided
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    const features = await prisma.feature.findMany({
      where: projectId ? { projectId } : undefined,
      include: {
        project: true
      },
      orderBy: { createdAt: 'desc' },
    });
    return successResponse(features);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const feature = await prisma.feature.create({
      data: {
        title: body.title,
        description: body.description,
        effort: body.effort,
        priority: body.priority,
        category: body.category,
        projectId: body.projectId,
      },
      include: {
        project: true
      }
    });
    return successResponse(feature, 201);
  } catch (error) {
    return errorResponse(error);
  }
}