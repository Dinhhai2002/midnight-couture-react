
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Star, ShoppingCart, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductGrid from "@/components/ProductGrid";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const reviewsPerPage = 3;
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProduct(Number(id)),
    enabled: !!id,
  });
  
  const { data: relatedProducts = [] } = useQuery({
    queryKey: ["related-products", product?.category],
    queryFn: () => api.getProducts(product?.category),
    enabled: !!product?.category,
  });
  
  // Filter out the current product from related products
  const filteredRelatedProducts = relatedProducts
    .filter(p => p.id !== product?.id)
    .slice(0, 4);
  
  // Mock review data
  const reviews = [
    {
      id: 1,
      name: "Sarah Thompson",
      avatar: "/placeholder.svg",
      rating: 5,
      comment: "The quality exceeded my expectations. Perfect fit and great material!",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg",
      rating: 4,
      comment: "Very stylish and comfortable. Would definitely recommend.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Emma Walker",
      avatar: "/placeholder.svg",
      rating: 5,
      comment: "Amazing product and fast shipping. Very satisfied!",
      date: "2 weeks ago"
    },
    {
      id: 4,
      name: "David Chen",
      avatar: "/placeholder.svg",
      rating: 4,
      comment: "Great value for the price. The sizing was perfect.",
      date: "3 weeks ago"
    },
    {
      id: 5,
      name: "Jennifer Wilson",
      avatar: "/placeholder.svg",
      rating: 5,
      comment: "This has become my favorite item. The attention to detail is impressive.",
      date: "1 month ago"
    },
    {
      id: 6,
      name: "Robert Johnson",
      avatar: "/placeholder.svg",
      rating: 4,
      comment: "Good quality and looks exactly like the photos. Happy with my purchase.",
      date: "1 month ago"
    },
    {
      id: 7,
      name: "Lisa Brown",
      avatar: "/placeholder.svg",
      rating: 5,
      comment: "I've received so many compliments wearing this. Absolutely love it!",
      date: "2 months ago"
    }
  ];
  
  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice(
    (currentReviewPage - 1) * reviewsPerPage,
    currentReviewPage * reviewsPerPage
  );
  
  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="container py-12 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-1/3 bg-muted rounded mx-auto"></div>
          <div className="h-80 bg-muted rounded"></div>
          <div className="h-4 w-2/3 bg-muted rounded mx-auto"></div>
          <div className="h-4 w-1/2 bg-muted rounded mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container py-12 text-center">
        <p className="text-lg text-muted-foreground">
          Product not found or an error occurred.
        </p>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={1} className="bg-muted">
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          
          <div className="flex gap-2 overflow-auto pb-2">
            {product.images.map((image, index) => (
              <div key={index} className="w-20 flex-shrink-0">
                <AspectRatio ratio={1} className="bg-muted">
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover w-full h-full rounded-md"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">
                {product.rating.toFixed(1)} ({product.reviews} reviews)
              </span>
            </div>
          </div>
          
          <div className="flex items-baseline gap-4">
            {product.sale ? (
              <>
                <span className="text-2xl font-bold">${product.sale.toFixed(2)}</span>
                <span className="text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                <Badge className="bg-red-500 hover:bg-red-600">
                  {Math.round(((product.price - product.sale) / product.price) * 100)}% OFF
                </Badge>
              </>
            ) : (
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <Separator />
          
          <div>
            <h2 className="font-medium mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div>
            <h2 className="font-medium mb-2">Availability</h2>
            <p className={`${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stock > 0 
                ? `In stock (${product.stock} items available)` 
                : "Out of stock"}
            </p>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-9 w-9"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={incrementQuantity}
                disabled={product.stock <= quantity}
                className="h-9 w-9"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              size="lg" 
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="w-full md:w-auto"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Reviews */}
      <section className="mt-12 mb-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        <div className="space-y-6">
          {currentReviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={review.avatar}
                    alt={`${review.name}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{review.name}</h3>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? "fill-primary text-primary" : "text-muted"}
                  />
                ))}
              </div>
              
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
        
        {/* Review Pagination */}
        {reviews.length > reviewsPerPage && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentReviewPage(p => Math.max(1, p - 1))}
                  className={currentReviewPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: totalReviewPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentReviewPage === index + 1}
                    onClick={() => setCurrentReviewPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentReviewPage(p => Math.min(totalReviewPages, p + 1))}
                  className={currentReviewPage === totalReviewPages ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
      
      {/* Related Products */}
      {filteredRelatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <ProductGrid products={filteredRelatedProducts} />
        </div>
      )}
    </div>
  );
}
