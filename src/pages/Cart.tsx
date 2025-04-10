
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import { 
  MinusCircle, 
  PlusCircle, 
  Trash2, 
  ArrowRight, 
  ShoppingCart
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CartItem } from "@/lib/types";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  
  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingCart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border overflow-hidden">
              <div className="grid grid-cols-12 p-4 bg-muted/30 text-sm font-medium">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 p-4 items-center">
                    <div className="col-span-6 flex gap-4">
                      <div className="w-20 flex-shrink-0">
                        <AspectRatio ratio={1} className="bg-muted">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="object-cover w-full h-full rounded"
                          />
                        </AspectRatio>
                      </div>
                      <div className="flex flex-col">
                        <Link to={`/product/${item.id}`} className="font-medium hover:underline">
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive mt-1 w-fit"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="col-span-2 text-center">
                      {item.sale ? (
                        <div>
                          <span className="font-medium">${item.sale.toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground line-through block">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <div className="col-span-2 flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                      >
                        <MinusCircle className="w-5 h-5" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        disabled={item.quantity >= (item.stock || 10)}
                        className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                      >
                        <PlusCircle className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="col-span-2 text-right font-medium">
                      ${((item.sale || item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button asChild variant="outline">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border p-6 space-y-4 sticky top-24">
              <h2 className="font-semibold text-lg">Order Summary</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <Button asChild className="w-full mt-4" size="lg">
                <Link to="/checkout" className="flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
