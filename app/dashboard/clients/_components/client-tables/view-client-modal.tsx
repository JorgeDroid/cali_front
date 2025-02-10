'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Client } from './components_client-list';

interface ViewClientModalProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewClientModal({
  client,
  isOpen,
  onClose
}: ViewClientModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Client Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Name:</span>
            <span className="col-span-3">{`${client.name} ${client.last_name}`}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Email:</span>
            <span className="col-span-3">{client.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Phone:</span>
            <span className="col-span-3">{client.phone}</span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
