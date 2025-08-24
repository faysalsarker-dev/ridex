"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, DollarSign, Clock, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LocationData {
  lat: number;
  lng: number;
  address: string;
  country_code?: string;
  area?: string;
  city?: string;
  division?: string;
}

export default function PostRide() {
  const [pickup, setPickup] = useState<LocationData | null>(null);
  const [pickupInput, setPickupInput] = useState("");
  const [destination, setDestination] = useState<LocationData | null>(null);
  const [destinationInput, setDestinationInput] = useState("");
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    LocationData[]
  >([]);


  const [fare, setFare] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);

  /** Auto-detect pickup location */
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();
          const address = `${data.address.suburb || data.address.village || data.address.town || ""}, ${
            data.address.city || data.address.state || ""
          }`;

       setPickup({
  lat,
  lng,
  address,
  country_code: data.address.country_code,
  area: data.address.suburb || data.address.village || data.address.town || "",
  city: data.address.city || data.address.state_district || data.address.state || "",
  division: data.address.state || "",
});

          setPickupInput(address);
        } catch (err) {
          console.error("Could not fetch location name", err);
        }
      });
    }
  }, []);

  /** Fetch destination suggestions */
  const fetchDestinationSuggestions = async (query: string) => {
    if (!query || !pickup?.country_code) return [];
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&countrycodes=${pickup.country_code}&addressdetails=1`
    );
    const data = await res.json();
 return data.slice(0, 10).map((item: any) => {
  const area = item.address.suburb || item.address.village || item.address.town || "";
  const city = item.address.city || item.address.state_district || item.address.state || "";
  const division = item.address.state || "";

  const formatted = `${area}, ${city}`;

  return {
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lon),
    address: formatted || item.display_name,
    area,
    city,
    division,
  };
});

  };

  /** Handle destination input */
  const handleDestinationChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDestinationInput(e.target.value);
    const suggestions = await fetchDestinationSuggestions(e.target.value);
    setDestinationSuggestions(suggestions);
  };

  /** Submit form */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !destination) {
      toast.error("Please select valid pickup and destination");
      return;
    }

    const payload = {
      pickupLocation: {
        lat: pickup.lat,
        lng: pickup.lng,
        address: pickup.address,
        country_code: pickup.country_code,
      },
      destinationLocation: {
        lat: destination.lat,
        lng: destination.lng,
        address: destination.address,
      },
      fare: parseFloat(fare),
      passengers: parseInt(passengers),
      notes,
    };

    setLoading(true);
    console.log("Sending to backend:", payload);

    // here -> call API to save ride
    await new Promise((res) => setTimeout(res, 1200));

    toast.success("Ride request submitted!");
    setLoading(false);
  };

  return (
   
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg rounded-2xl border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Post a Ride</CardTitle>
              <CardDescription className="text-lg">
                Find a driver to take you to your destination
              </CardDescription>
            </CardHeader>
  
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pickup */}
                <div className="space-y-2">
                  <Label htmlFor="pickup" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Pickup Location
                  </Label>
                  <Input
                    id="pickup"
                    placeholder="Auto-detected or enter manually"
                    className="h-12 rounded-xl border-border/50"
                    value={pickupInput}
                    onChange={(e) => setPickupInput(e.target.value)}
                    required
                  />
                </div>
  
                {/* Destination */}
                <div className="relative space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-destructive" />
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    placeholder="Enter destination"
                    className="h-12 rounded-xl border-border/50"
                    value={destinationInput}
                    onChange={handleDestinationChange}
                    required
                  />
                  {destinationSuggestions.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-40 overflow-auto">
                      {destinationSuggestions.map((s, idx) => (
                        <li
                          key={idx}
                          className="p-2 hover:bg-primary/10 cursor-pointer"
                          onClick={() => {
                            setDestination(s);
                            setDestinationInput(s.address);
                            setDestinationSuggestions([]);
                          }}
                        >
                          {s.address}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
  
    
  
                {/* Fare & Passengers */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fare" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-success" />
                      Fare
                    </Label>
                    <Input
                      id="fare"
                      type="number"
                      placeholder="25.00"
                      className="h-12 rounded-xl border-border/50"
                      value={fare}
                      onChange={(e) => setFare(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="passengers"
                      className="flex items-center gap-2"
                    >
                      <Users className="h-4 w-4 text-primary" />
                      Passengers
                    </Label>
                 

                     <Select>
      <SelectTrigger className="w-full" defaultChecked={1}>
        <SelectValue placeholder="Select Passengers" />
      </SelectTrigger>
      <SelectContent>
        {
          Array.from({ length: 3 }, (_, i) => i + 1).map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} {num === 1 ? "Passenger" : "Passengers"}
            </SelectItem>
          ))
        }
      
      </SelectContent>
    </Select>
                  </div>
                </div>
  
                {/* Notes */}
                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions..."
                    className="min-h-[100px] rounded-xl border-border/50"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
  
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl shadow-md"
                  disabled={loading}
                >
                  {loading ? "Posting Ride..." : "Post Ride Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>



  );
}
