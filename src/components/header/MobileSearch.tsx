
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import CategoryLinks from "./CategoryLinks";

interface MobileSearchProps {
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
}

export default function MobileSearch({ showSearch, setShowSearch }: MobileSearchProps) {
  if (!showSearch) return null;

  return (
    <div className="md:hidden border-b">
      <div className="container py-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Search Products</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={() => setShowSearch(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <SearchBar 
          isMobile 
          onProductClick={() => setShowSearch(false)} 
        />
        
        {/* Mobile categories */}
        <div className="overflow-x-auto py-2 scrollbar-hide">
          <CategoryLinks 
            onCategoryClick={() => setShowSearch(false)}
            className="gap-3 overflow-x-auto"
          />
        </div>
      </div>
    </div>
  );
}
