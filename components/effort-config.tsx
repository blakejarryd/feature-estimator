'use client';

import { useEffect } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { useStore } from '@/lib/store/feature-store';

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
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Effort Configuration</h2>
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
      </div>

      <div className="px-6 py-4 overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : !effortConfigs || effortConfigs.length === 0 ? (
          <Alert>
            <AlertDescription>
              No effort configurations found. Click "Add Configuration" to create one.
            </AlertDescription>
          </Alert>
        ) : (
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
        )}
      </div>
    </div>
  );
}