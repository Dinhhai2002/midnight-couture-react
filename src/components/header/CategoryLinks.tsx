
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";

interface CategoryLinksProps {
  onCategoryClick?: () => void;
  className?: string;
}

export default function CategoryLinks({ onCategoryClick, className = "" }: CategoryLinksProps) {
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: api.getCategories
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
          className="hover:text-primary transition-colors whitespace-nowrap"
          onClick={onCategoryClick}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
