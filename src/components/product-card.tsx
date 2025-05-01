
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
     if ((e.target as HTMLElement).closest('a[href="/contact"]') || (e.target as HTMLElement).closest('button[disabled]')) {
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
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
           {product.soldOut && (
             <Badge variant="destructive" className="px-2 py-0.5 text-xs animate-pulse">Sold Out</Badge>
           )}
           {product.discount && !product.soldOut && (
             <Badge variant="secondary" className="px-2 py-0.5 text-xs bg-accent text-accent-foreground">{product.discount}% OFF</Badge>
           )}
           {product.customizable && !product.soldOut && (
             <Badge variant="outline" className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 border-blue-300">Customizable</Badge> // Customization Badge
           )}
        </div>

         {/* Hover Actions - Appear on hover */}
         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-2">
              {/* Removed Wishlist Button */}

             {/* Inquiry Button */}
             {product.soldOut ? (
                 <Button size="icon" variant="secondary" disabled className="rounded-full h-9 w-9 bg-background/80 backdrop-blur-sm cursor-not-allowed">
                     <Phone className="h-4 w-4" />
                      <span className="sr-only">Sold Out</span>
                 </Button>
             ) : (
                  <Button size="icon" variant="secondary" asChild className="rounded-full h-9 w-9 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                     <Link href="/contact" onClick={(e) => e.stopPropagation()}> {/* Stop propagation to prevent modal open */}
                        <Phone className="h-4 w-4" />
                         <span className="sr-only">Send Inquiry / Order</span>
                      </Link>
                  </Button>
             )}
             {/* View Button (Opens Modal) */}
             <Button
               size="icon"
               variant="secondary"
               className="rounded-full h-9 w-9 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors"
               aria-label="View product details"
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }} // Explicitly open modal, stop propagation
             >
                 <Eye className="h-4 w-4" />
                 <span className="sr-only">View Product Details</span>
             </Button>
         </div>
      </div>

      <CardContent className="p-3 text-center flex-grow flex flex-col justify-between">
         <div>
             <h3 className="text-sm font-medium mb-1 text-foreground line-clamp-2">
                 {product.title}
             </h3>
          </div>
          <div>
             {/* Example Star Rating Placeholder (if needed later) */}
             {/* <div className="flex justify-center items-center gap-0.5 text-amber-400 mb-2 text-xs">
               <Star fill="currentColor" className="w-3 h-3" />
               <Star fill="currentColor" className="w-3 h-3" />
               <Star fill="currentColor" className="w-3 h-3" />
               <Star fill="currentColor" className="w-3 h-3" />
               <Star className="w-3 h-3" />
             </div> */}
             <div className="flex justify-center items-baseline gap-2 mt-1">
               <span className={`text-md font-semibold ${product.discount ? 'text-accent' : 'text-primary'}`}>
                 {formatPrice(displayPrice)}
               </span>
               {product.discount && (
                 <span className="text-xs text-muted-foreground line-through">
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
