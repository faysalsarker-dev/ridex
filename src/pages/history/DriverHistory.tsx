import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin,  DollarSign, TrendingUp } from "lucide-react";
import { useDriverHistoryQuery } from "@/redux/features/ride/ride.api";
import RideHistoryCard from "@/components/modules/rides/RideHistoryCard";
import type {  Ride } from "@/components/interfaces";

const DriverHistory = () => {
  const {data :rideHistory}=useDriverHistoryQuery(undefined);
  





  const totalEarned = rideHistory?.data?.filter((ride: Ride) => ride.status === "completed")
    .reduce((total:number, ride:Ride) => total + ride.fare, 0);

  const completedRides = rideHistory?.data?.filter((ride:Ride) => ride?.status === "completed").length;

  // const avgRating = rideHistory
  //   .filter(ride => ride.ratingGiven !== null)
  //   .reduce((acc, ride) => acc + (ride.ratingGiven || 0), 0) / 
  //   rideHistory.filter(ride => ride.ratingGiven !== null).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Driver History</h1>
        <p className="text-xl text-muted-foreground">
          Track your earnings and completed rides
        </p>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="text-center shadow-soft rounded-2xl border-border/50">
            <CardContent className="pt-6">
              <DollarSign className="h-8 w-8 mx-auto text-success mb-2" />
              <p className="text-2xl font-bold">${totalEarned?.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Total Earned</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="text-center shadow-soft rounded-2xl border-border/50">
            <CardContent className="pt-6">
              <MapPin className="h-8 w-8 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold">{completedRides}</p>
              <p className="text-sm text-muted-foreground">Rides Completed</p>
            </CardContent>
          </Card>
        </motion.div>

     

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="text-center shadow-soft rounded-2xl border-border/50">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              {/* <p className="text-2xl font-bold">${(totalEarned / completedRides).toFixed(2)}</p> */}
              <p className="text-sm text-muted-foreground">Avg Per Ride</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Ride History List */}
      <div className="space-y-4">
        {rideHistory?.data?.map((ride: Ride) => (
          <RideHistoryCard key={ride._id} ride={ride}   />
        ))}
      </div>
    </div>
  );
};

export default DriverHistory;