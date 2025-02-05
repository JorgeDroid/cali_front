'use client';

import { useEffect, useState } from 'react';
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
import { deleteClient, getClients, updateClient } from '@/services/api/clients';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastContact: string;
}

export default function ClientList() {
  const [clientData, setClientData] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const handleEditClient = async (client: Client) => {
    await updateClient('token', client.id, clientData);
  };

  const handleDeleteClient = async (client: Client) => {
    await deleteClient('token', client.id);
  };

  const handleEdit = (client: Client) => {
    handleEditClient(client);
  };

  const handleDelete = (client: Client) => {
    handleDeleteClient(client);
  };

  const handleSaveEdit = (updatedClient: Client) => {
    handleEditClient(updatedClient);
  };

  const handleConfirmDelete = (client: Client) => {
    handleDeleteClient(client);
  };

  const handleGetClients = async (token: string) => {
    let clientsData = await getClients(token);
    setClients(clientsData);
  };

  useEffect(() => {
    handleGetClients('token');
  }, []);

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
          onDelete={handleDeleteClient}
        />
      )}
    </div>
  );
}
