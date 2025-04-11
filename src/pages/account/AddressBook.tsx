
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Edit, Trash2, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

interface Address {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  ward: string;
  address: string;
  isDefault: boolean;
}

export default function AddressBook() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
      city: "New York",
      district: "Manhattan",
      ward: "Upper East Side",
      address: "450 Park Avenue, Apt 5B",
      isDefault: true
    },
    {
      id: 2,
      name: "John Doe",
      phone: "+1 (555) 987-6543",
      email: "john.doe@example.com",
      city: "San Francisco",
      district: "Marina",
      ward: "Cow Hollow",
      address: "1234 Lombard Street, Unit 7",
      isDefault: false
    }
  ]);

  const handleDeleteAddress = (id: number) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAddresses(addresses.filter(address => address.id !== id));
      setIsLoading(false);
      toast({
        title: "Address deleted",
        description: "The address has been deleted successfully."
      });
    }, 1000);
  };

  const handleSetDefaultAddress = (id: number) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAddresses(addresses.map(address => ({
        ...address,
        isDefault: address.id === id
      })));
      setIsLoading(false);
      toast({
        title: "Default address updated",
        description: "Your default shipping address has been updated."
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Address Book</h2>
          <p className="text-muted-foreground">Manage your shipping addresses</p>
        </div>
        <Button asChild>
          <Link to="/account/addresses/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Address
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-24 mr-2" />
                <Skeleton className="h-10 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No addresses yet</h3>
                <p className="text-muted-foreground mb-4">Add your first shipping address</p>
                <Button asChild>
                  <Link to="/account/addresses/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Address
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            addresses.map((address) => (
              <Card key={address.id} className={address.isDefault ? "border-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{address.name}</CardTitle>
                      <CardDescription>
                        {address.phone} • {address.email}
                      </CardDescription>
                    </div>
                    {address.isDefault && (
                      <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded">
                        Default
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {address.address}, {address.ward}, {address.district}, {address.city}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                    >
                      <Link to={`/account/addresses/edit/${address.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this address. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteAddress(address.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  {!address.isDefault && (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => handleSetDefaultAddress(address.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
