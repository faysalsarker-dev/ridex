import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, User, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const Register = () => {
  const [role, setRole] = useState<string>("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-elevated rounded-2xl border-border/50">
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
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="First name"
                    className="pl-10 h-12 rounded-xl border-border/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  className="h-12 rounded-xl border-border/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 rounded-xl border-border/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  className="pl-10 h-12 rounded-xl border-border/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="h-12 rounded-xl border-border/50">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rider">Rider</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === "driver" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="space-y-4 border-t pt-4 mt-4"
              >
                <h4 className="font-medium text-foreground">Driver Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleModel" className="text-sm font-medium">Vehicle Model</Label>
                    <Input
                      id="vehicleModel"
                      placeholder="e.g. Toyota Camry"
                      className="h-12 rounded-xl border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licensePlate" className="text-sm font-medium">License Plate</Label>
                    <Input
                      id="licensePlate"
                      placeholder="ABC-1234"
                      className="h-12 rounded-xl border-border/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleColor" className="text-sm font-medium">Vehicle Color</Label>
                  <Input
                    id="vehicleColor"
                    placeholder="e.g. White"
                    className="h-12 rounded-xl border-border/50"
                  />
                </div>
              </motion.div>
            )}

            <Button 
              className="w-full h-12 gradient-primary text-white rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 mt-6"
              asChild
            >
              <Link to="/">
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;