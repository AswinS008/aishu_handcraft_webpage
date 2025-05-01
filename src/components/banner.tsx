
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Banner() {
  return (
    <section className="relative bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100 h-[50vh] md:h-[65vh] flex items-center justify-center text-center overflow-hidden mb-12 md:mb-16 animate-in fade-in duration-700">
      {/* Background Image (Optional - can be replaced with solid color or gradient) */}
       <Image
          src="https://picsum.photos/seed/bannerbg/1920/1080"
          alt="Abstract background texture"
          fill
          priority
          className="object-cover opacity-30"
          data-ai-hint="abstract texture pastel"
       />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-4 animate-in fade-in slide-in-from-bottom duration-500"
          style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}
        >
          Discover Unique <span className="text-primary">Handmade</span> Treasures
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-500 delay-100">
          Explore our curated collection of charming crafts, perfect for gifts or adding a special touch to your life.
        </p>
        <div className="animate-in fade-in slide-in-from-bottom duration-500 delay-200">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 py-3 text-lg font-semibold group transition-transform hover:scale-105 shadow-md">
            <Link href="/?category=All">
              Shop Now <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative elements (Optional) */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200/50 rounded-full blur-xl animate-pulse delay-300 opacity-0 animate-in fade-in duration-1000"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-200/50 rounded-full blur-xl animate-pulse delay-500 opacity-0 animate-in fade-in duration-1000"></div>
    </section>
  );
}
