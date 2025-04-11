
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartContext";
import { Badge } from "@/components/ui/badge";

// Import new modular components
import SearchBar from "./header/SearchBar";
import CategoryLinks from "./header/CategoryLinks";
import MobileSearch from "./header/MobileSearch";
import MobileMenu from "./header/MobileMenu";
import CartSheet from "./header/CartSheet";

export default function Header() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight">LUXE</span>
          </Link>
        </div>
        
        <div className="hidden md:flex flex-col items-center gap-2 flex-1 max-w-xl mx-auto">
          <SearchBar />
          <CategoryLinks />
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          
          <Link to="/account">
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          <CartSheet />
        </div>
        
        {/* Mobile menu */}
        <div className="flex items-center md:hidden gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => setShowSuggestions(!showSuggestions)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <ThemeToggle />
          
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile search bar overlay */}
      <MobileSearch 
        showSearch={showSuggestions} 
        setShowSearch={setShowSuggestions} 
      />
      
      {/* Mobile menu overlay */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        onSearch={handleSearch}
      />
    </header>
  );
}
