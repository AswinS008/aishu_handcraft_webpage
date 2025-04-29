import type { Product } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] duration-300 ease-in-out relative flex flex-col h-full">
       {product.soldOut && (
        <Badge variant="destructive" className="absolute top-2 right-2 z-10">Sold Out</Badge>
      )}
       {product.discount && !product.soldOut && (
        <Badge variant="secondary" className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground">{product.discount}% OFF</Badge>
      )}
      <CardHeader className="p-0 relative aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false} // Set priority based on importance or make it dynamic
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 line-clamp-1">{product.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          <span className={`text-lg font-bold ${product.discount ? 'text-accent' : 'text-primary'}`}>
            ${displayPrice.toFixed(2)}
          </span>
          {product.discount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
         {/* Since this is a display page, the button might link to contact or be disabled */}
        <Button size="sm" variant="outline" disabled={product.soldOut} aria-label={`View ${product.title}`}>
          <ShoppingCart className="mr-2 h-4 w-4" /> View
        </Button>
      </CardFooter>
    </Card>
  );
}
