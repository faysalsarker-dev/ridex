
import App from "@/App";
import HomePage from "@/layout/home/HomePage";
import LoginPage from "@/pages/auth/login";
import Register from "@/pages/auth/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: HomePage,
    path: "/",
    // children: [
    //   {
    //     Component: About,
    //     path: "about",
    //   },
    // ],

   
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