
'use client'; // Make this a client component to access searchParams

import ProductGrid from '@/components/product-grid';
import productsData from '@/data/products.json';
import type { Product } from '@/lib/types';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import { Suspense } from 'react'; // Import Suspense

// Create a component that uses the hook, as hooks can only be called in Client Components
function HomePageContent() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || ''; // Get search term from URL

  // Type assertion for the imported JSON data
  const products = productsData as Product[];

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8 text-center text-primary animate-in fade-in duration-500">
        Our Handmade Collection
      </h1>
      {/* Pass the search term to the ProductGrid */}
      <ProductGrid products={products} searchTerm={searchTerm} />
    </section>
  );
}


// Wrap the client component in Suspense for better handling of searchParams
export default function Home() {
 return (
    <Suspense fallback={<LoadingSpinner />}> {/* Add a loading state */}
       <HomePageContent />
    </Suspense>
 );
}

// Simple loading spinner component (optional)
function LoadingSpinner() {
 return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    </div>
 );
}
