
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Here you would implement actual password reset request
    console.log("Password reset request:", data);
    
    toast({
      title: "Reset link sent",
      description: "Please check your email to reset your password",
    });
    
    setIsSubmitted(true);
  };

  return (
    <div className="container max-w-md mx-auto my-8 px-4">
      <BreadcrumbBar items={[{ label: "Forgot Password" }]} />
      
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Forgot Your Password?</h1>
          <p className="text-muted-foreground mt-2">
            Enter your email to receive a password reset link
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="bg-muted p-6 rounded-lg text-center space-y-4">
            <h2 className="font-medium">Check Your Email</h2>
            <p className="text-sm text-muted-foreground">
              We've sent a password reset link to your email address. Please check your inbox.
            </p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/auth/login">Back to Login</Link>
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="email@example.com" {...field} />
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
              
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/auth/login">Back to Login</Link>
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
