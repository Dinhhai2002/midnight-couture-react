
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, ShoppingBag } from "lucide-react";
import api from "@/lib/api";  // Changed from { api } to default import
import { Category, Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    "/banner1.jpg",
    "/banner2.jpg",
    "/banner3.jpg"
  ];

  // Fetch featured products
  const { data: featuredProducts, isLoading: featuredLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: () => api.getProducts("featured"),
  });

  // Fetch new arrivals
  const { data: newArrivals, isLoading: newArrivalsLoading } = useQuery({
    queryKey: ["newArrivals"],
    queryFn: () => api.getProducts("new"),
  });

  // Fetch blog posts
  const { data: blogPosts, isLoading: blogLoading } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: () => fetch("/api/blog-posts").then(res => res.json()).catch(() => [
      {
        id: 1,
        title: "Summer Fashion Trends",
        excerpt: "Discover the hottest trends for this summer season.",
        image: "/placeholder.svg",
        date: "2025-03-15",
        slug: "summer-fashion-trends"
      },
      {
        id: 2,
        title: "Sustainable Fashion Guide",
        excerpt: "How to build an eco-friendly wardrobe without compromising style.",
        image: "/placeholder.svg",
        date: "2025-03-10",
        slug: "sustainable-fashion"
      },
      {
        id: 3,
        title: "Accessory Essentials",
        excerpt: "The must-have accessories to complete any outfit.",
        image: "/placeholder.svg",
        date: "2025-03-05",
        slug: "accessory-essentials"
      }
    ]),
  });

  // Auto-rotate banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner with auto-animation */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div 
              key={index} 
              className="min-w-full h-full relative"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url(${banner || "/placeholder.svg"})`,
                  backgroundSize: 'cover' 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20 flex items-center">
                <div className="container">
                  <div className="max-w-xl space-y-5 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      Spring Collection {new Date().getFullYear()}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground">
                      Discover the latest trends and elevate your style with our exclusive collection.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" asChild>
                        <Link to="/products">Shop Now</Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link to="/category/new-arrivals">New Arrivals</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Banner pagination dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentBanner === index ? "bg-primary scale-125" : "bg-muted"
              }`}
              onClick={() => setCurrentBanner(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
          <Link 
            to="/products" 
            className="text-primary flex items-center hover:underline"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: "Women", image: "/placeholder.svg", slug: "women" },
            { name: "Men", image: "/placeholder.svg", slug: "men" },
            { name: "Accessories", image: "/placeholder.svg", slug: "accessories" },
            { name: "Footwear", image: "/placeholder.svg", slug: "footwear" },
          ].map((category) => (
            <Link 
              key={category.name} 
              to={`/category/${category.slug}`}
              className="group hover-scale"
            >
              <div className="rounded-xl overflow-hidden aspect-square relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" 
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link 
            to="/category/featured" 
            className="text-primary flex items-center hover:underline"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {featuredLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="products-grid">
            {featuredProducts && <ProductGrid products={featuredProducts.slice(0, 8)} />}
          </div>
        )}
      </section>

      {/* New Arrivals */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
          <Button asChild variant="outline">
            <Link to="/category/new-arrivals">View All New Arrivals</Link>
          </Button>
        </div>
        
        {newArrivalsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="products-grid">
            {newArrivals && <ProductGrid products={newArrivals.slice(0, 4)} />}
          </div>
        )}
      </section>

      {/* Blog/Style Tips Section */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Elevate Your Style</h2>
          <Button asChild variant="outline">
            <Link to="/blog">Read Our Blog</Link>
          </Button>
        </div>
        
        {blogLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts?.slice(0, 3).map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                <Card className="overflow-hidden h-full hover-scale">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={post.image || "/placeholder.svg"} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="text-sm text-muted-foreground mb-2">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Special Offers Section */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 rounded-xl bg-muted">
          <div className="space-y-6 order-2 md:order-1">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              Special Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Get 20% Off Your First Order</h2>
            <p className="text-lg text-muted-foreground">
              Sign up for our newsletter and receive a special discount code for your first purchase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/products">
                  <ShoppingBag className="h-5 w-5" />
                  Shop Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth/register">Create Account</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="/placeholder.svg" 
              alt="Special Offer" 
              className="rounded-xl h-[300px] w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
