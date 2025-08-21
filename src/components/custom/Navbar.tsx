import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { publicRoutes } from "@/utils/publicRoutes"
import { Link, useLocation } from "react-router"

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <>
      {/* ---- Desktop Navbar (Top) ---- */}
      <header className="border-b px-4 md:px-6 bg-card sticky top-0 z-50 hidden md:block">
        <div className="flex h-16 justify-between items-center">
          {/* Left side */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <Link to="/" className="flex items-center text-primary hover:text-primary/90">
              <Logo />
            </Link>

            {/* Desktop navigation */}
            <NavigationMenu className="hidden md:flex h-full">
              <NavigationMenuList className="h-full gap-4">
                {publicRoutes.map((link, index) => {
                  const isActive = pathname === link.path
                  return (
                    <NavigationMenuItem key={index} className="h-full">
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.path}
                          className={`inline-flex items-center px-3 text-sm font-medium transition-colors ${
                            isActive
                              ? "text-primary border-b-2 border-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button asChild size="sm" className="text-sm">
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ---- Mobile Bottom App Bar ---- */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card shadow-md flex justify-around items-center py-2 md:hidden">
        {publicRoutes.slice(0, 4).map((link, index) => {
          const isActive = pathname === link.path
   
          return (
            <Link
              key={index}
              to={link.path}
              className={`flex flex-col items-center gap-1 text-xs transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="h-5 w-5">{<link.icon />}</div>
              {link.name}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
