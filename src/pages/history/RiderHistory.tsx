import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Star } from "lucide-react";
import RideHistoryCard from "@/components/modules/rides/RideHistoryCard";
import { AnimatedList } from "@/components/magicui/animated-list";
import { useRideHistoryQuery } from "@/redux/features/ride/ride.api";
import RideHistoryCardSkeleton from "@/components/custom/RideHistoryCardSkeleton";
import type { Ride } from "@/components/interfaces";





const RiderHistory = () => {
  
const {data ,isLoading }=useRideHistoryQuery(undefined)




  const totalSpent = data?.data?.filter((ride: Ride) => ride?.status === "completed")
    .reduce((total:number, ride:Ride) => total + ride.fare, 0);

  const completedRides = data?.data?.filter((ride:Ride) => ride?.status === "completed").length;




  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Ride History</h1>
        <p className="text-xl text-muted-foreground">
          Track all your past rides and expenses
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
              <p className="text-2xl font-bold">${totalSpent}</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
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
              <p className="text-sm text-muted-foreground">Completed Rides</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="text-center shadow-soft rounded-2xl border-border/50">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-muted-foreground">Avg Rating Given</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

   {isLoading && (
         <div className="space-y-4">
        {Array.from({ length: 5 }).map((_,idx) => (
          <RideHistoryCardSkeleton key={idx} />
        ))}
      </div>
      )}

      {/* Ride History List */}
      <AnimatedList className="space-y-4">
        {data?.data?.map((ride: Ride) => (
          <RideHistoryCard key={ride._id} ride={ride} />
        ))}
      </AnimatedList>
    </div>
  );
};

export default RiderHistory;