import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin,  DollarSign, Star, Calendar, TrendingUp } from "lucide-react";

const DriverHistory = () => {
  const rideHistory = [
    {
      id: "1",
      rider: "Sarah Johnson",
      riderRating: 4.8,
      route: {
        origin: "Downtown Mall",
        destination: "Airport Terminal 2"
      },
      date: "Today",
      time: "2:30 PM",
      earning: 35.00,
      status: "completed",
      duration: "28 minutes",
      distance: "12.5 miles",
      ratingGiven: 5
    },
    {
      id: "2",
      rider: "Mike Chen",
      riderRating: 4.9,
      route: {
        origin: "University Campus",
        destination: "Business District"
      },
      date: "Today",
      time: "12:15 PM",
      earning: 22.50,
      status: "completed",
      duration: "18 minutes",
      distance: "8.3 miles",
      ratingGiven: 4
    },
    {
      id: "3",
      rider: "Emily Davis",
      riderRating: 5.0,
      route: {
        origin: "Central Station",
        destination: "Oakwood Apartments"
      },
      date: "Yesterday",
      time: "7:15 PM",
      earning: 18.00,
      status: "completed",
      duration: "15 minutes",
      distance: "6.2 miles",
      ratingGiven: 5
    },
    {
      id: "4",
      rider: "Alex Thompson",
      riderRating: 4.6,
      route: {
        origin: "Shopping Center",
        destination: "Residential Area"
      },
      date: "Yesterday",
      time: "3:45 PM",
      earning: 0.00,
      status: "cancelled",
      duration: "N/A",
      distance: "5.8 miles",
      ratingGiven: null
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

  const totalEarned = rideHistory
    .filter(ride => ride.status === "completed")
    .reduce((total, ride) => total + ride.earning, 0);

  const completedRides = rideHistory.filter(ride => ride.status === "completed").length;

  const avgRating = rideHistory
    .filter(ride => ride.ratingGiven !== null)
    .reduce((acc, ride) => acc + (ride.ratingGiven || 0), 0) / 
    rideHistory.filter(ride => ride.ratingGiven !== null).length;

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
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="text-center shadow-soft rounded-2xl border-border/50">
            <CardContent className="pt-6">
              <DollarSign className="h-8 w-8 mx-auto text-success mb-2" />
              <p className="text-2xl font-bold">${totalEarned.toFixed(2)}</p>
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
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="text-center shadow-soft rounded-2xl border-border/50">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
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
              <p className="text-2xl font-bold">${(totalEarned / completedRides).toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Avg Per Ride</p>
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
                      {ride.rider}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{ride.riderRating}</span>
                      </div>
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{ride.date} at {ride.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(ride.status)}
                    <p className="text-lg font-bold mt-2 text-success">
                      {ride.status === "completed" ? `+$${ride.earning}` : "$0.00"}
                    </p>
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
                    {ride.ratingGiven && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{ride.ratingGiven}/5</span>
                        </div>
                      </>
                    )}
                  </div>
                  {ride.status === "completed" && (
                    <Button variant="outline" size="sm" className="rounded-xl">
                      View Receipt
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

export default DriverHistory;