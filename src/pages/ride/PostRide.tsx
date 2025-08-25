

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
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
import { MapPin, Clock } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateRideRequestMutation } from "@/redux/features/ride/ride.api";
import { calculateDistance } from "@/utils/calculateDistance";

interface LocationData {
  lat: number;
  lng: number;
  address: string;
  country_code?: string;
  area?: string;
  city?: string;
  division?: string;
}

// Passenger-based fare calculation
function getRatePerKm(passengers: number) {
  if (passengers === 1) return 20;
  if (passengers === 2) return 35;
  if (passengers === 3) return 50;
  return 20;
}

// Haversine formula


export default function PostRide() {
  const [pickup, setPickup] = useState<LocationData | null>(null);
  const [pickupInput, setPickupInput] = useState("");
  const [destination, setDestination] = useState<LocationData | null>(null);
  const [destinationInput, setDestinationInput] = useState("");
  const [destinationSuggestions, setDestinationSuggestions] = useState<LocationData[]>([]);

  const [fare, setFare] = useState<number | null>(null);
  const [minFare, setMinFare] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [eta, setEta] = useState<number | null>(null);

  const [createRideRequest, { isLoading }] = useCreateRideRequestMutation();

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      passengers: "1",
      notes: "",
    },
  });

  const passengers = parseInt(watch("passengers"));

  /** Auto-detect pickup */
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

  const handleDestinationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestinationInput(e.target.value);
    const suggestions = await fetchDestinationSuggestions(e.target.value);
    setDestinationSuggestions(suggestions);
  };

  useEffect(() => {
    if (pickup && destination && passengers) {
      const dist = calculateDistance(pickup.lat, pickup.lng, destination.lat, destination.lng);
      const rate = getRatePerKm(passengers);
      const calculatedFare = (dist * rate);
      setDistance(dist);
      setFare(calculatedFare);
      setMinFare(calculatedFare);

      const avgSpeed = 40;
      const timeMinutes = Math.ceil((dist / avgSpeed) * 60);
      setEta(timeMinutes);
    }
  }, [pickup, destination, passengers]);

  const handleFareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && minFare !== null) {
      if (value >= minFare) {
        setFare(value);
      } else {
        setFare(minFare);
        toast.error(`Fare cannot be less than ৳${minFare.toFixed(2)}`);
      }
    }
  };

  interface FormData {
    passengers: string;
    notes: string;
  }

  const onSubmit = async (data: FormData) => {
    if (!pickup || !destination || !fare || !distance) {
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
      distance,
      fare,
      passengers,
      eta,
      notes: data.notes,
    };

    try {
      const res = await createRideRequest(payload).unwrap();
      toast.success("Ride request submitted!");
      console.log("✅ Backend response:", res);
    } catch (err) {
         type ApiError = { data?: { message?: string }; message?: string };
      const error = err as ApiError;
      toast.error(error?.data?.message || "Failed to submit ride");
    }
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Pickup */}
              <div className="space-y-2">
                <Label htmlFor="pickup" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Pickup Location
                </Label>
                <Input
                  id="pickup"
                  value={pickupInput}
                  onChange={(e) => setPickupInput(e.target.value)}
                  className="h-12 rounded-xl border-border/50"
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
                  value={destinationInput}
                  onChange={handleDestinationChange}
                  className="h-12 rounded-xl border-border/50"
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

              {/* Distance, Fare & ETA */}
              {distance && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Distance</Label>
                    <Input value={`${distance} km`} readOnly className="h-12 bg-muted" />
                  </div>
                  <div>
                    <Label>Fare</Label>
                    <Input
                      type="number"
                      value={fare?.toFixed(2) ?? ""}
                      onChange={handleFareChange}
                      className="h-12"
                      required
                    />
                    {minFare && (
                      <p className="text-xs text-muted-foreground">
                        Minimum fare: ${minFare.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" /> ETA
                    </Label>
                    <Input value={eta ? `${eta} min` : ""} readOnly className="h-12 bg-muted" />
                  </div>
                </div>
              )}

              {/* Passengers */}
              <div>
                <Label>Passengers</Label>
                <Select
                  defaultValue="1"
                  onValueChange={(val) => setValue("passengers", val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 3 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Passenger" : "Passengers"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <Label>Notes (Optional)</Label>
                <Textarea {...register("notes")} className="min-h-[100px]" />
              </div>

              <Button
                type="submit"
                className="w-full h-12"
                disabled={isLoading}
              >
                {isLoading ? "Posting Ride..." : "Post Ride Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
