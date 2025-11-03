import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, MapPin, Star, Users, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { IUser, Ride } from "@/components/interfaces";
import Loader from "@/components/shared/Loader";
import {
  useUpdateHistoryDriverMutation,
  useUpdateHistoryRiderMutation,
} from "@/redux/features/history/history.api";
import toast from "react-hot-toast";

interface RideHistoryCardProps {
  ride: Ride;
  onCancel?: (id: string) => void;
  user: IUser;
  isloading: boolean;
}

const RideHistoryCard = ({
  ride,
  onCancel,
  user,
  isloading,
}: RideHistoryCardProps) => {
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const [updateRider, { isLoading: riderLoading }] =
    useUpdateHistoryRiderMutation();
  const [updateDriver, { isLoading: driverLoading }] =
    useUpdateHistoryDriverMutation();


  const handleUpdateHistory = async (ratingValue: number) => {
    if(!ride?.history?._id) return toast.error('No History found')
    try {
const id = ride.history._id
      if (user?.role === "rider") {
        


              const payload = {  rating:ratingValue };

     
                await updateRider({id, payload}).unwrap();

      } else if (user.role === "driver") {
          const payload = {  rating:ratingValue };


        await updateDriver({id, payload}).unwrap();

      }
toast.success('Rating added Successfully')
      setOpenRatingDialog(false);
    } catch (err) {
      console.log(err);
      toast.error("Rating update failed");
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      requested: "bg-blue-100 text-blue-800",
      accepted: "bg-indigo-100 text-indigo-800",
      picked_up: "bg-purple-100 text-purple-800",
      in_transit: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled_by_rider: "bg-red-100 text-red-800",
      cancelled_by_driver: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={colors[status] || "bg-gray-100 text-gray-800"}>
        {status.replace(/_/g, " ").toUpperCase()}
      </Badge>
    );
  };

  if (isloading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-card rounded-2xl shadow-md p-5 border border-border flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-base font-semibold text-foreground">
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <span className="truncate">
            {ride?.pickupLocation?.address} → {ride?.destinationLocation?.address}
          </span>
        </div>
        {getStatusBadge(ride.status)}
      </div>

      {/* Driver Info */}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Driver:</span>{" "}
        {ride?.driver?.name || "N/A"} ({ride?.driver?.email})
      </div>

      {/* Date & Fare */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          {format(new Date(ride?.createdAt), "yyyy-MM-dd hh:mm a")}
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-green-500" />
          <span className="font-semibold text-foreground">{ride.fare} BDT</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          {ride.passengers} Passengers
        </div>
      </div>

      {/* Ratings */}
    
{ride?.status === "completed" &&
  (
    (user?.role === "driver" && (!ride?.history?.riderRating || ride.history.riderRating < 1)) ||
    (user?.role === "rider" && (!ride?.history?.driverRating || ride.history.driverRating < 1))
  ) && (
    <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-border">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">
            {user?.role === "rider" ? "Rate Driver:" : "Rate Rider:"}
          </span>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 cursor-pointer ${
                i < (selectedRating || 0)
                  ? "text-yellow-400"
                  : "text-muted-foreground"
              }`}
              onClick={() => setOpenRatingDialog(true)}
            />
          ))}
        </div>

        <AlertDialog open={openRatingDialog} onOpenChange={setOpenRatingDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {user?.role === "rider" ? "Rate Your Driver" : "Rate Your Rider"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {user?.role === "rider"
                  ? "How was your ride experience?"
                  : "How was your experience with this rider?"}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex justify-center gap-2 py-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-7 w-7 cursor-pointer ${
                    i < (selectedRating || 0)
                      ? "text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setSelectedRating(i + 1)}
                />
              ))}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction
                disabled={!selectedRating || riderLoading || driverLoading}
                onClick={() =>
                  selectedRating && handleUpdateHistory(selectedRating)
                }
              >
                {riderLoading || driverLoading ? "Saving..." : "Done"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )}





{/* Show ratings summary */}
{ride?.status === "completed" && (
  <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground border-t border-border pt-2">
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 text-yellow-400" />
      <span>
        Driver Rating:{" "}
        <span className="font-medium text-foreground">
          {ride?.history?.driverRating
            ? `${ride.history.driverRating} / 5`
            : "Not rated yet"}
        </span>
      </span>
    </div>
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 text-yellow-400" />
      <span>
        Rider Rating:{" "}
        <span className="font-medium text-foreground">
          {ride?.history?.riderRating
            ? `${ride.history.riderRating} / 5`
            : "Not rated yet"}
        </span>
      </span>
    </div>
  </div>
)}

      {/* Cancel Ride Button */}
      {ride.status === "requested" && user.role === "rider" && (
        <div className="pt-3 border-t border-border">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-red-500 text-white hover:bg-red-400">
                <X /> Cancel Ride
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently cancel your ride request.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Go Back</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => onCancel && onCancel(ride._id)}
                >
                  Confirm Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </motion.div>
  );
};

export default RideHistoryCard;
