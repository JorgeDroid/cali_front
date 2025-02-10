'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Brand } from './components_brand-list';

interface ViewBrandModalProps {
  brand: Brand;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewBrandModal({
  brand,
  isOpen,
  onClose
}: ViewBrandModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Brand</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p className="font-semibold">Name</p>
            <p>{brand.name}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
