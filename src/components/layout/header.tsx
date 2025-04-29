import Link from 'next/link';
import { Package2, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
          <Package2 className="h-6 w-6 text-accent" />
          <span className="text-lg">GirlyCrafts Showcase</span>
        </Link>
        <nav className="flex items-center gap-4">
          {/* Placeholder for potential future navigation like About, Blog etc. */}
          {/* <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">About</Link> */}
          <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Contact</Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </Button>
             <Button variant="ghost" size="icon" asChild>
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
