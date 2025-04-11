
import { useState } from "react";
import { Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SocialButtons() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button 
        size="icon" 
        className={`rounded-full bg-blue-600 hover:bg-blue-700 transform transition-all duration-300 ${isHovered ? 'translate-x-0 scale-110' : 'translate-x-2'}`}
        onClick={() => window.open("https://facebook.com", "_blank")}
        aria-label="Facebook"
      >
        <Facebook className="h-5 w-5" />
      </Button>
      
      <Button 
        size="icon" 
        className={`rounded-full bg-blue-400 hover:bg-blue-500 transform transition-all duration-300 ${isHovered ? 'translate-x-0 scale-110 delay-100' : 'translate-x-2'}`}
        onClick={() => window.open("https://m.me", "_blank")}
        aria-label="Messenger"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
      
      <Button 
        size="icon" 
        className={`rounded-full bg-blue-500 hover:bg-blue-600 transform transition-all duration-300 ${isHovered ? 'translate-x-0 scale-110 delay-200' : 'translate-x-2'}`}
        onClick={() => window.open("https://zalo.me", "_blank")}
        aria-label="Zalo"
      >
        <span className="font-bold text-xs">Zalo</span>
      </Button>
    </div>
  );
}
