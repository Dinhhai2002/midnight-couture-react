
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import ProductCard from "@/components/ProductCard";
import ProductGrid from "@/components/ProductGrid";
import api from "@/lib/api";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null);
  
  const { data: featuredProducts = [], isLoading: isLoadingFeatured } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => api.getFeaturedProducts()
  });
  
  const { data: newArrivals = [], isLoading: isLoadingNew } = useQuery({
    queryKey: ["products", "new"],
    queryFn: () => api.getNewArrivals()
  });
  
  const { data: blogPosts = [], isLoading: isLoadingBlog } = useQuery({
    queryKey: ["blog", "featured"],
    queryFn: () => api.getFeaturedBlogPosts()
  });
  
  // Banner images
  const banners = [
    { 
      image: "https://placehold.co/1200x400/3b82f6/ffffff?text=Summer+Collection", 
      title: "Summer Collection", 
      subtitle: "Discover our new arrivals",
      cta: "Shop Now",
      link: "/category/summer"
    },
    { 
      image: "https://placehold.co/1200x400/a855f7/ffffff?text=Exclusive+Deals", 
      title: "Exclusive Deals", 
      subtitle: "Up to 50% off on selected items",
      cta: "View Offers",
      link: "/category/sale"
    },
    { 
      image: "https://placehold.co/1200x400/ec4899/ffffff?text=New+Season", 
      title: "New Season", 
      subtitle: "Spring/Summer 2025 collection",
      cta: "Explore",
      link: "/category/new"
    }
  ];
  
  // Setup auto-rotation for banner carousel
  useEffect(() => {
    // Clear any existing interval
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
    
    // Set new interval
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % banners.length);
    }, 5000);
    
    setAutoplayInterval(interval);
    
    // Cleanup on unmount
    return () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    };
  }, [banners.length]);
  
  // Handle dot indicator click
  const handleDotClick = (index: number) => {
    setActiveSlide(index);
    
    // Reset the autoplay timer when manually changing slides
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
    
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % banners.length);
    }, 5000);
    
    setAutoplayInterval(interval);
  };

  return (
    <div className="space-y-16 py-8">
      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <div className="relative">
          {banners.map((banner, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center p-8 md:p-16">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
                    {banner.title}
                  </h1>
                  <p className="text-white/80 text-lg md:text-xl mb-4 md:mb-8 max-w-md">
                    {banner.subtitle}
                  </p>
                  <div>
                    <Button asChild size="lg" className="rounded-full">
                      <Link to={banner.link}>
                        {banner.cta}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Dots navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeSlide ? "bg-white scale-110" : "bg-white/50"
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative rounded-lg overflow-hidden h-48 md:h-64 group cursor-pointer">
            <img 
              src="https://placehold.co/600x400/3b82f6/ffffff?text=Fashion" 
              alt="Fashion"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
              <Link to="/category/fashion" className="text-white font-medium text-lg">Fashion</Link>
            </div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden h-48 md:h-64 group cursor-pointer">
            <img 
              src="https://placehold.co/600x400/a855f7/ffffff?text=Accessories" 
              alt="Accessories"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
              <Link to="/category/accessories" className="text-white font-medium text-lg">Accessories</Link>
            </div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden h-48 md:h-64 group cursor-pointer">
            <img 
              src="https://placehold.co/600x400/ec4899/ffffff?text=Footwear" 
              alt="Footwear"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
              <Link to="/category/footwear" className="text-white font-medium text-lg">Footwear</Link>
            </div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden h-48 md:h-64 group cursor-pointer">
            <img 
              src="https://placehold.co/600x400/64748b/ffffff?text=Jewelry" 
              alt="Jewelry"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
              <Link to="/category/jewelry" className="text-white font-medium text-lg">Jewelry</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="container px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-sm flex items-center hover:text-primary transition-colors">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {isLoadingFeatured ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-52 md:h-64 w-full rounded-lg" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <Carousel className="mt-6">
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 lg:-left-12" />
            <CarouselNext className="right-2 lg:-right-12" />
          </Carousel>
        )}
      </section>
      
      {/* Promotional Banner */}
      <section className="container px-4">
        <div className="relative rounded-xl overflow-hidden h-64 md:h-80">
          <img 
            src="https://placehold.co/1200x400/2dd4bf/ffffff?text=Special+Offer" 
            alt="Special Offer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-8 md:p-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Special Offer</h2>
            <p className="text-white/80 mb-4 max-w-md">
              Get 20% off on selected items. Limited time offer.
            </p>
            <div>
              <Button asChild>
                <Link to="/category/sale">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="container px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Button asChild variant="outline" size="sm">
            <Link to="/products" className="flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        {isLoadingNew ? (
          <ProductGrid isLoading skeletonCount={8} />
        ) : (
          <ProductGrid products={newArrivals.slice(0, 8)} />
        )}
      </section>
      
      {/* Blog Section */}
      <section className="bg-muted py-16">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Elevate Your Style</h2>
            <Button asChild>
              <Link to="/blog">New Arrivals</Link>
            </Button>
          </div>
          
          {isLoadingBlog ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`}
                  className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center text-xs text-muted-foreground">
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="container px-4">
        <div className="bg-primary/5 rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new arrivals, and fashion tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
