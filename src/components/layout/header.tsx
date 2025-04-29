
'use client'; // Make header client-side for search state and routing

import Link from 'next/link';
import { Package2, Instagram, Facebook, Twitter, Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react'; // Added icons
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'; // Use next/navigation hooks
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"; // For mobile menu
import productsData from '@/data/products.json'; // Import product data for categories
import type { Product } from '@/lib/types';

// Get unique categories
const getCategories = (products: Product[]): string[] => {
  const categories = new Set(products.map(p => p.category));
  return Array.from(categories);
};

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initialSearchTerm = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = getCategories(productsData as Product[]);

  // Update search term state if URL changes
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentParams = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      currentParams.set('search', searchTerm.trim());
    } else {
      currentParams.delete('search');
    }
    // Navigate to home page with search query
    router.push(`/?${currentParams.toString()}`);
     if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu on search
  };

  const handleCategoryClick = (category: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('category', category);
    currentParams.delete('search'); // Clear search when category changes
    router.push(`/?${currentParams.toString()}`);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu
  }

  const handleLogoClick = () => {
     router.push('/'); // Navigate to home, clearing filters/search
     if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu
  }

  // Close mobile menu on route change
  useEffect(() => {
      setIsMobileMenuOpen(false);
  }, [pathname, searchParams]);


  const renderNavLinks = (isMobile = false) => (
    <>
      <Button variant="link" className={`p-0 h-auto text-base ${isMobile ? 'w-full justify-start py-2' : ''} ${pathname === '/' ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`} onClick={handleLogoClick}>
        Home
      </Button>
      {/* Category Links */}
      {categories.map(category => (
        <Button
           key={category}
           variant="link"
           className={`p-0 h-auto text-base ${isMobile ? 'w-full justify-start py-2' : ''} ${searchParams.get('category') === category ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
           onClick={() => handleCategoryClick(category)}
         >
           {category}
         </Button>
       ))}
      <Link href="/contact" passHref>
        <Button variant="link" className={`p-0 h-auto text-base ${isMobile ? 'w-full justify-start py-2' : ''} ${pathname === '/contact' ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}>
          Contact
        </Button>
      </Link>
      {/* Add other links like Blog, About if needed */}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between gap-4 px-4 md:px-8">

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 sm:w-72 bg-background p-4">
              <div className="flex flex-col h-full">
                 <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                         <Package2 className="h-6 w-6 text-accent" />
                         <span>GirlyCrafts</span>
                     </Link>
                     <SheetClose asChild>
                         <Button variant="ghost" size="icon">
                             <X className="h-5 w-5" />
                             <span className="sr-only">Close menu</span>
                         </Button>
                     </SheetClose>
                 </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full rounded-full pl-10 pr-4 py-2 h-10 bg-secondary focus:bg-background text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                 </form>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2 flex-grow overflow-y-auto">
                  {renderNavLinks(true)}
                </nav>

                {/* Mobile Footer Links */}
                <div className="mt-auto border-t pt-4 flex justify-around">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <Heart className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <ShoppingBag className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                       <User className="h-5 w-5" />
                     </Button>
                 </div>

                  <div className="flex justify-center gap-4 mt-4">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
                       <Instagram className="h-5 w-5" />
                     </a>
                     <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary">
                       <Facebook className="h-5 w-5" />
                     </a>
                     <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary">
                       <Twitter className="h-5 w-5" />
                     </a>
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
         <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <Package2 className="h-7 w-7 text-accent" />
          <span className="ml-2 text-xl font-bold text-primary hidden sm:inline-block">GirlyCrafts</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
         {renderNavLinks()}
        </nav>

        {/* Desktop Icons & Search */}
        <div className="hidden md:flex items-center gap-4">
          {/* Desktop Search Form */}
          <form onSubmit={handleSearch} className="relative">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
             <Input
               type="search"
               placeholder="Search..."
               className="w-40 lg:w-56 rounded-full pl-9 pr-3 py-1.5 h-9 bg-secondary focus:bg-background text-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </form>
           {/* Placeholder Icons */}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
            <ShoppingBag className="h-5 w-5" />
            {/* Optional: Add item count badge
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
             */}
           </Button>
           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
             <User className="h-5 w-5" />
           </Button>

            {/* Social Links (Optional in Header for Desktop) */}
             {/*
            <Button variant="ghost" size="icon" className="transition-transform hover:scale-110" asChild>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </Button>
            */}

        </div>
      </div>
    </header>
  );
}
```