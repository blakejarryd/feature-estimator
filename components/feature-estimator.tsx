'use client';

import { useEffect } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from '@/lib/store';

export function FeatureEstimator() {
  const { 
    features, 
    effortConfigs,
    isLoading,
    error,
    fetchFeatures,
    fetchEffortConfigs,
    addFeature, 
    updateFeature, 
    deleteFeature 
  } = useStore();

  useEffect(() => {
    fetchFeatures();
    fetchEffortConfigs();
  }, [fetchFeatures, fetchEffortConfigs]);

  const handleAdd = () => {
    addFeature({
      title: '',
      description: '',
      effort: effortConfigs[0]?.effortSize || 'Medium',
      priority: 'Should',
      category: ''
    });
  };

  const handleUpdate = (id: string, field: string, value: string) => {
    updateFeature(id, { [field]: value });
  };

  const calculateCost = (effort: string) => {
    const config = effortConfigs.find(c => c.effortSize === effort);
    return config ? config.days * config.costPerDay : 0;
  };

  const calculateSummary = () => {
    return features.reduce((acc, feature) => {
      const priority = feature.priority;
      const cost = calculateCost(feature.effort);
      acc[priority] = acc[priority] || { count: 0, cost: 0 };
      acc[priority].count++;
      acc[priority].cost += cost;
      return acc;
    }, {} as Record<string, { count: number; cost: number }>);
  };

  const summary = calculateSummary();
  const priorityOptions = ['Must', 'Should', 'Could'];

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Feature Estimation</h1>
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
            Add Feature
          </Button>
        </div>
      </div>

      <div className="px-6 py-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Effort</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead className="w-16">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.id}>
                <TableCell>
                  <Input
                    value={feature.title}
                    onChange={(e) => handleUpdate(feature.id, 'title', e.target.value)}
                    className="w-full"
                    disabled={isLoading}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={feature.description}
                    onChange={(e) => handleUpdate(feature.id, 'description', e.target.value)}
                    className="w-full"
                    disabled={isLoading}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={feature.category}
                    onChange={(e) => handleUpdate(feature.id, 'category', e.target.value)}
                    className="w-full"
                    disabled={isLoading}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={feature.effort}
                    onValueChange={(value) => handleUpdate(feature.id, 'effort', value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue>{feature.effort}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {effortConfigs.map((config) => (
                        <SelectItem key={config.effortSize} value={config.effortSize}>
                          {config.effortSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={feature.priority}
                    onValueChange={(value) => handleUpdate(feature.id, 'priority', value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue>{feature.priority}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    ${calculateCost(feature.effort).toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteFeature(feature.id)}
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

      <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(summary).map(([priority, { count, cost }]) => (
            <div key={priority} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm font-medium text-gray-500">{priority}</div>
              <div className="mt-1">
                <span className="text-2xl font-bold text-gray-900">{count}</span>
                <span className="ml-2 text-sm text-gray-500">features</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                ${cost.toLocaleString()} total
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
