export interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
}

export interface FilterState {
  title: string;
  brand: string | null;
  category: string | null;
  price: string | null;
  rating: string | null;
}
