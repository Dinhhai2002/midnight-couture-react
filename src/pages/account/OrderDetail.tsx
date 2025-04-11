
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertCircle, Check, Truck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import ProductReviewForm from "@/components/ProductReviewForm";
import { useToast } from "@/hooks/use-toast";

// Mock API function to fetch order details
const fetchOrderDetails = async (id: string) => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock order data
  return {
    id: id,
    orderNumber: "ORD-" + id.padStart(6, '0'),
    date: "2024-04-01",
    status: "delivered",
    total: 234.98,
    shipping: 9.99,
    tax: 15.00,
    discount: 20,
    paymentMethod: "Credit Card (Visa ending in 4242)",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
      phone: "+1 (555) 123-4567"
    },
    items: [
      {
        id: 1,
        name: "White Oversized T-Shirt",
        price: 59.99,
        sale: 49.99,
        quantity: 2,
        image: "/placeholder.svg"
      },
      {
        id: 3,
        name: "Leather Crossbody Bag",
        price: 129.99,
        quantity: 1,
        image: "/placeholder.svg"
      }
    ]
  };
};

export default function OrderDetail() {
  const { id = "" } = useParams();
  const [reviewedProducts, setReviewedProducts] = useState<number[]>([]);
  const { toast } = useToast();
  
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrderDetails(id)
  });
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "processing": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "shipped": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "delivered": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "processing": return <AlertCircle className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      case "delivered": return <Check className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleReviewSubmitted = (productId: number) => {
    setReviewedProducts(prev => [...prev, productId]);
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };
  
  const canReview = (productId: number) => {
    return order?.status === "delivered" && !reviewedProducts.includes(productId);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
        <Skeleton className="h-60 mt-6" />
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium">Order not found</h2>
        <p className="text-muted-foreground">
          The order you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <BreadcrumbBar 
        items={[
          { label: "Account", href: "/account" },
          { label: "Orders", href: "/account/orders" },
          { label: `Order #${order.orderNumber}` }
        ]} 
      />
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Order #{order.orderNumber}</h2>
          <p className="text-muted-foreground">
            Placed on {new Date(order.date).toLocaleDateString()} 
          </p>
        </div>
        
        <Badge 
          variant="secondary" 
          className={`px-3 py-1 capitalize ${getStatusColor(order.status)}`}
        >
          {getStatusIcon(order.status)}
          <span className="ml-1">{order.status}</span>
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>Delivery address and contact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="pt-2">{order.shippingAddress.phone}</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>Payment method and details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p>
                <span className="font-medium">Payment Method:</span> {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Billing Address:</span> Same as shipping
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>Items included in your order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <div className="w-16 flex-shrink-0">
                  <AspectRatio ratio={1} className="bg-muted rounded overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="font-medium">
                      ${item.sale ? (item.sale * item.quantity).toFixed(2) : (item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Qty: {item.quantity} × ${item.sale ? item.sale.toFixed(2) : item.price.toFixed(2)}
                    {item.sale && (
                      <span className="line-through ml-2">${item.price.toFixed(2)}</span>
                    )}
                  </div>
                  
                  {canReview(item.id) && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2">
                          Write a Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Review {item.name}</DialogTitle>
                        </DialogHeader>
                        <ProductReviewForm 
                          productId={item.id} 
                          productName={item.name}
                          orderId={order.id}
                          onReviewSubmitted={() => handleReviewSubmitted(item.id)}
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                  
                  {reviewedProducts.includes(item.id) && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 mt-2">
                      <Check className="h-3 w-3 mr-1" /> Review Submitted
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Discount</span>
                  <span className="text-green-600">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${(order.total + order.shipping + order.tax - order.discount).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline">
          Print Receipt
        </Button>
        <Button variant="outline">
          Track Order
        </Button>
      </div>
    </div>
  );
}
