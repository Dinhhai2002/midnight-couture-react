
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import BreadcrumbBar from "@/components/BreadcrumbBar";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "Spring Fashion Trends 2025",
    excerpt: "Discover the latest fashion trends for the upcoming spring season.",
    image: "/placeholder.svg",
    author: "Jane Smith",
    date: "2025-03-15",
    category: "Fashion",
    tags: ["spring", "fashion", "trends"],
    slug: "spring-fashion-trends-2025"
  },
  {
    id: 2,
    title: "How to Style Accessories",
    excerpt: "Learn how to elevate your outfit with the right accessories.",
    image: "/placeholder.svg",
    author: "Michael Johnson",
    date: "2025-03-10",
    category: "Style Tips",
    tags: ["accessories", "style", "fashion"],
    slug: "how-to-style-accessories"
  },
  {
    id: 3,
    title: "Sustainable Fashion: A Guide",
    excerpt: "Everything you need to know about sustainable and ethical fashion.",
    image: "/placeholder.svg",
    author: "Sarah Williams",
    date: "2025-03-05",
    category: "Sustainability",
    tags: ["sustainable", "ethical", "fashion"],
    slug: "sustainable-fashion-guide"
  },
  {
    id: 4,
    title: "Summer Wardrobe Essentials",
    excerpt: "The must-have items for your summer wardrobe this year.",
    image: "/placeholder.svg",
    author: "David Brown",
    date: "2025-02-28",
    category: "Fashion",
    tags: ["summer", "essentials", "wardrobe"],
    slug: "summer-wardrobe-essentials"
  },
  {
    id: 5,
    title: "Men's Fashion Week Highlights",
    excerpt: "Recap of the most exciting moments from Men's Fashion Week.",
    image: "/placeholder.svg",
    author: "Robert Clark",
    date: "2025-02-20",
    category: "Fashion News",
    tags: ["men", "fashion week", "designer"],
    slug: "mens-fashion-week-highlights"
  },
  {
    id: 6,
    title: "How to Care for Luxury Items",
    excerpt: "Tips and tricks for maintaining your luxury fashion investments.",
    image: "/placeholder.svg",
    author: "Emily Davis",
    date: "2025-02-15",
    category: "Care Guide",
    tags: ["luxury", "maintenance", "care"],
    slug: "care-for-luxury-items"
  }
];

export default function Blog() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;
  
  return (
    <div className="container py-8">
      <BreadcrumbBar items={[{ label: "Blog" }]} />
      
      <h1 className="text-3xl font-bold mb-8">Our Blog</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <Card key={i}>
                  <Skeleton className="h-48 rounded-t-lg" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))
            ) : (
              filteredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.category}</span>
                    </div>
                    <CardTitle className="line-clamp-2">
                      <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="link" className="px-0">Read More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
        
        <div className="w-full md:w-1/4">
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant={selectedCategory === null ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </Button>
                  
                  {categories.map(category => (
                    <Button 
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map(post => (
                    <div key={post.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Link to={`/blog/${post.slug}`} className="font-medium hover:text-primary line-clamp-2 text-sm">
                          {post.title}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {new Date(post.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
