import index from "@/layout/home/Landing";
import AvailableRidesPage from "@/pages/ride/AvailableRidesPage";
import UserProfile from "@/pages/User/UserProfile";
import { Home, RulerDimensionLineIcon, User } from 'lucide-react';

export const publicRoutes = [
   {
        Component: index,
        path: "/",
        icon: Home,
        name:"Home"
      },
   {
        Component: UserProfile,
        path: "/profile",
        icon: User,
        name:"Profile"
      },
   {
        Component: AvailableRidesPage,
        path: "/available",
        icon: RulerDimensionLineIcon,
        name:"available"
      },
]



