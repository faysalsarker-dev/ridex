import index from "@/layout/home/Landing";
import DriverRides from "@/pages/driver/DriverRides";
import DriverHistory from "@/pages/history/DriverHistory";
import RiderHistory from "@/pages/history/RiderHistory";
import InRide from "@/pages/ride/InRide";
import Rides from "@/pages/ride/Rides";
import { Home, MapPlus, RulerDimensionLineIcon} from 'lucide-react';

export const publicRoutes = [
   {
        Component: index,
        path: "/",
        icon: Home,
        name:"Home"
      },

   {
        Component: DriverRides,
        path: "/available",
        icon: RulerDimensionLineIcon,
        name:"available"
      },
   {
        Component: Rides,
        path: "/rides",
        icon: MapPlus ,
        name:"Post ride"
      },

   {
        Component: RiderHistory,
        path: "/ride-history",
        icon: RulerDimensionLineIcon,
        name:"History"
      },
   {
        Component: DriverHistory,
        path: "/drive-history",
        icon: RulerDimensionLineIcon,
        name:"History"
      },
   {
        Component: InRide,
        path: "/on-ride",
        icon: RulerDimensionLineIcon,
        name:"History"
      },
      
]



