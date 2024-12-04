'use client';

import { useEffect } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
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
import { useStore } from '@/lib/store';

export function EffortConfiguration() {
  const { 
    effortConfigs, 
    isLoading,
    error,
    fetchEffortConfigs,
    addEffortConfig, 
    updateEffortConfig, 
    deleteEffortConfig 
  } = useStore();

  useEffect(() => {
    fetchEffortConfigs();
  }, [fetchEffortConfigs]);

  const handleAdd = () => {
    addEffortConfig({
      effortSize: 'Medium',
      days: 0,
      costPerDay: 0
    });
  };

  const handleUpdate = (id: string, field: string, value: string | number) => {
    updateEffortConfig(id, { [field]: value });
  };

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Effort Configuration</h2>
        <Button 
          onClick={handleAdd} 
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Add Configuration
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
          {effortConfigs.map((config) => (
            <TableRow key={config.id}>
              <TableCell>
                <Input
                  value={config.effortSize}
                  onChange={(e) => handleUpdate(config.id, 'effortSize', e.target.value)}
                  className="w-full"
                  disabled={isLoading}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={config.days}
                  onChange={(e) => handleUpdate(config.id, 'days', parseFloat(e.target.value))}
                  className="w-full"
                  disabled={isLoading}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={config.costPerDay}
                  onChange={(e) => handleUpdate(config.id, 'costPerDay', parseFloat(e.target.value))}
                  className="w-full"
                  disabled={isLoading}
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
                  onClick={() => deleteEffortConfig(config.id)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
