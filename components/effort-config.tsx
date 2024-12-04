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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Effort Size</TableHead>
            <TableHead>Days</TableHead>
            <TableHead>Cost per Day</TableHead>
            <TableHead>Total Cost</TableHead>
            <TableHead className="w-16">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {configs.map((config) => (
            <TableRow key={config.id}>
              <TableCell>
                <Input
                  value={config.effortSize}
                  onChange={(e) => updateConfig(config.id, 'effortSize', e.target.value)}
                  className="w-full"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={config.days}
                  onChange={(e) => updateConfig(config.id, 'days', parseFloat(e.target.value))}
                  className="w-full"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={config.costPerDay}
                  onChange={(e) => updateConfig(config.id, 'costPerDay', parseFloat(e.target.value))}
                  className="w-full"
                />
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  ${(config.days * config.costPerDay).toLocaleString()}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteConfig(config.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
