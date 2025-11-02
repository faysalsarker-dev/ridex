

import {  motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import { ProfileOverviewCard } from "@/components/modules/user/ProfileOverviewCard";
import { ActionButton } from "@/components/modules/user/ActionButton";
import { UserInfoDialog } from "@/components/modules/user/dialogs/UserInfoDialog";
import toast from "react-hot-toast";
import type { PasswordFormData, UserFormData } from "@/types/user.types";
import type { DriverFormData, IUser } from "@/components/interfaces";
import { DriverInfoDialog } from "@/components/modules/user/dialogs/DriverInfoDialog";
import { ChangePasswordDialog } from "@/components/modules/user/dialogs/ChangePasswordDialog";
import { useChangePasswordMutation, useDriverOnlineMutation, useUpdateMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";



const ProfilePage = () => {

  const {data ,isLoading,refetch} = useUserInfoQuery(undefined);
  const [updateUserInfo, { isLoading: isUpdatingUserInfo }] = useUpdateMutation();
const [passwordChange ,{ isLoading: isPasswordLoading }]=useChangePasswordMutation()
const [driverToggle]=useDriverOnlineMutation()
  const user = data?.data as IUser | undefined;

  const handleUpdateUserInfo = async (data: UserFormData) => {
await updateUserInfo(data).unwrap();
    toast.success("Profile updated successfully!");

  };

  const handleUpdateDriverInfo = async (data: DriverFormData) => {
const driverInfo = { 
  ...user,
   driverProfile:{
  ...user?.driverProfile,
     vehicleInfo: {
      model: data.vehicleModel,
      licensePlate: data.licensePlate,
      color: data.vehicleColor,
    }
   }

  };

      await updateUserInfo(driverInfo).unwrap()
 toast.success("Driver information updated successfully!");
 refetch()
  };

  const handleChangePassword = async (data: PasswordFormData) => {
if(data.newPassword !== data.confirmPassword) return toast.error('New password and confirm password not match')
console.log(data);
const info = {
  oldPassword : data.currentPassword,
  newPassword: data.newPassword
}
await passwordChange(info).unwrap() // need to test 
 toast.success("Password changed successfully!");
 refetch()
  };

  const handleToggleOnline = async () => {

await driverToggle(undefined).unwrap();
    toast.success("Online status updated!");
    refetch()
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out");
  toast.success("Logged out successfully!");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Skeleton className="h-16 w-64 mx-auto mb-8" />
        <div className="grid lg:grid-cols-3 gap-8">
          <Skeleton className="h-96 rounded-2xl" />
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
       

   <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-3">
        Profile Settings
      </h1>
      <p className="text-muted-foreground text-lg">
        Manage your account information and preferences
      </p>
    </motion.div>


        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProfileOverviewCard
              user={user} 
              onToggleOnline={handleToggleOnline}
            />
          </motion.div>

          {/* Right Column - Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            <UserInfoDialog
              user={user}
              onSubmit={handleUpdateUserInfo}
              isLoading={isUpdatingUserInfo}
            />

            {user?.role === "driver" && (
              <DriverInfoDialog
                user={user}
                onSubmit={handleUpdateDriverInfo}
                isLoading={isUpdatingUserInfo}
              />
            )}

            <ChangePasswordDialog
              onSubmit={handleChangePassword}
              isLoading={isPasswordLoading}
            />

            {/* Logout Button - Mobile Only */}
            <div className="lg:hidden">
              <ActionButton
                icon={LogOut}
                label="Logout"
                onClick={handleLogout}
                variant="danger"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
