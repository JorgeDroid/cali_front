'use client';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Model } from './models-tables/components_model-list';
import ModelsList from './models-tables/components_model-list';

import { Button } from '@/components/ui/button';

import { getModels } from '@/services/api/models';
type TBrandsListingPage = {};

export default function BrandsListingPage({}: TBrandsListingPage) {
  const [models, setModels] = useState<Model[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleGetModels = async (token: string) => {
    let modelsData = await getModels(token);
    setModels(modelsData);
  };

  const handleSaveCreate = (newModel: Omit<Model, 'id'>) => {
    handleGetModels('token');
    setIsCreating(false);
  };

  useEffect(() => {
    handleGetModels('token');
  }, []);

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Models (${models.length})`}
            description="Manage models"
          />

          <Button
            onClick={() => setIsCreating(true)}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        <Separator />
        {/* <ModelRegistrationModal
          isOpen={isCreating}
          onClose={() => setIsCreating(false)}
          onSave={handleSaveCreate}
        /> */}

        {models.length > 0 && <ModelsList models={models} />}
      </div>
    </PageContainer>
  );
}
