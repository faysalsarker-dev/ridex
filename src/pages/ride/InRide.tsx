import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MapView from '@/components/custom/MapView';
import { RideDetailsCard } from '@/components/custom/RideDetailsCard';
import { SOSButton } from '@/components/custom/SOSButton';


interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface RideData {
  pickupLocation: Location;
  destinationLocation: Location;
  estimatedFare: string;
  passengers: number;
  status: 'active' | 'cancelled' | 'completed';
}

const InRide = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rideData, setRideData] = useState<RideData>({
    pickupLocation: {
      lat: 26.8103,
      lng: 90.4125,
      address: "Gulshan, Dhaka"
    },
    destinationLocation: {
      lat: 24.2092,
      lng: 90.4725,
      address: "Dhanmondi, Dhaka"
    },
    estimatedFare: "৳250",
    passengers: 2,
    status: 'active'
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleCancelRide = () => {
    setRideData(prev => ({ ...prev, status: 'cancelled' }));

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

  if (rideData.status === 'cancelled') {
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
    <MapView
      pickupLocation={rideData.pickupLocation}
      destinationLocation={rideData.destinationLocation}
      className="h-full w-full"
    />
  </motion.div>

  {/* Right Column: Ride Details */}
  <div className="flex items-center justify-center w-full h-full md:mt-20 mt-4">
    <RideDetailsCard
      pickupLocation={rideData.pickupLocation}
      destinationLocation={rideData.destinationLocation}
      estimatedFare={rideData.estimatedFare}
      passengers={rideData.passengers}
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