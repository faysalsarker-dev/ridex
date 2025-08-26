import { motion } from "framer-motion";

import { useAcceptRideMutation, useGetAvailableRidesQuery } from "@/redux/features/ride/ride.api";
import {AvailableRidesCard, AvailableRidesCardSkeleton} from "@/components/custom/AvailableRidesCard";
import type { ApiError, Ride } from "@/components/interfaces";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const DriverRides = () => {
const { data: availableRides ,isLoading } = useGetAvailableRidesQuery(undefined,{
    pollingInterval: 10000, 
  });
const [acceptRide] = useAcceptRideMutation();

const navigate = useNavigate();

  const handleAcceptRide = async(rideId: string) => {

  try {
    const res = await acceptRide({rideId}).unwrap();
        localStorage.setItem("rideId", JSON.stringify(res?.data?._id));
      navigate(`/rider/on-ride?ride=${res?.data?._id}`);
      toast.success("Accepted ride");
    } catch (err: unknown) {

      toast.error((err as ApiError)?.data?.message || "Failed to submit ride");
    }



  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Available Rides</h1>
        <p className="text-xl text-muted-foreground">
          Choose from available ride requests in your area
        </p>
      </motion.div>

{
isLoading && (
<div className="grid gap-6 max-w-4xl mx-auto md:grid-cols-2">
  {
    Array.from({ length: 6 }).map((_, index) => (
      <AvailableRidesCardSkeleton key={index} />
    ))
  }
  
  <AvailableRidesCardSkeleton index={0} />
</div>

)
}


      <div className="grid gap-6 max-w-4xl mx-auto md:grid-cols-2">
        {availableRides?.data?.map((ride:Ride, index:number) => (
          <AvailableRidesCard
            key={ride._id}
            ride={ride}
            index={index}
            handleAcceptRide={handleAcceptRide}
          />
        ))}
      </div>
    </div>
  );
};

export default DriverRides;