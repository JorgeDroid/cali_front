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

import { EditModelModal } from './edit-model-modal';
import { DeleteModelModal } from './delete-model-modal';
import { ViewModelModal } from './view-model-modal';

import { updateModel, deleteModel } from '@/services/api/models';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export interface Model {
  id: string;
  name: string;
  brand: string;
}

export default function ModelsList({ models }: { models: Model[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [modelData, setModelData] = useState<Model[]>([]);
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [deletingModel, setDeletingModel] = useState<Model | null>(null);
  const [viewingModel, setViewingModel] = useState<Model | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Model;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleEditModel = async (model: Model) => {
    await updateModel('token', model.id, modelData);
  };

  const handleDeleteModel = async (model: Model) => {
    await deleteModel('token', model.id);
  };

  const handleEdit = (model: Model) => {
    setEditingModel(model);
  };

  const handleView = (model: Model) => {
    setViewingModel(model);
  };

  const handleDelete = (model: Model) => {
    console.log('deleting model', model);
    setDeletingModel(model);
  };

  const handleSaveEdit = (updatedModel: Model) => {
    handleEditModel(updatedModel);
  };

  const handleSort = (key: keyof Model) => {
    setSortConfig({
      key,
      direction:
        sortConfig?.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc'
    });
  };

  const filteredAndSortedModels = models
    .filter((model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

  console.log('deleting model', deletingModel);

  return (
    <div className="mx-auto w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Models List</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search models..."
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

              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedModels
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((model) => (
                <TableRow key={model.id}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleView(model)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(model)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDelete(model)}
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
          { length: Math.ceil(models.length / 10) },
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
          disabled={currentPage === Math.ceil(models.length / 10)}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      {editingModel && (
        <EditModelModal
          model={editingModel}
          isOpen={!!editingModel}
          onClose={() => setEditingModel(null)}
          onSave={handleSaveEdit}
        />
      )}
      {deletingModel && (
        <DeleteModelModal
          modelName={deletingModel.name}
          isOpen={!!deletingModel}
          onClose={() => setDeletingModel(null)}
          onDelete={handleDeleteModel}
        />
      )}
      {viewingModel && (
        <ViewModelModal
          model={viewingModel}
          isOpen={!!viewingModel}
          onClose={() => setViewingModel(null)}
        />
      )}
    </div>
  );
}
