'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
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
import { useDebounce } from '@/lib/hooks/useDebounce';

interface LocalFeature {
  id: string;
  title: string;
  description: string;
  effort: string;
  priority: string;
  category: string;
}

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

  // Local state for immediate updates
  const [localFeatures, setLocalFeatures] = useState<LocalFeature[]>([]);

  useEffect(() => {
    fetchFeatures();
    fetchEffortConfigs();
  }, [fetchFeatures, fetchEffortConfigs]);

  // Update local state when features change
  useEffect(() => {
    setLocalFeatures(features);
  }, [features]);

  const handleAdd = () => {
    // Ensure we have valid default values
    const defaultEffortSize = effortConfigs[0]?.effortSize || 'Medium';
    addFeature({
      title: '',
      description: '',
      effort: defaultEffortSize,
      priority: 'Should',
      category: ''
    });
  };

  const debouncedUpdate = useDebounce(updateFeature, 500);

  const handleUpdate = (id: string, field: string, value: string) => {
    // Update local state immediately
    setLocalFeatures(prev => 
      prev.map(feature =>
        feature.id === id ? { ...feature, [field]: value } : feature
      )
    );
    // Debounce API call
    debouncedUpdate(id, { [field]: value });
  };

  const calculateCost = (effort: string) => {
    const config = effortConfigs.find(c => c.effortSize === effort);
    return config ? config.days * config.costPerDay : 0;
  };

  const calculateSummary = () => {
    return localFeatures.reduce((acc, feature) => {
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

  // Wait for data to load before rendering selects
  if (isLoading || !effortConfigs.length) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Feature Estimation</h1>
        <Button 
          onClick={handleAdd} 
          className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg gap-2 h-10 px-4"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4" />
          Add Feature
        </Button>
      </div>

      <div className="bg-white rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Effort</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localFeatures.map((feature) => (
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
                    value={feature.effort || effortConfigs[0]?.effortSize}
                    onValueChange={(value) => handleUpdate(feature.id, 'effort', value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue>{feature.effort || effortConfigs[0]?.effortSize}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {effortConfigs
                        .filter(config => config.effortSize?.trim())
                        .map((config) => (
                          <SelectItem 
                            key={config.effortSize} 
                            value={config.effortSize}
                          >
                            {config.effortSize}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={feature.priority || 'Should'}
                    onValueChange={(value) => handleUpdate(feature.id, 'priority', value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue>{feature.priority || 'Should'}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions
                        .filter(priority => priority?.trim())
                        .map((priority) => (
                          <SelectItem 
                            key={priority} 
                            value={priority}
                          >
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
                    className="bg-red-500 hover:bg-red-600 h-8 w-8 rounded-md"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 bg-white p-4 rounded-md">
        <h2 className="text-sm font-medium text-gray-500 mb-4">Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(summary).map(([priority, { count, cost }]) => (
            <div key={priority} className="space-y-0.5">
              <div className="text-sm text-gray-500">{priority}</div>
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-gray-500">${cost.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}