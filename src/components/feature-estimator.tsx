'use client';

import { useEffect, useState } from 'react';
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
    addFeature({
      title: '',
      description: '',
      effort: effortConfigs[0]?.effortSize || 'Medium',
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

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Feature Estimation</h1>
        <Button 
          onClick={handleAdd} 
          className="flex items-center gap-2 bg-secondary hover:bg-secondary/90"
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

      <div className="bg-white rounded-lg shadow-sm">
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

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(summary).map(([priority, { count, cost }]) => (
            <div key={priority} className="space-y-1">
              <div className="text-sm text-gray-500">{priority}</div>
              <div className="text-2xl font-semibold">{count}</div>
              <div className="text-sm text-gray-500">${cost.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}