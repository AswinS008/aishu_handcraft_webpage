
'use client'; // Make header client-side for routing and mobile menu state

import Link from 'next/link';
import { Package2, Instagram, Facebook, Twitter, Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react'; // Keep Search icon for potential future use or visual consistency
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input'; // Removed Input import
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
  // const initialSearchTerm = searchParams.get('search') || ''; // Removed search state
  // const [searchTerm, setSearchTerm] = useState(initialSearchTerm); // Removed search state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = getCategories(productsData as Product[]);

  // Update search term state if URL changes - Removed effect related to search term
  // useEffect(() => {
  //   setSearchTerm(initialSearchTerm);
  // }, [initialSearchTerm]);

  // Removed handleSearch function
  // const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const currentParams = new URLSearchParams(searchParams.toString());
  //   if (searchTerm.trim()) {
  //     currentParams.set('search', searchTerm.trim());
  //   } else {
  //     currentParams.delete('search');
  //   }
  //   // Navigate to home page with search query
  //   router.push(`/?${currentParams.toString()}`);
  //    if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu on search
  // };

  const handleCategoryClick = (category: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      currentParams.delete('category');
    } else {
      currentParams.set('category', category);
    }
    currentParams.delete('search'); // Clear search when category changes (if search existed)
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
      <Button
         variant="link"
         className={`p-0 h-auto text-base ${isMobile ? 'w-full justify-start py-2' : ''} ${pathname === '/' && !searchParams.get('category') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
         onClick={() => handleCategoryClick('All')} // Click Home/All resets to show all categories/featured
       >
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
                    {/* Logo inside mobile menu */}
                    <div className="flex items-center gap-2 font-semibold text-primary cursor-pointer" onClick={handleLogoClick}>
                      <Package2 className="h-6 w-6 text-accent" />
                      <span>GirlyCrafts</span>
                    </div>
                     <SheetClose asChild>
                         <Button variant="ghost" size="icon">
                             <X className="h-5 w-5" />
                             <span className="sr-only">Close menu</span>
                         </Button>
                     </SheetClose>
                 </div>

                {/* Removed Mobile Search */}
                {/* <form onSubmit={handleSearch} className="relative mb-4"> ... </form> */}

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

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Removed Desktop Search Form */}
          {/* <form onSubmit={handleSearch} className="relative"> ... </form> */}

           {/* Placeholder Icons */}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Heart className="h-5 w-5" />
             <span className="sr-only">Wishlist</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
            <ShoppingBag className="h-5 w-5" />
             <span className="sr-only">Shopping Bag</span>
            {/* Optional: Add item count badge
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
             */}
           </Button>
           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
             <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
           </Button>

        </div>
      </div>
    </header>
  );
}
