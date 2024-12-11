import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectSelector } from '../components/project-selector';
import { FeatureEstimator } from '../components/feature-estimator';
import { EffortConfiguration } from '../components/effort-config';

export default function Home() {
  return (
    <div className="space-y-8 p-8">
      <Tabs defaultValue="features" className="space-y-4">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <ProjectSelector />
          <div className="mt-8">
            <FeatureEstimator />
          </div>
        </TabsContent>
        <TabsContent value="configuration">
          <EffortConfiguration />
        </TabsContent>
      </Tabs>
    </div>
  );
}