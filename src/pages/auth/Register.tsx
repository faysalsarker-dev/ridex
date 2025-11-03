import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import authHero from "@/assets/silver-car.png";

// ---------------- SCHEMA ----------------
const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["rider", "driver"], {
      message: "Please select a role",
    }),
    vehicleModel: z.string().optional(),
    licensePlate: z.string().optional(),
    vehicleColor: z.string().optional(),
  })
  .refine(
    (data) =>
      data.role !== "driver" ||
      (data.vehicleModel && data.licensePlate && data.vehicleColor),
    {
      message: "All driver information is required",
      path: ["vehicleModel"],
    }
  );

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [registerMutation] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "rider",
    },
  });

  const role = watch("role");

  const onSubmit = async (data: RegisterFormValues) => {
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    let payload;
    if (data.role === "rider") {
      payload = {
        role: data.role,
        name: fullName,
        email: data.email,
        password: data.password,
      };
    } else {
      payload = {
        role: data.role,
        name: fullName,
        email: data.email,
        password: data.password,
        driverProfile: {
          vehicleInfo: {
            model: data.vehicleModel,
            licensePlate: data.licensePlate,
            color: data.vehicleColor,
          },
        },
      };
    }

    try {
      await registerMutation(payload).unwrap();
      toast.success(
        `${role === "driver" ? "Driver" : "Rider"} registered successfully!`
      );
      navigate("/");
    } catch (err) {
      type ApiError = { data?: { message?: string }; message?: string };
      const error = err as ApiError;
      toast.error(
        `Registration failed: ${
          error?.data?.message || error?.message || "Unknown error"
        }`
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={authHero}
            alt="City lights"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/80" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16 xl:px-24 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Join thousands of users</span>
            </div>
            <h1 className="text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Start your journey
              <br />
              with RideShare
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-md">
              Experience seamless rides, trusted drivers, and a community that
              moves together.
            </p>
            <div className="flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold">500K+</div>
                <div className="text-white/80 text-sm">Active Riders</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-white/80 text-sm">Trusted Drivers</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-secondary/30 via-background to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-elevated border-border/50 glass-effect">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-medium">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Get started in seconds
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Names */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        {...register("firstName")}
                        className="pl-10 h-11 transition-all focus:shadow-soft"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-xs text-destructive">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...register("lastName")}
                      className="h-11 transition-all focus:shadow-soft"
                    />
                    {errors.lastName && (
                      <p className="text-xs text-destructive">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      className="pl-10 h-11 transition-all focus:shadow-soft"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...register("password")}
                      className="pl-10 h-11 transition-all focus:shadow-soft"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">I want to</Label>
                  <Controller
                    control={control}
                    name="role"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="h-11 transition-all focus:shadow-soft">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rider">Book rides as a Rider</SelectItem>
                          <SelectItem value="driver">Drive and earn as a Driver</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <p className="text-xs text-destructive">{errors.role.message}</p>
                  )}
                </div>

                {/* Driver Fields */}
                {role === "driver" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 pt-4 border-t border-border/50"
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Car className="h-4 w-4 text-primary" />
                      <span>Vehicle Information</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="vehicleModel" className="text-sm">
                          Model
                        </Label>
                        <Input
                          id="vehicleModel"
                          placeholder="Toyota Prius"
                          {...register("vehicleModel")}
                          className="h-11 transition-all focus:shadow-soft"
                        />
                        {errors.vehicleModel && (
                          <p className="text-xs text-destructive">
                            {errors.vehicleModel.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="licensePlate" className="text-sm">
                          License Plate
                        </Label>
                        <Input
                          id="licensePlate"
                          placeholder="DHK-1234"
                          {...register("licensePlate")}
                          className="h-11 transition-all focus:shadow-soft"
                        />
                        {errors.licensePlate && (
                          <p className="text-xs text-destructive">
                            {errors.licensePlate.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Color</Label>
                      <Controller
                        control={control}
                        name="vehicleColor"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="h-11 transition-all focus:shadow-soft">
                              <SelectValue placeholder="Select vehicle color" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="White">White</SelectItem>
                              <SelectItem value="Black">Black</SelectItem>
                              <SelectItem value="Silver">Silver</SelectItem>
                              <SelectItem value="Blue">Blue</SelectItem>
                              <SelectItem value="Red">Red</SelectItem>
                              <SelectItem value="Gray">Gray</SelectItem>
                              <SelectItem value="Green">Green</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.vehicleColor && (
                        <p className="text-xs text-destructive">
                          {errors.vehicleColor.message}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12  text-white font-medium shadow-medium hover:shadow-elevated transition-all duration-300 mt-6 group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating your account...
                    </span>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground pt-4">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary-dark font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
