
'use client'; // Keep client-side for accessing searchParams via hook

import ProductGrid from '@/components/product-grid';
import productsData from '@/data/products.json';
import type { Product } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'; // Import Suspense
import Banner from '@/components/banner'; // Import Banner
import CategoryGrid from '@/components/category-grid'; // Import CategoryGrid

// Get unique categories from products
const getCategories = (products: Product[]): string[] => {
  const categories = new Set(products.map(p => p.category));
  return Array.from(categories);
};

// Component that uses the hooks
function HomePageContent() {
  // Hooks can only be called inside Client Components
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'All'; // Get category from URL
  const searchTerm = searchParams.get('search') || ''; // Get search term from URL

  // Type assertion for the imported JSON data
  const products = productsData as Product[];
  const categories = getCategories(products);

  // Determine if a specific category is selected (or if search is active)
  const showProductGrid = category !== 'All' || searchTerm;

  return (
    <>
      {/* Only show Banner and Category Grid if no specific category/search is active */}
      {!showProductGrid && (
        <>
          <Banner />
          <CategoryGrid categories={categories} products={products} />
        </>
      )}

      {/* Always show the ProductGrid section container, title updates based on filter */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        {/* Optional: Title for the products section */}
         <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-primary animate-in fade-in duration-500">
           {category === 'All' && !searchTerm && 'Featured Products'}
           {category !== 'All' && `Category: ${category}`}
           {searchTerm && `Search Results for: "${searchTerm}"`}
         </h2>
        {/* ProductGrid now handles filtering based on props */}
        <ProductGrid products={products} />
      </section>
    </>
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
      <span className="sr-only">Loading...</span>
    </div>
 );
}
