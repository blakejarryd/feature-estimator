import { ProjectSelector } from '../components/project-selector';
import { FeatureEstimator } from '../components/feature-estimator';
import { EffortConfiguration } from '../components/effort-config';

export default function Home() {
  return (
    <div className="space-y-8 p-8">
      <ProjectSelector />
      <FeatureEstimator />
      <EffortConfiguration />
    </div>
  );
}