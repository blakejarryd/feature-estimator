export interface Feature {
  id: string;
  title: string;
  description?: string;
  effort: string;
  priority: string;
  category?: string;
  projectId: string;
  project?: Project;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'ARCHIVED';
  features: Feature[];
  createdAt: string;
  updatedAt: string;
}

export interface EffortConfig {
  id: string;
  effortSize: string;
  days: number;
  costPerDay: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeatureData {
  title: string;
  description?: string;
  effort: string;
  priority: string;
  category?: string;
}

export interface FeatureState {
  features: Feature[];
  effortConfigs: EffortConfig[];
  isLoading: boolean;
  error: string | null;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  fetchFeatures: () => Promise<void>;
  addFeature: (feature: CreateFeatureData) => Promise<void>;
  updateFeature: (id: string, updates: Partial<Feature>) => Promise<void>;
  deleteFeature: (id: string) => Promise<void>;
  fetchEffortConfigs: () => Promise<void>;
  addEffortConfig: (config: Omit<EffortConfig, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateEffortConfig: (id: string, updates: Partial<EffortConfig>) => Promise<void>;
  deleteEffortConfig: (id: string) => Promise<void>;
}

export interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project) => void;
  fetchProjects: () => Promise<void>;
  createProject: (data: { name: string; description?: string }) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
}