'use client';

import { useEffect, useState } from 'react';
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
import { useDebounce } from '@/lib/hooks/useDebounce';

interface LocalEffortConfig {
  id: string;
  effortSize: string;
  days: number;
  costPerDay: number;
}

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

  // Local state for immediate updates
  const [localConfigs, setLocalConfigs] = useState<LocalEffortConfig[]>([]);

  useEffect(() => {
    fetchEffortConfigs();
  }, [fetchEffortConfigs]);

  // Update local state when configs change
  useEffect(() => {
    setLocalConfigs(effortConfigs);
  }, [effortConfigs]);

  const handleAdd = () => {
    addEffortConfig({
      effortSize: '',
      days: 0,
      costPerDay: 0
    });
  };

  const debouncedUpdate = useDebounce(updateEffortConfig, 500);

  const handleUpdate = (id: string, field: string, value: string | number) => {
    // Update local state immediately
    setLocalConfigs(prev => 
      prev.map(config =>
        config.id === id ? { ...config, [field]: value } : config
      )
    );
    // Debounce API call
    debouncedUpdate(id, { [field]: value });
  };

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }