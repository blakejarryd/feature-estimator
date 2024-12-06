import { create } from 'zustand';
import { FeatureState, ProjectState } from './types';
import { api } from '../api-client';

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  setCurrentProject: (project) => set({ currentProject: project }),

  fetchProjects: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await api.projects.list();
      set({ projects: data.data, isLoading: false });
      
      // Select first project if none selected
      const { currentProject } = useProjectStore.getState();
      if (!currentProject && data.data.length > 0) {
        set({ currentProject: data.data[0] });
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      set({ error: 'Failed to fetch projects', isLoading: false });
    }
  },

  createProject: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const result = await api.projects.create(data);
      set((state) => ({
        projects: [result.data, ...state.projects],
        currentProject: result.data,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to create project:', error);
      set({ error: 'Failed to create project', isLoading: false });
    }
  },

  updateProject: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      const result = await api.projects.update(id, data);
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, ...result.data } : p
        ),
        currentProject:
          state.currentProject?.id === id
            ? { ...state.currentProject, ...result.data }
            : state.currentProject,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to update project:', error);
      set({ error: 'Failed to update project', isLoading: false });
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
      set({ features: features.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch features:', error);
      set({
        error: 'Failed to fetch features',
        isLoading: false,
      });
    }
  },

  addFeature: async (feature) => {
    const currentProject = useProjectStore.getState().currentProject;
    if (!currentProject) return;

    try {
      set({ isLoading: true, error: null });
      const newFeature = await api.features.create({
        ...feature,
        projectId: currentProject.id,
      });
      set((state) => ({
        features: [...state.features, newFeature.data],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to add feature:', error);
      set({
        error: 'Failed to add feature',
        isLoading: false,
      });
    }
  },

  updateFeature: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      const updatedFeature = await api.features.update(id, updates);
      set((state) => ({
        features: state.features.map((feature) =>
          feature.id === id ? updatedFeature.data : feature
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to update feature:', error);
      set({
        error: 'Failed to update feature',
        isLoading: false,
      });
    }
  },

  deleteFeature: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await api.features.delete(id);
      set((state) => ({
        features: state.features.filter((feature) => feature.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to delete feature:', error);
      set({
        error: 'Failed to delete feature',
        isLoading: false,
      });
    }
  },

  fetchEffortConfigs: async () => {
    try {
      set({ isLoading: true, error: null });
      const effortConfigs = await api.effortConfigs.list();
      set({ effortConfigs: effortConfigs.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch effort configs:', error);
      set({
        error: 'Failed to fetch effort configs',
        isLoading: false,
      });
    }
  },

  addEffortConfig: async (config) => {
    try {
      set({ isLoading: true, error: null });
      const newConfig = await api.effortConfigs.create(config);
      set((state) => ({
        effortConfigs: [...state.effortConfigs, newConfig.data],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to add effort config:', error);
      set({
        error: 'Failed to add effort config',
        isLoading: false,
      });
    }
  },

  updateEffortConfig: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      const updatedConfig = await api.effortConfigs.update(id, updates);
      set((state) => ({
        effortConfigs: state.effortConfigs.map((config) =>
          config.id === id ? updatedConfig.data : config
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to update effort config:', error);
      set({
        error: 'Failed to update effort config',
        isLoading: false,
      });
    }
  },

  deleteEffortConfig: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await api.effortConfigs.delete(id);
      set((state) => ({
        effortConfigs: state.effortConfigs.filter(
          (config) => config.id !== id
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to delete effort config:', error);
      set({
        error: 'Failed to delete effort config',
        isLoading: false,
      });
    }
  },
}));