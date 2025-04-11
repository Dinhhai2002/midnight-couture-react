
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import ReviewCard from "@/components/ReviewCard";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  const reviewsPerPage = 3;
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProduct(Number(id)),
    enabled: !!id,
  });
  
  const { data: relatedProducts = [], isLoading: isLoadingRelated } = useQuery({
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

  // Image zoom functionality
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  const handleImageMouseEnter = () => {
    setIsZoomed(true);
  };
  
  const handleImageMouseLeave = () => {
    setIsZoomed(false);
  };
  
  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };
  
  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <Skeleton className="h-[400px] w-full rounded-md" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-md" />
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-px w-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
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
          {/* Main Image with Zoom */}
          <div 
            className="relative overflow-hidden bg-muted rounded-md cursor-zoom-in"
            style={{ height: '400px' }}
            ref={imageContainerRef}
            onMouseMove={handleImageMouseMove}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
          >
            <img
              src={product.images[activeImageIndex]}
              alt={`${product.name} - Main Image`}
              className="object-contain w-full h-full transition-transform"
            />
            
            {isZoomed && (
              <div className="absolute inset-0 pointer-events-none">
                <div
                  style={{
                    backgroundImage: `url(${product.images[activeImageIndex]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: '200%',
                    backgroundRepeat: 'no-repeat',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-2 overflow-auto pb-2">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`w-20 flex-shrink-0 cursor-pointer ${
                  activeImageIndex === index ? 'ring-2 ring-primary rounded-md' : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-4 mr-1" />
                  ))}
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))
          ) : (
            currentReviews.map((review) => (
              <ReviewCard 
                key={review.id}
                id={review.id}
                name={review.name}
                avatar={review.avatar}
                rating={review.rating}
                comment={review.comment}
                date={review.date}
              />
            ))
          )}
        </div>
        
        {/* Review Pagination */}
        {reviews.length > reviewsPerPage && (
          <Pagination className="mt-8">
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
          {isLoadingRelated ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-md" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={filteredRelatedProducts} />
          )}
        </div>
      )}
    </div>
  );
}
