
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/lib/types';

interface CategoryGridProps {
  categories: string[];
  products: Product[]; // Pass products to find representative images
}

// Helper to find the first product image for a category
const getCategoryImage = (category: string, products: Product[]): string => {
  const productInCategory = products.find(p => p.category === category);
  return productInCategory?.imageUrl || `https://picsum.photos/seed/${encodeURIComponent(category)}/400/300`; // Fallback image
};

export default function CategoryGrid({ categories, products }: CategoryGridProps) {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary animate-in fade-in duration-500">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((category, index) => (
          <Link key={category} href={`/?category=${encodeURIComponent(category)}`} passHref>
            <Card className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border-none h-full flex flex-col animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={getCategoryImage(category, products)}
                  alt={`Image for ${category} category`}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  data-ai-hint={`craft ${category.toLowerCase().split(' ')[0]}`} // Add AI hint based on category
                />
                 {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardContent className="p-4 flex-grow flex items-center justify-center bg-secondary/50 group-hover:bg-secondary transition-colors duration-300">
                <h3 className="text-lg font-semibold text-center text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {category}
                </h3>
                 {/* Hover Arrow (Optional) */}
                 <ArrowRight className="absolute bottom-4 right-4 h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
