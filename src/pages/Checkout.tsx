
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form states
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  
  const shippingCost = shippingMethod === "express" ? 15 : 5;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shippingCost + tax;
  
  if (items.length === 0) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-6">Your cart is empty</h1>
        <p className="mb-6 text-muted-foreground">Add some items to your cart before proceeding to checkout.</p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order placed successfully!",
        description: "Check your email for order confirmation.",
      });
      clearCart();
      navigate("/");
    }, 2000);
  };
  
  return (
    <div className="container py-8">
      <div className="flex items-center mb-8 gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/cart">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select defaultValue="ca">
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                        <SelectItem value="il">Illinois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" required />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Shipping Method */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Shipping Method</h2>
                
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                  <div className="flex items-start space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-grow cursor-pointer">
                      <div className="font-medium">Standard Shipping</div>
                      <div className="text-sm text-muted-foreground">Delivery in 5-7 business days</div>
                      <div className="font-medium mt-1">$5.00</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-grow cursor-pointer">
                      <div className="font-medium">Express Shipping</div>
                      <div className="text-sm text-muted-foreground">Delivery in 1-3 business days</div>
                      <div className="font-medium mt-1">$15.00</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              {/* Payment Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-medium">Payment Method</h2>
                
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="cursor-pointer">Credit Card</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-y-0 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === "credit-card" && (
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="0000 0000 0000 0000" required />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiration Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name-on-card">Name on Card</Label>
                      <Input id="name-on-card" required />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="lg:hidden">
                <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                </Button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border p-6 space-y-6 sticky top-24">
            <h2 className="font-semibold text-xl">Order Summary</h2>
            
            <div className="space-y-4 max-h-64 overflow-auto">
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
                      <span className="font-medium">{item.name}</span>
                      <span>${((item.sale || item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × ${(item.sale || item.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="hidden lg:block">
              <Button type="submit" className="w-full" size="lg" disabled={isProcessing} onClick={handleSubmit}>
                {isProcessing ? "Processing..." : `Complete Purchase`}
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>
                By completing your purchase, you agree to our{" "}
                <Link to="/terms" className="underline underline-offset-2">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
