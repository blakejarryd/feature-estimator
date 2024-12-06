'use client';

import { useEffect } from 'react';
import { useProjectStore } from '@/lib/store';

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return <>{children}</>;
}