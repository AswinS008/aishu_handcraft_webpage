
'use client';

import type { Product } from '@/lib/types';
import ProductCard from './product-card';
import { useState, useMemo, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button"; // Removed Button import (category buttons removed)
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

interface ProductGridProps {
  products: Product[];
  // Removed selectedCategory prop as it's now handled by searchParams
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'popularity';

// // Get unique categories from products, including 'All' - No longer needed here
// const getCategories = (products: Product[]): string[] => {
//   const categories = new Set(products.map(p => p.category));
//   return ['All', ...Array.from(categories)];
// };

export default function ProductGrid({ products }: ProductGridProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All'; // Get category from URL params
  const searchTerm = searchParams.get('search') || ''; // Get search term from URL

  const [sortOption, setSortOption] = useState<SortOption>('default');
  // const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory); // State removed, using searchParams directly

  // // Update selected category if URL param changes - No longer needed as we read directly
  // useEffect(() => {
  //   setSelectedCategory(initialCategory);
  // }, [initialCategory]);

  // const categories = useMemo(() => getCategories(products), [products]); // No longer needed here

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
        // Default sort: by ID
        sorted.sort((a, b) => a.id.localeCompare(b.id));
        break;
    }
    return sorted;
  }, [products, sortOption, selectedCategory, searchTerm]);

  // Removed handleCategoryChange function as category selection is done via Header links now
  // const handleCategoryChange = (category: string) => { ... };


  // Determine the total count based on whether filtering is active
   const totalProductsToCount = selectedCategory === 'All' && !searchTerm ? products.length : filteredAndSortedProducts.length;
   const showingCount = filteredAndSortedProducts.length;


  return (
    // Removed the outer container/padding, now handled by the page component
    <>
       {/* Filters and Sorting Section - Adjusted styling and removed category buttons */}
       <div className="mb-8 md:mb-12"> {/* Reduced bottom margin */}
         {/* Removed Category Buttons Section */}
         {/* <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6"> ... </div> */}

         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-3 bg-card rounded-lg shadow-sm border border-border">
           <div className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-left">
              {/* Updated showing count logic */}
              Showing {showingCount} product{showingCount !== 1 ? 's' : ''}
              {/* Conditionally show 'of X' only when filtering */}
              {(selectedCategory !== 'All' || searchTerm) && ` of ${totalProductsToCount}`}
              {searchTerm && (
                  <span> for "<span className="font-semibold text-primary">{searchTerm}</span>"</span>
              )}
              {selectedCategory !== 'All' && !searchTerm && ( // Show category only if no search term
                  <span> in <span className="font-semibold text-primary">{selectedCategory}</span></span>
              )}
           </div>
           <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
             <span className="text-sm font-medium shrink-0 text-muted-foreground">Sort by:</span>
             <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
               <SelectTrigger id="sort-select" className="w-[180px] bg-background text-sm h-9">
                 <SelectValue placeholder="Sort products" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="default">Featured</SelectItem> {/* Changed Default to Featured */}
                 <SelectItem value="popularity">Popularity</SelectItem>
                 <SelectItem value="price-asc">Price: Low to High</SelectItem>
                 <SelectItem value="price-desc">Price: High to Low</SelectItem>
               </SelectContent>
             </Select>
           </div>
         </div>
       </div>

      {/* Product Grid */}
      <motion.div
        layout // Animate layout changes when products change/reorder
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10" // Added gap-y like ShionHouse
      >
        <AnimatePresence>
          {filteredAndSortedProducts.length > 0 ? (
             filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout // Animate individual item layout changes
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }} // Stagger animation
                className="flex" // Ensure cards take full height of the flex item
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center text-muted-foreground py-16 text-lg" // Increased padding and text size
            >
              {searchTerm || selectedCategory !== 'All' ? `No products found matching your criteria.` : "No products available in this category."}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
