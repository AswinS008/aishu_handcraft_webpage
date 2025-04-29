
'use client';

import type { Product } from '@/lib/types';
import ProductCard from './product-card';
import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion

interface ProductGridProps {
  products: Product[];
  searchTerm?: string; // Add searchTerm prop
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'popularity';

export default function ProductGrid({ products, searchTerm = '' }: ProductGridProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const filteredAndSortedProducts = useMemo(() => {
    // 1. Filter based on search term (case-insensitive)
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Sort the filtered products
    let sorted = [...filtered];
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
        // Optionally implement a default sort (e.g., by ID or title)
        sorted.sort((a, b) => a.id.localeCompare(b.id));
        break;
    }
    return sorted;
  }, [products, sortOption, searchTerm]); // Add searchTerm to dependency array

  return (
    <div>
       <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-secondary/50 rounded-lg shadow-sm">
         <div className="flex items-center gap-2">
           <Label htmlFor="sort-select" className="text-sm font-medium shrink-0">Sort by:</Label>
           <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
             <SelectTrigger id="sort-select" className="w-[180px] bg-background">
               <SelectValue placeholder="Sort products" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="default">Default</SelectItem>
               <SelectItem value="popularity">Popularity</SelectItem>
               <SelectItem value="price-asc">Price: Low to High</SelectItem>
               <SelectItem value="price-desc">Price: High to Low</SelectItem>
             </SelectContent>
           </Select>
         </div>
          {searchTerm && (
           <div className="text-sm text-muted-foreground">
             Showing results for: <span className="font-semibold text-primary">{searchTerm}</span>
           </div>
         )}
         {/* Add Filter Button/Drawer here if needed */}
       </div>

      <motion.div
        layout // Animate layout changes when products change/reorder
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredAndSortedProducts.length > 0 ? (
             filteredAndSortedProducts.map((product) => (
              <motion.div
                key={product.id}
                layout // Animate individual item layout changes
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-muted-foreground py-10"
            >
              {searchTerm ? `No products found matching "${searchTerm}".` : "No products available."}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
