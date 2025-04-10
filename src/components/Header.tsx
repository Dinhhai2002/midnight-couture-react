
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  Search, ShoppingCart, User, Menu, X 
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "./CartContext";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import api from "@/lib/api";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: api.getCategories
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search navigation
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight">LUXE</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="nav-link">Home</Link>
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/category/${category.slug}`}
                className="nav-link"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative w-60">
            <Input
              type="search"
              placeholder="Search..."
              className="pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
          
          <ThemeToggle />
          
          <Link to="/account">
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                {/* Cart items will be rendered here */}
                <div className="flex flex-col gap-4">
                  {itemCount === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">
                      Your cart is empty
                    </p>
                  ) : (
                    <p className="text-center py-8">
                      {itemCount} items in your cart
                    </p>
                  )}
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button 
                    className="w-full"
                    asChild
                    disabled={itemCount === 0}
                  >
                    <Link to="/checkout">Checkout</Link>
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Mobile menu */}
        <div className="flex items-center md:hidden gap-2">
          <ThemeToggle />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                {/* Cart items will be rendered here */}
                <div className="flex flex-col gap-4">
                  {itemCount === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">
                      Your cart is empty
                    </p>
                  ) : (
                    <p className="text-center py-8">
                      {itemCount} items in your cart
                    </p>
                  )}
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button 
                    className="w-full"
                    asChild
                    disabled={itemCount === 0}
                  >
                    <Link to="/checkout">Checkout</Link>
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
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
      
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="container h-full flex flex-col">
            <div className="flex items-center justify-between py-4">
              <Link 
                to="/" 
                className="font-bold text-xl tracking-tight"
                onClick={() => setMobileMenuOpen(false)}
              >
                LUXE
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <form onSubmit={handleSearch} className="relative mb-8 mt-4">
              <Input
                type="search"
                placeholder="Search..."
                className="pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {categories.map((category) => (
                <Link 
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="py-2 nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link 
                to="/account" 
                className="py-2 flex items-center gap-2 nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
