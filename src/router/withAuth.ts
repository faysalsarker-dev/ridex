import type { ComponentType } from "react";
import  { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { DriverRoutes, RiderRoutes } from "@/utils/RoleBaseRoute";

interface WithAuthOptions {
  requiredRole?: "driver" | "rider";
}

export const withAuth = (Component: ComponentType, options?: WithAuthOptions) => {
  const { requiredRole } = options || {};

  return function AuthWrapper() {
    const location = useLocation();
    const navigate = useNavigate();
    const { data, isLoading } = useUserInfoQuery(undefined);

    // Wait until user info is loaded
    useEffect(() => {
      if (isLoading) return;

      const user = data?.data;

      // 1️⃣ Not logged in
      if (!user?.email) {
        navigate("/login", { replace: true, state: { from: location } });
        return;
      }

      // 2️⃣ Blocked user
      if (user.isBlocked) {
        navigate("/blocked", { replace: true });
        return;
      }

      // 3️⃣ Role check
      if (requiredRole && user.role !== requiredRole) {
        navigate("/unauthorized", { replace: true });
        return;
      }

      // 4️⃣ Route access check
      const roleRoutes = user.role === "driver" ? DriverRoutes : RiderRoutes;
      const isAllowedRoute = roleRoutes.some((route) => route.path === location.pathname);
      if (!isAllowedRoute) {
        navigate("/", { replace: true });
        return;
      }

      // 5️⃣ Ongoing ride check
      const onRide = localStorage.getItem("onRide");
      if (onRide && location.pathname !== "/rider/on-ride") {
        navigate("/rider/on-ride", { replace: true });
        return;
      }
    }, [data, isLoading, navigate, location, requiredRole]);


    return <Component />;
  };
};
