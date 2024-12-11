'use client';

import { useStore } from '@/lib/store/feature-store';
import { useEffect } from 'react';
import { Alert, AlertDescription } from './ui/alert';

// Priority order constant
const priorityOrder = ['Must', 'Should', 'Could'];

export function Summary() {
  const { 
    features, 
    effortConfigs,
    isLoading,
    error,
    fetchFeatures,
    fetchEffortConfigs
  } = useStore();

  useEffect(() => {
    fetchEffortConfigs();
    fetchFeatures();
  }, [fetchEffortConfigs, fetchFeatures]);

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

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Calculate totals
  const totals = summary.reduce(
    (acc, { count, cost, days }) => ({
      count: acc.count + count,
      cost: acc.cost + cost,
      days: acc.days + days,
    }),
    { count: 0, cost: 0, days: 0 }
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summary.map(({ priority, count, cost, days }) => (
          <div key={priority} className="bg-white p-4 rounded-lg shadow-sm border">
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

      {/* Project Totals */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Totals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="text-sm font-medium text-gray-500">Total Features</div>
            <div className="text-2xl font-bold text-gray-900">{totals.count}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Total Cost</div>
            <div className="text-2xl font-bold text-gray-900">${totals.cost.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Total Days</div>
            <div className="text-2xl font-bold text-gray-900">{totals.days}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
