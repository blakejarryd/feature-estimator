import { create } from 'zustand';
import { Project, Feature } from '@prisma/client';

type ProjectWithFeatures = Project & { features: Feature[] };

interface ProjectStore {
  projects: ProjectWithFeatures[];
  currentProject: ProjectWithFeatures | null;
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (project: { name: string; description?: string }) => Promise<void>;
  setCurrentProject: (project: ProjectWithFeatures | null) => void;
  deleteProject: (projectId: string) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      set({ projects: data.data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ isLoading: false });
    }
  },

  createProject: async (project) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (!response.ok) throw new Error('Failed to create project');
      const data = await response.json();
      set(state => ({
        projects: [data.data, ...state.projects],
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ isLoading: false });
    }
  },

  setCurrentProject: (project) => {
    set({ currentProject: project });
  },

  deleteProject: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete project');
      
      set(state => {
        // Remove the project from the projects list
        const updatedProjects = state.projects.filter(p => p.id !== projectId);
        
        // If the deleted project was the current project, clear it
        const updatedCurrentProject = 
          state.currentProject?.id === projectId ? null : state.currentProject;
        
        return {
          projects: updatedProjects,
          currentProject: updatedCurrentProject,
        };
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
