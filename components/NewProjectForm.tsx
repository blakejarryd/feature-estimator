import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProjectStore } from '@/lib/store';

type FormData = {
  name: string;
  description: string;
};

export const NewProjectForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { createProject } = useProjectStore();

  const onSubmit = async (data: FormData) => {
    await createProject(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('name', { required: 'Project name is required' })}
          placeholder="Project name"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>
      
      <div>
        <Textarea
          {...register('description')}
          placeholder="Project description (optional)"
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full">
        Create Project
      </Button>
    </form>
  );
};