import Dashboard from "@/pages/admin/Dashboard";
import type { Iroutes } from "./publicRoutes";
import { LayoutDashboard, Users as userIcon, Car, UserCircle } from "lucide-react";
import Users from "@/pages/admin/Users";
import Rides from "@/pages/admin/Rides";
import Profile from "@/pages/admin/Profile";

export const adminRoutes: Iroutes[] = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, Component: Dashboard },
  { name: "Users", path: "/dashboard/users", icon: userIcon, Component: Users },
  { name: "Rides", path: "/dashboard/rides", icon: Car, Component: Rides },
  { name: "Profile", path: "/dashboard/profile", icon: UserCircle, Component: Profile },
];
