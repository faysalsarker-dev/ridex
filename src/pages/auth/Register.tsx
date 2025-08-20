
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Car, User, Mail, Lock, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const heroBackground =
  "https://img.freepik.com/premium-photo/rear-view-man-sitting-car-mountain-road_1048944-24750381.jpg";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["rider", "driver"]),
    vehicleModel: z.string().optional(),
    licensePlate: z.string().optional(),
    vehicleColor: z.string().optional(),
  })
  .refine(
    (data) =>
      data.role === "driver"
        ? data.vehicleModel && data.licensePlate && data.vehicleColor
        : true,
    {
      message: "Vehicle information is required for drivers",
      path: ["vehicleModel"],
    }
  );

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const [selectedRole, setSelectedRole] = useState<"rider" | "driver">("rider");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "rider" },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Registration data:", data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleChange = (role: "rider" | "driver") => {
    setSelectedRole(role);
    setValue("role", role);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(33, 150, 243, 0.9), rgba(33, 150, 243, 0.7)), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex items-center justify-between gap-12">
        {/* Hero Content */}
        <div className="flex-1 text-white space-y-6 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">Your ride, your way</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Join thousands of riders and drivers on the most reliable ride-sharing platform. Get where
            you need to go, or earn money driving.
          </p>
          <div className="flex items-center gap-8 text-white/80">
            {[
              { label: "Active Riders", value: "100K+" },
              { label: "Drivers", value: "10K+" },
              { label: "Cities", value: "50+" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="flex-shrink-0">
          <Card className="w-full max-w-md bg-gradient-card shadow-card border-0">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-foreground">Join RideOn</CardTitle>
              <CardDescription className="text-muted-foreground">
                Create your account to start riding or driving
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">I want to</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={selectedRole === "rider" ? "default" : "outline"}
                      className="flex items-center gap-2"
                      onClick={() => handleRoleChange("rider")}
                    >
                      <User className="h-4 w-4" /> Ride
                    </Button>
                    <Button
                      type="button"
                      variant={selectedRole === "driver" ? "default" : "outline"}
                      className="flex items-center gap-2"
                      onClick={() => handleRoleChange("driver")}
                    >
                      <Car className="h-4 w-4" /> Drive
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Personal Info */}
                {[
                  {
                    id: "name",
                    icon: <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />,
                    placeholder: "Enter your full name",
                    label: "Full Name",
                    type: "text",
                  },
                  {
                    id: "email",
                    icon: <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />,
                    placeholder: "Enter your email",
                    label: "Email",
                    type: "email",
                  },
                  {
                    id: "password",
                    icon: <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />,
                    placeholder: "Create a password",
                    label: "Password",
                    type: "password",
                  },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className="text-sm font-medium">{field.label}</Label>
                    <div className="relative">
                      {field.icon}
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="pl-10"
                        {...register(field.id as keyof RegisterFormData)}
                      />
                    </div>
                    {errors[field.id as keyof RegisterFormData] && (
                      <p className="text-sm text-destructive">
                        {errors[field.id as keyof RegisterFormData]?.message}
                      </p>
                    )}
                  </div>
                ))}

                {/* Driver Fields */}
                {selectedRole === "driver" && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Car className="h-4 w-4" /> Vehicle Information
                      </h3>

                      {[
                        { id: "vehicleModel", placeholder: "e.g., Toyota Camry 2020", label: "Vehicle Model" },
                        { id: "licensePlate", placeholder: "Enter license plate", label: "License Plate", icon: <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> },
                      ].map((field) => (
                        <div key={field.id} className="space-y-2">
                          <Label htmlFor={field.id} className="text-sm font-medium">{field.label}</Label>
                          <div className="relative">{field.icon}{!field.icon && <Input id={field.id} placeholder={field.placeholder} {...register(field.id as keyof RegisterFormData)} />}</div>
                          {errors[field.id as keyof RegisterFormData] && (
                            <p className="text-sm text-destructive">
                              {errors[field.id as keyof RegisterFormData]?.message}
                            </p>
                          )}
                        </div>
                      ))}

                      <div className="space-y-2">
                        <Label htmlFor="vehicleColor" className="text-sm font-medium">Vehicle Color</Label>
                        <Select onValueChange={(value) => setValue("vehicleColor", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle color" />
                          </SelectTrigger>
                          <SelectContent>
                            {["white","black","silver","gray","blue","red","green","other"].map((color) => (
                              <SelectItem key={color} value={color}>{color}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.vehicleColor && (
                          <p className="text-sm text-destructive">{errors.vehicleColor.message}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button className="text-primary hover:underline font-medium">Sign in</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
