import { Login } from "@/pages/auth/login";
import { LogIn } from 'lucide-react';

export const publicRoutes = [
   {
        Component: Login,
        path: "/login",
        icon: LogIn
      },
]