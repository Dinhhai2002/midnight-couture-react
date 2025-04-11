import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import { Skeleton } from "@/components/ui/skeleton";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "Spring Fashion Trends 2025",
    content: `
      <p>As we move into 2025, the fashion world is embracing new trends that blend comfort with style. This spring season brings a refreshing palette of colors and innovative designs that reflect our changing lifestyles.</p>
      
      <h2>Pastel Dominance</h2>
      <p>Soft pastels are making a strong comeback this spring. Lavender, mint green, and baby blue are particularly popular choices for both casual and formal wear. These gentle hues offer a perfect transition from the darker winter palette.</p>
      
      <h2>Sustainable Materials</h2>
      <p>Sustainability continues to be a driving force in fashion. Designers are increasingly using recycled materials, organic cotton, and innovative fabrics made from plant waste. The focus is on creating beautiful pieces that are kind to our planet.</p>
      
      <h2>Oversized Silhouettes</h2>
      <p>Comfort remains key with oversized blazers, wide-leg pants, and roomy dresses dominating the runways. These relaxed fits are being paired with structured accessories to create balanced looks that are both comfortable and polished.</p>
      
      <h2>Statement Accessories</h2>
      <p>While clothing may be taking a more relaxed approach, accessories are anything but subtle this season. Bold, chunky jewelry, vibrant scarves, and statement bags are essential for elevating simple outfits.</p>
      
      <h2>Conclusion</h2>
      <p>The spring 2025 fashion trends reflect our desire for comfort, sustainability, and self-expression. By incorporating some of these elements into your wardrobe, you can stay on-trend while developing your personal style.</p>
    `,
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
    content: `
      <p>Accessories are the finishing touches that can transform an outfit from ordinary to extraordinary. Whether you're dressing for a casual day out or a special occasion, the right accessories can elevate your look and express your personal style.</p>
      
      <h2>The Power of Jewelry</h2>
      <p>Jewelry can make a significant impact on your overall appearance. For minimalist outfits, consider statement pieces like chunky necklaces or bold earrings. For more detailed clothing, opt for simpler jewelry that complements rather than competes with your outfit.</p>
      
      <h2>Bags That Make a Statement</h2>
      <p>Your choice of bag doesn't just serve a practical purpose—it's also a fashion statement. This season, structured bags in vibrant colors are trending. For everyday wear, crossbody bags offer both style and convenience.</p>
      
      <h2>The Finishing Touch of Shoes</h2>
      <p>Shoes can completely change the vibe of an outfit. Sneakers create a casual, comfortable look, while heels instantly dress up even the simplest ensemble. Consider investing in versatile pairs that can work with multiple outfits.</p>
      
      <h2>Scarves and Hats</h2>
      <p>Don't underestimate the impact of scarves and hats. A silk scarf can add elegance to a basic white shirt, while the right hat not only protects from the elements but also adds character to your look.</p>
      
      <h2>Layering Accessories</h2>
      <p>Mastering the art of layering accessories takes practice. Start with a focal point and build around it. Remember, sometimes less is more—know when to stop adding elements to avoid overwhelming your outfit.</p>
      
      <h2>Conclusion</h2>
      <p>Accessories are powerful tools in fashion that allow for creativity and personal expression. By carefully selecting and combining different pieces, you can refresh your wardrobe and create countless new looks without buying new clothes.</p>
    `,
    image: "/placeholder.svg",
    author: "Michael Johnson",
    date: "2025-03-10",
    category: "Style Tips",
    tags: ["accessories", "style", "fashion"],
    slug: "how-to-style-accessories"
  },
  // ... other blog posts with content
];

export default function BlogDetail() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }
  
  // Find index of current post
  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  
  return (
    <div className="container py-8">
      <BreadcrumbBar 
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title }
        ]} 
      />
      
      <article className="max-w-4xl mx-auto">
        <div className="mb-6 rounded-lg overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            <span>{post.category}</span>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
        
        <div className="prose prose-sm sm:prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <div className="flex gap-2 mt-8">
          {post.tags.map(tag => (
            <Button key={tag} variant="outline" size="sm" className="capitalize">
              #{tag}
            </Button>
          ))}
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex justify-between items-center">
          {prevPost ? (
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link to={`/blog/${prevPost.slug}`}>
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Link>
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button asChild variant="outline">
            <Link to="/blog">Back to Blog</Link>
          </Button>
          
          {nextPost ? (
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link to={`/blog/${nextPost.slug}`}>
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </article>
    </div>
  );
}
