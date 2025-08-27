import index from "@/layout/home/Landing";
import AboutUsPage from "@/pages/aboutus/AboutUs";

import { Home, Info, type LucideProps } from 'lucide-react';
import type { FC } from "react";

 export interface Iroutes {
  path: string;
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  Component: FC<{}>;
}


export const publicRoutes: Iroutes[] = [
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



