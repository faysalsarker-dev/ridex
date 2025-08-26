
import HomePage from "@/layout/home/HomePage";
import LoginPage from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import { publicRoutes } from "@/utils/publicRoutes";
import { createBrowserRouter } from "react-router";
import { generateRoutes } from "./generateRoutes";
import { userRoutes } from "@/utils/userRoutes";
import { RoleBaseRoutes } from "@/utils/RoleBaseRoute";

export const router = createBrowserRouter([
  {
    Component: HomePage,
    path: "/",
    children: [
   ...generateRoutes(publicRoutes),
   ...generateRoutes(userRoutes),
   ...generateRoutes(RoleBaseRoutes("driver")),
   ...generateRoutes(RoleBaseRoutes("rider")),
    ],

   
  },
  {
      Component: LoginPage,
            path: "/login",
  },
  {
      Component: Register,
            path: "/register",
  },
  
]);