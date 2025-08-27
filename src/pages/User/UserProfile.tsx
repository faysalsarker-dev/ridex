
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {  Star, Shield, LogOut } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import {  authApi, useDriverOnlineMutation, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";

import { ChangePassword, DriverInfo, UserInfo } from "./UserDialog";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/redux/hooks";


const Profile = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const user = data?.data;
  const [driverOnline] = useDriverOnlineMutation();
   const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();


   const handleLogout = async () => {
       await logout(undefined).unwrap();
    dispatch(authApi.util.resetApiState());
   }

const handleToggle = () => {
  driverOnline({ isOnline: !user?.driverProfile?.isOnline }).unwrap();
}

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-10 w-40 mb-6" />
        <div className="grid lg:grid-cols-3 gap-8">
          <Skeleton className="h-64 rounded-2xl" />
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-56 rounded-2xl" />
            <Skeleton className="h-56 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Profile Settings</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Manage your account information and preferences
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Profile Overview */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-2xl font-semibold bg-gradient-to-r from-primary to-blue-500 text-white">
                    {user?.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-lg md:text-xl">{user?.name}</CardTitle>
              <CardDescription className="text-sm md:text-base">
                {user?.email}
              </CardDescription>

              {/* Badges */}
              <div className="flex justify-center flex-wrap gap-2 mt-3">
                {user?.role === "driver" ? (
                  <Badge className="bg-gradient-to-r from-primary to-blue-500 text-white">
                    Driver
                  </Badge>
                ) : (
                  <Badge variant="secondary">Rider</Badge>
                )}
                {user?.role === "driver" &&
                  (user?.driverProfile?.isApproved ? (
                    <Badge
                      variant="outline"
                      className="gap-1 bg-green-100 text-green-600 border-green-200"
                    >
                      <Shield className="h-3 w-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="gap-1 bg-red-100 text-red-500 border-red-200"
                    >
                      <Shield className="h-3 w-3" />
                      Unverified
                    </Badge>
                  ))}

              </div>
            </CardHeader>

            {
              user?.role === "driver" && (
                <div className="flex justify-center items-center space-x-2 w-full ">
                  <Switch
                    checked={user?.driverProfile?.isOnline}
                    onCheckedChange={handleToggle}
                    id="Active-status"
                  />
                  <Label htmlFor="Active-status">Youre {user?.driverProfile?.isOnline ? "Online" : "Offline"}</Label>
                </div>
              )
            }
                     

            <CardContent className="divide-y divide-border/40">
              <div className="flex justify-between py-3 text-sm">
                <span className="text-muted-foreground">Member since</span>
                <span className="font-medium">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between py-3 text-sm">
                <span className="text-muted-foreground">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{user?.rating || "N/A"}</span>
                </div>
              </div>
              {user?.role === "driver" && (
                <div className="flex justify-between py-3 text-sm">
                  <span className="text-muted-foreground">Total Rides</span>
                  <span className="font-medium">{user?.totalRides || 0}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-4"
        >
          {/* Personal Info */}
          <UserInfo user={user} />
          {/* Driver Info */}
          {user?.role === "driver" && (
         <DriverInfo user={user} />
          )}

          {/* Change Password */}
          <ChangePassword />
          {/* Logout (mobile only) */}
          <div           onClick={handleLogout}
 className="flex items-center gap-2 w-full bg-card shadow-sm p-3 rounded-xl md:hidden">
            <LogOut className="h-5 w-5 text-red-500" />
            <span className="font-medium text-sm md:text-base text-red-500">
              Logout
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
