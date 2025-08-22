"use client";

import { motion } from "framer-motion";
import { MapPin, Car, CheckCircle, Route } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Post Your Ride",
    desc: "Enter pickup and drop-off details to request a ride.",
  },
  {
    icon: Car,
    title: "Driver Sees Request",
    desc: "Nearby drivers get notified about your ride post.",
  },
  {
    icon: CheckCircle,
    title: "Driver Accepts",
    desc: "One of the drivers accepts your ride instantly.",
  },
  {
    icon: Route,
    title: "Start Your Journey",
    desc: "Both rider and driver connect and start the ride.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-20 bg-[#15101E] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          How It <span className="text-indigo-400">Works</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-gray-300 max-w-2xl mx-auto mb-12"
        >
          Our system is simple: post your ride request, and once a driver accepts, you’re ready to go.
        </motion.p>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="bg-[#1B1427] p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition"
            >
              <div className="flex justify-center mb-4">
                <step.icon className="w-12 h-12 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
