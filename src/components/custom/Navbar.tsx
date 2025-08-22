  import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Car, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Home,  History } from "lucide-react";
import { publicRoutes } from "@/utils/publicRoutes";
  
  import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { userRoutes } from "@/utils/userRoutes";

const Navbar = () => {
   const location = useLocation();
  return (
    <div>
         <nav className="hidden md:flex items-center justify-between px-6 py-4 bg-card border-b shadow-soft">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
        <Car className="h-6 w-6" />
        RideShare
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
      </div>

    
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary transition">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 shadow-lg rounded-xl">
          <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {userRoutes.map((item, idx) => (
            <DropdownMenuItem key={idx} asChild>
              <Link
                to={item.path}
                className="flex items-center gap-2 w-full text-sm"
              >
                <item.icon className="h-4 w-4 text-muted-foreground" />
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" size="sm" className="rounded-full">
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
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




