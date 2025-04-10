
import { Link } from "react-router-dom";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useCart } from "./CartContext";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  return (
    <div className="group product-card rounded-lg border overflow-hidden animate-fade-in hover-scale">
      <Link to={`/product/${product.id}`} className="block">
        <AspectRatio ratio={1 / 1} className="bg-muted relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-all"
          />
          {product.sale && (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
              SALE
            </Badge>
          )}
          {product.new && (
            <Badge className="absolute top-2 left-2">
              NEW
            </Badge>
          )}
        </AspectRatio>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-medium text-base hover:underline">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {product.sale ? (
              <>
                <span className="text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                <span className="font-medium">${product.sale.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-medium">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
