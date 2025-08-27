import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import Loader from "@/components/custom/Loader";

type TRole = "driver" | "rider" | "admin";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole?: TRole
) => {
  const AuthWrapper: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { data, isLoading } = useUserInfoQuery(undefined);

    const user = data?.data;

    useEffect(() => {
      if (isLoading) return;

      if (!user?.email) {
        navigate("/login", { replace: true, state: { from: location.pathname } });
        return;
      }

      if (user.isBlocked) {
        navigate("/blocked", { replace: true });
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        navigate("/", { replace: true });
        return;
      }

      const isOnRide = localStorage.getItem("rideId");
      if (isOnRide && location.pathname !== "/rider/on-ride") {
        navigate("/rider/on-ride", { replace: true });
      }
    }, [isLoading, user, navigate, location]);

    if (isLoading) return React.createElement(Loader);

    if (!user?.email || user.isBlocked || (requiredRole && user.role !== requiredRole)) {
      return null;
    }

    return React.createElement(WrappedComponent, props);
  };

  AuthWrapper.displayName = `withAuth(${getComponentName(WrappedComponent)})`;
  return AuthWrapper;
};

export default withAuth;

function getComponentName(WrappedComponent: React.ComponentType<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
