import { create } from 'zustand';
import { ProjectState } from './types';
import { api } from '../api-client';

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,

  setCurrentProject: (project) => {
    set({ currentProject: project });
  },

  fetchProjects: async () => {
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
      console.error('Failed to fetch projects:', error);
    }
  },

  createProject: async (data) => {
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
      console.error('Failed to create project:', error);
    }
  },

  updateProject: async (id, data) => {
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
      console.error('Failed to update project:', error);
    }
  },
}));