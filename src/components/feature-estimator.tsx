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

export function FeatureEstimator() {
  // ... state and hooks remain the same ...

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Feature Estimation</h1>
        <Button 
          onClick={handleAdd} 
          className="bg-slate-900 text-white hover:bg-slate-800 rounded-lg gap-2 h-10 px-4"
        >
          <Plus className="h-4 w-4" />
          Add Feature
        </Button>
      </div>

      <div className="p-6">
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
            {/* ... table body remains the same ... */}
          </TableBody>
        </Table>

        <div className="mt-8">
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
    </div>
  );
}