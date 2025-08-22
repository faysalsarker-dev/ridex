import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, DollarSign, Calendar, Clock, Users } from "lucide-react";

const PostRide = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-elevated rounded-2xl border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Post a Ride</CardTitle>
            <CardDescription className="text-lg">
              Find a driver to take you to your destination
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="origin" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Pickup Location
                </Label>
                <Input
                  id="origin"
                  placeholder="Enter pickup address"
                  className="h-12 rounded-xl border-border/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-destructive" />
                  Destination
                </Label>
                <Input
                  id="destination"
                  placeholder="Enter destination address"
                  className="h-12 rounded-xl border-border/50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    className="h-12 rounded-xl border-border/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    className="h-12 rounded-xl border-border/50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fare" className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-success" />
                    Fare Offered ($)
                  </Label>
                  <Input
                    id="fare"
                    type="number"
                    placeholder="25.00"
                    className="h-12 rounded-xl border-border/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passengers" className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Passengers
                  </Label>
                  <Input
                    id="passengers"
                    type="number"
                    placeholder="1"
                    min="1"
                    max="4"
                    className="h-12 rounded-xl border-border/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions or preferences..."
                  className="min-h-[100px] rounded-xl border-border/50"
                />
              </div>

              <Button 
                type="submit"
                className="w-full h-12 gradient-primary text-white rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                Post Ride Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PostRide;