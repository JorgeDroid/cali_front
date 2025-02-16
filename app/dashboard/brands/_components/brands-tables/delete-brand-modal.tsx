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
import { Brand } from './components_brand-list';

interface DeleteBrandModalProps {
  brandName: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (brand: Brand) => void;
}

export function DeleteBrandModal({
  brandName,
  isOpen,
  onClose,
  onDelete
}: DeleteBrandModalProps) {
  const handleDelete = (brand: Brand) => {
    onDelete(brand);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Client</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the brand {brandName}? This action
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
