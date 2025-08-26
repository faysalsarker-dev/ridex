import { motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from "react";

const MapView = lazy(() => import("@/components/custom/MapView"));

import { RideDetailsCard } from '@/components/custom/RideDetailsCard';
import { SOSButton } from '@/components/custom/SOSButton';
import { useCancelRideMutation, useChangeRideStatusMutation, useGetSingleRideQuery } from '@/redux/features/ride/ride.api';
import { useNavigate, useSearchParams } from 'react-router';
import type { ApiError } from '@/components/interfaces';
import toast from 'react-hot-toast';


interface Location {
  lat: number;
  lng: number;
  address: string;
}



const InRide = () => {
   const [searchParams] = useSearchParams();
  const [rideId, setRideId] = useState<string | null>(null);

 
  useEffect(() => {
    const rawId = searchParams.get("ride");

    const localId = localStorage.getItem("rideId");

    let id = rawId || localId;

    if (id) {
      id = decodeURIComponent(id).replace(/"/g, "");
      setRideId(id);
      localStorage.setItem("rideId", id); 
    }
  }, [searchParams]);




  const { data ,isLoading} = useGetSingleRideQuery(rideId,{
    skip: !rideId,
    pollingInterval: 20000,
  });
 





const [changeRideStatus] = useChangeRideStatusMutation();

const [cancelRide] = useCancelRideMutation();
const navigate = useNavigate();


const rideData = data?.data;

  const handleCancelRide = async() => {
    if (!rideId) {
      toast.error("No ride ID found to cancel.");
      return;
    }
    try {
      await cancelRide({ rideId }).unwrap();
      toast.success("Ride cancelled successfully");
      localStorage.removeItem("rideId");
      navigate(`/rider/rides`);
    } catch (err) {
      const error = err as ApiError;
      toast.error(`Failed to cancel ride: ${error.message}`);
    }
  };


  const onChangeStatus = (
    status: "requested" | "accepted" | "picked_up" | "in_transit" | "completed" | "cancelled_by_rider" | "cancelled_by_driver"
  ) => {
    if(!rideId) return toast.error("No ride ID found");
    changeRideStatus({ rideId, status }).unwrap();
  };

  const handleSOS = () => {

    // SOS logic would go here
    console.log("SOS activated!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (rideData?.status === 'cancelled') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-background p-4"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Ride Cancelled</h2>
          <p className="text-muted-foreground">Your ride has been cancelled successfully.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative bg-background overflow-x-hidden"
    >
   <SOSButton onSOS={handleSOS} />




<div className="grid md:grid-cols-2 gap-4 min-h-screen overflow-hidden"> 
  {/* Left Column: Map */}
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className=" w-full rounded-lg overflow-hidden md:h-full h-96"
  >
    <Suspense fallback={  <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />}>
      <MapView
        pickupLocation={rideData?.pickupLocation}
        destinationLocation={rideData?.destinationLocation}
        className="h-full w-full"
      />
    </Suspense >
  </motion.div>

  {/* Right Column: Ride Details */}
  <div className="flex items-center justify-center w-full h-full md:mt-20 mt-4">
    <RideDetailsCard
      pickupLocation={rideData?.pickupLocation}
      destinationLocation={rideData?.destinationLocation}
      estimatedFare={rideData?.fare}
      passengers={rideData?.passengers}
      status={rideData?.status}
      onChangeStatus={onChangeStatus}
      onCancelRide={handleCancelRide}
    />
  </div>
</div>



     

      {/* Status Bar Overlay for mobile */}
      <div className="absolute  top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/20 to-transparent z-40 pointer-events-none" />
    </motion.div>
  );
};

export default InRide;