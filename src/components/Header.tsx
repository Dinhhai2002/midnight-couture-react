
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items, itemCount, subtotal, removeItem } = useCart();
  const navigate = useNavigate();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: api.getCategories
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
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
                <SheetTitle>Your Cart ({itemCount} items)</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                {itemCount === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="flex flex-col gap-4 max-h-[60vh] overflow-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 flex-shrink-0">
                          <AspectRatio ratio={1} className="bg-muted">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="object-cover w-full h-full rounded"
                            />
                          </AspectRatio>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <Link to={`/product/${item.id}`} className="font-medium hover:underline">
                              {item.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive"
                              aria-label="Remove item"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.quantity} × ${(item.sale || item.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {itemCount > 0 && (
                  <>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-medium">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Shipping and taxes calculated at checkout
                    </p>
                  </>
                )}
              </div>
              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <SheetClose asChild>
                  <Button 
                    className="w-full"
                    asChild
                    disabled={itemCount === 0}
                  >
                    <Link to="/cart">View Cart</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button 
                    className="w-full"
                    variant="outline"
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
                to="/cart" 
                className="py-2 flex items-center gap-2 nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({itemCount})</span>
              </Link>
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
