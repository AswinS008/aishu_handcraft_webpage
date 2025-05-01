
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // Keep price as number, formatting handled in component
  imageUrl: string;
  category: string;
  soldOut?: boolean;
  discount?: number; // Percentage discount, e.g., 10 for 10%
  popularity?: number; // Optional field for sorting by popularity (e.g., sales count, views)
  customizable?: boolean; // Indicates if the product offers customization
  // Consider adding currency field if supporting multiple currencies later:
  // currency?: 'INR' | 'USD';
}
