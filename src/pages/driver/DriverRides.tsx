import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Users, Star } from "lucide-react";

const DriverRides = () => {

  const availableRides = [
    {
      id: "1",
      rider: "Sarah Johnson",
      rating: 4.8,
      origin: "Downtown Mall",
      destination: "Airport Terminal 2",
      time: "2:30 PM",
      date: "Today",
      fare: 35.00,
      passengers: 2,
      distance: "12.5 miles",
      notes: "Flight at 6 PM, need to be there by 4:30 PM"
    },
    {
      id: "2",
      rider: "Mike Chen",
      rating: 4.9,
      origin: "University Campus",
      destination: "Business District",
      time: "5:00 PM",
      date: "Today",
      fare: 22.50,
      passengers: 1,
      distance: "8.3 miles",
      notes: "Regular commute, flexible timing"
    },
    {
      id: "3",
      rider: "Emily Davis",
      rating: 5.0,
      origin: "Central Station",
      destination: "Oakwood Apartments",
      time: "7:15 PM",
      date: "Tomorrow",
      fare: 18.00,
      passengers: 1,
      distance: "6.2 miles",
      notes: ""
    }
  ];

  const handleAcceptRide = (rideId: string, riderName: string) => {

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

      <div className="grid gap-6 max-w-4xl mx-auto md:grid-cols-2">
        {availableRides.map((ride, index) => (
          <motion.div
            key={ride.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="shadow-soft hover:shadow-elevated transition-all duration-300 rounded-2xl border-border/50">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                      {ride.rider}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{ride.rating}</span>
                      </div>
                    </CardTitle>
                    <CardDescription className="text-base mt-1">
                      {ride.distance} • {ride.date} at {ride.time}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                    ${ride.fare}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">Pickup</p>
                      <p className="text-muted-foreground">{ride.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <p className="font-medium">Destination</p>
                      <p className="text-muted-foreground">{ride.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{ride.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{ride.passengers} passenger{ride.passengers > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>${ride.fare}</span>
                  </div>
                </div>

                {ride.notes && (
                  <div className="bg-muted/50 p-3 rounded-xl">
                    <p className="text-sm">
                      <strong>Note:</strong> {ride.notes}
                    </p>
                  </div>
                )}

                <Button 
                  onClick={() => handleAcceptRide(ride.id, ride.rider)}
                  className="w-full h-12 gradient-primary text-white rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  Accept Ride
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DriverRides;