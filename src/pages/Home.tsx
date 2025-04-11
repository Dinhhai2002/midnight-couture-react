
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import ReviewCard from "@/components/ReviewCard";
import BreadcrumbBar from "@/components/BreadcrumbBar";

export default function Home() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.getProducts(),
  });
  
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.filter(product => product.new);
  const onSale = products.filter(product => product.sale);
  
  const [currentBanner, setCurrentBanner] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const banners = [
    {
      title: "Summer Collection",
      description: "Discover our new summer styles with up to 30% off",
      cta: "Shop Now",
      link: "/category/fashion",
      bgColor: "from-orange-400 to-pink-500",
      image: "/placeholder.svg",
    },
    {
      title: "Premium Accessories",
      description: "Elevate your look with our exclusive luxury accessories",
      cta: "View Collection",
      link: "/category/accessories",
      bgColor: "from-blue-400 to-indigo-600",
      image: "/placeholder.svg",
    },
    {
      title: "New Arrivals",
      description: "Be the first to shop our latest collection",
      cta: "Explore",
      link: "/category/new",
      bgColor: "from-emerald-400 to-cyan-500",
      image: "/placeholder.svg",
    },
  ];

  // Function to advance the banner
  const advanceBanner = useCallback(() => {
    setCurrentBanner((current) => (current + 1) % banners.length);
    
    // Force the carousel to move
    if (carouselRef.current) {
      const nextIndex = (currentBanner + 1) % banners.length;
      const carouselItems = carouselRef.current.querySelectorAll('[data-embla-slide]');
      if (carouselItems && carouselItems[nextIndex]) {
        (carouselItems[nextIndex] as HTMLElement).click();
      }
    }
  }, [banners.length, currentBanner]);

  // Set up auto-rotation for banners
  useEffect(() => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }
    
    autoSlideTimerRef.current = setInterval(advanceBanner, 5000);
    
    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [advanceBanner]);
  
  const reviews = [
    {
      id: 1,
      name: "Sarah Thompson",
      avatar: "/placeholder.svg",
      rating: 5,
      comment: "The quality of these products exceeded my expectations. I've already ordered more!",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg",
      rating: 4,
      comment: "Very stylish and comfortable. Would definitely recommend to friends and family.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Emma Walker",
      avatar: "/placeholder.svg",
      rating: 5,
      comment: "Amazing service and the products arrived earlier than expected. Very satisfied!",
      date: "2 weeks ago"
    },
    {
      id: 4,
      name: "David Chen",
      avatar: "/placeholder.svg",
      rating: 4,
      comment: "Great value for the price. The sizing was perfect and the quality is outstanding.",
      date: "3 weeks ago"
    },
    {
      id: 5,
      name: "Jennifer Wilson",
      avatar: "/placeholder.svg",
      rating: 5,
      comment: "These are now my go-to for all my fashion needs. The attention to detail is impressive.",
      date: "1 month ago"
    }
  ];
  
  return (
    <div className="container py-8 space-y-12">
      <BreadcrumbBar items={[{ label: "Home" }]} />
      
      <section className="relative rounded-lg overflow-hidden h-[70vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        <div className="relative z-10 container px-4 py-16 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Elevate Your Style
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover the latest trends in fashion, accessories, shoes, and hats
          </p>
          <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button asChild size="lg">
              <Link to="/category/fashion">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/category/new">New Arrivals</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-6">
        <Carousel 
          className="w-full" 
          ref={carouselRef}
          onSelect={(selectedIndex) => {
            setCurrentBanner(selectedIndex);
            
            // Reset the auto-slide timer when manually selecting a slide
            if (autoSlideTimerRef.current) {
              clearInterval(autoSlideTimerRef.current);
              autoSlideTimerRef.current = setInterval(advanceBanner, 5000);
            }
          }}
        >
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className={`relative overflow-hidden rounded-lg bg-gradient-to-r ${banner.bgColor} h-[250px] md:h-[300px] w-full`}>
                  <div className="absolute inset-0 flex p-8 md:p-12">
                    <div className="flex flex-col justify-center max-w-lg">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        {banner.title}
                      </h2>
                      <p className="text-white/90 mb-6 max-w-md">
                        {banner.description}
                      </p>
                      <div>
                        <Button asChild size="lg" variant="secondary" className="group">
                          <Link to={banner.link}>
                            {banner.cta}
                            <ArrowUpRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-end flex-1">
                      <img 
                        src={banner.image} 
                        alt={banner.title} 
                        className="max-h-full object-contain" 
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
          
          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentBanner(index);
                  // Find and click the corresponding carousel item
                  if (carouselRef.current) {
                    const carouselItems = carouselRef.current.querySelectorAll('[data-embla-slide]');
                    if (carouselItems && carouselItems[index]) {
                      (carouselItems[index] as HTMLElement).click();
                    }
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentBanner === index 
                    ? "bg-primary w-4" 
                    : "bg-muted"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </section>
      
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Shop By Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Fashion", image: "/placeholder.svg", slug: "fashion" },
            { name: "Accessories", image: "/placeholder.svg", slug: "accessories" },
            { name: "Shoes", image: "/placeholder.svg", slug: "shoes" },
            { name: "Hats", image: "/placeholder.svg", slug: "hats" },
          ].map((category) => (
            <Link 
              key={category.slug}
              to={`/category/${category.slug}`} 
              className="relative rounded-lg overflow-hidden group hover-scale"
            >
              <div className="aspect-[4/3]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">What Our Customers Say</h2>
            <p className="text-muted-foreground">Trusted by fashion enthusiasts worldwide</p>
          </div>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="basis-full sm:basis-1/2 md:basis-1/3 pl-4">
                <ReviewCard {...review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </section>
      
      {newArrivals.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <p className="text-muted-foreground">Check out our latest products</p>
            </div>
            <Button asChild variant="outline" className="group">
              <Link to="/category/new">
                View All
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {newArrivals.map((product) => (
                  <CarouselItem key={product.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                    <div className="p-1">
                      <div className="overflow-hidden rounded-lg border bg-card">
                        <Link to={`/product/${product.id}`} className="block">
                          <div className="aspect-square overflow-hidden">
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                        </Link>
                        <div className="p-4">
                          <h3 className="font-medium truncate">{product.name}</h3>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold">${product.price.toFixed(2)}</span>
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                // Add to cart logic would go here
                              }}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </section>
      )}
      
      {onSale.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">On Sale</h2>
            <Button asChild variant="ghost">
              <Link to="/category/sale">View All</Link>
            </Button>
          </div>
          <ProductGrid products={onSale.slice(0, 4)} />
        </section>
      )}
      
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Button asChild variant="ghost">
            <Link to="/products">View All</Link>
          </Button>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}
