import { create } from 'zustand';
import { useProjectStore } from './project-store';

interface FeatureStore {
  features: Feature[];
  fetchFeatures: () => Promise<void>;
  createFeature: (data: CreateFeatureData) => Promise<void>;
  updateFeature: (id: string, data: Partial<Feature>) => Promise<void>;
  deleteFeature: (id: string) => Promise<void>;
}

export const useFeatureStore = create<FeatureStore>((set) => ({
  features: [],

  fetchFeatures: async () => {
    const currentProject = useProjectStore.getState().currentProject;
    if (!currentProject) return;

    const response = await fetch(`/api/features?projectId=${currentProject.id}`);
    const data = await response.json();
    if (data.success) {
      set({ features: data.data });
    }
  },

  createFeature: async (data) => {
    const currentProject = useProjectStore.getState().currentProject;
    if (!currentProject) return;

    const response = await fetch('/api/features', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, projectId: currentProject.id }),
    });
    const result = await response.json();
    if (result.success) {
      set((state) => ({
        features: [result.data, ...state.features],
      }));
    }
  },

  updateFeature: async (id, data) => {
    const response = await fetch(`/api/features/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (result.success) {
      set((state) => ({
        features: state.features.map((f) =>
          f.id === id ? { ...f, ...result.data } : f
        ),
      }));
    }
  },

  deleteFeature: async (id) => {
    const response = await fetch(`/api/features/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result.success) {
      set((state) => ({
        features: state.features.filter((f) => f.id !== id),
      }));
    }
  },
}));