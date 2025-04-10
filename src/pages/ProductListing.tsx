
import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProductListing() {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  
  // Filter states
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
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
  
  // Available colors and sizes
  const colors = [
    { name: "Black", value: "black", color: "bg-black" },
    { name: "White", value: "white", color: "bg-white border" },
    { name: "Red", value: "red", color: "bg-red-500" },
    { name: "Blue", value: "blue", color: "bg-blue-500" },
    { name: "Green", value: "green", color: "bg-green-500" },
    { name: "Yellow", value: "yellow", color: "bg-yellow-400" },
    { name: "Purple", value: "purple", color: "bg-purple-500" },
    { name: "Pink", value: "pink", color: "bg-pink-400" },
    { name: "Gray", value: "gray", color: "bg-gray-400" },
    { name: "Brown", value: "brown", color: "bg-amber-800" },
  ];
  
  const sizes = [
    { name: "XS", value: "xs" },
    { name: "S", value: "s" },
    { name: "M", value: "m" },
    { name: "L", value: "l" },
    { name: "XL", value: "xl" },
    { name: "XXL", value: "xxl" },
  ];
  
  // Determine the title based on the context
  let title = "All Products";
  
  if (searchQuery) {
    title = `Search Results for "${searchQuery}"`;
  } else if (category) {
    // Capitalize first letter of category
    title = `${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }
  
  const [sortOrder, setSortOrder] = useState("featured");
  
  // Filter products based on selected colors and sizes
  const filteredProducts = products.filter(product => {
    // For demo, pretend each product has colors and sizes properties
    // In a real app, these would come from the API
    const productColors = ["black", "white", "red"]; // Placeholder
    const productSizes = ["s", "m", "l"]; // Placeholder

    const colorMatch = selectedColors.length === 0 || 
      selectedColors.some(color => productColors.includes(color));
    
    const sizeMatch = selectedSizes.length === 0 || 
      selectedSizes.some(size => productSizes.includes(size));
    
    return colorMatch && sizeMatch;
  });
  
  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
  
  const toggleColorFilter = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  const toggleSizeFilter = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
  };
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">
          {isLoading ? "Loading products..." : `${sortedProducts.length} products found`}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block">
          <div className="sticky top-24 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Filters</h2>
              {(selectedColors.length > 0 || selectedSizes.length > 0) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Colors</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => setIsColorOpen(!isColorOpen)}
                >
                  {isColorOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
              </div>
              
              {isColorOpen && (
                <ScrollArea className="h-48">
                  <div className="space-y-2 p-1">
                    {colors.map((color) => (
                      <div key={color.value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`color-${color.value}`} 
                          checked={selectedColors.includes(color.value)}
                          onCheckedChange={() => toggleColorFilter(color.value)}
                        />
                        <div className={`w-4 h-4 rounded-full ${color.color}`} />
                        <Label htmlFor={`color-${color.value}`}>{color.name}</Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
            
            <Separator />
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Sizes</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => setIsSizeOpen(!isSizeOpen)}
                >
                  {isSizeOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
              </div>
              
              {isSizeOpen && (
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {sizes.map((size) => (
                    <Button
                      key={size.value}
                      variant={selectedSizes.includes(size.value) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSizeFilter(size.value)}
                      className="w-full"
                    >
                      {size.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Product Grid and Mobile Filter */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            {/* Mobile Filter Button */}
            <div className="md:hidden">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                Filters
              </Button>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
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
          
          {/* Mobile Filters */}
          <Collapsible open={showFilters} onOpenChange={setShowFilters} className="md:hidden mb-6">
            <CollapsibleContent>
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">Filters</h2>
                  {(selectedColors.length > 0 || selectedSizes.length > 0) && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear all
                    </Button>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <Button
                        key={color.value}
                        variant={selectedColors.includes(color.value) ? "default" : "outline"}
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => toggleColorFilter(color.value)}
                      >
                        <div className={`w-3 h-3 rounded-full ${color.color}`} />
                        {color.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <Button
                        key={size.value}
                        variant={selectedSizes.includes(size.value) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleSizeFilter(size.value)}
                      >
                        {size.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={() => setShowFilters(false)} 
                    className="w-full"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
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
      </div>
    </div>
  );
}
