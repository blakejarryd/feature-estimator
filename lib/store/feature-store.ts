import { create } from 'zustand';
import { FeatureState, Feature, EffortConfig } from './types';
import { api } from '../api-client';
import { useProjectStore } from './project-store';

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
      const features = await api.features.list(currentProject.id) as Feature[];
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
      const newFeature = await api.features.create({ ...feature, projectId: currentProject.id }) as Feature;
      set((state) => ({ features: [...state.features, newFeature] }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add feature' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateFeature: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      const updatedFeature = await api.features.update(id, updates) as Feature;
      set((state) => ({
        features: state.features.map(feature => 
          feature.id === id ? { ...feature, ...updates } : feature
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
      const effortConfigs = await api.effortConfigs.list() as EffortConfig[];
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
      const newConfig = await api.effortConfigs.create(config) as EffortConfig;
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
      const updatedConfig = await api.effortConfigs.update(id, updates) as EffortConfig;
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
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete effort config' });
    } finally {
      set({ isLoading: false });
    }
  },
}));