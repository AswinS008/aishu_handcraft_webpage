
'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  categories: string[];
}

export default function CategoryTabs({ categories }: CategoryTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';

  const handleCategoryClick = (category: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      currentParams.delete('category');
    } else {
      currentParams.set('category', category);
    }
    currentParams.delete('search'); // Clear search when category changes
    router.push(`/?${currentParams.toString()}`, { scroll: false }); // Prevent scroll jump
  };

  return (
    // Adjusted sticky top to account for dynamic island header (h-16 + top-2 padding)
    <section className="border-b border-border sticky top-[calc(4rem+0.5rem)] bg-background/95 backdrop-blur-sm z-40 mb-8 shadow-sm">
        {/* Removed overflow-x-auto */}
        <div className="container mx-auto px-4 py-3">
            <div className="flex justify-center items-center space-x-3 sm:space-x-6 whitespace-nowrap">
             {categories.map((category) => (
                 <Button
                     key={category}
                     variant="ghost"
                     onClick={() => handleCategoryClick(category)}
                     className={cn(
                         "relative rounded-full px-4 py-1.5 h-auto text-sm transition-colors duration-200 ease-in-out",
                         currentCategory === category
                         ? "font-semibold text-primary bg-primary/10 hover:bg-primary/20"
                         : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                     )}
                 >
                 {category}
                 {currentCategory === category && (
                    <motion.div
                         className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary"
                         layoutId="category-underline" // Unique ID for layout animation
                         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                     )}
                </Button>
                 ))}
            </div>
       </div>
    </section>
  );
}
