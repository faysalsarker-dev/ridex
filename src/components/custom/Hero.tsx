

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; 
import { MapPin, Car } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D0914] via-[#1B1427] to-[#15101E] text-white px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl text-center space-y-6">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Book Your Ride <span className="text-indigo-400">Anytime</span>,{" "}
          <span className="text-pink-400">Anywhere</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Safe, reliable, and affordable rides at your fingertips. Whether you’re a rider or a driver, we’ve got you covered.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button
            size="lg"
            className="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center gap-2 px-6 py-3 rounded-2xl shadow-lg"
          >
            <MapPin size={20} />
            Book a Ride
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border border-gray-400 text-white hover:bg-gray-800 flex items-center gap-2 px-6 py-3 rounded-2xl"
          >
            <Car size={20} />
            Become a Driver
          </Button>
        </motion.div>
      </div>

      {/* Decorative Car Icon / Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 right-10 hidden md:block"
      >
        <Car size={80} className="text-indigo-400/50" />
      </motion.div>
    </section>
  );
}
