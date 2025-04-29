
'use client'; // Keep client-side for accessing searchParams via hook

import ProductGrid from '@/components/product-grid';
import productsData from '@/data/products.json';
import type { Product } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'; // Import Suspense

// Component that uses the hooks
function HomePageContent() {
  // Hooks can only be called inside Client Components
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'All'; // Get category from URL
  const searchTerm = searchParams.get('search') || ''; // Get search term from URL

  // Type assertion for the imported JSON data
  const products = productsData as Product[];

  return (
    <section>
      {/* Optionally add a title based on category/search */}
      {/* <h1 className="text-3xl font-bold mb-8 text-center text-primary animate-in fade-in duration-500">
        {category === 'All' && !searchTerm && 'Our Handmade Collection'}
        {category !== 'All' && `Category: ${category}`}
        {searchTerm && `Search Results for: "${searchTerm}"`}
      </h1> */}
       {/* ProductGrid now handles filtering based on props */}
      <ProductGrid products={products} />
    </section>
  );
}

// Main page component - Use Suspense to wrap the client component
export default function Home() {
 return (
    // Suspense is required because HomePageContent reads searchParams
    <Suspense fallback={<LoadingSpinner />}>
       <HomePageContent />
    </Suspense>
 );
}

// Simple loading spinner component
function LoadingSpinner() {
 return (
    <div className="flex justify-center items-center h-96"> {/* Increased height */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      <span className="sr-only">Loading products...</span>
    </div>
 );
}
