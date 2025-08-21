
import HomePage from "@/layout/home/HomePage";
import LoginPage from "@/pages/auth/login";
import Register from "@/pages/auth/Register";
import { publicRoutes } from "@/utils/publicRoutes";
import { createBrowserRouter } from "react-router";
import { generateRoutes } from "./generateRoutes";

export const router = createBrowserRouter([
  {
    Component: HomePage,
    path: "/",
    children: [
   ...generateRoutes(publicRoutes)
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