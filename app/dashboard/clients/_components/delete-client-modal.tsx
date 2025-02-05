'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Client } from './employee-tables/components_client-list';
interface DeleteClientModalProps {
  clientName: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (client: Client) => void;
}

export function DeleteClientModal({
  clientName,
  isOpen,
  onClose,
  onDelete
}: DeleteClientModalProps) {
  const handleDelete = (client: Client) => {
    onDelete(client);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Client</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the client {clientName}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={(e) => handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
