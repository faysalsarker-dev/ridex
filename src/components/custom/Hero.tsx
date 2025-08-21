
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center bg-gray-100">
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <img
          src="/travel.jpg"
          alt="Ride Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" /> {/* dark overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold md:text-6xl"
        >
          Move Smarter, Ride Faster
        </motion.h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Your city, your ride. Book affordable and reliable rides anytime.
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full bg-[#0D99FF] hover:bg-[#0c89e6] text-white px-6"
          >
            Book a Ride
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full bg-white/10 backdrop-blur text-white border-white hover:bg-white/20 px-6"
          >
            Become a Driver
          </Button>
        </div>
      </div>
    </section>
  );
}
