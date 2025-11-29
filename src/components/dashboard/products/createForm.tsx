"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Loader2, Plus } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { ApiResponse } from "@/types/api-response"



const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  price: z.coerce.number().min(1, "Price must be at least 1"),
  rating: z.coerce.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  stockQuantity: z.coerce.number().min(1, "Stock Quantity must be at least 1"),
  img: z.string().url("Image URL must be a valid URL"),
})

export default function AddProductForm() {
const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false) 
  
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      rating: "",
      stockQuantity: "",
      img: "",
    },

  })

  async function onSubmit(data: z.infer<typeof productSchema>) {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/addProduct", data);
      
      if (response.status === 200) {
        toast.success("Product added successfully");
        form.reset();
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data?.message || "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Create Product
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product Details</DialogTitle>
          <DialogDescription>
            Add new products by filling the details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Product Name"
                      className="border border-gray-300"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="price">Price</FieldLabel>
                    <Input
                      {...field}
                      id="price"
                      type="number"
                      placeholder="Product Price"
                      className="border border-gray-300"
                      value={field.value as number}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="rating"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="rating">Rating</FieldLabel>
                    <Input
                      {...field}
                      id="rating"
                      type="number"
                      placeholder="Product Rating"
                      className="border border-gray-300"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value as number}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="stockQuantity"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="stockQuantity">Stock Quantity</FieldLabel>
                    <Input
                      {...field}
                      id="stockQuantity"
                      type="number"
                      placeholder="Product Stock Quantity"
                      className="border border-gray-300"
                      value={field.value as number}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="img"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="img">Image</FieldLabel>
                    <Input
                      {...field}
                      id="img"
                      placeholder="https://example.com/image.jpg"
                      className="border border-gray-300"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
