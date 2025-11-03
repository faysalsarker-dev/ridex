import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, MapPin, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Skeleton } from '@/components/ui/skeleton';
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
} from "@/components/ui/alert-dialog"
import type { Ride } from "@/components/interfaces";


interface AvailableRidesCardProps {
  ride: Ride;
  index?: number;
  handleAcceptRide: (rideId: string) => void;
}

export const AvailableRidesCard = ({
  ride,
  index = 0,
  handleAcceptRide,
}: AvailableRidesCardProps) => {
  const getStatusBadge = (status: Ride["status"]) => {
    switch (status) {
      case "requested":
        return <Badge className="bg-blue-100 text-blue-800">Requested</Badge>;
      case "accepted":
        return <Badge className="bg-indigo-100 text-indigo-800">Accepted</Badge>;
      case "picked_up":
        return <Badge className="bg-purple-100 text-purple-800">Picked Up</Badge>;
      case "in_transit":
        return <Badge className="bg-yellow-100 text-yellow-800">In Transit</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "cancelled_by_rider":
        return <Badge className="bg-red-100 text-red-800">Cancelled by Rider</Badge>;
      case "cancelled_by_driver":
        return <Badge className="bg-red-100 text-red-800">Cancelled by Driver</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <motion.div
      key={ride._id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="shadow-soft hover:shadow-elevated transition-all duration-300 rounded-2xl border border-border/50">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-3 flex-wrap">
              {ride.rider.name}
              {ride.userRating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{ride.userRating}</span>
                </div>
              )}
            </CardTitle>
            <CardDescription className="text-base mt-1 text-muted-foreground">
              {ride.passengers} passenger{ride.passengers && ride.passengers > 1 ? "s" : ""} •{" "}
              {format(new Date(ride.createdAt), "yyyy-MM-dd hh:mm a")}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className="text-lg font-bold px-3 py-1 bg-green-100 text-green-800">
              ${ride.fare}
            </Badge>
            {getStatusBadge(ride.status)}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Pickup & Destination */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-medium">Pickup</p>
                <p className="text-muted-foreground">{ride.pickupLocation.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="font-medium">Destination</p>
                <p className="text-muted-foreground">{ride.destinationLocation.address}</p>
              </div>
            </div>
          </div>

          {/* Ride info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{format(new Date(ride.createdAt), "hh:mm a")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>
                {ride.passengers || 1} passenger{ride.passengers && ride.passengers > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span >${ride.fare}</span>
            </div>
          </div>

          {/* Notes */}
          {ride.notes && (
            <div className="bg-muted/50 p-3 rounded-xl">
              <p className="text-sm">
                <strong>Note:</strong> {ride.notes}
              </p>
            </div>
          )}


<AlertDialog>
  <AlertDialogTrigger asChild>


      <Button
            className="w-full h-12  text-white rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300"
          >
            Accept Ride
          </Button>

  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        You will allow to accept this ride.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction             onClick={() => handleAcceptRide(ride._id)}
>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>




          {/* Accept button */}
    
        </CardContent>
      </Card>
    </motion.div>
  );
};










export const AvailableRidesCardSkeleton = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bg-white dark:bg-card rounded-2xl shadow-soft p-4 sm:p-6 border border-border/50 animate-pulse flex flex-col gap-4">
        {/* Header: Rider + Fare */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-40 rounded-md" />
            <Skeleton className="h-4 w-32 rounded-md" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
        </div>

        {/* Pickup & Destination */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
            <Skeleton className="h-4 w-40 rounded-md" />
          </div>
          <div className="flex items-start gap-3">
            <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
            <Skeleton className="h-4 w-40 rounded-md" />
          </div>
        </div>

        {/* Ride info: time, passengers, fare */}
        <div className="flex flex-wrap gap-6">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>

        {/* Notes */}
        <div className="bg-muted/50 p-3 rounded-xl">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md mt-2" />
        </div>

        {/* Accept button */}
        <Skeleton className="h-12 w-full rounded-xl mt-2" />
      </div>
    </motion.div>
  );
};

