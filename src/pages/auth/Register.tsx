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
import { Car, User, Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

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
      path: ["vehicleModel"], // attach error to driver info
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
 toast.success(`${role === "driver" ? "Driver" : "Rider"} registered successfully!`);
 navigate('/')
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-elevated rounded-2xl border-border/50 bg-card">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center">
                <Car className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Join RideShare</CardTitle>
            <CardDescription className="text-muted-foreground">
              Create your account to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Names */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      placeholder="First name"
                      {...register("firstName")}
                      className="pl-10 h-12 rounded-xl border-border/50"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    {...register("lastName")}
                    className="h-12 rounded-xl border-border/50"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="pl-10 h-12 rounded-xl border-border/50"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create password"
                    {...register("password")}
                    className="pl-10 h-12 rounded-xl border-border/50"
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label>Role</Label>
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12 rounded-xl border-border/50">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rider">Rider</SelectItem>
                        <SelectItem value="driver">Driver</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p className="text-sm text-red-500">{errors.role.message}</p>
                )}
              </div>

              {/* Driver Fields */}
              {role === "driver" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 border-t pt-4 mt-4"
                >
                  <h4 className="font-medium text-foreground">
                    Driver Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleModel">Vehicle Model</Label>
                      <Input
                        id="vehicleModel"
                        placeholder="e.g. Toyota Prius"
                        {...register("vehicleModel")}
                        className="h-12 rounded-xl border-border/50"
                      />
                      {errors.vehicleModel && (
                        <p className="text-sm text-red-500">
                          {errors.vehicleModel.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licensePlate">License Plate</Label>
                      <Input
                        id="licensePlate"
                        placeholder="DHK-1234"
                        {...register("licensePlate")}
                        className="h-12 rounded-xl border-border/50"
                      />
                      {errors.licensePlate && (
                        <p className="text-sm text-red-500">
                          {errors.licensePlate.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Vehicle Color - now a Select */}
                  <div className="space-y-2">
                    <Label>Vehicle Color</Label>
                    <Controller
                      control={control}
                      name="vehicleColor"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-12 rounded-xl border-border/50">
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
                      <p className="text-sm text-red-500">
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
                className="w-full h-12 gradient-primary text-white rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 mt-6"
              >
                {isSubmitting ? "Creating..." : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  Sign in here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
