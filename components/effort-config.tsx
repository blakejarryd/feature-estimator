'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';

interface EffortConfig {
  id: string;
  effortSize: string;
  days: number;
  costPerDay: number;
}

export function EffortConfiguration() {
  const [configs, setConfigs] = useState<EffortConfig[]>([
    {
      id: '1',
      effortSize: 'Extra Small',
      days: 3,
      costPerDay: 1000
    },
    {
      id: '2',
      effortSize: 'Small',
      days: 5,
      costPerDay: 1000
    },
    {
      id: '3',
      effortSize: 'Medium',
      days: 10,
      costPerDay: 1000
    },
    {
      id: '4',
      effortSize: 'Large',
      days: 20,
      costPerDay: 1000
    }
  ]);

  const addConfig = () => {
    setConfigs([...configs, {
      id: Date.now().toString(),
      effortSize: '',
      days: 0,
      costPerDay: 0
    }]);
  };

  const updateConfig = (id: string, field: keyof EffortConfig, value: string | number) => {
    setConfigs(configs.map(config => 
      config.id === id ? { ...config, [field]: value } : config
    ));
  };

  const deleteConfig = (id: string) => {
    setConfigs(configs.filter(config => config.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Effort Configuration</h2>
        <Button onClick={addConfig} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Configuration
        </Button>
      </div>
