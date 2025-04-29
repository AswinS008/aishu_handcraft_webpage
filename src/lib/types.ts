export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  soldOut?: boolean;
  discount?: number; // Percentage discount, e.g., 10 for 10%
  popularity?: number; // Optional field for sorting by popularity (e.g., sales count, views)
}
