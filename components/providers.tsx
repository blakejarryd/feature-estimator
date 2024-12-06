'use client';

import { useEffect } from 'react';
import { useProjectStore } from '@/lib/store';

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { fetchProjects } = useProjectStore();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        console.log('Loading projects...');
        await fetchProjects();
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    };
    
    loadProjects();
  }, []); // Remove fetchProjects from dependencies to avoid re-renders

  return <>{children}</>;
}