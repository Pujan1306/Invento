'use client';

import { ShoppingBag, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types/api-response';
import { Rating } from '@/components/ui/rating';
import Image from 'next/image';

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

export default function PopularProducts({ popularProduct = [] }: { popularProduct: Product[] }) {

  return (
    <Card className="h-full flex flex-col bg-card">
      <CardHeader className="pb-3 shrink-0">
        <CardTitle className="text-base font-semibold">Popular Products</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <div className="h-full px-4 pb-4">
          <div 
            className="overflow-y-auto pr-2" 
            style={{ 
              height: '100%',
              maxHeight: 'calc(100vh - 200px)',
              scrollbarWidth: 'thin',
              scrollbarColor: '#94a3b8 #f1f5f9'
            }}
          >
            <div className="space-y-2">
              {popularProduct.map((product) => (
                <div 
                  key={product._id} 
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="h-8 w-8 rounded-md bg-muted p-0.5 overflow-hidden shrink-0 border">
                      {product.img ? (
                        <Image
                          src={product.img}
                          alt={product.name}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-muted-foreground/10">
                          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-bold text-primary">${product.price}</span>
                        <div className="flex items-center gap-0.5">
                          <span className="text-muted-foreground text-xs">•</span>
                            <Rating rating={Math.round(product.rating)}  size="sm"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 shrink-0 ml-1">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShoppingBag className="h-3 w-3 text-primary" />
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-foreground block">{formatNumber(product.stockQuantity)}</span>
                      <span className="text-xs text-muted-foreground">Stock</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
