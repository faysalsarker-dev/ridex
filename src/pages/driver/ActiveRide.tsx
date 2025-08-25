import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, MessageSquare, Navigation, Clock, DollarSign } from "lucide-react";

type RideStatus = "accepted" | "enroute" | "completed" | "cancelled";

const ActiveRide = () => {
  const [status, setStatus] = useState<RideStatus>("accepted");

  const currentRide = {
    id: "1",
    rider: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    origin: "Downtown Mall",
    destination: "Airport Terminal 2",
    fare: 35.00,
    pickupTime: "2:30 PM",
    estimatedDuration: "25 minutes",
    distance: "12.5 miles",
    notes: "Flight at 6 PM, need to be there by 4:30 PM"
  };

  const handleStatusUpdate = (newStatus: RideStatus) => {
    setStatus(newStatus);
    const statusMessages = {
      accepted: "Ride accepted! Contact the rider to arrange pickup.",
      enroute: "You're on your way! Safe travels.",
      completed: "Ride completed successfully! Payment has been processed.",
      cancelled: "Ride has been cancelled."
    };
    

  };

  const getStatusColor = (status: RideStatus) => {
    switch (status) {
      case "accepted": return "bg-blue-500";
      case "enroute": return "bg-yellow-500";
      case "completed": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: RideStatus) => {
    switch (status) {
      case "accepted": return "Accepted";
      case "enroute": return "En Route";
      case "completed": return "Completed";
      case "cancelled": return "Cancelled";
      default: return "Unknown";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-elevated rounded-2xl border-border/50">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-2xl font-bold">Current Ride</CardTitle>
              <Badge className={`${getStatusColor(status)} text-white px-3 py-1`}>
                {getStatusText(status)}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Rider Info */}
            <div className="bg-muted/30 p-4 rounded-xl">
              <h3 className="font-semibold text-lg mb-3">Rider Information</h3>
              <p className="text-xl font-medium">{currentRide.rider}</p>
              <div className="flex items-center gap-4 mt-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>

            {/* Route Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-success mt-1" />
                <div>
                  <p className="font-medium">Pickup Location</p>
                  <p className="text-muted-foreground">{currentRide.origin}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-destructive mt-1" />
                <div>
                  <p className="font-medium">Destination</p>
                  <p className="text-muted-foreground">{currentRide.destination}</p>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-muted/30 p-3 rounded-xl">
                <Clock className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Pickup Time</p>
                <p className="font-semibold">{currentRide.pickupTime}</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-xl">
                <DollarSign className="h-5 w-5 mx-auto mb-2 text-success" />
                <p className="text-sm text-muted-foreground">Fare</p>
                <p className="font-semibold">${currentRide.fare}</p>
              </div>
            </div>

            {/* Special Notes */}
            {currentRide.notes && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-xl">
                <h4 className="font-medium mb-2 text-yellow-800 dark:text-yellow-200">Special Instructions</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">{currentRide.notes}</p>
              </div>
            )}

            {/* Navigation Button */}
            <Button className="w-full h-12 gradient-primary text-white rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300 gap-2">
              <Navigation className="h-4 w-4" />
              Open in Maps
            </Button>

            {/* Status Update Buttons */}
            <div className="space-y-3">
              <h4 className="font-medium">Update Status</h4>
              <div className="grid grid-cols-2 gap-3">
                {status === "accepted" && (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={() => handleStatusUpdate("enroute")}
                      className="rounded-xl"
                    >
                      Start Trip
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleStatusUpdate("cancelled")}
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {status === "enroute" && (
                  <>
                    <Button 
                      onClick={() => handleStatusUpdate("completed")}
                      className="gradient-primary text-white rounded-xl"
                    >
                      Complete Trip
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleStatusUpdate("cancelled")}
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {(status === "completed" || status === "cancelled") && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleStatusUpdate("accepted")}
                    className="col-span-2 rounded-xl"
                  >
                    Reset Status
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ActiveRide;