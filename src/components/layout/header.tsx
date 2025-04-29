
import Link from 'next/link';
import { Package2, Instagram, Facebook, Twitter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// This is a server component, so search state needs to be managed client-side where it's used (e.g., home page)
// or passed via URL params. Here, we just provide the input field.
export default function Header({ initialSearchTerm }: { initialSearchTerm?: string }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-primary mr-4">
          <Package2 className="h-6 w-6 text-accent" />
          <span className="hidden sm:inline-block text-lg whitespace-nowrap">GirlyCrafts Showcase</span>
        </Link>

        {/* Search Input - Form submission could trigger navigation or client-side filtering */}
        <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md">
           {/* On small screens, consider replacing this with an icon button opening a search modal/drawer */}
           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           <Input
             type="search"
             placeholder="Search products..."
             className="w-full rounded-full pl-10 pr-4 py-2 h-10 bg-secondary focus:bg-background"
             name="search" // Name attribute is useful if wrapped in a form
             defaultValue={initialSearchTerm} // Controlled by client component state usually
             // onChange={(e) => onSearchChange(e.target.value)} // Handler would be passed from client parent
           />
        </div>


        <nav className="flex items-center gap-2 sm:gap-4">
          {/* Placeholder for potential future navigation like About, Blog etc. */}
          {/* <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">About</Link> */}
          <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary whitespace-nowrap">Contact</Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="transition-transform hover:scale-110" asChild>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="transition-transform hover:scale-110" asChild>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </Button>
             <Button variant="ghost" size="icon" className="transition-transform hover:scale-110" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
