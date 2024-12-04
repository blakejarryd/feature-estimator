import { FeatureEstimator } from '@/components/feature-estimator';
import { EffortConfiguration } from '@/components/effort-config';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <FeatureEstimator />
        <EffortConfiguration />
      </div>
    </main>
  );
}
