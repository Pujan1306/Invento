"use client"
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";   
import { Trash2 } from 'lucide-react'; 
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/api-response";
import { Product } from "@/types/api-response";


export default function ProductTableThemed({products}: {products: Product[]}) {
  const [data, setData] = useState<Product[]>(products);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  useEffect(() => {
    setData(products);
  }, [products]);

  const toggleSelectAll = (checked: boolean): void => {
    setIsAllSelected(checked);
    if (checked) {
      const newSelected: Record<string, boolean> = {};
      data.forEach((row) => (newSelected[row._id] = true));
      setSelectedRows(newSelected);
    } else {
      setSelectedRows({});
    }
  };

  const toggleRow = (id: string): void => {
    setSelectedRows((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      const allSelected = data.length > 0 && data.every((row) => newState[row._id]);
      setIsAllSelected(allSelected);
      return newState;
    });
  };

  const deleteSelected = async (): Promise<void> => {
    const idsToDelete = Object.keys(selectedRows).filter(id => selectedRows[id]);
    if (idsToDelete.length === 0) return;


    const newData = data.filter(item => !idsToDelete.includes(item._id));
    setData(newData);
    setSelectedRows({});
    setIsAllSelected(false);

    try {
      const response = await axios.delete(`/api/deleteProduct`, {
        data: { ids: idsToDelete }
      });

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message);
    }
  };

  const formatCurrency = (val: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  const formatNumber = (val: number): string => new Intl.NumberFormat('en-US').format(val);
  const truncateId = (id: string): string => id.substring(0, 8) + '...';

  const selectedCount: number = Object.values(selectedRows).filter(Boolean).length;

  return (
    <div
      className="w-full min-h-screen p-8 font-sans"
      style={{
        background: 'var(--color-background)',
        color: 'var(--color-foreground)',
        fontFamily: 'var(--font-sans)'
      }}
    >

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        {selectedCount > 0 && (
          <Button
            size="sm"
            onClick={deleteSelected}
            style={{
              background: 'var(--color-destructive)',
              color: 'var(--color-destructive-foreground)',
              borderColor: 'var(--color-border)'
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete ({selectedCount})
          </Button>
        )}
      </div>

      <div
        className="rounded-md border"
        style={{
          borderColor: 'var(--color-border)',
          background: 'var(--color-card)',
          color: 'var(--color-card-foreground)'
        }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 px-2">
                <Checkbox 
                  className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  checked={isAllSelected && data.length > 0} 
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                  disabled={data.length === 0}
                />
              </TableHead>
              <TableHead className="w-32 px-2">ID</TableHead>
              <TableHead className="px-2 min-w-[200px]">Product Name</TableHead>
              <TableHead className="w-24 px-2">Price</TableHead>
              <TableHead className="w-24 px-2">Rating</TableHead>
              <TableHead className="text-right w-36 px-2">Stock Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={6} className="h-24 text-center" style={{ color: 'var(--color-muted-foreground)' }}>
                   No results.
                 </TableCell>
               </TableRow>
            ) : (
              data.map((product) => {
                const selected = !!selectedRows[product._id];
                return (
                <TableRow 
                  key={product._id}
                  data-state={selected ? "selected" : undefined}
                  style={{
                    background: selected ? 'color-mix(in srgb, var(--color-accent) 22%, transparent)' : 'transparent',
                    color: selected ? 'var(--color-accent-foreground)' : undefined
                  }}
                >
                  <TableCell className="px-2">
                    <Checkbox 
                      className="border-gray-400 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      checked={selected} 
                      onCheckedChange={() => toggleRow(product._id)}
                      aria-label={`Select row ${product.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs px-2" style={{ color: 'var(--color-muted-foreground)' }}>
                    {truncateId(product._id)}
                  </TableCell>
                  <TableCell className="font-medium px-2">
                    {product.name}
                  </TableCell>
                  <TableCell className="px-2">{formatCurrency(product.price)}</TableCell>
                  <TableCell className="px-2">{product.rating}</TableCell>
                  <TableCell className="text-right px-2">{formatNumber(product.stockQuantity)}</TableCell>
                </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-1 text-sm text-center mt-4" style={{ color: 'var(--color-muted-foreground)' }}>
        {selectedCount} of {data.length} row(s) selected.
      </div>
    </div>
  );
}
