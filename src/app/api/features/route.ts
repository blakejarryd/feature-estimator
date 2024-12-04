import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const features = await prisma.feature.findMany({
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
      },
    });
    return successResponse(feature, 201);
  } catch (error) {
    return errorResponse(error);
  }
}