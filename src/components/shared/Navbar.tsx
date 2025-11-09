"use client";

import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Car, LayoutDashboard, LogOut, Menu } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [logout] = useLogoutMutation();
  const { data: userInfo } = useUserInfoQuery(undefined);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);


  const handleLogout = async () => {
  try {
    await logout(undefined);
  } finally {
    dispatch(authApi.util.resetApiState());
  }
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
{
  userInfo?.data?.role === 'admin' && (

       <DropdownMenuItem
                
                      asChild
                      className="rounded-md transition hover:bg-primary/10"
                    >
                      <Link
                        to={'/dashboard'}
                        className="flex items-center gap-2 w-full text-sm text-muted-foreground hover:text-primary"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                       Dashboard
                      </Link>
                    </DropdownMenuItem>
  )
}

  
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => setOpen(true)}
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

      {/* ----------- Mobile Navbar (Sheet) ----------- */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary">
          <Car className="h-6 w-6" />
          Ride<span className="text-accent">X</span>
        </Link>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-primary/10 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72 p-2 bg-white/95 backdrop-blur-md  shadow-lg">
            <div className="flex flex-col gap-6 mt-6">
              {/* User Section */}
              {isLoggedIn && (
                <div className="flex items-center gap-3  pb-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {userInfo.data?.name
                        ? userInfo.data.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-primary">{userInfo.data?.name}</p>
                    <p className="text-xs text-muted-foreground">{userInfo.data?.email}</p>
                  </div>
                </div>
              )}

              {/* Nav Links */}
              <div className="flex flex-col gap-3">
                {[...publicRoutes, ...RoleBaseRoutes(userInfo?.data?.role)].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-sm font-medium py-2 rounded-md px-3 transition hover:bg-primary/10 hover:text-primary",
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Auth Actions */}
              <div className="mt-6  pt-4 flex flex-col gap-3">
                {isLoggedIn ? (
                  <Button
                    variant="destructive"
                    className="w-full rounded-full"
                    onClick={() => {
                      setMenuOpen(false);
                      setOpen(true);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      className="w-full rounded-full bg-primary text-white hover:bg-primary/90"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-primary/30 text-primary hover:bg-primary/5 hover:border-primary"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>

      {/* Logout Dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>You want to log out from this account?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default Navbar;
