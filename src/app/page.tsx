import ProductGrid from '@/components/product-grid';
import productsData from '@/data/products.json'; // Import the product data
import type { Product } from '@/lib/types'; // Import the Product type

export default function Home() {
  // Type assertion for the imported JSON data
  const products = productsData as Product[];

  return (
    <section>
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Our Handmade Collection</h1>
      <ProductGrid products={products} />
    </section>
  );
}
