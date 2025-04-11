
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/lib/types";
import api from "@/lib/api";

interface SearchBarProps {
  isMobile?: boolean;
  onProductClick?: () => void;
}

export default function SearchBar({ isMobile = false, onProductClick }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Fetch all products for search suggestions
  const { data: allProducts = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => api.getProducts()
  });

  // Filter products based on search query
  const filteredProducts = allProducts
    .filter((product: Product) => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5); // Limit to 5 results for dropdown

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSuggestions(false);
      if (onProductClick) onProductClick();
    }
  };
  
  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setSearchQuery("");
    setShowSuggestions(false);
    if (onProductClick) onProductClick();
  };
  
  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={searchResultsRef}>
      <form onSubmit={handleSearch} className="relative w-full">
        <Input
          type="search"
          placeholder="Search products..."
          className="pr-8"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => setShowSuggestions(searchQuery.length > 0)}
          autoFocus={isMobile}
        />
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 -translate-y-1/2"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>
      
      {/* Search Results Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-80 overflow-auto">
          {isLoadingProducts ? (
            <div className="p-4 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded" />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div>
              {filteredProducts.map((product: Product) => (
                <div 
                  key={product.id}
                  className="flex items-center gap-3 p-2 hover:bg-muted cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="h-10 w-10 bg-muted rounded overflow-hidden">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      ${(product.sale || product.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-2 border-t">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-primary" 
                  size="sm"
                  onClick={() => {
                    handleSearch({ preventDefault: () => {} } as React.FormEvent);
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search for "{searchQuery}"
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
