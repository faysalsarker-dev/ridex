import { useState } from "react";
import { useForm } from "react-hook-form";
import { differenceInDays } from "date-fns";
import { User, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { ActionButton } from "../ActionButton";
import type { IUser } from "@/components/interfaces";
import type { UserFormData } from '@/types/user.types';

interface UserInfoDialogProps {
  user: IUser | undefined;
  onSubmit: (data: UserFormData) => Promise<void>;
  isLoading?: boolean;
}

export const UserInfoDialog = ({ user, onSubmit, isLoading }: UserInfoDialogProps) => {
  const [open, setOpen] = useState(false);

  const updatedAt = user?.updatedAt ? new Date(user.updatedAt) : null;
//   const isLocked = updatedAt ? differenceInDays(new Date(), updatedAt) < 15 : false;
  const isLocked =  false;
  const daysRemaining = isLocked && updatedAt ? 15 - differenceInDays(new Date(), updatedAt) : 0;

  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    defaultValues: {
      email: user?.email,
      name: user?.name,
    },
  });

  const handleFormSubmit = async (data: UserFormData) => {
    try {
      await onSubmit(data);
      setOpen(false);
    } catch (error) {
      console.error("Failed to update user info:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <ActionButton
            icon={User}
            label="Personal Information"
          />
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5 text-primary" />
            Update Personal Info
          </DialogTitle>
          <DialogDescription>
            Update your personal details here. Changes are saved immediately.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5 mt-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
            <Input
              id="email"
              type="email"
              disabled
              {...register("email")}
              className="h-11 bg-muted/50"
            />
            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name {isLocked && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id="name"
              {...register("name", { 
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" }
              })}
              disabled={isLocked}
              className="h-11"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {isLocked && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Profile updates are limited. You can update again in <strong>{daysRemaining} day{daysRemaining !== 1 ? 's' : ''}</strong>.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLocked || isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
