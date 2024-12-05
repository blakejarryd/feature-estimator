import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'ARCHIVED';
  features: Feature[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectStore {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project) => void;
  fetchProjects: () => Promise<void>;
  createProject: (data: { name: string; description?: string }) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  currentProject: null,

  setCurrentProject: (project) => {
    set({ currentProject: project });
  },

  fetchProjects: async () => {
    const response = await fetch('/api/projects');
    const data = await response.json();
    if (data.success) {
      set({ projects: data.data });
      // Set first project as current if none selected
      if (!get().currentProject && data.data.length > 0) {
        set({ currentProject: data.data[0] });
      }
    }
  },

  createProject: async (data) => {
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
  },

  updateProject: async (id, data) => {
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
  },
}));