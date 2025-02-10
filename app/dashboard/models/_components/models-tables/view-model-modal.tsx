'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Model } from './components_model-list';

interface ViewModelModalProps {
  model: Model;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewModelModal({
  model,
  isOpen,
  onClose
}: ViewModelModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Brand</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p className="font-semibold">Name</p>
            <p>{model.name}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
