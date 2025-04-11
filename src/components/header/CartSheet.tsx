
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../CartContext";

export default function CartSheet() {
  const { items, itemCount, subtotal, removeItem } = useCart();

  return (
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
  );
}
