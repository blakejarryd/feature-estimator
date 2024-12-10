import { Feature, Project } from '@prisma/client';

export type ProjectWithFeatures = Project & { features: Feature[] };

export interface ProjectState {
  projects: ProjectWithFeatures[];
  currentProject: ProjectWithFeatures | null;
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (data: { name: string; description?: string }) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  setCurrentProject: (project: ProjectWithFeatures | null) => void;
}

export interface FeatureState {
  feature: Feature | null;
  creatingFeature: boolean;
  createFeature: (data: { 
    title: string;
    description: string;
    effort: string;
    priority: string;
    projectId: string;
  }) => Promise<void>;
  updateFeature: (id: string, data: Partial<Feature>) => Promise<void>;
  deleteFeature: (id: string) => Promise<void>;
  clearFeature: () => void;
}
