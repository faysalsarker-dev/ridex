import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Star, Calendar } from "lucide-react";

const RiderHistory = () => {
  const rideHistory = [
    {
      id: "1",
      driver: "David Wilson",
      driverRating: 4.9,
      route: {
        origin: "Downtown Mall",
        destination: "Airport Terminal 2"
      },
      date: "Today",
      time: "2:30 PM",
      fare: 35.00,
      status: "completed",
      duration: "28 minutes",
      distance: "12.5 miles"
    },
    {
      id: "2",
      driver: "Lisa Garcia",
      driverRating: 5.0,
      route: {
        origin: "Home",
        destination: "University Campus"
      },
      date: "Yesterday",
      time: "8:15 AM",
      fare: 15.50,
      status: "completed",
      duration: "18 minutes",
      distance: "7.2 miles"
    },
    {
      id: "3",
      driver: "John Smith",
      driverRating: 4.7,
      route: {
        origin: "Restaurant District",
        destination: "Home"
      },
      date: "2 days ago",
      time: "9:45 PM",
      fare: 22.00,
      status: "completed",
      duration: "25 minutes",
      distance: "9.8 miles"
    },
    {
      id: "4",
      driver: "Maria Rodriguez",
      driverRating: 4.8,
      route: {
        origin: "Central Station",
        destination: "Business District"
      },
      date: "3 days ago",
      time: "7:30 AM",
      fare: 18.75,
      status: "cancelled",
      duration: "N/A",
      distance: "8.1 miles"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalSpent = rideHistory
    .filter(ride => ride.status === "completed")
    .reduce((total, ride) => total + ride.fare, 0);

  const totalRides = rideHistory.filter(ride => ride.status === "completed").length;

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
              <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
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
              <p className="text-2xl font-bold">{totalRides}</p>
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

      {/* Ride History List */}
      <div className="space-y-4">
        {rideHistory.map((ride, index) => (
          <motion.div
            key={ride.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="shadow-soft hover:shadow-elevated transition-all duration-300 rounded-2xl border-border/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {ride.driver}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{ride.driverRating}</span>
                      </div>
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{ride.date} at {ride.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(ride.status)}
                    <p className="text-lg font-bold mt-2">${ride.fare}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">Pickup</p>
                      <p className="text-muted-foreground">{ride.route.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <p className="font-medium">Destination</p>
                      <p className="text-muted-foreground">{ride.route.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{ride.distance}</span>
                    <span>•</span>
                    <span>{ride.duration}</span>
                  </div>
                  {ride.status === "completed" && (
                    <Button variant="outline" size="sm" className="rounded-xl">
                      Rate Driver
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RiderHistory;