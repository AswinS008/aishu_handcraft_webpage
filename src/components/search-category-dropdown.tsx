
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ListFilter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchCategoryDropdownProps {
  categories: string[]; // Expects categories excluding 'All'
}

export default function SearchCategoryDropdown({ categories }: SearchCategoryDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Optionally trigger navigation immediately on category change,
    // or wait for search button click/enter press
    const currentParams = new URLSearchParams(searchParams.toString());
    if (value === 'All') {
      currentParams.delete('category');
    } else {
      currentParams.set('category', value);
    }
    // Keep existing search term or clear it? Decision: Keep it for now.
    // if (searchTerm) {
    //   currentParams.set('search', searchTerm);
    // } else {
    //   currentParams.delete('search');
    // }
    router.push(`/?${currentParams.toString()}`, { scroll: false });
  };

  const handleSearchSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault(); // Prevent default form submission if used
    const currentParams = new URLSearchParams(searchParams.toString());

    if (selectedCategory === 'All') {
      currentParams.delete('category');
    } else {
      currentParams.set('category', selectedCategory);
    }

    if (searchTerm.trim()) {
      currentParams.set('search', searchTerm.trim());
    } else {
      currentParams.delete('search');
    }

    router.push(`/?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex w-full items-center space-x-1 md:space-x-2 bg-secondary/50 border border-border/50 rounded-full px-1 py-1 h-10 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:border-primary transition-all">
        {/* Category Select */}
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger
            className={cn(
                "h-full w-auto min-w-[80px] md:min-w-[120px] rounded-l-full border-0 bg-transparent pl-3 pr-2 text-xs md:text-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:outline-none shadow-none",
                selectedCategory !== 'All' && "text-foreground font-medium" // Highlight if not 'All'
            )}
            aria-label="Select Category"
          >
             <ListFilter className="h-3.5 w-3.5 mr-1 hidden sm:inline-block"/>
             <SelectValue placeholder="All Categories"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Separator */}
        <div className="h-4 w-px bg-border/70 mx-1"></div>

        {/* Search Input */}
        <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-full flex-grow bg-transparent border-0 rounded-none px-2 py-1 text-sm focus:ring-0 focus:ring-offset-0 focus:outline-none shadow-none placeholder:text-muted-foreground"
            aria-label="Search products"
        />

        {/* Search Button */}
        <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary flex-shrink-0"
            aria-label="Submit search"
        >
            <Search className="h-4 w-4" />
        </Button>
    </form>
  );
}
