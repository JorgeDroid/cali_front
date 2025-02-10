'use client';

import { useEffect, useState } from 'react';
import {
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { EditClientModal } from './edit-client-modal';
import { DeleteClientModal } from './delete-client-modal';
import { deleteClient, getClients, updateClient } from '@/services/api/clients';
import { ViewClientModal } from './view-client-modal';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export interface Client {
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
}

export default function ClientList({ clients }: { clients: Client[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [clientData, setClientData] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const [viewingClient, setViewingClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Client;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleEditClient = async (client: Client) => {
    await updateClient('token', client.id, clientData);
  };

  const handleDeleteClient = async (client: Client) => {
    await deleteClient('token', client.id);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
  };

  const handleView = (client: Client) => {
    setViewingClient(client);
  };

  const handleDelete = (client: Client) => {
    console.log('deleting client', client);
    setDeletingClient(client);
  };

  const handleSaveEdit = (updatedClient: Client) => {
    handleEditClient(updatedClient);
  };

  const handleSort = (key: keyof Client) => {
    setSortConfig({
      key,
      direction:
        sortConfig?.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc'
    });
  };

  const filteredAndSortedClients = clients
    .filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

  console.log('deleting client', deletingClient);

  return (
    <div className="mx-auto w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Client List</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm pl-8"
          />
        </div>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleSort('name')}
                className="cursor-pointer"
              >
                Name <ArrowUpDown className="ml-1 inline h-4 w-4" />
              </TableHead>
              <TableHead
                onClick={() => handleSort('email')}
                className="cursor-pointer"
              >
                Email <ArrowUpDown className="ml-1 inline h-4 w-4" />
              </TableHead>
              <TableHead
                onClick={() => handleSort('phone')}
                className="cursor-pointer"
              >
                Phone <ArrowUpDown className="ml-1 inline h-4 w-4" />
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedClients
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleView(client)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(client)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDelete(client)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        {Array.from(
          { length: Math.ceil(clients.length / 10) },
          (_, i) => i + 1
        ).map((pageNum) => (
          <Button
            key={pageNum}
            variant="outline"
            size="sm"
            className={cn('px-4', {
              'bg-primary text-primary-foreground': pageNum === currentPage
            })}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === Math.ceil(clients.length / 10)}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      {editingClient && (
        <EditClientModal
          client={editingClient}
          isOpen={!!editingClient}
          onClose={() => setEditingClient(null)}
          onSave={handleSaveEdit}
        />
      )}
      {deletingClient && (
        <DeleteClientModal
          clientName={deletingClient.name}
          isOpen={!!deletingClient}
          onClose={() => setDeletingClient(null)}
          onDelete={handleDeleteClient}
        />
      )}
      {viewingClient && (
        <ViewClientModal
          client={viewingClient}
          isOpen={!!viewingClient}
          onClose={() => setViewingClient(null)}
        />
      )}
    </div>
  );
}
