import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { useGetRidesQuery } from "@/redux/features/admin/admin.api";



export interface IRide {
  _id: string;
  status:
    | "completed"
    | "ongoing"
    | "scheduled"
    | "cancelled_by_rider"
    | "cancelled_by_driver"
    | "cancelled_by_admin";
  fare: number;
  passengers: number;
  createdAt: string;
  updatedAt: string;

  rider: {
    _id: string;
    name: string;
    email: string;
  };

  driver?: {
    _id: string;
    name: string;
    email: string;
  } | null;

  pickupLocation: {
    address: string;
    lat: number;
    lng: number;
  };

  destinationLocation: {
    address: string;
    lat: number;
    lng: number;
  };

  rideTimeline?: {
    requestedAt?: string;
    acceptedAt?: string;
    pickedUpAt?: string;
    completedAt?: string;
    cancelledAt?: string;
  };

  cancelledBy?: "rider" | "driver" | "admin" | null;
  history?: string | null;
  rating?: number | null;
}







const Rides = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRide, setSelectedRide] = useState<IRide | null>(null);

  // Fetch rides via RTK query
  const { data, isLoading, isFetching } = useGetRidesQuery({
    search: searchQuery,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const rides = data?.data || [];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
      completed: "default",
      ongoing: "secondary",
      cancelled_by_rider: "destructive",
      cancelled_by_driver: "destructive",
      cancelled_by_admin: "destructive",
      scheduled: "outline",
    };
    return <Badge variant={variants[status] || "default"}>{status.replace(/_/g, " ")}</Badge>;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rides</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage all rides</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Ride Management
            {isFetching && <span className="text-sm text-muted-foreground">Refreshing...</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by rider, driver, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="cancelled_by_rider">Cancelled by Rider</SelectItem>
                <SelectItem value="cancelled_by_driver">Cancelled by Driver</SelectItem>
                <SelectItem value="cancelled_by_admin">Cancelled by Admin</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rider</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        Loading rides...
                      </TableCell>
                    </TableRow>
                  ) : rides.length > 0 ? (
                    rides.map((ride: IRide) => (
                      <motion.tr
                        key={ride._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        layout
                        className="border-b cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setSelectedRide(ride)}
                      >
                        <TableCell>
                          {ride.rider?.name}
                          <p className="text-sm text-muted-foreground">{ride.rider?.email}</p>
                        </TableCell>
                        <TableCell>
                          {ride.driver?.name || "N/A"}
                          {ride.driver?.email && (
                            <p className="text-sm text-muted-foreground">{ride.driver.email}</p>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(ride.status)}</TableCell>
                        <TableCell>{ride.pickupLocation?.address || "N/A"}</TableCell>
                        <TableCell>{ride.destinationLocation?.address || "N/A"}</TableCell>
                        <TableCell className="text-right">
                          <button className="text-primary hover:underline text-sm">View</button>
                        </TableCell>
                      </motion.tr>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        No rides found
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Ride Dialog */}
      <Dialog open={!!selectedRide} onOpenChange={() => setSelectedRide(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ride Details</DialogTitle>
          </DialogHeader>
          {selectedRide && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Rider</p>
                <p className="font-medium">{selectedRide.rider?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedRide.rider?.email}</p>
              </div>

              {selectedRide.driver && (
                <div>
                  <p className="text-sm text-muted-foreground mt-2">Driver</p>
                  <p className="font-medium">{selectedRide.driver.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedRide.driver.email}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mt-2">Status</p>
                {getStatusBadge(selectedRide.status)}
              </div>

              <div>
                <p className="text-sm text-muted-foreground mt-2">Pickup</p>
                <p className="font-medium">{selectedRide.pickupLocation?.address}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mt-2">Destination</p>
                <p className="font-medium">{selectedRide.destinationLocation?.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Created At</p>
                  <p className="font-medium">{format(new Date(selectedRide.createdAt), "MMM dd, yyyy HH:mm")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fare</p>
                  <p className="font-medium">${selectedRide.fare.toFixed(2)}</p>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Rides;
