import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useNavigate, useLocation } from "react-router";
import type { ComponentType } from "react";
import { useEffect } from "react";

type TRole = "driver" | "rider" | "admin";

// HOC with generic typing
export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  requiredRole?: TRole
) {
  return function AuthWrapper(props: P) {
    const navigate = useNavigate();
    const location = useLocation();
    const { data, isLoading } = useUserInfoQuery(undefined);

    const user = data?.data;

    useEffect(() => {
      if (!isLoading) {
        if (!user?.email) {
          navigate("/login", { replace: true, state: { from: location } });
          return;
        }

        if (user?.isBlocked) {
          navigate("/blocked", { replace: true });
          return;
        }

        if (requiredRole && requiredRole !== user?.role) {
          navigate("/", { replace: true });
          return;
        }

        const onRide = localStorage.getItem("onRide");
        if (onRide && location.pathname !== "/rider/on-ride") {
          navigate("/rider/on-ride", { replace: true });
        }
      }
    }, [isLoading, user, requiredRole, navigate, location]);

    if (isLoading) {
      return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!user?.email) {
      return null; // avoids flicker while redirecting
    }

    return <WrappedComponent {...props} />;
  };
}
