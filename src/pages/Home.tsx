
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

export default function Home() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.getProducts(),
  });
  
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.filter(product => product.new);
  const onSale = products.filter(product => product.sale);
  
  return (
    <div className="container py-8 space-y-12">
      {/* Hero section */}
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
      
      {/* Categories section */}
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
      
      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Button asChild variant="ghost">
              <Link to="/category/new">View All</Link>
            </Button>
          </div>
          <Carousel>
            <CarouselContent>
              {newArrivals.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ProductGrid products={[product]} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </section>
      )}
      
      {/* On Sale */}
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
      
      {/* Featured Products */}
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
