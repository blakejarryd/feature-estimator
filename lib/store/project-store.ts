import { create } from 'zustand';
import { ProjectState } from './types';
import { api } from '../api-client';

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  setCurrentProject: (project) => {
    set({ currentProject: project });
  },

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      if (data.success) {
        set({ projects: data.data });
        // Set first project as current if none selected
        if (!get().currentProject && data.data.length > 0) {
          set({ currentProject: data.data[0] });
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch projects';
      set({ error: message });
      console.error('Failed to fetch projects:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  createProject: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        const newProject = result.data;
        set((state) => ({
          projects: [newProject, ...state.projects],
          currentProject: newProject,
        }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create project';
      set({ error: message });
      console.error('Failed to create project:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProject: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...result.data } : p
          ),
          currentProject:
            state.currentProject?.id === id
              ? { ...state.currentProject, ...result.data }
              : state.currentProject,
        }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update project';
      set({ error: message });
      console.error('Failed to update project:', error);
    } finally {
      set({ isLoading: false });
    }
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
      const message = error instanceof Error ? error.message : 'Failed to delete project';
      set({ error: message });
      console.error('Failed to delete project:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));