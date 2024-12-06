'use client';

import { useProjectStore } from '@/lib/store';

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}