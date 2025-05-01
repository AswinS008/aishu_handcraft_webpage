
'use client'; // Keep client-side for accessing searchParams via hook

import ProductGrid from '@/components/product-grid';
import productsData from '@/data/products.json';
import type { Product } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'; // Import Suspense
import Banner from '@/components/banner'; // Import Banner
import CategoryGrid from '@/components/category-grid'; // Import CategoryGrid
import CategoryTabs from '@/components/category-tabs'; // Import CategoryTabs

// Get unique categories from products
const getCategories = (products: Product[]): string[] => {
  const categories = new Set(products.map(p => p.category));
  // Ensure 'All' is always the first category
  return ['All', ...Array.from(categories)];
};

// Component that uses the hooks
function HomePageContent() {
  // Hooks can only be called inside Client Components
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'All'; // Get category from URL
  const searchTerm = searchParams.get('search') || ''; // Get search term from URL (keep for future)

  // Type assertion for the imported JSON data
  const products = productsData as Product[];
  const categories = getCategories(products);
  // Filter out 'All' for the grid display
  const gridCategories = categories.filter(cat => cat !== 'All');

  return (
    <>
       {/* Banner is always shown */}
       <Banner />

       {/* NEW: Category Grid Section */}
       <section className="container mx-auto px-4 py-8 md:py-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-primary animate-in fade-in duration-500">
                Shop By Category
            </h2>
            <CategoryGrid categories={gridCategories} />
       </section>

       {/* Category Tabs placed below category grid */}
       <CategoryTabs categories={categories} />

       {/* Product Grid Section */}
      <section className="container mx-auto px-4 pt-8 md:pt-12"> {/* Removed py, add pt */}
        {/* Optional: Title for the products section - Hide when 'All' is selected */}
         {category !== 'All' && (
           <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-primary animate-in fade-in duration-500">
              {`Category: ${category}`}
           </h2>
          )}
         {searchTerm && ( // Keep search title logic if search is added later
           <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-primary animate-in fade-in duration-500">
             {`Search Results for: "${searchTerm}"`}
           </h2>
         )}

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
