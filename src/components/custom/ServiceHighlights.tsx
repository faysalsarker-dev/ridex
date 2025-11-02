
import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  MapPin,
  CreditCard,
  Car,
  Navigation,
  BarChart2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Service } from "../interfaces";

const services: Service[] = [
  {
    id: 1,
    title: "Highly Secure",
    description:
      "Your rides and payments are protected with enterprise-grade encryption and safety protocols.",
    icon: <CheckCircle className="w-6 h-6 text-white" />,
    color: "from-purple-500 via-pink-500 to-orange-400",
  },
  {
    id: 2,
    title: "Location Tracking",
    description:
      "Track your ride in real-time with precision GPS and instant driver updates.",
    icon: <MapPin className="w-6 h-6 text-white" />,
    color: "from-blue-500 via-cyan-400 to-green-400",
  },
  {
    id: 3,
    title: "Smart Fare",
    description:
      "Our AI-driven pricing ensures transparent and fair costs every trip.",
    icon: <CreditCard className="w-6 h-6 text-white" />,
    color: "from-yellow-400 via-orange-400 to-pink-500",
  },
  {
    id: 4,
    title: "Track Journey",
    description:
      "Access detailed ride history, routes, and fare summaries — anytime, anywhere.",
    icon: <Navigation className="w-6 h-6 text-white" />,
    color: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    id: 5,
    title: "Smart Driver Dashboard",
    description:
      "Empowering drivers with live data, insights, and easy navigation tools.",
    icon: <Car className="w-6 h-6 text-white" />,
    color: "from-teal-400 via-emerald-400 to-green-400",
  },
  {
    id: 6,
    title: "Smart Account",
    description:
      "Manage your preferences, payments, and profile seamlessly in one place.",
    icon: <BarChart2 className="w-6 h-6 text-white" />,
    color: "from-pink-400 via-rose-400 to-red-400",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ServiceCard = ({ service }: { service: Service }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotate: 1 }}
    transition={{ type: "spring", stiffness: 250, damping: 18 }}
    className="group relative"
  >
    {/* Neon glow border */}
    <div
      className={`absolute inset-0  rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-all duration-300`}
    />

    <Card
      className="relative p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div
        className={`mx-auto mb-5 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-tr ${service.color} shadow-lg`}
      >
        {service.icon}
      </div>

      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
        {service.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
        {service.description}
      </p>

      {/* animated background blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className={`absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-tr ${service.color} blur-3xl opacity-20`}
      />
    </Card>
  </motion.div>
);

const ServiceHighlights: React.FC = () => (
  <section className="relative py-28 bg-background overflow-hidden text-black">
    {/* Floating glowing orbs */}
    <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-[160px]" />
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/30 rounded-full blur-[160px]" />

    <div className="relative z-10 max-w-6xl mx-auto px-6">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
      >
        Our Smart Services
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-center text-gray-600 max-w-2xl mx-auto mb-16"
      >
        Designed for performance, precision, and peace of mind — experience
        the Gen-Z evolution of smart ride technology.
      </motion.p>

      <motion.div
        className="grid gap-10 sm:grid-cols-2 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={fadeUp}>
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ServiceHighlights;
