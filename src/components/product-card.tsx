
import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card'; // Removed Footer import
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Send, Eye, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const formatPrice = (price: number) => {
    // Basic INR formatting
    return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <Card className="group relative flex flex-col h-full w-full overflow-hidden border border-border/20 rounded-lg shadow-sm bg-card transition-all duration-300 ease-in-out hover:shadow-md">
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
            {/* Example New/Hot Badge */}
            {/* {product.isNew && <Badge variant="default" className="px-2 py-0.5 text-xs">New</Badge>} */}
        </div>

         {/* Hover Actions - Appear on hover */}
         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-2">
             <Button size="icon" variant="secondary" className="rounded-full h-9 w-9 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                 <Heart className="h-4 w-4" />
                 <span className="sr-only">Add to Wishlist</span>
             </Button>
             {/* Inquiry Button or Add to Cart */}
             {product.soldOut ? (
                 <Button size="icon" variant="secondary" disabled className="rounded-full h-9 w-9 bg-background/80 backdrop-blur-sm cursor-not-allowed">
                     <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">Sold Out</span>
                 </Button>
             ) : (
                  <Button size="icon" variant="secondary" asChild className="rounded-full h-9 w-9 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                     <Link href="/contact">
                        <Send className="h-4 w-4" />
                         <span className="sr-only">Send Inquiry</span>
                      </Link>
                  </Button>
             )}
             {/* Disabled View button as functionality is not implemented */}
             <Button
               size="icon"
               variant="secondary"
               disabled
               className="rounded-full h-9 w-9 bg-background/80 backdrop-blur-sm cursor-not-allowed"
               aria-label="View product (disabled)"
             >
                 <Eye className="h-4 w-4" />
                 <span className="sr-only">View Product (disabled)</span>
             </Button>
         </div>

      </div>

      <CardContent className="p-3 text-center flex-grow flex flex-col justify-between">
         <div>
             {/* Category Link (Optional) */}
             {/* <Link href={`/?category=${encodeURIComponent(product.category)}`} className="text-xs text-muted-foreground hover:text-primary uppercase tracking-wide block mb-1">{product.category}</Link> */}
             <h3 className="text-sm font-medium mb-1 text-foreground line-clamp-2">
               {/* Make title a link to product page if you have one */}
               {/* <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors"> */}
                 {product.title}
               {/* </Link> */}
             </h3>
          </div>
          <div>
             {/* Star Rating Placeholder */}
             {/* <div className="flex justify-center items-center gap-0.5 text-amber-400 mb-2">★★★★☆</div> */}
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
        {/* Optional: Explicit Add to Cart button outside hover for mobile / always visible */}
      {/* <CardFooter className="p-4 pt-0 mt-auto">
          {product.soldOut ? (
             <Button size="sm" variant="outline" disabled className="w-full">Sold Out</Button>
           ) : (
             <Button size="sm" variant="default" className="w-full bg-primary hover:bg-primary/90">
               <ShoppingCart className="mr-2 h-4 w-4" /> Add To Cart
             </Button>
           )}
       </CardFooter> */}
    </Card>
  );
}
