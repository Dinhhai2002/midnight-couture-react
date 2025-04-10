
import { Star } from "lucide-react";

interface ReviewCardProps {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewCard({
  name,
  avatar,
  rating,
  comment,
  date,
}: ReviewCardProps) {
  return (
    <div className="bg-background/50 border rounded-lg p-6 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-primary text-primary" : "text-muted"}
          />
        ))}
      </div>
      
      <p className="text-muted-foreground flex-1">{comment}</p>
    </div>
  );
}
