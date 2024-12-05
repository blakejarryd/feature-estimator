import { create } from 'zustand';
import { FeatureState, ProjectState } from './types';
import { api } from '../api-client';

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,

  setCurrentProject: (project) => {
    set({ currentProject: project });
  },

  fetchProjects: async () => {
    try {
      console.log('Fetching projects...');
      const response = await fetch('/api/projects');
      const data = await response.json();
      console.log('Projects response:', data);
      if (data.success) {
        set({ projects: data.data });
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

export const useStore = create<FeatureState>((set) => ({
  features: [],
  effortConfigs: [],
  isLoading: false,
  error: null,

  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),

  fetchFeatures: async () => {
    const currentProject = useProjectStore.getState().currentProject;
    if (!currentProject) return;

    try {
      set({ isLoading: true, error: null });
      const features = await api.features.list(currentProject.id);
      set({ features });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch features' });
    } finally {
      set({ isLoading: false });
    }
  },

  addFeature: async (feature) => {
    const currentProject = useProjectStore.getState().currentProject;
    if (!currentProject) return;

    try {
      set({ isLoading: true, error: null });
      const newFeature = await api.features.create({ ...feature, projectId: currentProject.id });
      set(state => ({ features: [...state.features, newFeature] }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add feature' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateFeature: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      const updatedFeature = await api.features.update(id, updates);
      set(state => ({
        features: state.features.map(feature =>
          feature.id === id ? updatedFeature : feature
        )
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update feature' });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteFeature: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await api.features.delete(id);
      set(state => ({
        features: state.features.filter(feature => feature.id !== id)
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete feature' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchEffortConfigs: async () => {
    try {
      set({ isLoading: true, error: null });
      const effortConfigs = await api.effortConfigs.list();
      set({ effortConfigs });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch effort configs' });
    } finally {
      set({ isLoading: false });
    }
  },

  addEffortConfig: async (config) => {
    try {
      set({ isLoading: true, error: null });
      const newConfig = await api.effortConfigs.create(config);
      set(state => ({ effortConfigs: [...state.effortConfigs, newConfig] }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add effort config' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateEffortConfig: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      const updatedConfig = await api.effortConfigs.update(id, updates);
      set(state => ({
        effortConfigs: state.effortConfigs.map(config =>
          config.id === id ? updatedConfig : config
        )
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update effort config' });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteEffortConfig: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await api.effortConfigs.delete(id);
      set(state => ({
        effortConfigs: state.effortConfigs.filter(config => config.id !== id)
      }));
    } finally {
      set({ isLoading: false });
    }
  },
}));