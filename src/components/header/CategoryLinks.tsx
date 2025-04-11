
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";

interface CategoryLinksProps {
  onCategoryClick?: () => void;
  className?: string;
}

// Mock category images
const categoryImages: Record<string, string> = {
  "fashion": "/placeholder.svg",
  "accessories": "/placeholder.svg",
  "shoes": "/placeholder.svg",
  "hats": "/placeholder.svg",
  "jewelry": "/placeholder.svg",
  "bags": "/placeholder.svg"
};

export default function CategoryLinks({ onCategoryClick, className = "" }: CategoryLinksProps) {
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.getCategories()
  });

  if (isLoadingCategories) {
    return (
      <div className={`flex gap-4 ${className}`}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-4 w-16" />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 text-sm ${className}`}>
      {categories.map((category) => (
        <Link 
          key={category.id}
          to={`/category/${category.slug}`}
          className="flex flex-col items-center hover:text-primary transition-colors whitespace-nowrap"
          onClick={onCategoryClick}
        >
          {categoryImages[category.slug] && (
            <div className="w-8 h-8 rounded-full overflow-hidden mb-1 border">
              <img 
                src={categoryImages[category.slug] || "/placeholder.svg"} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <span>{category.name}</span>
        </Link>
      ))}
    </div>
  );
}
