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
import { Model } from './components_model-list';

interface DeleteModelModalProps {
  modelName: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (model: Model) => void;
}

export function DeleteModelModal({
  modelName,
  isOpen,
  onClose,
  onDelete
}: DeleteModelModalProps) {
  const handleDelete = (model: Model) => {
    onDelete(model);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Client</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the model {modelName}? This action
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
