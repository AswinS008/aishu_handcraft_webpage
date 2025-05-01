
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryGridProps {
  categories: string[];
}

// Helper to generate placeholder image URL based on category name
const getCategoryImage = (categoryName: string): string => {
    const seed = categoryName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'default';
    return `https://picsum.photos/seed/${seed}cat/400/300`;
}

// Helper to generate a slug for the category link
const categoryToSlug = (categoryName: string): string => {
    return encodeURIComponent(categoryName);
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCategoryClick = (category: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set('category', category);
        currentParams.delete('search'); // Clear search when category changes
        router.push(`/?${currentParams.toString()}`, { scroll: false }); // Prevent scroll jump
    };


  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.03 }}
          className="group"
        >
          <Card
             onClick={() => handleCategoryClick(category)}
             className={cn(
                 "overflow-hidden border border-border/30 rounded-lg shadow-sm bg-card transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer",
                 "hover:border-primary/50" // Add hover border effect
             )}
          >
             <div className="relative aspect-square w-full overflow-hidden bg-secondary rounded-t-lg">
                 <Image
                   src={getCategoryImage(category)}
                   alt={`Image for category: ${category}`}
                   fill
                   sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 15vw"
                   className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                   data-ai-hint={category.toLowerCase().split(' ')[0]} // AI hint for image generation
                 />
                 {/* Optional overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </div>
             <CardContent className="p-3 text-center">
                 <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-primary truncate">
                     {category}
                 </h3>
             </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
