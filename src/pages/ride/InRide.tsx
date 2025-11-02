import { motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router';
import toast from 'react-hot-toast';

const MapView = lazy(() => import("@/components/custom/MapView"));

import { RideDetailsCard } from '@/components/custom/RideDetailsCard';
import { SOSButton } from '@/components/modules/rides/SOSButton';
import { useCancelRideMutation, useChangeRideStatusMutation, useGetSingleRideQuery } from '@/redux/features/ride/ride.api';
import type { ApiError } from '@/components/interfaces';
import NoRidePage from './NoRidePage';
import { Loader2 } from 'lucide-react';

const InRide = () => {
  const [searchParams] = useSearchParams();
  const [rideId, setRideId] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const { data, isLoading } = useGetSingleRideQuery(rideId, {
    skip: !rideId,
    pollingInterval: 20000,
  });

  const [changeRideStatus] = useChangeRideStatusMutation();
  const [cancelRide] = useCancelRideMutation();

  if (!rideId) {
    return <NoRidePage />;
  }

  const rideData = data?.data;

  const handleCancelRide = async () => {
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
    if (!rideId) return toast.error("No ride ID found");
    changeRideStatus({ rideId, status }).unwrap();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium">Loading ride details...</p>
        </motion.div>
      </div>
    );
  }

  if (rideData?.status === 'cancelled') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center bg-background p-4"
      >
        <div className="text-center max-w-md mx-auto glass-morphism rounded-2xl p-8 shadow-elevated">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Ride Cancelled</h2>
          <p className="text-muted-foreground mb-6">Your ride has been cancelled successfully.</p>
          <button
            onClick={() => navigate('/rider/rides')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Back to Rides
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen relative bg-background"
    >
      <SOSButton />

      <div className="grid lg:grid-cols-2 gap-0 min-h-screen">
        {/* Map Section */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-full lg:h-screen h-[50vh] order-1 lg:order-1"
        >
          <Suspense
            fallback={
              <div className="h-full w-full flex items-center justify-center bg-muted">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            }
          >
            <MapView
              pickupLocation={rideData?.pickupLocation}
              destinationLocation={rideData?.destinationLocation}
              className="h-full w-full"
            />
          </Suspense>
        </motion.div>

        {/* Ride Details Section */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center w-full p-4 lg:p-8 order-2 lg:order-2 bg-background lg:bg-transparent"
        >
          <div className="w-full max-w-2xl">
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InRide;
