
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  MapPin, 
  ArrowLeft, 
  Truck, 
  AlertCircle,
  Check,
  Clock
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock order data based on id
  const orderData = {
    id: id || "ORD-1234-ABCD",
    date: "April 5, 2025",
    status: "delivered",
    statusHistory: [
      { status: "processing", date: "April 2, 2025", time: "09:15 AM" },
      { status: "shipped", date: "April 3, 2025", time: "02:30 PM" },
      { status: "out_for_delivery", date: "April 5, 2025", time: "08:45 AM" },
      { status: "delivered", date: "April 5, 2025", time: "03:20 PM" }
    ],
    total: 145.99,
    subtotal: 129.99,
    shipping: 10.00,
    tax: 6.00,
    discount: 0,
    payment: {
      method: "Credit Card",
      card: "**** **** **** 4242",
      status: "Paid"
    },
    shipping: {
      method: "Standard Shipping",
      cost: 10.00,
      trackingNumber: "TRK123456789",
      carrier: "FedEx"
    },
    address: {
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      address: "450 Park Avenue, Apt 5B, Upper East Side, Manhattan, New York"
    },
    items: [
      {
        id: 1,
        name: "Premium Leather Jacket",
        image: "/placeholder.svg",
        price: 79.99,
        quantity: 1,
        total: 79.99
      },
      {
        id: 2,
        name: "Designer Sunglasses",
        image: "/placeholder.svg",
        price: 25.00,
        quantity: 2,
        total: 50.00
      }
    ],
    voucher: {
      code: "WELCOME10",
      discount: 10.00
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "processing":
        return 25;
      case "shipped":
        return 50;
      case "out_for_delivery":
        return 75;
      case "delivered":
        return 100;
      case "cancelled":
        return 100;
      default:
        return 0;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "out_for_delivery":
        return <Truck className="h-5 w-5 text-blue-700" />;
      case "delivered":
        return <Check className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/account/orders">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Orders
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <h2 className="text-2xl font-bold">Order {orderData.id}</h2>
        </div>
        <Badge 
          className={
            orderData.status === "delivered" 
              ? "bg-green-500 text-primary-foreground hover:bg-green-500" 
              : orderData.status === "shipped" 
                ? "bg-blue-500 text-primary-foreground hover:bg-blue-500"
                : orderData.status === "processing"
                  ? "bg-yellow-500 text-primary-foreground hover:bg-yellow-500"
                  : "bg-red-500 text-primary-foreground hover:bg-red-500"
          }
        >
          {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
        </Badge>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Order Status</CardTitle>
          <CardDescription>
            Placed on {orderData.date}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={getStatusProgress(orderData.status)} className="h-2" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center pt-2">
              {orderData.statusHistory.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col items-center space-y-2 ${
                    index < orderData.statusHistory.length ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    {getStatusIcon(step.status)}
                  </div>
                  <div>
                    <p className="font-medium">
                      {step.status.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {step.date}, {step.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Order Items
            </CardTitle>
            <CardDescription>
              {orderData.items.length} items in your order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="h-16 w-16 bg-muted rounded-md overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                      <p className="font-medium">${item.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${orderData.shipping.cost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${orderData.tax.toFixed(2)}</span>
                </div>
                
                {orderData.voucher && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({orderData.voucher.code})</span>
                    <span>-${orderData.voucher.discount.toFixed(2)}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {orderData.address.name}<br />
                    {orderData.address.address}<br />
                    {orderData.address.phone}<br />
                    {orderData.address.email}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium">Shipping Method</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {orderData.shipping.method} - ${orderData.shipping.cost.toFixed(2)}
                  </p>
                </div>
                
                {orderData.shipping.trackingNumber && (
                  <div>
                    <h4 className="font-medium">Tracking Information</h4>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground">
                        {orderData.shipping.carrier}: {orderData.shipping.trackingNumber}
                      </p>
                      <Button variant="ghost" size="sm">
                        Track
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Payment Method</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {orderData.payment.method} - {orderData.payment.card}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Payment Status</h4>
                  <Badge 
                    variant="outline" 
                    className="mt-1 bg-green-500/10 text-green-600 hover:bg-green-500/10 hover:text-green-600"
                  >
                    {orderData.payment.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/account/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
        
        <Button asChild>
          <Link to="/products">
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}
