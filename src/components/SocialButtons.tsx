
import { Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SocialButtons() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      <Button 
        size="icon" 
        className="rounded-full bg-blue-600 hover:bg-blue-700"
        onClick={() => window.open("https://facebook.com", "_blank")}
        aria-label="Facebook"
      >
        <Facebook className="h-5 w-5" />
      </Button>
      
      <Button 
        size="icon" 
        className="rounded-full bg-blue-400 hover:bg-blue-500"
        onClick={() => window.open("https://m.me", "_blank")}
        aria-label="Messenger"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
      
      <Button 
        size="icon" 
        className="rounded-full bg-blue-500 hover:bg-blue-600" 
        onClick={() => window.open("https://zalo.me", "_blank")}
        aria-label="Zalo"
      >
        <span className="font-bold text-xs">Zalo</span>
      </Button>
    </div>
  );
}
