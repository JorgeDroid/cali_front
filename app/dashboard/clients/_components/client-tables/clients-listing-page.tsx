'use client';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import ClientList from './components_client-list';
import { useEffect, useState } from 'react';
import { getClients } from '@/services/api/clients';
import { Client } from './components_client-list';
import { ClientRegistrationModal } from './new-client-modal';
import { Button } from '@/components/ui/button';

type TEmployeeListingPage = {};

export default function ClientListingPage({}: TEmployeeListingPage) {
  const [clients, setClients] = useState<Client[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleGetClients = async (token: string) => {
    let clientsData = await getClients(token);
    setClients(clientsData);
  };

  const handleSaveCreate = (newClient: Omit<Client, 'id'>) => {
    handleGetClients('token');
    setIsCreating(false);
  };

  useEffect(() => {
    handleGetClients('token');
  }, []);

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Clients (${clients.length})`}
            description="Manage clients"
          />

          <Button
            onClick={() => setIsCreating(true)}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        <Separator />
        <ClientRegistrationModal
          isOpen={isCreating}
          onClose={() => setIsCreating(false)}
          onSave={handleSaveCreate}
        />

        {clients.length > 0 && <ClientList clients={clients} />}
      </div>
    </PageContainer>
  );
}
