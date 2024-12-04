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
  isLoading: boolean;
  error: string | null;
  
  // Feature actions
  fetchFeatures: () => Promise<void>;
  addFeature: (feature: Omit<Feature, 'id'>) => Promise<void>;
  updateFeature: (id: string, updates: Partial<Feature>) => Promise<void>;
  deleteFeature: (id: string) => Promise<void>;
  
  // Effort config actions
  fetchEffortConfigs: () => Promise<void>;
  addEffortConfig: (config: Omit<EffortConfig, 'id'>) => Promise<void>;
  updateEffortConfig: (id: string, updates: Partial<EffortConfig>) => Promise<void>;
  deleteEffortConfig: (id: string) => Promise<void>;
  
  // UI state actions
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}