import { motion } from "framer-motion";
import { Clock, DollarSign, MapPin, Star, Users, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { Ride } from './../interfaces/index';
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


import { Button } from '@/components/ui/button';



const RideHistoryCard = ({ ride , onCancel }: { ride: Ride, onCancel: (id: string) => void }) => {
  const getStatusBadge = (status: string) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-card rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col gap-4 border border-border"
    >
      {/* Header: Pickup → Destination + Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2 text-base sm:text-lg font-semibold text-foreground">
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <span className="truncate">
            {ride?.pickupLocation?.address} → {ride?.destinationLocation?.address}
          </span>
        </div>
        <div>{getStatusBadge(ride.status)}</div>
      </div>

      {/* Date & Time */}
      <div className="flex items-center text-sm text-muted-foreground gap-2">
        <Clock className="h-4 w-4 text-primary" />
        {format(new Date(ride?.createdAt), "yyyy-MM-dd hh:mm a")}
      </div>

      {/* Fare & Passengers */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <DollarSign className={`h-4 w-4 ${(ride.status === 'cancelled_by_rider' || ride.status === 'cancelled_by_driver') ? 'text-red-500' : 'text-green-500'}`} />
          <span className="font-medium text-foreground">
            ${ride.fare.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Users className={`h-4 w-4 ${(ride.status === 'cancelled_by_rider' || ride.status === 'cancelled_by_driver') ? 'text-red-500' : 'text-primary'} `} />
          {ride.passengers} Passengers
        </div>
      </div>

      {/* Ratings */}


      {
        ride.status === "completed" && (
<p>placeholder</p>
      //      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-border">
      //   <div className="flex items-center gap-2 text-sm">
      //     <span className="font-medium text-foreground">Your Rating:</span>
      //     {[...Array(5)].map((_, i) => (
      //       <Star
      //         key={i}
      //         className={`h-4 w-4 transition-colors ${
      //           i < ride?.userRating ? "text-yellow-400" : "text-muted-foreground"
      //         }`}
      //       />
      //     ))}
      //   </div>
      //   <div className="flex items-center gap-2 text-sm">
      //     <span className="font-medium text-foreground">Driver Rating:</span>
      //     {[...Array(5)].map((_, i) => (
      //       <Star
      //         key={i}
      //         className={`h-4 w-4 transition-colors ${
      //           i < ride.driverRating
      //             ? "text-yellow-400"
      //             : "text-muted-foreground"
      //         }`}
      //       />
      //     ))}
      //   </div>
      // </div>
        )
      }


      {
        ride.status === "requested" && (
          <div>

<AlertDialog>
  <AlertDialogTrigger>
            <Button  className="bg-red-500 text-white hover:bg-red-300"><X/> Cancel Ride</Button>


  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently cancel your ride request.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter >
      <AlertDialogCancel className="bg-white hover:bg-gray-300">No, Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-red-500 text-white hover:bg-red-300" onClick={() => onCancel(ride._id)}>Yes, Confirm</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>



          </div>
        )
      }
     
    </motion.div>
  );
};

export default RideHistoryCard;
