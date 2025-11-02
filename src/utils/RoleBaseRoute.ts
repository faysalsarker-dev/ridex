import DriverRides from "@/pages/driver/DriverRides";
import DriverHistory from "@/pages/history/DriverHistory";
import RiderHistory from "@/pages/history/RiderHistory";
import InRide from "@/pages/ride/InRide";
import Rides from "@/pages/ride/Rides";
import  withAuth from "@/router/withAuth";

import { Car, History, MapPin, Route } from "lucide-react";
import type { Iroutes } from "./publicRoutes";

export const DriverRoutes: Iroutes[] = [
  {
    Component: withAuth(DriverRides,"driver"),
    path: "/driver/available",
    icon: Car,
    name: "Available Rides",
  },
  {
    Component: withAuth(DriverHistory,"driver"),
    path: "/driver/history",
    icon: History,
    name: "Ride History",
  },
    {
    Component: withAuth(InRide),
    path: "/rider/on-ride",
    icon: Route,
    name: "Ongoing Ride",
  },
];

export const RiderRoutes: Iroutes[] = [
  {
    Component: withAuth(Rides,"rider"),
    path: "/rider/rides",
    icon: MapPin,
    name: "Post Ride",
  },
  {
    Component: withAuth(RiderHistory,"rider"),
    path: "/rider/history",
    icon: History,
    name: "Ride History",
  },
  {
    Component: withAuth(InRide),
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
