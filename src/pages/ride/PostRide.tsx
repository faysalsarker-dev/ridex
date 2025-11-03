/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo, useCallback } from "react";
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
import { MapPin, Clock, Loader2 } from "lucide-react";
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
import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";

// ============================================================================
// TYPES
// ============================================================================

interface LocationData {
  lat: number;
  lng: number;
  address: string;
  country_code?: string;
  area?: string;
  city?: string;
  division?: string;
}

interface FormData {
  passengers: string;
  notes: string;
}

interface FareCalculation {
  distance: number;
  fare: number;
  minFare: number;
  eta: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const FARE_RATES: Record<number, number> = {
  1: 20,
  2: 35,
  3: 50,
} as const;

const AVG_SPEED_KMH = 40;
const MAX_SUGGESTIONS = 10;
const DEBOUNCE_DELAY_MS = 300;
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getRatePerKm(passengers: number): number {
  return FARE_RATES[passengers] || FARE_RATES[1];
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

function useGeolocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords;

        try {
          const res = await fetch(
            `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          if (!res.ok) throw new Error("Failed to fetch location");

          const data = await res.json();

          if (!isMounted) return;

          const area =
            data.address.suburb ||
            data.address.village ||
            data.address.town ||
            "";
          const city =
            data.address.city ||
            data.address.state_district ||
            data.address.state ||
            "";
          const address = `${area}, ${city}`;

          setLocation({
            lat,
            lng,
            address,
            country_code: data.address.country_code,
            area,
            city,
            division: data.address.state || "",
          });
        } catch (err) {
          if (isMounted) {
            console.error("Location fetch error:", err);
            setError("Could not fetch location name");
          }
        } finally {
          if (isMounted) setIsLoading(false);
        }
      },
      (err) => {
        if (isMounted) {
          console.error("Geolocation error:", err);
          setError("Could not get your location");
          setIsLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
    };
  }, []);

  return { location, isLoading, error };
}

function useLocationSuggestions(countryCode?: string) {
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = useCallback(
    async (query: string, signal: AbortSignal) => {
      if (!query || !countryCode) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);

      try {
        const res = await fetch(
          `${NOMINATIM_BASE_URL}/search?format=json&q=${encodeURIComponent(
            query
          )}&countrycodes=${countryCode}&addressdetails=1`,
          { signal }
        );

        if (!res.ok) throw new Error("Failed to fetch suggestions");

        const data = await res.json();

        const mapped = data.slice(0, MAX_SUGGESTIONS).map((item: any) => {
          const area =
            item.address.suburb ||
            item.address.village ||
            item.address.town ||
            "";
          const city =
            item.address.city ||
            item.address.state_district ||
            item.address.state ||
            "";
          const formatted = `${area}, ${city}`;

          return {
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
            address: formatted || item.display_name,
            area,
            city,
            division: item.address.state || "",
          };
        });

        setSuggestions(mapped);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Suggestion fetch error:", err);
          setSuggestions([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [countryCode]
  );

  const debouncedFetch = useMemo(
    () => debounce(fetchSuggestions, DEBOUNCE_DELAY_MS),
    [fetchSuggestions]
  );

  const clearSuggestions = useCallback(() => setSuggestions([]), []);

  return { suggestions, isLoading, debouncedFetch, clearSuggestions };
}

function useFareCalculation(
  pickup: LocationData | null,
  destination: LocationData | null,
  passengers: number
): FareCalculation | null {
  return useMemo(() => {
    if (!pickup || !destination || !passengers) return null;

    const distance = calculateDistance(
      pickup.lat,
      pickup.lng,
      destination.lat,
      destination.lng
    );

    const rate = getRatePerKm(passengers);
    const calculatedFare = distance * rate;
    const timeMinutes = Math.ceil((distance / AVG_SPEED_KMH) * 60);

    return {
      distance,
      fare: calculatedFare,
      minFare: calculatedFare,
      eta: timeMinutes,
    };
  }, [pickup, destination, passengers]);
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function PostRide() {
  const navigate = useNavigate();

  // Location state
  const { location: pickup, isLoading: isLoadingLocation } = useGeolocation();
  const [pickupInput, setPickupInput] = useState("");
  const [destination, setDestination] = useState<LocationData | null>(null);
  const [destinationInput, setDestinationInput] = useState("");

  // Suggestions
  const {
    suggestions: destinationSuggestions,
    isLoading: isLoadingSuggestions,
    debouncedFetch,
    clearSuggestions,
  } = useLocationSuggestions(pickup?.country_code);

  // Fare state
  const [customFare, setCustomFare] = useState<number | null>(null);

  // API
  const [createRideRequest, { isLoading: isSubmitting }] =
    useCreateRideRequestMutation();

  // Form
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      passengers: "1",
      notes: "",
    },
  });

  const passengers = parseInt(watch("passengers"));

  // Calculate fare
  const fareCalculation = useFareCalculation(pickup, destination, passengers);

  // Update pickup input when location is detected
  useEffect(() => {
    if (pickup?.address) {
      setPickupInput(pickup.address);
    }
  }, [pickup]);

  // Handle destination input changes with debouncing
  useEffect(() => {
    const controller = new AbortController();

    if (destinationInput.trim()) {
      debouncedFetch(destinationInput, controller.signal);
    } else {
      clearSuggestions();
    }

    return () => {
      controller.abort();
    };
  }, [destinationInput, debouncedFetch, clearSuggestions]);

  // Handle destination selection
  const handleDestinationSelect = useCallback((location: LocationData) => {
    setDestination(location);
    setDestinationInput(location.address);
    clearSuggestions();
  }, [clearSuggestions]);

  // Handle custom fare input
  const handleFareChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);

      if (isNaN(value)) {
        setCustomFare(null);
        return;
      }

      if (fareCalculation && value < fareCalculation.minFare) {
        setCustomFare(fareCalculation.minFare);
        toast.error(
          `Fare cannot be less than ৳${fareCalculation.minFare.toFixed(2)}`
        );
      } else {
        setCustomFare(value);
      }
    },
    [fareCalculation]
  );

  // Form submission
  const onSubmit = async (data: FormData) => {
    if (!pickup || !destination || !fareCalculation) {
      toast.error("Please select valid pickup and destination");
      return;
    }

    const finalFare = customFare ?? fareCalculation.fare;

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
      distance: fareCalculation.distance,
      fare: finalFare,
      passengers,
      eta: fareCalculation.eta,
      notes: data.notes,
    };

    try {
      const res = await createRideRequest(payload).unwrap();
      const rideId = res?.data?._id;

      if (rideId) {
        localStorage.setItem("rideId", JSON.stringify(rideId));
        navigate(`/rider/on-ride?ride=${rideId}`);
      } else {
        throw new Error("No ride ID returned");
      }
    } catch (err: any) {
      console.error("Ride submission error:", err);
      const errorMessage =
        err?.data?.message || err?.message || "Failed to submit ride";
      toast.error(errorMessage);
    }
  };

  // Display fare (custom or calculated)
  const displayFare = customFare ?? fareCalculation?.fare ?? null;

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
              {/* Pickup Location */}
              <div className="space-y-2">
                <Label htmlFor="pickup" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Pickup Location
                </Label>
                <div className="relative">
                  <Input
                    id="pickup"
                    value={pickupInput}
                    onChange={(e) => setPickupInput(e.target.value)}
                    className="h-12 rounded-xl border-border/50"
                    placeholder="Detecting current location..."
                    disabled={isLoadingLocation}
                    required
                  />
                  {isLoadingLocation && (
                    <Loader2 className="absolute right-3 top-3 h-6 w-6 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Destination */}
              <div className="relative space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-destructive" />
                  Destination
                </Label>
                <div className="relative">
                  <Input
                    id="destination"
                    value={destinationInput}
                    onChange={(e) => setDestinationInput(e.target.value)}
                    className="h-12 rounded-xl border-border/50"
                    placeholder="Enter destination"
                    required
                    aria-autocomplete="list"
                    aria-controls="destination-suggestions"
                    aria-expanded={destinationSuggestions.length > 0}
                  />
                  {isLoadingSuggestions && (
                    <Loader2 className="absolute right-3 top-3 h-6 w-6 animate-spin text-muted-foreground" />
                  )}
                </div>

                {destinationSuggestions.length > 0 && (
                  <ul
                    id="destination-suggestions"
                    role="listbox"
                    className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-40 overflow-auto"
                  >
                    {destinationSuggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        role="option"
                        className="p-2 hover:bg-primary/10 cursor-pointer transition-colors"
                        onClick={() => handleDestinationSelect(suggestion)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleDestinationSelect(suggestion);
                          }
                        }}
                        tabIndex={0}
                      >
                        {suggestion.address}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Distance, Fare & ETA */}
              {fareCalculation && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Distance</Label>
                    <Input
                      value={`${fareCalculation.distance.toFixed(1)} km`}
                      readOnly
                      className="h-12 bg-muted"
                      tabIndex={-1}
                    />
                  </div>
                  <div>
                    <Label>Fare (৳)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min={fareCalculation.minFare}
                      value={displayFare?.toFixed(2) ?? ""}
                      onChange={handleFareChange}
                      className="h-12"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum: ৳{fareCalculation.minFare.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <Label className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" /> ETA
                    </Label>
                    <Input
                      value={`${fareCalculation.eta} min`}
                      readOnly
                      className="h-12 bg-muted"
                      tabIndex={-1}
                    />
                  </div>
                </div>
              )}

              {/* Passengers */}
              <div>
                <Label htmlFor="passengers">Passengers</Label>
                <Select
                  defaultValue="1"
                  onValueChange={(val) => setValue("passengers", val)}
                >
                  <SelectTrigger id="passengers" className="w-full h-12">
                    <SelectValue placeholder="Select Passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Passenger" : "Passengers"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Badge className="bg-blue-300 text-blue-600">
                Cash On Payment
              </Badge>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  className="min-h-[100px] rounded-xl"
                  placeholder="Any special instructions or preferences..."
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={isSubmitting || isLoadingLocation || !fareCalculation}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting Ride...
                  </>
                ) : (
                  "Post Ride Request"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}