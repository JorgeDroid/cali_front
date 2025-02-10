'use client';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getBrands } from '@/services/api/brands';
import { Brand } from './components_brand-list';
import { Button } from '@/components/ui/button';
import BrandsList from './components_brand-list';

type TBrandsListingPage = {};

export default function BrandsListingPage({}: TBrandsListingPage) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleGetBrands = async (token: string) => {
    let brandsData = await getBrands(token);
    setBrands(brandsData);
  };

  const handleSaveCreate = (newBrand: Omit<Brand, 'id'>) => {
    handleGetBrands('token');
    setIsCreating(false);
  };

  useEffect(() => {
    handleGetBrands('token');
  }, []);

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Brands (${brands.length})`}
            description="Manage brands"
          />
          <Button
            onClick={() => setIsCreating(true)}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        <Separator />

        {brands.length > 0 && <BrandsList brands={brands} />}
      </div>
    </PageContainer>
  );
}
