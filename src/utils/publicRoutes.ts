/* eslint-disable @typescript-eslint/no-explicit-any */
import index from "@/layout/home/Landing";
import AboutUsPage from "@/pages/aboutus/AboutUs";
import Contact from "@/pages/Contact/Contact";
import FAQ from "@/pages/FAQ/FAQ";
import Features from "@/pages/Features/Features";

import { Home, Info, type LucideProps } from 'lucide-react';
import type { FC } from "react";

 export interface Iroutes {
  path: string;
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  Component: FC<any>;
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
   {
        Component: FAQ,
        path: "/faq",
        icon: Info,
        name:"FAQ"
      },
   {
        Component: Features,
        path: "/features",
        icon: Info,
        name:"Features"
      },
   {
        Component: Contact,
        path: "/contact",
        icon: Info,
        name:"Contact"
      },

      
]



