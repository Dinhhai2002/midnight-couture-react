
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function ProductListing() {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", category, searchQuery],
    queryFn: async () => {
      if (searchQuery) {
        return api.searchProducts(searchQuery);
      } else if (category) {
        return api.getProducts(category);
      } else {
        return api.getProducts();
      }
    },
  });
  
  // Determine the title based on the context
  let title = "All Products";
  
  if (searchQuery) {
    title = `Search Results for "${searchQuery}"`;
  } else if (category) {
    // Capitalize first letter of category
    title = `${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }
  
  const [sortOrder, setSortOrder] = React.useState("featured");
  
  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOrder) {
      case "price-low":
        return (a.sale || a.price) - (b.sale || b.price);
      case "price-high":
        return (b.sale || b.price) - (a.sale || a.price);
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        // "featured" - use default order
        return 0;
    }
  });
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">
          {isLoading ? "Loading products..." : `${sortedProducts.length} products found`}
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="text-muted-foreground">
          Filter (coming soon)
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-4 border rounded-lg p-4">
              <div className="aspect-square bg-muted rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 w-1/2 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid products={sortedProducts} />
      )}
    </div>
  );
}
