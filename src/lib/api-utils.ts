import { NextResponse } from 'next/server';

export function errorResponse(error: unknown, status = 500) {
  console.error(error);
  return NextResponse.json(
    { error: error instanceof Error ? error.message : 'Internal Server Error' },
    { status }
  );
}

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}