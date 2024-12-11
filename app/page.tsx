import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FeatureEstimator } from '../components/feature-estimator';
import { EffortConfiguration } from '../components/effort-config';
import { Summary } from '../components/summary';
import { MainLayout } from '../components/layout/main-layout';

export default function Home() {
  return (
    <MainLayout>
      <Tabs defaultValue="features" className="space-y-4">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <FeatureEstimator />
        </TabsContent>
        <TabsContent value="summary">
          <Summary />
        </TabsContent>
        <TabsContent value="configuration">
          <EffortConfiguration />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}