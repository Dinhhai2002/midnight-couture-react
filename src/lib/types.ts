
export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  sale?: number;
  new?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export type CartItem = Product & {
  quantity: number;
};
