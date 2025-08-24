
import { motion } from "framer-motion";
import { Star, MapPin, DollarSign, Users, Clock } from "lucide-react";
import { AnimatedList } from "../magicui/animated-list";

const lastRides = [
  {
    id: 1,
    pickup: "Gulshan, Dhaka",
    destination: "Dhanmondi, Dhaka",
    date: "2025-08-24",
    time: "10:30 AM",
    fare: 25.5,
    passengers: 2,
    userRating: 4,
    driverRating: 5,
  },
  {
    id: 2,
    pickup: "Sreepur, Gazipur",
    destination: "Mirpur, Dhaka",
    date: "2025-08-23",
    time: "2:15 PM",
    fare: 18.0,
    passengers: 1,
    userRating: 5,
    driverRating: 4,
  },
  {
    id: 3,
    pickup: "Banani, Dhaka",
    destination: "Motijheel, Dhaka",
    date: "2025-08-22",
    time: "9:00 AM",
    fare: 30.0,
    passengers: 3,
    userRating: 3,
    driverRating: 4,
  },
  {
    id: 4,
    pickup: "Uttara, Dhaka",
    destination: "Agargaon, Dhaka",
    date: "2025-08-21",
    time: "5:45 PM",
    fare: 22.0,
    passengers: 2,
    userRating: 5,
    driverRating: 5,
  },
  {
    id: 5,
    pickup: "Gazipur, Dhaka",
    destination: "Rampura, Dhaka",
    date: "2025-08-20",
    time: "11:30 AM",
    fare: 28.0,
    passengers: 1,
    userRating: 4,
    driverRating: 4,
  },
];

const LastRides = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Your Last 5 Rides</h2>
      <AnimatedList className="space-y-4">
        {lastRides.map((ride) => (
          <motion.div
            key={ride.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-xl shadow-xl p-4 flex flex-col gap-2"
          >
            {/* Pickup → Destination */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <MapPin className="h-5 w-5 text-primary" />
                {ride.pickup} → {ride.destination}
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-2 ">
               <Clock className="h-5 w-5 text-primary"/> {ride.date} • {ride.time}
              </div>
            </div>

            {/* Fare & Passengers */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-success" />
                {ride.fare.toFixed(2)}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-primary" />
                {ride.passengers} Passengers
              </div>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center gap-1 text-sm">
                <span className="font-medium">Your Rating:</span>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < ride.userRating ? "text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="font-medium">Driver Rating:</span>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < ride.driverRating ? "text-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatedList>
    </div>
  );
};

export default LastRides;
