import  UserProfile  from '@/pages/User/UserProfile';
import type { Iroutes } from './publicRoutes';
import { User } from 'lucide-react';



export const userRoutes: Iroutes[] = [
   {
        Component: UserProfile,
        path: "/profile",
        icon: User,
        name:"Profile"
      },
      //    {
      //   Component: DriverDashboard,
      //   path: "/dashboard",
      //   icon: LayoutDashboard,
      //   name:"Dashboard"
      // },

      
]