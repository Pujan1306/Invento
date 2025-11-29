"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/api-response";
import AddProductForm from "./createForm";
import { Rating } from "@/components/ui/rating";
import Image from "next/image";



export default function ProductsPage({ products }: { products: Product[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);


  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">Products</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value=""
                  className="pl-10 w-full"
                  readOnly
                />
              </div>
              <AddProductForm />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-muted">
                    <div className="w-full h-full bg-muted animate-pulse"></div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-foreground mb-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-muted-foreground">Stock:</span>
                    <Badge variant="secondary" className="text-green-700 bg-green-50">
                      {product.stockQuantity.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Rating rating={Math.round(product.rating)} />
                    <span className="text-sm text-muted-foreground">({product.rating}.0)</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">Products</h1>
          
       
          <div className="flex flex-col sm:flex-row gap-4">

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border border-gray-300 shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus:border-primary bg-white dark: dark:border-gray-600"
              />
            </div>
            

            <AddProductForm />
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
       
                <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                
      
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
   
                <p className="text-2xl font-bold text-foreground mb-2">
                  ${product.price.toFixed(2)}
                </p>
                
         
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-muted-foreground">Stock:</span>
                  <Badge variant="secondary" className="text-green-700 bg-green-50">
                    {product.stockQuantity.toLocaleString()}
                  </Badge>
                </div>
                
              
                <div className="flex items-center gap-2">
                  <Rating rating={Math.round(product.rating)} />
                  <span className="text-sm text-muted-foreground">({product.rating}.0)</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

  
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}