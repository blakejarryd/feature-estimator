'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { useProjectStore } from '@/lib/store';
import { useState, useEffect } from 'react';

export function ProjectSelector() {
  const { projects, currentProject, fetchProjects, createProject, setCurrentProject } = useProjectStore();
  const [isOpen, setIsOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async () => {
    if (newProject.name.trim()) {
      await createProject(newProject);
      setNewProject({ name: '', description: '' });
      setIsOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ACTIVE PROJECTS</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
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
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newProject.description}
                  onChange={e => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <Card 
            key={project.id}
            className={`cursor-pointer transition-colors hover:bg-gray-50 ${
              currentProject?.id === project.id ? 'border-2 border-primary' : ''
            }`}
            onClick={() => setCurrentProject(project)}
          >
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              {project.description && (
                <CardDescription>{project.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Features: {project.features?.length || 0}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProjectSelector;