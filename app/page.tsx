import { FeatureEstimator } from '@/components/feature-estimator';
import { EffortConfiguration } from '@/components/effort-config';

export default function Home() {
  return (
    <main className="min-h-screen py-4 space-y-8">
      <FeatureEstimator />
      <EffortConfiguration />
    </main>
  );
}
