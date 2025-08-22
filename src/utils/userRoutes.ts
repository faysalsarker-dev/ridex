import DriverDashboard from '@/pages/driver/DriverDashboard';
import  UserProfile  from '@/pages/User/UserProfile';
import { LayoutDashboard, User } from 'lucide-react';



export const userRoutes = [
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