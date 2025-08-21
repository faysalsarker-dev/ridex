

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

interface Ride {
  pickup: string;
  dropoff: string;
  fare: number;
  distance: string;
  time: string;
  icon: string;
  color: string;
}

const rides: Ride[] = [
  {
    pickup: "Dhanmondi, Dhaka",
    dropoff: "Gulshan, Dhaka",
    fare: 250,
    distance: "6 km",
    time: "15 min",
    icon: "🚗",
    color: "#00C9A7",
  },
  {
    pickup: "Banani, Dhaka",
    dropoff: "Uttara, Dhaka",
    fare: 350,
    distance: "12 km",
    time: "25 min",
    icon: "🚕",
    color: "#FFB800",
  },
  {
    pickup: "Mirpur, Dhaka",
    dropoff: "Motijheel, Dhaka",
    fare: 300,
    distance: "10 km",
    time: "20 min",
    icon: "🚙",
    color: "#1E86FF",
  },
  {
    pickup: "Motijheel, Dhaka",
    dropoff: "Dhanmondi, Dhaka",
    fare: 280,
    distance: "9 km",
    time: "18 min",
    icon: "🚐",
    color: "#FF3D71",
  },
];

const RideCard = ({ pickup, dropoff, fare, distance, time, icon, color }: Ride) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-2xl p-4 transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
        <div>
            <h2>hello dev</h2>
            <span>ridex . com 
                 
            </span>
        </div>
      <div className="flex flex-row items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="text-lg font-semibold text-gray-900 dark:text-white">
            {pickup} → {dropoff}
          </figcaption>
          <p className="text-sm text-gray-500 dark:text-white/60">
            Distance: {distance} • ETA: {time} • Fare: ${fare}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default function AvailableRidesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Available Rides
      </h1>

      <div className="relative w-full flex-1 overflow-hidden">
        <AnimatedList>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2">
            {rides.map((ride, idx) => (
              <RideCard {...ride} key={idx} />
            ))}
          </div>
        </AnimatedList>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background dark:from-black/40"></div>
      </div>
    </div>
  );
}
