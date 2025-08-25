

import { useCancelRideMutation, useRideHistoryQuery } from "@/redux/features/ride/ride.api";
import { AnimatedList } from "../magicui/animated-list";
import RideHistoryCard from "./RideHistoryCard";
import RideHistoryCardSkeleton from "./RideHistoryCardSkeleton";
import type { Ride } from "../interfaces";
import toast from "react-hot-toast";


const LastRides = () => {
const {data ,isLoading }=useRideHistoryQuery(undefined)
const [cancelRide] = useCancelRideMutation();

const onCancel = async (rideId: string) => {
  try {
    await cancelRide({ rideId }).unwrap(); 
    toast.success("Ride cancelled successfully!");
  } catch (err: any) {
    console.error("Failed to cancel ride:", err);
    toast.error(err?.data?.message || "Something went wrong while cancelling ride.");
  }
};



  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Your Last 5 Rides</h2>

      {isLoading && (
         <div className="space-y-4">
        {Array.from({ length: 5 }).map((_,idx) => (
          <RideHistoryCardSkeleton key={idx} />
        ))}
      </div>
      )}
      <AnimatedList className="space-y-4">
        {data?.data?.map((ride:Ride) => (
          <RideHistoryCard key={ride._id} ride={ride} onCancel={onCancel}/>
        ))}
      </AnimatedList>
    </div>
  );
};

export default LastRides;
