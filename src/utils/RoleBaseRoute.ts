import DriverRides from "@/pages/driver/DriverRides";
import DriverHistory from "@/pages/history/DriverHistory";
import RiderHistory from "@/pages/history/RiderHistory";
import InRide from "@/pages/ride/InRide";
import Rides from "@/pages/ride/Rides";

import { Car, History, MapPin, Route } from "lucide-react";

export const DriverRoutes = [
  {
    Component: DriverRides,
    path: "/driver/available",
    icon: Car,
    name: "Available Rides",
  },
  {
    Component: DriverHistory,
    path: "/driver/history",
    icon: History,
    name: "Ride History",
  },
];

export const RiderRoutes = [
  {
    Component: Rides,
    path: "/rider/rides",
    icon: MapPin,
    name: "Post Ride",
  },
  {
    Component: RiderHistory,
    path: "/rider/history",
    icon: History,
    name: "Ride History",
  },
  {
    Component: InRide,
    path: "/rider/on-ride",
    icon: Route,
    name: "Ongoing Ride",
  },
];

export const RoleBaseRoutes = (role: string) => {
  if (role === "driver") return DriverRoutes;
  if (role === "rider") return RiderRoutes;
  return [];
};
