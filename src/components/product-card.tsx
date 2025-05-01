
import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Send, Eye, Star, Phone } from 'lucide-react'; // Removed ShoppingCart, Heart. Added Star, Phone.
import ProductModal from './product-modal'; // Import ProductModal
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const formatPrice = (price: number) => {
    // Basic INR formatting
    return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
     // Prevent modal opening if clicking on the inquiry button itself
     if ((e.target as HTMLElement).closest('a[href^="https://wa.me"]') || (e.target as HTMLElement).closest('a[href="/contact"]') || (e.target as HTMLElement).closest('button[disabled]')) {
       return;
     }
     setIsModalOpen(true);
  };

  return (
    <>
    <Card
        onClick={handleCardClick} // Open modal on card click
        className="group relative flex flex-col h-full w-full overflow-hidden border border-border/20 rounded-lg shadow-sm bg-card transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer" // Add cursor-pointer
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary rounded-t-lg"> {/* Aspect ratio like ShionHouse */}
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          priority={product.id === 'prod_001'} // Example: Prioritize loading for the first image
          data-ai-hint={`${product.category.toLowerCase().split(' ')[0]} ${product.title.toLowerCase().split(' ')[0]}`} // Add AI hint
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10 flex flex-col gap-1"> {/* Adjusted padding for mobile */}
           {product.soldOut && (
             <Badge variant="destructive" className="px-1.5 py-0.5 md:px-2 md:py-0.5 text-[10px] md:text-xs animate-pulse">Sold Out</Badge> {/* Smaller text on mobile */}
           )}
           {product.discount && !product.soldOut && (
             <Badge variant="secondary" className="px-1.5 py-0.5 md:px-2 md:py-0.5 text-[10px] md:text-xs bg-accent text-accent-foreground">{product.discount}% OFF</Badge>
           )}
           {product.customizable && !product.soldOut && (
             <Badge variant="outline" className="px-1.5 py-0.5 md:px-2 md:py-0.5 text-[10px] md:text-xs bg-blue-100 text-blue-800 border-blue-300">Customizable</Badge> // Customization Badge
           )}
        </div>

         {/* Hover Actions - Appear on hover (desktop), slightly visible on mobile? Consider alternatives */}
         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center gap-2 md:gap-2">

             {/* Inquiry/Order Button (Direct WhatsApp) */}
             {product.soldOut ? (
                 <Button size="icon" variant="secondary" disabled className="rounded-full h-8 w-8 md:h-9 md:w-9 bg-background/80 backdrop-blur-sm cursor-not-allowed">
                     <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      <span className="sr-only">Sold Out</span>
                 </Button>
             ) : (
                  <Button size="icon" variant="secondary" asChild className="rounded-full h-8 w-8 md:h-9 md:w-9 bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                     {/* Direct WhatsApp link */}
                      <a
                          href={`https://wa.me/919034587332?text=${encodeURIComponent(`Hi, I'm interested in the product: ${product.title} (ID: ${product.id})`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} // Stop propagation to prevent modal open
                          aria-label="Order on WhatsApp"
                      >
                        <Send className="h-3.5 w-3.5 md:h-4 md:w-4" /> {/* Use Send icon for WhatsApp */}
                         <span className="sr-only">Order on WhatsApp</span>
                      </a>
                  </Button>
             )}
             {/* View Button (Opens Modal) */}
             <Button
               size="icon"
               variant="secondary"
               className="rounded-full h-8 w-8 md:h-9 md:w-9 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
               aria-label="View product details"
               onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }} // Explicitly open modal, stop propagation
             >
                 <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
                 <span className="sr-only">View Product Details</span>
             </Button>
         </div>
      </div>

      <CardContent className="p-2 md:p-3 text-center flex-grow flex flex-col justify-between">
         <div>
             <h3 className="text-xs sm:text-sm font-medium mb-1 text-foreground line-clamp-2"> {/* Slightly smaller text on mobile */}
                 {product.title}
             </h3>
          </div>
          <div>
             {/* Price */}
             <div className="flex justify-center items-baseline gap-1 md:gap-2 mt-1">
               <span className={`text-sm md:text-md font-semibold ${product.discount ? 'text-accent' : 'text-primary'}`}>
                 {formatPrice(displayPrice)}
               </span>
               {product.discount && (
                 <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                    {formatPrice(product.price)}
                 </span>
               )}
             </div>
         </div>
      </CardContent>
    </Card>

    {/* Product Modal */}
    <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        formatPrice={formatPrice} // Pass formatter
    />
    </>
  );
}
