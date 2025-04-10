
import axios from "axios";
import { Product, Category } from "./types";

// Mock data to simulate API calls
const categories: Category[] = [
  { id: 1, name: "Fashion", slug: "fashion" },
  { id: 2, name: "Accessories", slug: "accessories" },
  { id: 3, name: "Shoes", slug: "shoes" },
  { id: 4, name: "Hats", slug: "hats" }
];

const products: Product[] = [
  {
    id: 1,
    name: "White Oversized T-Shirt",
    price: 59.99,
    images: ["/placeholder.svg", "/placeholder.svg"],
    description: "A luxurious oversized t-shirt made from premium cotton.",
    category: "fashion",
    rating: 4.5,
    reviews: 12,
    stock: 50,
    new: true
  },
  {
    id: 2,
    name: "Black Slim Fit Jeans",
    price: 89.99,
    images: ["/placeholder.svg", "/placeholder.svg"],
    description: "Sleek black jeans with a modern cut and premium denim.",
    category: "fashion",
    rating: 4.2,
    reviews: 8,
    stock: 35
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 129.99,
    images: ["/placeholder.svg", "/placeholder.svg"],
    description: "Elegant leather crossbody bag with minimalist design.",
    category: "accessories",
    rating: 4.7,
    reviews: 18,
    stock: 15
  },
  {
    id: 4,
    name: "Silver Statement Earrings",
    price: 45.99,
    images: ["/placeholder.svg", "/placeholder.svg"],
    description: "Bold silver earrings to elevate any outfit.",
    category: "accessories",
    rating: 4.3,
    reviews: 6,
    stock: 25,
    sale: 35.99
  },
  {
    id: 5,
    name: "Leather Chelsea Boots",
    price: 189.99,
    images: ["/placeholder.svg", "/placeholder.svg"],
    description: "Classic leather chelsea boots with elastic side panels.",
    category: "shoes",
    rating: 4.8,
    reviews: 24,
    stock: 10
  },
  {
    id: 6,
    name: "Canvas Sneakers",
    price: 79.99,
    images: ["/placeholder.svg", "/placeholder.svg"],
    description: "Casual canvas sneakers perfect for everyday wear.",
    category: "shoes",
    rating: 4.1,
    reviews: 15,
    stock: 30,
    sale: 59.99
  },
  {
    id: 7,
    name: "Wide Brim Fedora",
    price: 65.99,
    images: ["/placeholder.svg", "/placeholder.svg"],
    description: "Stylish wide brim fedora hat for all seasons.",
    category: "hats",
    rating: 4.6,
    reviews: 9,
    stock: 20
  },
  {
    id: 8,
    name: "Wool Beanie",
    price: 35.99,
    images: ["/placeholder.svg", "/placeholder.svg"],
    description: "Warm wool beanie with ribbed texture.",
    category: "hats",
    rating: 4.4,
    reviews: 11,
    stock: 45,
    new: true
  }
];

// Mock API service
const api = {
  getCategories: async (): Promise<Category[]> => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(categories), 500);
    });
  },
  
  getProducts: async (category?: string): Promise<Product[]> => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        if (category) {
          resolve(products.filter(product => product.category === category));
        } else {
          resolve(products);
        }
      }, 800);
    });
  },
  
  getProduct: async (id: number): Promise<Product | undefined> => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.find(product => product.id === id));
      }, 600);
    });
  },
  
  searchProducts: async (query: string): Promise<Product[]> => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = products.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) || 
          product.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 700);
    });
  }
};

export default api;
