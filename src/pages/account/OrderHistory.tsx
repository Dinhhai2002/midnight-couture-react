
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Package, ChevronRight, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
}

export default function OrderHistory() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock order data
  const orders: Order[] = [
    {
      id: "ORD-1234-ABCD",
      date: "April 5, 2025",
      status: "delivered",
      total: 145.99,
      items: 3
    },
    {
      id: "ORD-5678-EFGH",
      date: "March 28, 2025",
      status: "shipped",
      total: 89.95,
      items: 2
    },
    {
      id: "ORD-9012-IJKL",
      date: "March 15, 2025",
      status: "delivered",
      total: 245.50,
      items: 4
    },
    {
      id: "ORD-3456-MNOP",
      date: "February 22, 2025",
      status: "cancelled",
      total: 129.99,
      items: 1
    },
    {
      id: "ORD-7890-QRST",
      date: "February 10, 2025",
      status: "delivered",
      total: 199.95,
      items: 3
    }
  ];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500 text-primary-foreground hover:bg-yellow-500";
      case "shipped":
        return "bg-blue-500 text-primary-foreground hover:bg-blue-500";
      case "delivered":
        return "bg-green-500 text-primary-foreground hover:bg-green-500";
      case "cancelled":
        return "bg-red-500 text-primary-foreground hover:bg-red-500";
      default:
        return "";
    }
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // No need for additional logic, as we're filtering in real time
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Order History</h2>
        <p className="text-muted-foreground">View and track your orders</p>
      </div>
      
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="search"
          placeholder="Search by order ID..."
          className="pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          type="submit" 
          className="absolute right-3 top-1/2 -translate-y-1/2"
          aria-label="Search orders"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
        </button>
      </form>
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          {searchQuery ? (
            <>
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">No orders found</h3>
              <p className="text-muted-foreground mb-4">Try a different search term</p>
              <Button onClick={() => setSearchQuery("")} variant="outline">
                Clear Search
              </Button>
            </>
          ) : (
            <>
              <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">No orders yet</h3>
              <p className="text-muted-foreground mb-4">Start shopping to place your first order</p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        asChild
                      >
                        <Link to={`/account/orders/${order.id}`}>
                          Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive={currentPage === 1} onClick={() => setCurrentPage(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(2)}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => p + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
