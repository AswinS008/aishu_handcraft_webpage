
'use client'; // Make header client-side for routing and mobile menu state

import Link from 'next/link';
import { Package2, Instagram, Facebook, Twitter, Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { motion } from 'framer-motion'; // Added for potential dynamic island animation

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
         className={`p-0 h-auto text-base font-medium ${isMobile ? 'w-full justify-start py-3 text-lg' : 'text-sm'} ${pathname === '/' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
         onClick={() => handleLinkClick('/')}
       >
         Home
       </Button>
      {/* Removed category links */}
      <Button
        variant="link"
        className={`p-0 h-auto text-base font-medium ${isMobile ? 'w-full justify-start py-3 text-lg' : 'text-sm'} ${pathname === '/contact' ? 'text-primary' : 'text-foreground hover:text-primary'}`}
        onClick={() => handleLinkClick('/contact')}
      >
        Contact
      </Button>
      {/* Add other links like Blog, About if needed */}
    </>
  );

  return (
     <motion.header
       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'top-2 mx-auto max-w-4xl' : 'w-full'}`} // Basic dynamic island positioning attempt
       initial={{ y: -100 }}
       animate={{ y: 0 }}
       transition={{ type: 'spring', stiffness: 100, damping: 20 }}
     >
      <div className={`flex h-16 items-center justify-between gap-4 px-4 md:px-8 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-background/90 backdrop-blur-md shadow-lg border border-border/40 rounded-full' : 'bg-background border-b border-border/40' }`}>

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

                {/* Mobile Footer Links */}
                <div className="mt-auto border-t pt-6 flex justify-around">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <Heart className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <ShoppingBag className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                       <User className="h-6 w-6" />
                     </Button>
                 </div>

                  <div className="flex justify-center gap-6 mt-6">
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
        <nav className="hidden md:flex items-center gap-6">
         {renderNavLinks()}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-2">
           {/* Placeholder Icons */}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Heart className="h-5 w-5" />
             <span className="sr-only">Wishlist</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
            <ShoppingBag className="h-5 w-5" />
             <span className="sr-only">Shopping Bag</span>
            {/* Optional: Add item count badge */}
           </Button>
           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
             <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
           </Button>
           {/* Search Icon - Kept for potential future use */}
           <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
             <Search className="h-5 w-5" />
              <span className="sr-only">Search (Not Implemented)</span>
           </Button>

        </div>
      </div>
     </motion.header>
  );
}
