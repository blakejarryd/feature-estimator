export interface Feature {
  id: string;
  title: string;
  description: string;
  effort: string;
  priority: string;
  category: string;
}

export interface EffortConfig {
  id: string;
  effortSize: string;
  days: number;
  costPerDay: number;
}

export interface AppState {
  features: Feature[];
  effortConfigs: EffortConfig[];
  addFeature: (feature: Omit<Feature, 'id'>) => void;
  updateFeature: (id: string, updates: Partial<Feature>) => void;
  deleteFeature: (id: string) => void;
  addEffortConfig: (config: Omit<EffortConfig, 'id'>) => void;
  updateEffortConfig: (id: string, updates: Partial<EffortConfig>) => void;
  deleteEffortConfig: (id: string) => void;
}