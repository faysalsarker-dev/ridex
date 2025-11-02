import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Car, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { publicRoutes } from "@/utils/publicRoutes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { userRoutes } from "@/utils/userRoutes";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { RoleBaseRoutes } from "@/utils/RoleBaseRoute";

const Navbar = () => {
  const location = useLocation();
  const [logout] = useLogoutMutation();
  const { data: userInfo } = useUserInfoQuery(undefined);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  const isLoggedIn = !!userInfo?.data;

  return (
    <header className="w-full">
      {/* ----------- Desktop Navbar ----------- */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Car className="h-6 w-6" />
            Ride<span className="text-accent">X</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {[...publicRoutes, ...RoleBaseRoutes(userInfo?.data?.role)].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative text-sm font-medium transition-all duration-200 hover:text-primary",
                  location.pathname === item.path
                    ? "text-primary after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User / Auth Buttons */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {userInfo.data?.name
                        ? userInfo.data.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-xl border border-muted/20 bg-white/90 backdrop-blur-md shadow-lg"
                >
                  <DropdownMenuLabel className="font-semibold text-sm text-primary">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {userRoutes.map((item, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      asChild
                      className="rounded-md transition hover:bg-primary/10"
                    >
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 w-full text-sm text-muted-foreground hover:text-primary"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 hover:bg-red-50 rounded-md transition"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/90 rounded-full px-5 shadow-md"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/5 hover:border-primary rounded-full px-5"
                >
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ----------- Mobile Navbar ----------- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t shadow-sm z-50">
        <div className="flex items-center justify-around py-2">
          {publicRoutes.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
