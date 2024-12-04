import { prisma } from '@/lib/prisma';
import { errorResponse, successResponse } from '@/lib/api-utils';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const configs = await prisma.effortConfig.findMany({
      orderBy: { days: 'asc' },
    });
    return successResponse(configs);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const config = await prisma.effortConfig.create({
      data: {
        effortSize: body.effortSize,
        days: body.days,
        costPerDay: body.costPerDay,
      },
    });
    return successResponse(config, 201);
  } catch (error) {
    return errorResponse(error);
  }
}