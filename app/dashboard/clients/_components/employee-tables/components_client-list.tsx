'use client';

import { useState } from 'react';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { EditClientModal } from '../edit-client-modal';
import { DeleteClientModal } from '../delete-client-modal';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastContact: string;
}

// This would typically come from your backend
const mockClients: Client[] = [
  {
    id: 1,
    name: 'Acme Corp',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    lastContact: '2023-05-15'
  },
  {
    id: 2,
    name: 'Globex Corporation',
    email: 'info@globex.com',
    phone: '+1 (555) 987-6543',
    lastContact: '2023-05-14'
  },
  {
    id: 3,
    name: 'Soylent Corp',
    email: 'hello@soylent.com',
    phone: '+1 (555) 246-8135',
    lastContact: '2023-05-13'
  },
  {
    id: 4,
    name: 'Initech',
    email: 'support@initech.com',
    phone: '+1 (555) 369-2584',
    lastContact: '2023-05-12'
  },
  {
    id: 5,
    name: 'Umbrella Corporation',
    email: 'info@umbrella.com',
    phone: '+1 (555) 795-1357',
    lastContact: '2023-05-11'
  }
];

export default function ClientList() {
  const [clients, setClients] = useState(mockClients);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);

  const handleEdit = (client: Client) => {
    setEditingClient(client);
  };

  const handleDelete = (client: Client) => {
    setDeletingClient(client);
  };

  const handleSaveEdit = (updatedClient: Client) => {
    setClients(
      clients.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
  };

  const handleConfirmDelete = () => {
    if (deletingClient) {
      setClients(clients.filter((c) => c.id !== deletingClient.id));
    }
  };

  return (
    <div className="mx-auto w-full  p-6">
      <h2 className="mb-6 text-xl font-semibold">Client List</h2>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.lastContact}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
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
        <Button variant="outline" size="sm">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline" size="sm" className="px-4">
          1
        </Button>
        <Button variant="outline" size="sm" className="px-4">
          2
        </Button>
        <Button variant="outline" size="sm">
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
          onDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}
