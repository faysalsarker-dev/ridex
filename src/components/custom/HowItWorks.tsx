"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { MapPin, User, CheckCircle2, Heart, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Post a Ride",
    description: "Set your current location, pickup point, and destination.",
    icon: <MapPin />,
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: 2,
    title: "Wait for Driver",
    description: "Drivers see your ride request and can accept it.",
    icon: <User />,
    color: "from-green-400 to-teal-500",
  },
  {
    id: 3,
    title: "Ready for Ride",
    description: "Once a driver accepts, you’re ready to start your ride.",
    icon: <CheckCircle2 />,
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 4,
    title: "Ride in Progress",
    description: "You can post another ride while the current ride is ongoing.",
    icon: <Heart />,
    color: "from-pink-400 to-red-500",
  },
  {
    id: 5,
    title: "Secure & Safe",
    description: "Our platform ensures high security and safety for all rides.",
    icon: <Shield />,
    color: "from-purple-400 to-indigo-500",
  },
];

const HowItWorksCard: React.FC<{ step: Step }> = ({ step }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Card className="relative p-6 flex flex-col items-center text-center
      bg-white/20 backdrop-blur-md border border-gray-200/30
      rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
      
      <div className={`mb-5 p-4 rounded-full bg-gradient-to-tr ${step.color} text-white shadow-md
        hover:scale-110 transition-transform duration-300`}>
        {step.icon}
      </div>

      <h3 className="font-bold text-xl mb-2 text-gray-900">{step.title}</h3>
      <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
    </Card>
  </motion.div>
);

const HowItWorks: React.FC = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16"
      >
        How It Works
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {steps.map((step) => (
          <HowItWorksCard key={step.id} step={step} />
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
