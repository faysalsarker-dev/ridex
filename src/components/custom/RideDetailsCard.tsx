import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Navigation, Users, CreditCard } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '../ui/badge';
import { useEffect, useState } from 'react';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface RideDetailsCardProps {
  pickupLocation: Location;
  destinationLocation: Location;
  estimatedFare: string;
  passengers: number;
  status: string;
  onCancelRide: () => void;
  onChangeStatus: (status: string) => void;
}

export function RideDetailsCard({ 
  pickupLocation, 
  destinationLocation, 
  estimatedFare, 
  passengers,
  status,
  onCancelRide,
  onChangeStatus
}: RideDetailsCardProps) {
const {data}=useUserInfoQuery(undefined)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "requested":
        return <Badge className="bg-blue-100 text-blue-800 my-2">Requested</Badge>;
      case "accepted":
        return <Badge className="bg-indigo-100 text-indigo-800 my-2">Accepted</Badge>;
      case "picked_up":
        return <Badge className="bg-purple-100 text-purple-800 my-2">Picked Up</Badge>;
      case "in_transit":
        return <Badge className="bg-yellow-100 text-yellow-800 my-2">In Transit</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800 my-2">Completed</Badge>;
      case "cancelled_by_rider":
      case "cancelled_by_driver":
        return <Badge className="bg-red-100 text-red-800 my-2">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };


useEffect(() => {
if(status==="completed"){
        localStorage.removeItem("rideId");

}

}, [status]);

  const nextStatus = () => {
    switch (status) {
      case "accepted":
        return "picked_up";
      case "picked_up":
        return "in_transit";
      case "in_transit":
        return "completed";
      default:
        return null;
    }
  };

  const actionableStatus = nextStatus();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full h-full"
    >
      <Card className="mx-4 mb-4 glass-morphism shadow-elevated border-0">
        <CardContent className="p-6">
          {getStatusBadge(status)}

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Current Ride</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{passengers} passenger{passengers > 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Route Information */}
          <div className="space-y-3 mb-4">
            {/* Pickup */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-green-300"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-foreground">Pickup</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {pickupLocation?.address}
                </p>
              </div>
            </div>

            {/* Route Line */}
            <div className="flex items-center gap-3">
              <div className="w-3 flex justify-center">
                <div className="w-px h-6 bg-border"></div>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-red-300 animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Navigation className="h-4 w-4 text-red-600 " />
                  <span className="text-sm font-medium text-foreground">Destination</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {destinationLocation?.address}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Fare Information */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">Estimated Fare</span>
            </div>
            <span className="text-xl font-bold text-primary">{estimatedFare}</span>
          </div>

{
  status !== "completed" && (


          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full text-white border-0 bg-red-500 hover:bg-red-300 transition-all duration-200"
              >
                Cancel Ride
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently cancel your ride request.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter >
                <AlertDialogCancel className="bg-white hover:bg-gray-300">No, Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  className="bg-red-500 text-white hover:bg-red-300"             
                  onClick={onCancelRide}
                >
                  Yes, Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
  )
}


          {/* Status Change Button */}
          {actionableStatus && data.data.role === 'driver' && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full mt-4 text-white border-0 bg-primary hover:bg-primary/80 transition-all duration-200"
                  onClick={() => setSelectedStatus(actionableStatus)}
                >
                  {actionableStatus.replace("_", " ").toUpperCase()}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to change the ride status to "{actionableStatus.replace("_", " ")}"?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white hover:bg-gray-300">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-primary text-white hover:bg-primary/80"
                    onClick={() => {
                      if (selectedStatus) {
                        onChangeStatus(selectedStatus);
                        setSelectedStatus(null);
                      }
                    }}
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
