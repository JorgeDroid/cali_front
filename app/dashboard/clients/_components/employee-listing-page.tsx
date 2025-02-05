'use client';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Client } from '@/constants/data';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import ClientList from './employee-tables/components_client-list';
import { useEffect, useState } from 'react';
import { getClients } from '@/services/api/clients';

type TEmployeeListingPage = {};

export default async function EmployeeListingPage({}: TEmployeeListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const [clients, setClients] = useState<Client[]>([]);

  const handleGetClients = async (token: string) => {
    let clientsData = await getClients(token);
    setClients(clientsData);
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

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ClientList />
      </div>
    </PageContainer>
  );
}
