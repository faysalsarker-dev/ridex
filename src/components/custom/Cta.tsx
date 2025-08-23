

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Cta: React.FC = () => {
  return (
    <section className="relative  rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-20 px-6 md:px-20 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ride Smarter, Faster, Safer
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-100">
          Join thousands of riders who trust us for convenient and safe rides every day.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button className="bg-white text-blue-600 hover:text-white hover:bg-blue-600 border-none shadow-lg transform transition duration-300 hover:scale-105">
            Book a Ride
          </Button>
          <Button className="bg-transparent border border-white hover:bg-white hover:text-blue-600 text-white shadow-md transform transition duration-300 hover:scale-105">
            Become a Driver
          </Button>
        </div>
      </motion.div>

      {/* Animated Background Circles */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse-slow"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white opacity-5 rounded-full animate-pulse-slower"></div>
    </section>
  );
};

export default Cta;
