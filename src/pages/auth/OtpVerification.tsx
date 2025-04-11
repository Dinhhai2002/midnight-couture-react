
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbBar from "@/components/BreadcrumbBar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function OtpVerification() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleComplete = (value: string) => {
    console.log("OTP completed:", value);
    
    // Here you would implement actual OTP verification
    setTimeout(() => {
      toast({
        title: "Email verified",
        description: "Your email has been verified successfully",
      });
      
      navigate("/auth/login");
    }, 1000);
  };

  const handleResend = () => {
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your email",
    });
  };

  return (
    <div className="container max-w-md mx-auto my-8 px-4">
      <BreadcrumbBar items={[{ label: "Verify Email" }]} />
      
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verify Your Email</h1>
          <p className="text-muted-foreground mt-2">
            Enter the 4-digit code sent to your email
          </p>
        </div>
        
        <div className="flex justify-center my-8">
          <InputOTP
            value={value}
            onChange={setValue}
            maxLength={4}
            onComplete={handleComplete}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} index={index} />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive a code?
          </p>
          <Button 
            variant="link" 
            className="text-primary" 
            onClick={handleResend}
          >
            Resend Code
          </Button>
        </div>
      </div>
    </div>
  );
}
