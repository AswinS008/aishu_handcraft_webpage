
'use client';

import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, X, Star, MessageSquare, Info } from 'lucide-react'; // Added Info icon

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  formatPrice: (price: number) => string; // Receive price formatter
}

export default function ProductModal({ isOpen, onClose, product, formatPrice }: ProductModalProps) {
  if (!product) return null; // Handle case where product might be null initially

  const displayPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden"> {/* Increased max-width and remove default padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0"> {/* No gap between image and content */}

          {/* Image Section */}
          <div className="relative aspect-[3/4] w-full bg-secondary">
             <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority // Prioritize loading modal image
                data-ai-hint={`${product.category.toLowerCase().split(' ')[0]} ${product.title.toLowerCase().split(' ')[0]}`}
             />
              {/* Badges on Image */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                 {product.soldOut && (
                    <Badge variant="destructive" className="px-2.5 py-1 text-xs animate-pulse shadow-md">Sold Out</Badge>
                 )}
                 {product.discount && !product.soldOut && (
                    <Badge variant="secondary" className="px-2.5 py-1 text-xs bg-accent text-accent-foreground shadow-md">{product.discount}% OFF</Badge>
                 )}
                  {product.customizable && !product.soldOut && (
                    <Badge variant="outline" className="px-2.5 py-1 text-xs bg-blue-100 text-blue-800 border-blue-300 shadow-md">Customizable</Badge>
                 )}
              </div>
              {/* Close Button */}
              <DialogClose asChild>
                   <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/60 hover:bg-background/90 rounded-full h-8 w-8">
                       <X className="h-4 w-4" />
                       <span className="sr-only">Close</span>
                   </Button>
              </DialogClose>
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl font-semibold text-foreground">{product.title}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground pt-1">
                    Category: <Link href={`/?category=${encodeURIComponent(product.category)}`} onClick={onClose} className="text-primary hover:underline">{product.category}</Link>
                </DialogDescription>
              </DialogHeader>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                 <span className={`text-2xl font-bold ${product.discount ? 'text-accent' : 'text-primary'}`}>
                   {formatPrice(displayPrice)}
                 </span>
                 {product.discount && !product.soldOut && (
                   <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.price)}
                   </span>
                 )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Customizable Info */}
              {product.customizable && !product.soldOut && (
                  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md mb-6 text-xs text-blue-800">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>This item is customizable! Contact us via WhatsApp or Instagram DM to discuss options.</span>
                  </div>
              )}
              {/* Sold Out Info */}
               {product.soldOut && (
                   <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-md mb-6 text-xs text-destructive/90">
                       <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                       <span>This item is currently sold out. Contact us for restock inquiries.</span>
                   </div>
               )}
            </div>

            {/* Action Buttons */}
            <div className="mt-auto space-y-3">
                 <Button asChild className="w-full bg-accent hover:bg-accent/90" size="lg" disabled={product.soldOut}>
                      <a
                         href={product.soldOut ? "#" : `https://wa.me/919034587332?text=${encodeURIComponent(`Hi, I'm interested in the product: ${product.title} (ID: ${product.id})`)}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className={product.soldOut ? 'cursor-not-allowed' : ''}
                      >
                         <MessageSquare className="mr-2 h-5 w-5" />
                         {product.soldOut ? 'Sold Out' : 'Order on WhatsApp'}
                      </a>
                 </Button>
                 <Button asChild variant="outline" className="w-full" size="lg" disabled={product.soldOut}>
                   <Link href={product.soldOut ? "#" : "/contact"} className={product.soldOut ? 'cursor-not-allowed' : ''}>
                     <Phone className="mr-2 h-5 w-5" />
                     {product.soldOut ? 'Sold Out' : 'More Contact Options'}
                   </Link>
                 </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
