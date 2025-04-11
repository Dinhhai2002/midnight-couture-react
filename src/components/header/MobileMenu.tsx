
import { Link } from "react-router-dom";
import { X, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CategoryLinks from "./CategoryLinks";
import { useCart } from "../CartContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export default function MobileMenu({ isOpen, onClose, onSearch }: MobileMenuProps) {
  const { itemCount } = useCart();
  
  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = formData.get('query')?.toString() || '';
    
    if (query.trim()) {
      onSearch(query);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-fade-in">
      <div className="container h-full flex flex-col">
        <div className="flex items-center justify-between py-4">
          <Link 
            to="/" 
            className="font-bold text-xl tracking-tight"
            onClick={onClose}
          >
            LUXE
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSearch} className="relative mb-8 mt-4">
          <Input
            name="query"
            type="search"
            placeholder="Search..."
            className="pr-8"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 -translate-y-1/2"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
        
        <nav className="flex flex-col gap-4 text-lg">
          <Link 
            to="/" 
            className="py-2 nav-link"
            onClick={onClose}
          >
            Home
          </Link>
          <CategoryLinks 
            onCategoryClick={onClose} 
            className="flex-col gap-2 text-lg"
          />
          <Link 
            to="/cart" 
            className="py-2 flex items-center gap-2 nav-link"
            onClick={onClose}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart ({itemCount})</span>
          </Link>
          <Link 
            to="/account" 
            className="py-2 flex items-center gap-2 nav-link"
            onClick={onClose}
          >
            <User className="h-5 w-5" />
            <span>Account</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
