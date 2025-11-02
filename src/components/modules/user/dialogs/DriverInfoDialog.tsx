import { useState } from "react";
import { useForm } from "react-hook-form";
import { differenceInDays } from "date-fns";
import { Car, Info } from "lucide-react";
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
import type { DriverFormData } from "@/types/user.types";
import { ActionButton } from "../ActionButton";
import type { IUser } from "@/components/interfaces";

interface DriverInfoDialogProps {
  user: IUser;
  onSubmit: (data: DriverFormData) => Promise<void>;
  isLoading?: boolean;
}

export const DriverInfoDialog = ({ user, onSubmit, isLoading }: DriverInfoDialogProps) => {
  const [open, setOpen] = useState(false);

  const updatedAt = user?.updatedAt ? new Date(user.updatedAt) : null;
  // const isLocked = updatedAt ? differenceInDays(new Date(), updatedAt) < 15 : false;
  const isLocked =  false;
  const daysRemaining = isLocked && updatedAt ? 15 - differenceInDays(new Date(), updatedAt) : 0;

  const { register, handleSubmit, formState: { errors } } = useForm<DriverFormData>({
    defaultValues: {
      vehicleModel: user?.driverProfile?.vehicleInfo?.model || "",
      licensePlate: user?.driverProfile?.vehicleInfo?.licensePlate || "",
      vehicleColor: user?.driverProfile?.vehicleInfo?.color || "",
    },
  });

  const handleFormSubmit = async (data: DriverFormData) => {
    try {
      await onSubmit(data);
      setOpen(false);
    } catch (error) {
      console.error("Failed to update driver info:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <ActionButton
            icon={Car}
            label="Driver & Vehicle Information"
          />
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Car className="h-5 w-5 text-primary" />
            Update Driver & Vehicle Info
          </DialogTitle>
          <DialogDescription>
            Manage your vehicle details and driver information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5 mt-2">
          {/* Driver Information Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Driver Information
            </h3>
            
           
          </div>

          {/* Vehicle Information Section */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Vehicle Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleModel" className="text-sm font-medium">
                  Vehicle Model
                </Label>
                <Input
                  id="vehicleModel"
                  {...register("vehicleModel", { 
                    required: "Vehicle model is required"
                  })}
                  disabled={isLocked}
                  placeholder="Toyota Camry 2022"
                  className="h-11"
                />
                {errors.vehicleModel && (
                  <p className="text-xs text-destructive">{errors.vehicleModel.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleColor" className="text-sm font-medium">
                  Vehicle Color
                </Label>
                <Input
                  id="vehicleColor"
                  {...register("vehicleColor", { 
                    required: "Vehicle color is required"
                  })}
                  disabled={isLocked}
                  placeholder="Silver"
                  className="h-11"
                />
                {errors.vehicleColor && (
                  <p className="text-xs text-destructive">{errors.vehicleColor.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licensePlate" className="text-sm font-medium">
                License Plate
              </Label>
              <Input
                id="licensePlate"
                {...register("licensePlate", { 
                  required: "License plate is required"
                })}
                disabled={isLocked}
                placeholder="ABC-1234"
                className="h-11"
              />
              {errors.licensePlate && (
                <p className="text-xs text-destructive">{errors.licensePlate.message}</p>
              )}
            </div>
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
              {isLoading ? "Saving..." : "Save Vehicle Info"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
