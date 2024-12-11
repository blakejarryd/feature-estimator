'use client';

import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProjectStore } from '@/lib/store/project-store';
import { useState, useEffect } from 'react';
import { DeleteProjectButton } from './delete-project-button';

export function ProjectSelector() {
  const { 
    projects, 
    currentProject, 
    createProject, 
    setCurrentProject, 
    fetchProjects,
    isLoading,
    error 
  } = useProjectStore();
  
  const [isOpen, setIsOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const handleCreateProject = async () => {
    if (newProject.name.trim()) {
      await createProject(newProject);
      await fetchProjects();
      setNewProject({ name: '', description: '' });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project to manage features and estimates.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={e => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newProject.description}
                  onChange={e => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  disabled={isLoading}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateProject} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <Alert>
          <AlertDescription>
            No projects found. Click "New Project" to create one.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-2">
          {projects.map(project => (
            <Card 
              key={project.id}
              className={`cursor-pointer transition-colors hover:bg-accent/50 relative ${
                currentProject?.id === project.id ? 'bg-accent' : ''
              }`}
              onClick={() => setCurrentProject(project)}
            >
              <div className="absolute top-2 right-2 z-10">
                <DeleteProjectButton 
                  projectId={project.id} 
                  projectName={project.name} 
                />
              </div>
              <CardHeader className="py-3">
                <CardTitle className="text-base font-medium">{project.name}</CardTitle>
                {project.description && (
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-xs text-muted-foreground">
                  Features: {project.features?.length || 0}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectSelector;