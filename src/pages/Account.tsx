
import { useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { 
  User, 
  Package, 
  MapPin, 
  LogOut, 
  ChevronRight 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Account() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock logout function
  const handleLogout = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Account Navigation</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <Link 
                  to="/account" 
                  className="flex items-center px-4 py-3 hover:bg-muted border-b"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Account Information</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Link>
                <Link 
                  to="/account/orders" 
                  className="flex items-center px-4 py-3 hover:bg-muted border-b"
                >
                  <Package className="mr-2 h-4 w-4" />
                  <span>Order History</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Link>
                <Link 
                  to="/account/addresses" 
                  className="flex items-center px-4 py-3 hover:bg-muted border-b"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Address Book</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Link>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start px-4 py-3 h-auto rounded-none hover:bg-muted text-destructive"
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{isLoading ? "Signing out..." : "Sign Out"}</span>
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="md:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
