import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const RideHistoryCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      className="bg-white dark:bg-card rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col gap-4 border border-border"
    >
      {/* Header: Pickup → Destination + Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-40 sm:w-64 rounded-md" />
        </div>
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>

      {/* Fare & Passengers */}
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
      </div>

      {/* Ratings */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-border">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20 rounded-md" />
          <div className="flex gap-1">
            {Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded" />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <div className="flex gap-1">
            {Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RideHistoryCardSkeleton;
