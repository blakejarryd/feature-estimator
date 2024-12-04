'use client';

import { useState } from 'react';
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

interface Feature {
  id: string;
  title: string;
  description: string;
  effort: string;
  priority: string;
  category: string;
}

export function FeatureEstimator() {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: '1',
      title: 'Mobile phone auth',
      description: 'Login via mobile phone with text verification',
      effort: 'Extra Small',
      priority: 'Must',
      category: 'Auth & Onboarding'
    }
  ]);

  const effortOptions = ['Extra Small', 'Small', 'Medium', 'Large'];
  const priorityOptions = ['Must', 'Should', 'Could'];

  const addFeature = () => {
    setFeatures([...features, {
      id: Date.now().toString(),
      title: '',
      description: '',
      effort: 'Medium',
      priority: 'Should',
      category: ''
    }]);
  };

  const updateFeature = (id: string, field: keyof Feature, value: string) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, [field]: value } : feature
    ));
  };

  const deleteFeature = (id: string) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };

  const calculateSummary = () => {
    return features.reduce((acc, feature) => {
      const priority = feature.priority;
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const summary = calculateSummary();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Feature Estimation</h1>
        <Button onClick={addFeature} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Feature
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Feature</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Effort</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="w-16">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.id}>
              <TableCell>
                <Input
                  value={feature.title}
                  onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                  className="w-full"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={feature.description}
                  onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                  className="w-full"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={feature.category}
                  onChange={(e) => updateFeature(feature.id, 'category', e.target.value)}
                  className="w-full"
                />
              </TableCell>
              <TableCell>
                <Select
                  value={feature.effort}
                  onValueChange={(value) => updateFeature(feature.id, 'effort', value)}
                >
                  <SelectTrigger>
                    <SelectValue>{feature.effort}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {effortOptions.map((effort) => (
                      <SelectItem key={effort} value={effort}>
                        {effort}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={feature.priority}
                  onValueChange={(value) => updateFeature(feature.id, 'priority', value)}
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
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteFeature(feature.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="bg-slate-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(summary).map(([priority, count]) => (
            <div key={priority} className="bg-white p-3 rounded-md shadow-sm">
              <div className="text-sm text-gray-600">{priority}</div>
              <div className="text-2xl font-bold">{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
