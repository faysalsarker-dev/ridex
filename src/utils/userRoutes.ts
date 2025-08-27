import DriverDashboard from '@/pages/driver/DriverDashboard';
import  UserProfile  from '@/pages/User/UserProfile';
import { LayoutDashboard, User } from 'lucide-react';
import type { Iroutes } from './publicRoutes';



export const userRoutes: Iroutes[] = [
   {
        Component: UserProfile,
        path: "/profile",
        icon: User,
        name:"Profile"
      },
         {
        Component: DriverDashboard,
        path: "/dashboard",
        icon: LayoutDashboard,
        name:"Dashboard"
      },

      
]