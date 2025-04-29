
'use client';

import type { Product } from '@/lib/types';
import ProductCard from './product-card';
import { useState, useMemo, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button"; // Import Button
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

interface ProductGridProps {
  products: Product[];
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'popularity';

// Get unique categories from products, including 'All'
const getCategories = (products: Product[]): string[] => {
  const categories = new Set(products.map(p => p.category));
  return ['All', ...Array.from(categories)];
};

export default function ProductGrid({ products }: ProductGridProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const searchTerm = searchParams.get('search') || '';

  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  // Update selected category if URL param changes
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories = useMemo(() => getCategories(products), [products]);

  const filteredAndSortedProducts = useMemo(() => {
    // 1. Filter by category
    let filtered = products;
    if (selectedCategory !== 'All') {
      filtered = products.filter(product => product.category === selectedCategory);
    }

    // 2. Filter based on search term (case-insensitive)
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
        // Optionally implement a default sort (e.g., by ID or title)
        sorted.sort((a, b) => a.id.localeCompare(b.id));
        break;
    }
    return sorted;
  }, [products, sortOption, selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
      setSelectedCategory(category);
      // Update URL without full page reload - Optional, but good UX
      const currentParams = new URLSearchParams(window.location.search);
      if (category === 'All') {
          currentParams.delete('category');
      } else {
          currentParams.set('category', category);
      }
      window.history.pushState({}, '', `${window.location.pathname}?${currentParams.toString()}`);
  };


  return (
    <div className="container mx-auto px-4 py-8">
       {/* Filters and Sorting Section - Styled like ShionHouse */}
       <div className="mb-12">
         <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
           {categories.map((category) => (
             <Button
               key={category}
               variant={selectedCategory === category ? "default" : "outline"}
               onClick={() => handleCategoryChange(category)}
               className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                 selectedCategory === category
                   ? 'bg-primary text-primary-foreground'
                   : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
               }`}
             >
               {category}
             </Button>
           ))}
         </div>

         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-2 bg-card rounded-lg shadow-sm border border-border">
           <div className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-left">
             Showing {filteredAndSortedProducts.length} of {products.length} products
             {searchTerm && (
                <span> for "<span className="font-semibold text-primary">{searchTerm}</span>"</span>
             )}
              {selectedCategory !== 'All' && (
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
                 <SelectItem value="default">Default</SelectItem>
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
              {searchTerm || selectedCategory !== 'All' ? `No products found matching your criteria.` : "No products available."}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
```