import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IUser } from "@/components/interfaces";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ProfileOverviewCardProps {
  user: IUser | undefined;
  onToggleOnline?: () => void;
}

export const ProfileOverviewCard = ({ user, onToggleOnline }: ProfileOverviewCardProps) => {
  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="border-border/50 overflow-hidden hover-lift">
        <div className="absolute top-0 left-0 right-0 h-24 gradient-primary opacity-10" />
        
        <CardHeader className="text-center relative z-10 pb-4">
          <div className="mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-30" />
            <Avatar className="w-28 h-28 border-4 border-background relative z-10">
              <AvatarFallback className="bg-primary text-3xl font-bold text-primary-foreground">
                {getInitials(user?.name || "U")}
              </AvatarFallback>
            </Avatar>
            {user?.role === "driver" && (
              <div 
                className={cn(
                  "absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-background z-20 cursor-pointer transition-all",
                  user?.driverProfile?.isOnline ? "bg-success" : "bg-muted"
                )}
                onClick={onToggleOnline}
              >
                <Circle className={`w-full h-full p-1 rounded-full ${user?.driverProfile?.isOnline ? 'animate-pulse bg-green-500':''} `} />
              </div>
            )}
          </div>
          
          <CardTitle className="text-2xl font-bold">{user?.name}</CardTitle>
          <CardDescription className="text-base">{user?.email}</CardDescription>

          {/* Badges */}
          <div className="flex justify-center flex-wrap gap-2 mt-4">
            <Badge className={cn(
              "px-3 py-1 text-sm font-medium",
              user?.role === "driver" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            )}>
              {user?.role === "driver" ? "Driver" : "Rider"}
            </Badge>
            
            {user?.role === "driver" && (
              <>
                <Badge
                  variant="outline"
                  className={cn(
                    "gap-1.5 px-3 py-1",
                    user?.driverProfile?.isApproved
                      ? "status-verified"
                      : "status-pending"
                  )}
                >
                  <Shield className="h-3.5 w-3.5" />
                  {user?.driverProfile?.isApproved ? "Verified" : "Pending"}
                </Badge>
                <Popover>
  <PopoverTrigger asChild>
    <Badge
                  variant="outline"
                   onClick={onToggleOnline}
                  className={cn(
                    "gap-1.5 px-3 py-1",
                    user?.driverProfile?.isOnline
                      ? "status-online"
                      : "status-offline"
                  )}
                >
                  <Circle className="h-2.5 w-2.5" fill="currentColor" />
                  {user?.driverProfile?.isOnline ? "Online" : "Offline"}
                </Badge>

  </PopoverTrigger>
  <PopoverContent>Click to change youre active status</PopoverContent>
</Popover>
            
              </>
            )}
          </div>
        </CardHeader>

        <CardContent className="divide-y divide-border/40 px-6 pb-6">
          <div className="flex justify-between py-4 text-sm">
            <span className="text-muted-foreground font-medium">Member since</span>
            <span className="font-semibold">
              {new Date(user?.createdAt || "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </span>
          </div>
    
        </CardContent>
      </Card>
    </motion.div>
  );
};
