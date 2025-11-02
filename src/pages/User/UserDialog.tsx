
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Lock, User } from "lucide-react";
import {
  useChangePasswordMutation,
  useUpdateMutation,
} from "@/redux/features/auth/auth.api";
import type {  DriverFormData, IUser } from "@/components/interfaces";

export const UserInfo = ({ user }: { user: IUser }) => {
  const [open, setOpen] = useState(false);
  const [update, { isLoading }] = useUpdateMutation();

  const updatedAt = user?.updatedAt ? new Date(user.updatedAt) : null;
  const isLocked = updatedAt
    ? differenceInDays(new Date(), updatedAt) < 15
    : false;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: user?.email,
      name: user?.name,
    },
  });



  const onSubmit = async (data: {name:string}) => {
    try {
      await update({ ...user, name: data.name }).unwrap();
      toast.success("Profile updated successfully!");
      reset();
      setOpen(false);
    } catch (err) {
             type ApiError = { data?: { message?: string }; message?: string };
      const error = err as ApiError;
      toast.error(error?.data?.message || "Failed to update profile.");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 w-full bg-card shadow-sm p-3 rounded-xl hover:bg-accent transition">
          <User className="h-5 w-5 text-primary" />
          <span className="font-medium text-sm md:text-base">
            Personal Information
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" /> Update Personal Info
          </DialogTitle>
          <DialogDescription>
            Update your personal details here.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input disabled {...register("email")} className="h-11" />
          </div>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              {...register("name")}
              disabled={isLocked}
              className="h-11 rounded-xl bg-background"
            />
          </div>

          {isLocked && (
            <p className="text-xs text-red-500">
              You can update profile info after{" "}
              {15 - differenceInDays(new Date(), updatedAt!)} days.
            </p>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLocked || isLoading}
              className="rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};





// ---------------- Driver Info ----------------
export const DriverInfo = ({ user }: { user: IUser }) => {
  const [open, setOpen] = useState(false);
  const [update, { isLoading }] = useUpdateMutation();

  const updatedAt = user?.updatedAt ? new Date(user.updatedAt) : null;
  const isLocked = updatedAt
    ? differenceInDays(new Date(), updatedAt) < 15
    : false;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      vehicleModel: user?.driverProfile?.vehicleInfo?.model || "",
      licensePlate: user?.driverProfile?.vehicleInfo?.licensePlate || "",
      vehicleColor: user?.driverProfile?.vehicleInfo?.color || "",
    },
  });

  const onSubmit = async (data: DriverFormData) => {
    try {
      const updatedUser = {
        ...user,
        driverProfile: {
          ...user.driverProfile,
          vehicleInfo: {
            model: data.vehicleModel,
            licensePlate: data.licensePlate,
            color: data.vehicleColor,
          },
        },
      };
      await update(updatedUser).unwrap();
      toast.success("Vehicle info updated successfully!");
      reset();
      setOpen(false);
    } catch (err) {
             type ApiError = { data?: { message?: string }; message?: string };
      const error = err as ApiError;
      toast.error(error?.data?.message || "Failed to update vehicle info.");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 w-full bg-card shadow-sm p-3 rounded-xl hover:bg-accent transition">
          <Car className="h-5 w-5 text-primary" />
          <span className="font-medium text-sm md:text-base">
            Driver & Vehicle Information
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" /> Update Vehicle Info
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Vehicle Model</Label>
              <Input
                {...register("vehicleModel")}
                disabled={isLocked}
                className="h-11 rounded-xl bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label>License Plate</Label>
              <Input
                {...register("licensePlate")}
                disabled={isLocked}
                className="h-11 rounded-xl bg-background"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Vehicle Color</Label>
            <Input
              {...register("vehicleColor")}
              disabled={isLocked}
              className="h-11 rounded-xl bg-background"
            />
          </div>

          {isLocked && (
            <p className="text-xs text-red-500">
              You can update profile info after{" "}
              {15 - differenceInDays(new Date(), updatedAt!)} days.
            </p>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLocked || isLoading}
              className="rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white"
            >
              {isLoading ? "Saving..." : "Save Vehicle Info"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// ---------------- Change Password ----------------
export const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: { currentPassword: string; newPassword: string; confirmPassword: string; }) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success("Password updated successfully!");
      reset();
      setOpen(false);
    } catch (err) {
     type ApiError = { data?: { message?: string }; message?: string };
      const error = err as ApiError;
      toast.error(error?.data?.message || "Failed to update password.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 w-full bg-card shadow-sm p-3 rounded-xl hover:bg-accent transition">
          <Lock className="h-5 w-5 text-primary" />
          <span className="font-medium text-sm md:text-base">
            Change Password
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" /> Update Password
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              {...register("currentPassword", { required: true })}
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              type="password"
              {...register("newPassword", { required: true })}
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input
              type="password"
              {...register("confirmPassword", { required: true })}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-gradient-to-r from-primary to-blue-500 text-white"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
