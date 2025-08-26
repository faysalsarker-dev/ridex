import index from "@/layout/home/Landing";
import AboutUsPage from "@/pages/aboutus/AboutUs";

import { Home, Info } from 'lucide-react';

export const publicRoutes = [
   {
        Component: index,
        path: "/",
        icon: Home,
        name:"Home"
      },
   {
        Component: AboutUsPage,
        path: "/about",
        icon: Info,
        name:"About Us"
      },

      
]



