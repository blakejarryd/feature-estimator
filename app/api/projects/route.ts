import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        features: true
      },
      orderBy: { createdAt: 'desc' },
    });
    return successResponse(projects);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        status: body.status || 'ACTIVE',
      },
      include: {
        features: true
      }
    });
    return successResponse(project, 201);
  } catch (error) {
    return errorResponse(error);
  }
}