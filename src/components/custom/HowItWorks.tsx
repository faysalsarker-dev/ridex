
import React from "react";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  User,
  CheckCircle2,
  Heart,
  Shield,
  UserPlus,
  Home,
  Star,
} from "lucide-react";
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
    id: 0,
    title: "Create an Account",
    description: "Sign up quickly using your email or social media accounts.",
    icon: <UserPlus />,
    color: "from-purple-400 to-yellow-500",
  },
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
    description: "Track and enjoy your ongoing ride in real time.",
    icon: <Heart />,
    color: "from-pink-400 to-red-500",
  },
  {
    id: 5,
    title: "Secure & Safe",
    description: "We ensure every trip is safe and protected.",
    icon: <Shield />,
    color: "from-purple-400 to-indigo-500",
  },
  {
    id: 6,
    title: "End Your Ride",
    description: "At your destination, end the ride and complete payment.",
    icon: <Home />,
    color: "from-green-400 to-indigo-500",
  },
  {
    id: 7,
    title: "Share Your Experience",
    description: "Rate your driver and help us improve our service.",
    icon: <Star />,
    color: "from-amber-400 to-yellow-500",
  },
];

const HowItWorksCard: React.FC<{ step: Step; index: number; total: number }> = ({
  step,
  index,
  total,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className="relative flex flex-col items-center"
  >
    <Card
      className="relative z-10 p-6 flex flex-col items-center text-center bg-white/30
      backdrop-blur-md border border-gray-200/40 rounded-2xl shadow-lg 
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div
        className={`mb-5 p-4 rounded-full bg-gradient-to-tr ${step.color} text-white shadow-md
        hover:scale-110 transition-transform duration-300`}
      >
        {step.icon}
      </div>
      <h3 className="font-semibold text-lg md:text-xl text-gray-900">
        {step.title}
      </h3>
      <p className="text-gray-600 text-sm md:text-base mt-2">
        {step.description}
      </p>
    </Card>

    {/* Flow connector line */}
    {index < total - 1 && (
      <div className="hidden md:block absolute top-1/2 right-[-1.5rem] w-8 h-[2px] bg-gradient-to-r from-gray-300 to-gray-400" />
    )}
  </motion.div>
);

const HowItWorks: React.FC = () => (
  <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
    <div className="max-w-6xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800"
      >
        How It Works
      </motion.h2>

      <div
        className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 relative"
        style={{ position: "relative" }}
      >
        {steps.map((step, index) => (
          <HowItWorksCard
            key={step.id}
            step={step}
            index={index}
            total={steps.length}
          />
        ))}

        {/* Curved line flow for desktop */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-200 to-gray-300 opacity-70 -z-10" />
      </div>
    </div>

    {/* Decorative gradient circle background */}
    <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-40" />
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30" />
  </section>
);

export default HowItWorks;
