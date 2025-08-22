import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Lock, Car, Star, Shield, Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



const Profile = () => {
  const [isDriver] = useState(true); 

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();

  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Profile Settings</h1>
        <p className="text-xl text-muted-foreground">
          Manage your account information and preferences
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="shadow-soft rounded-2xl border-border/50">
            <CardHeader className="text-center">
              <div className="relative mx-auto mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                  <AvatarFallback className="text-2xl font-semibold gradient-primary text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  variant="secondary"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="text-xl">John Doe</CardTitle>
              <CardDescription className="text-base">john.doe@email.com</CardDescription>
              <div className="flex justify-center gap-2 mt-3">
                {isDriver ? (
                  <Badge className="gradient-primary text-white">Driver</Badge>
                ) : (
                  <Badge variant="secondary">Rider</Badge>
                )}
                <Badge variant="outline" className="gap-1">
                  <Shield className="h-3 w-3" />
                  Verified
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Member since</span>
                  <span className="text-sm font-medium">January 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                {isDriver && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Rides</span>
                    <span className="text-sm font-medium">127</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>


<Dialog>
  <DialogTrigger> <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
             
            </CardHeader></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Update your personal details here</DialogTitle>
        <Card className="shadow-soft rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      defaultValue="John"
                      className="h-12 rounded-xl border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      defaultValue="Doe"
                      className="h-12 rounded-xl border-border/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@email.com"
                      className="pl-10 h-12 rounded-xl border-border/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="h-12 rounded-xl border-border/50"
                  />
                </div>
                <Button 
                  type="submit"
                  className="gradient-primary text-white rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  Update Profile
                </Button>
              </form>
            </CardContent>
          </Card>
    </DialogHeader>
  </DialogContent>
</Dialog>



        {/* Profile Forms */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Personal Information */}
          <Card className="shadow-soft rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      defaultValue="John"
                      className="h-12 rounded-xl border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      defaultValue="Doe"
                      className="h-12 rounded-xl border-border/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@email.com"
                      className="pl-10 h-12 rounded-xl border-border/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="h-12 rounded-xl border-border/50"
                  />
                </div>
                <Button 
                  type="submit"
                  className="gradient-primary text-white rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  Update Profile
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Driver Information */}
          {isDriver && (
            <Card className="shadow-soft rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Driver & Vehicle Information
                </CardTitle>
                <CardDescription>
                  Update your vehicle details and driver information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleModel">Vehicle Model</Label>
                      <Input
                        id="vehicleModel"
                        defaultValue="Toyota Camry"
                        className="h-12 rounded-xl border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licensePlate">License Plate</Label>
                      <Input
                        id="licensePlate"
                        defaultValue="ABC-1234"
                        className="h-12 rounded-xl border-border/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleColor">Vehicle Color</Label>
                    <Input
                      id="vehicleColor"
                      defaultValue="Silver"
                      className="h-12 rounded-xl border-border/50"
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="gradient-primary text-white rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300"
                  >
                    Update Vehicle Info
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Change Password */}
          <Card className="shadow-soft rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>
                Update your account password for security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    className="h-12 rounded-xl border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="h-12 rounded-xl border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="h-12 rounded-xl border-border/50"
                  />
                </div>
                <Button 
                  type="submit"
                  className="gradient-primary text-white rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;