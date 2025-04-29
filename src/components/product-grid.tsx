'use client';

import type { Product } from '@/lib/types';
import ProductCard from './product-card';
import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProductGridProps {
  products: Product[];
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'popularity';

export default function ProductGrid({ products }: ProductGridProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');
  // Add state for filters if needed, e.g., category, price range

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => (a.discount ? a.price * (1 - a.discount/100) : a.price) - (b.discount ? b.price * (1 - b.discount/100) : b.price));
        break;
      case 'price-desc':
        sorted.sort((a, b) => (b.discount ? b.price * (1 - b.discount/100) : b.price) - (a.discount ? a.price * (1 - a.discount/100) : a.price));
        break;
      case 'popularity':
        // Sort by popularity descending, putting items without popularity last
        sorted.sort((a, b) => (b.popularity ?? -1) - (a.popularity ?? -1));
        break;
      case 'default':
      default:
        // Default sort might be based on original order or ID
        break;
    }
    return sorted;
  }, [products, sortOption]);

  return (
    <div>
       <div className="mb-6 flex justify-end items-center gap-4">
         <Label htmlFor="sort-select" className="text-sm font-medium">Sort by:</Label>
         <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
           <SelectTrigger id="sort-select" className="w-[180px]">
             <SelectValue placeholder="Sort products" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="default">Default</SelectItem>
             <SelectItem value="popularity">Popularity</SelectItem>
             <SelectItem value="price-asc">Price: Low to High</SelectItem>
             <SelectItem value="price-desc">Price: High to Low</SelectItem>
           </SelectContent>
         </Select>
         {/* Add Filter Button/Drawer here if needed */}
       </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.length > 0 ? (
           sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">No products found.</p>
        )}
      </div>
    </div>
  );
}
