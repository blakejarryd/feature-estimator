import { FeatureEstimator } from '@/components/feature-estimator';
import { EffortConfiguration } from '@/components/effort-config';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      <FeatureEstimator />
      <EffortConfiguration />
    </main>
  );
}