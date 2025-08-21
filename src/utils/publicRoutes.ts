import index from "@/layout/home/Landing";
import UserProfile from "@/pages/User/UserProfile";
import { Home, User } from 'lucide-react';

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
]



