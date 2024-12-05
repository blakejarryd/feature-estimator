import { create } from "zustand";

interface Project {
  id: string;
  name: string;
  description?: string;
  status: string;
}
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

interface StoreState {
  projects: Project[];
  currentProjectId: string | null;
  features: Feature[];
  effortConfigs: EffortConfig[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  setCurrentProject: (projectId: string) => void;
  fetchFeatures: () => Promise<void>;
}

const useStore = create<StoreState>((set) => ({
  projects: [],
  currentProjectId: null,
  features: [],
  effortConfigs: [],
  isLoading: false,
  error: null,
  
  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/projects');
      const projects = await response.json();
      set({ projects, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch projects', isLoading: false });
    }
  },

  setCurrentProject: (projectId: string) => {
    set({ currentProjectId: projectId });
  },

  // Update fetchFeatures to use currentProjectId
  fetchFeatures: async () => {
    set({ isLoading: true });
    const { currentProjectId } = useStore.getState();
    if (!currentProjectId) return;
    
    try {
      const response = await fetch(`/api/projects/${currentProjectId}/features`);
      const features = await response.json();
      set({ features, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch features', isLoading: false });
    }
  },
}));