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
} from "@/components/ui/dropdown-menu"
 
  import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
       await logout(undefined).unwrap();
    dispatch(authApi.util.resetApiState());
   }



  return (
    <div className="">
         <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md hidden md:flex items-center justify-between px-6 py-4  border-b shadow-soft">
      <Link to="/" className="flex items-center  text-xl font-bold text-primary">
        <Car className="h-6 w-6" />
        Ride<span className="text-accent">X</span>
      </Link>
      
      <div className="flex items-center gap-6">
        {publicRoutes.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === item.path
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
        {RoleBaseRoutes(userInfo?.data?.role).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === item.path
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>

    
   <div className="flex items-center gap-3">
  {userInfo?.data ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer ring-2 ring-primary/30 hover:ring-primary/60 transition-all duration-200 shadow-sm hover:shadow-md">
          {/* <AvatarImage src="https://github.com/shadcn.png" alt="User" /> */}
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
  {userInfo?.data?.name
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
        className="w-56 rounded-2xl shadow-xl border border-muted/20 bg-white/95 backdrop-blur-sm"
      >
        <DropdownMenuLabel className="font-semibold text-sm text-primary">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {userRoutes.map((item, idx) => (
          <DropdownMenuItem
            key={idx}
            asChild
            className="hover:bg-primary/10 transition rounded-lg px-2"
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
          className="text-red-600 hover:bg-red-50 rounded-lg transition px-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <Button
        className="bg-primary text-white hover:bg-primary/90 rounded-full px-5 shadow-md transition"
        size="sm"
      >
       <Link to={'/login'}> Login</Link>
      </Button>
      <Button
        className="bg-white text-primary border border-primary/30 hover:border-primary hover:bg-primary/5 rounded-full px-5 shadow-sm transition"
        variant="outline"
        size="sm"
      >
        Register
      </Button>
    </>
  )}
</div>

    </nav>

 <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t shadow-elevated z-50">
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



    </div>
  );
};

export default Navbar;




