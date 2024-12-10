'use client';

import { useEffect, useCallback } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { AutoResizeTextarea } from "./ui/auto-resize-textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useStore } from '@/lib/store/feature-store';
import { useProjectStore } from '@/lib/store/project-store';
import { Alert, AlertDescription } from './ui/alert';

// Add debounce timeout storage outside component
const DEBOUNCE_MS = 1000; // 1 second delay
const updateTimeouts: { [key: string]: NodeJS.Timeout } = {};

// Priority order constant
const priorityOrder = ['Must', 'Should', 'Could'];

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

  const { currentProject } = useProjectStore();

  useEffect(() => {
    fetchEffortConfigs();
  }, [fetchEffortConfigs]);

  useEffect(() => {
    if (currentProject) {
      fetchFeatures();
    }
  }, [fetchFeatures, currentProject]);

  const handleAdd = () => {
    if (!currentProject) return;

    addFeature({
      title: '',
      description: '',
      effort: effortConfigs[0]?.effortSize || 'Medium',
      priority: 'Should',
      category: ''
    });
  };

  const handleUpdate = useCallback((id: string, field: string, value: string) => {
    // Clear any existing timeout for this field
    if (updateTimeouts[`${id}-${field}`]) {
      clearTimeout(updateTimeouts[`${id}-${field}`]);
    }

    // Set the new value immediately in the UI
    const updatedFeature = features.find(f => f.id === id);
    if (updatedFeature) {
      const newFeatures = features.map(f => 
        f.id === id ? { ...f, [field]: value } : f
      );
      useStore.setState({ features: newFeatures });
    }

    // Debounce the API call
    updateTimeouts[`${id}-${field}`] = setTimeout(() => {
      updateFeature(id, { [field]: value });
    }, DEBOUNCE_MS);
  }, [features, updateFeature]);

  const calculateCost = (effort: string) => {
    const config = effortConfigs.find(c => c.effortSize === effort);
    return config ? config.days * config.costPerDay : 0;
  };

  const calculateSummary = () => {
    // First create the summary data
    const summaryData = features.reduce((acc, feature) => {
      const priority = feature.priority;
      const config = effortConfigs.find(c => c.effortSize === feature.effort);
      const cost = calculateCost(feature.effort);
      const days = config ? config.days : 0;
      
      acc[priority] = acc[priority] || { count: 0, cost: 0, days: 0 };
      acc[priority].count++;
      acc[priority].cost += cost;
      acc[priority].days += days;
      return acc;
    }, {} as Record<string, { count: number; cost: number; days: number }>);
  
    // Then return ordered array based on priorityOrder
    return priorityOrder.map(priority => ({
      priority,
      ...(summaryData[priority] || { count: 0, cost: 0, days: 0 })
    }));
  };

  const summary = calculateSummary();
  const priorityOptions = priorityOrder; // Use the same order for consistency

  if (!currentProject) {
    return (
      <Alert>
        <AlertDescription>
          Select a project to manage features
        </AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentProject.name}</h1>
            {currentProject.description && (
              <p className="text-sm text-gray-500 mt-1">{currentProject.description}</p>
            )}
          </div>
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
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow className="hover:bg-gray-50">
              <TableHead className="w-[25%]">Feature</TableHead>
              <TableHead className="w-[30%]">Description</TableHead>
              <TableHead className="w-[10%]">Category</TableHead>
              <TableHead className="w-[10%]">Effort</TableHead>
              <TableHead className="w-[10%]">Priority</TableHead>
              <TableHead className="w-[10%]">Cost</TableHead>
              <TableHead className="w-[5%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.id}>
                <TableCell className="py-4">
                  <Input
                    value={feature.title}
                    onChange={(e) => handleUpdate(feature.id, 'title', e.target.value)}
                    className="w-full"
                    disabled={isLoading}
                  />
                </TableCell>
                <TableCell className="py-4">
                  <AutoResizeTextarea
                    value={feature.description || ''}
                    onChange={(e) => handleUpdate(feature.id, 'description', e.target.value)}
                    placeholder="Enter bullet points or detailed description..."
                    disabled={isLoading}
                  />
                </TableCell>
                <TableCell className="py-4">
                  <Input
                    value={feature.category}
                    onChange={(e) => handleUpdate(feature.id, 'category', e.target.value)}
                    className="w-full"
                    disabled={isLoading}
                  />
                </TableCell>
                <TableCell className="py-4">
                  <Select
                    value={feature.effort}
                    onValueChange={(value) => handleUpdate(feature.id, 'effort', value)}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue>{feature.effort}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {effortConfigs
                        .filter(config => {
                          const isValid = config.effortSize?.trim();
                          if (!isValid) {
                            console.warn('Invalid effortSize:', config.effortSize);
                          }
                          return isValid;
                        })
                        .map((config) => (
                          <SelectItem key={config.effortSize} value={config.effortSize}>
                            {config.effortSize}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="py-4">
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
                <TableCell className="py-4">
                  <div className="font-medium">
                    ${calculateCost(feature.effort).toLocaleString()}
                  </div>
                </TableCell>
                <TableCell className="py-4">
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
        {summary.map(({ priority, count, cost, days }) => (
          <div key={priority} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">{priority}</div>
            <div className="mt-1">
              <span className="text-2xl font-bold text-gray-900">{count}</span>
              <span className="ml-2 text-sm text-gray-500">features</span>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              ${cost.toLocaleString()} total
            </div>
            <div className="mt-1 text-sm text-gray-500">
              {days} days total
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}