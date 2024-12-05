import React from 'react';
import { useProjectStore } from '@/lib/store';
import { Plus, Hash, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NewProjectForm } from './NewProjectForm';

export const Sidebar = () => {
  const { projects, currentProject, setCurrentProject } = useProjectStore();
  const activeProjects = projects.filter(p => p.status === 'ACTIVE');
  const archivedProjects = projects.filter(p => p.status === 'ARCHIVED');

  return (
    <div className="w-64 h-screen bg-slate-900 text-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-800">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <NewProjectForm />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <div className="mb-4">
          <h2 className="px-2 mb-2 text-sm font-semibold text-slate-400">ACTIVE PROJECTS</h2>
          {activeProjects.map(project => (
            <button
              key={project.id}
              onClick={() => setCurrentProject(project)}
              className={cn(
                "w-full px-2 py-1 text-left rounded hover:bg-slate-800 mb-1 flex items-center",
                currentProject?.id === project.id && "bg-slate-800"
              )}
            >
              <Hash className="mr-2 h-4 w-4" />
              {project.name}
            </button>
          ))}
        </div>
        
        {archivedProjects.length > 0 && (
          <div>
            <h2 className="px-2 mb-2 text-sm font-semibold text-slate-400">ARCHIVED</h2>
            {archivedProjects.map(project => (
              <button
                key={project.id}
                onClick={() => setCurrentProject(project)}
                className={cn(
                  "w-full px-2 py-1 text-left rounded hover:bg-slate-800 mb-1 flex items-center text-slate-400",
                  currentProject?.id === project.id && "bg-slate-800"
                )}
              >
                <Archive className="mr-2 h-4 w-4" />
                {project.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};