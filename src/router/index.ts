
import HomePage from "@/layout/home/HomePage";
import LoginPage from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import { publicRoutes } from "@/utils/publicRoutes";
import { createBrowserRouter } from "react-router";
import { generateRoutes } from "./generateRoutes";
import { userRoutes } from "@/utils/userRoutes";

export const router = createBrowserRouter([
  {
    Component: HomePage,
    path: "/",
    children: [
   ...generateRoutes(publicRoutes),
   ...generateRoutes(userRoutes)

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