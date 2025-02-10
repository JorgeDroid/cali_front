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
import { EditBrandModal } from './edit-brand-modal';
import { DeleteBrandModal } from './delete-brand-modal';

import { updateBrand, deleteBrand } from '@/services/api/brands';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ViewBrandModal } from './view-brand-modal';

export interface Brand {
  id: string;
  name: string;
}

export default function BrandsList({ brands }: { brands: Brand[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [brandData, setBrandData] = useState<Brand[]>([]);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [deletingBrand, setDeletingBrand] = useState<Brand | null>(null);
  const [viewingBrand, setViewingBrand] = useState<Brand | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Brand;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleEditBrand = async (brand: Brand) => {
    await updateBrand('token', brand.id, brandData);
  };

  const handleDeleteBrand = async (brand: Brand) => {
    await deleteBrand('token', brand.id);
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
  };

  const handleView = (brand: Brand) => {
    setViewingBrand(brand);
  };

  const handleDelete = (brand: Brand) => {
    console.log('deleting brand', brand);
    setDeletingBrand(brand);
  };

  const handleSaveEdit = (updatedBrand: Brand) => {
    handleEditBrand(updatedBrand);
  };

  const handleSort = (key: keyof Brand) => {
    setSortConfig({
      key,
      direction:
        sortConfig?.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc'
    });
  };

  const filteredAndSortedBrands = brands
    .filter((brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

  console.log('deleting brand', deletingBrand);

  return (
    <div className="mx-auto w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Brand List</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search brands..."
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
            {filteredAndSortedBrands
              .slice((currentPage - 1) * 10, currentPage * 10)
              .map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleView(brand)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(brand)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDelete(brand)}
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
          { length: Math.ceil(brands.length / 10) },
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
          disabled={currentPage === Math.ceil(brands.length / 10)}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      {editingBrand && (
        <EditBrandModal
          brand={editingBrand}
          isOpen={!!editingBrand}
          onClose={() => setEditingBrand(null)}
          onSave={handleSaveEdit}
        />
      )}
      {deletingBrand && (
        <DeleteBrandModal
          brandName={deletingBrand.name}
          isOpen={!!deletingBrand}
          onClose={() => setDeletingBrand(null)}
          onDelete={handleDeleteBrand}
        />
      )}
      {viewingBrand && (
        <ViewBrandModal
          brand={viewingBrand}
          isOpen={!!viewingBrand}
          onClose={() => setViewingBrand(null)}
        />
      )}
    </div>
  );
}
