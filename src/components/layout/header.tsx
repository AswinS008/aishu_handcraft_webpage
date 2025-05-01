
'use client'; // Make header client-side for routing and mobile menu state

import Link from 'next/link';
import { Package2, Instagram, Facebook, Twitter, Menu, X, ChevronDown } from 'lucide-react'; // Removed Search, ShoppingBag, Heart, User
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { motion } from 'framer-motion';
import SearchCategoryDropdown from '@/components/search-category-dropdown'; // Import the new component
import productsData from '@/data/products.json';
import type { Product } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import Dropdown components

// Get unique categories from products (can be reused or moved to a util)
const getCategories = (products: Product[]): string[] => {
  const categories = new Set(products.map(p => p.category));
  return ['All', ...Array.from(categories)]; // Ensure 'All' is always an option if needed elsewhere
};

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Get categories for the dropdown
  const products = productsData as Product[];
  const categories = getCategories(products).filter(cat => cat !== 'All'); // Exclude 'All' from dropdown trigger

  // Effect to detect scroll position for dynamic island styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Adjust threshold as needed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Simplified handle click for navigation items
  const handleLinkClick = (path: string) => {
     router.push(path);
     if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu
  }
   // Handle category selection from dropdown
   const handleCategorySelect = (category: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (category === 'All') {
      currentParams.delete('category');
    } else {
      currentParams.set('category', category);
    }
    currentParams.delete('search'); // Clear search when category changes
    router.push(`/?${currentParams.toString()}`, { scroll: false });
    if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu
  };


  const handleLogoClick = () => {
     // Navigate to home, clearing category filters
     const currentParams = new URLSearchParams(searchParams.toString());
     currentParams.delete('category');
     currentParams.delete('search');
     router.push(`/?${currentParams.toString()}`, { scroll: false });
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
         className={`p-0 h-auto font-medium ${isMobile ? 'w-full justify-start py-3 text-lg' : 'text-sm'} ${pathname === '/' && !searchParams.get('category') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
         onClick={() => handleLinkClick('/')}
       >
         Home
       </Button>
        {/* Categories Dropdown */}
       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button
             variant="link"
             className={`p-0 h-auto font-medium ${isMobile ? 'w-full justify-start py-3 text-lg' : 'text-sm'} text-foreground hover:text-primary`}
           >
             Categories <ChevronDown className="ml-1 h-4 w-4" />
           </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align={isMobile ? "start" : "center"}>
             {categories.map((category) => (
             <DropdownMenuItem key={category} onClick={() => handleCategorySelect(category)}>
                 {category}
             </DropdownMenuItem>
             ))}
         </DropdownMenuContent>
       </DropdownMenu>
      <Button
        variant="link"
        className={`p-0 h-auto font-medium ${isMobile ? 'w-full justify-start py-3 text-lg' : 'text-sm'} ${pathname === '/contact' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
        onClick={() => handleLinkClick('/contact')}
      >
        Contact
      </Button>
    </>
  );

  return (
     <motion.header
       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'top-2 mx-auto max-w-6xl' : 'w-full'}`} // Increased max-width for centered search
       initial={{ y: -100 }}
       animate={{ y: 0 }}
       transition={{ type: 'spring', stiffness: 100, damping: 20 }}
     >
      <div className={`flex h-16 items-center justify-between gap-4 px-4 md:px-6 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-background/90 backdrop-blur-md shadow-lg border border-border/40 rounded-full' : 'bg-background border-b border-border/40' }`}>

        {/* Left Section: Mobile Menu Trigger (always present for layout consistency) & Logo */}
        <div className="flex items-center gap-2">
            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 sm:w-80 bg-background p-6 shadow-xl">
                  <div className="flex flex-col h-full">
                     <div className="flex justify-between items-center mb-8">
                        {/* Logo inside mobile menu */}
                        <div className="flex items-center gap-2 font-semibold text-primary cursor-pointer" onClick={handleLogoClick}>
                          <Package2 className="h-6 w-6 text-accent" />
                          <span className="text-lg">GirlyCrafts</span>
                        </div>
                         <SheetClose asChild>
                             <Button variant="ghost" size="icon">
                                 <X className="h-5 w-5" />
                                 <span className="sr-only">Close menu</span>
                             </Button>
                         </SheetClose>
                     </div>

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col gap-4 flex-grow">
                      {renderNavLinks(true)}
                    </nav>

                    {/* Mobile Social Links */}
                      <div className="flex justify-center gap-6 mt-6 border-t pt-6">
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
        </div>


        {/* Center Section: Search/Category Dropdown */}
        <div className="flex-1 flex justify-center px-4">
           <div className="w-full max-w-xs md:max-w-sm lg:max-w-md"> {/* Control width of search */}
                <SearchCategoryDropdown categories={categories} />
           </div>
        </div>


        {/* Right Section: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 md:gap-6">
         {renderNavLinks()}
        </nav>

      </div>
     </motion.header>
  );
}
