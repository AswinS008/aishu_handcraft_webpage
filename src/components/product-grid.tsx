
'use client';

import type { Product } from '@/lib/types';
import ProductCard from './product-card';
import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

interface ProductGridProps {
  products: Product[];
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'popularity';

export default function ProductGrid({ products }: ProductGridProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All'; // Get category from URL params
  const searchTerm = searchParams.get('search') || ''; // Get search term from URL (keep for future)

  const [sortOption, setSortOption] = useState<SortOption>('default');

  const filteredAndSortedProducts = useMemo(() => {
    // 1. Filter by category from URL
    let filtered = products;
    if (selectedCategory !== 'All') {
      filtered = products.filter(product => product.category === selectedCategory);
    }

    // 2. Filter based on search term (case-insensitive) - Keep search functionality
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Sort the filtered products
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
        // Default sort: by ID or maybe add featured logic later
        sorted.sort((a, b) => (a.popularity ?? -1) - (b.popularity ?? -1) || a.id.localeCompare(b.id)); // Example: default sort by popularity then ID
        break;
    }
    return sorted;
  }, [products, sortOption, selectedCategory, searchTerm]);


  // Determine the total count based on whether filtering is active
   const totalProductsToCount = selectedCategory === 'All' && !searchTerm ? products.length : filteredAndSortedProducts.length;
   const showingCount = filteredAndSortedProducts.length;

   const formatPrice = (price: number) => {
    // Basic INR formatting
    return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };


  return (
    <>
       {/* Filters and Sorting Section */}
       <div className="mb-8 md:mb-12">
         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-3 bg-card rounded-lg shadow-sm border border-border">
           <div className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-left">
              Showing {showingCount} product{showingCount !== 1 ? 's' : ''}
              {(selectedCategory !== 'All' || searchTerm) && ` of ${totalProductsToCount}`}
              {searchTerm && (
                  <span> for "<span className="font-semibold text-primary">{searchTerm}</span>"</span>
              )}
              {/* Removed category name display here, handled by tabs/title */}
           </div>
           <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
             <span className="text-sm font-medium shrink-0 text-muted-foreground">Sort by:</span>
             <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
               <SelectTrigger id="sort-select" className="w-[180px] bg-background text-sm h-9">
                 <SelectValue placeholder="Sort products" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="default">Featured</SelectItem>
                 <SelectItem value="popularity">Popularity</SelectItem>
                 <SelectItem value="price-asc">Price: Low to High</SelectItem>
                 <SelectItem value="price-desc">Price: High to Low</SelectItem>
               </SelectContent>
             </Select>
           </div>
         </div>
       </div>

      {/* Product Grid - Added motion.div wrapper for AnimatePresence */}
       <motion.div
         layout // Animate layout changes when the grid itself changes (e.g., filters applied)
         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"
        >
         <AnimatePresence mode="popLayout"> {/* Use AnimatePresence for item animations */}
           {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product, index) => (
               <motion.div
                 key={product.id} // Key is crucial for AnimatePresence
                 layout // Animate individual item position changes
                 initial={{ opacity: 0, y: 20, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: -10, scale: 0.95 }}
                 transition={{ duration: 0.3, delay: index * 0.03 }} // Stagger animation
                 className="flex" // Ensure cards take full height of the flex item
               >
                 <ProductCard product={product} />
               </motion.div>
             ))
           ) : (
             <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }} // Add exit animation for the message
               className="col-span-full text-center text-muted-foreground py-16 text-lg"
             >
               {searchTerm || selectedCategory !== 'All' ? `No products found matching your criteria.` : "No products available in this category."}
             </motion.p>
           )}
         </AnimatePresence>
       </motion.div>
    </>
  );
}
