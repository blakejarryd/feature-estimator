import { create } from 'zustand';
import { AppState, Feature, EffortConfig } from './types';

const defaultEffortConfigs: EffortConfig[] = [
  { id: '1', effortSize: 'Extra Small', days: 3, costPerDay: 1000 },
  { id: '2', effortSize: 'Small', days: 5, costPerDay: 1000 },
  { id: '3', effortSize: 'Medium', days: 10, costPerDay: 1000 },
  { id: '4', effortSize: 'Large', days: 20, costPerDay: 1000 }
];

export const useStore = create<AppState>((set) => ({
  features: [],
  effortConfigs: defaultEffortConfigs,

  addFeature: (feature) => set((state) => ({
    features: [...state.features, { ...feature, id: Date.now().toString() }]
  })),

  updateFeature: (id, updates) => set((state) => ({
    features: state.features.map(feature =>
      feature.id === id ? { ...feature, ...updates } : feature
    )
  })),

  deleteFeature: (id) => set((state) => ({
    features: state.features.filter(feature => feature.id !== id)
  })),

  addEffortConfig: (config) => set((state) => ({
    effortConfigs: [...state.effortConfigs, { ...config, id: Date.now().toString() }]
  })),

  updateEffortConfig: (id, updates) => set((state) => ({
    effortConfigs: state.effortConfigs.map(config =>
      config.id === id ? { ...config, ...updates } : config
    )
  })),

  deleteEffortConfig: (id) => set((state) => ({
    effortConfigs: state.effortConfigs.filter(config => config.id !== id)
  })),
}));
