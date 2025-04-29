
import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Send } from 'lucide-react'; // Send icon might be suitable for contact link

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl hover:scale-[1.03] duration-300 ease-in-out relative flex flex-col h-full animate-in fade-in zoom-in-95">
       {product.soldOut && (
        <Badge variant="destructive" className="absolute top-2 right-2 z-10 animate-pulse">Sold Out</Badge>
      )}
       {product.discount && !product.soldOut && (
        <Badge variant="secondary" className="absolute top-2 left-2 z-10 bg-accent text-accent-foreground">{product.discount}% OFF</Badge>
      )}
      <CardHeader className="p-0 relative aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" // Group hover effect example
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
         {/* Link to contact page if not sold out, otherwise show disabled button */}
        {product.soldOut ? (
          <Button size="sm" variant="outline" disabled aria-label={`Sold out - ${product.title}`}>
             Sold Out
          </Button>
        ) : (
          <Button size="sm" variant="outline" asChild aria-label={`Inquire about ${product.title}`}>
            <Link href="/contact">
              <Send className="mr-2 h-4 w-4" /> Inquire
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
