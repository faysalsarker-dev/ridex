import index from "@/layout/home/Landing";
import DriverRides from "@/pages/driver/DriverRides";
import DriverHistory from "@/pages/history/DriverHistory";
import RiderHistory from "@/pages/history/RiderHistory";
import PostRide from "@/pages/ride/PostRide";
import { Home, RulerDimensionLineIcon} from 'lucide-react';

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
        Component: PostRide,
        path: "/rides",
        icon: RulerDimensionLineIcon,
        name:"post ride"
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
      
]



