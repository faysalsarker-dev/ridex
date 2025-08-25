import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Navigation, Users, CreditCard } from 'lucide-react';

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
  onCancelRide: () => void;
}

export function RideDetailsCard({ 
  pickupLocation, 
  destinationLocation, 
  estimatedFare, 
  passengers,
  onCancelRide 
}: RideDetailsCardProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full h-full"
    >
      <Card className="mx-4 mb-4 glass-morphism shadow-elevated border-0">
        <CardContent className="p-6">
          {/* Header */}
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
                  {pickupLocation.address}
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
                  {destinationLocation.address}
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

          {/* Cancel Button */}
          <Button 
            variant="outline" 
            size="lg"
            onClick={onCancelRide}
            className="w-full text-white border-0 bg-red-500 hover:bg-red-300 transition-all duration-200"
          >
            Cancel Ride
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}