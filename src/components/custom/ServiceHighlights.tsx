
import React from "react";


import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import type { Service } from "../interfaces";



import { CheckCircle, MapPin, CreditCard, Car, Navigation, BarChart2 } from "lucide-react";

const services: Service[] = [
  {
    id: 1,
    title: "Highly Secure",
    description: "Your rides and payments are protected with top-level security.",
    icon: <CheckCircle className="text-primary " />,
  },
  {
    id: 2,
    title: "Location Tracking",
    description: "Track your ride in real-time with accurate location updates.",
    icon: <MapPin className="text-primary shadow-2xl" />,
  },
  {
    id: 3,
    title: "Smart Fare",
    description: "Fair pricing algorithm ensures transparent ride costs every time.",
    icon: <CreditCard className="text-primary shadow-2xl" />,
  },
  {
    id: 4,
    title: "Track Journey",
    description: "Keep an overview of your ride history and journey details.",
    icon: <Navigation className="text-primary shadow-2xl" />,
  },
  {
    id: 5,
    title: "Smart Driver Dashboard",
    description: "Drivers have access to a smart, easy-to-use dashboard for efficiency.",
    icon: <Car className="text-primary shadow-2xl" />,
  },
  {
    id: 6,
    title: "Smart Account",
    description: "Manage your account, payments, and preferences effortlessly.",
    icon: <BarChart2 className="text-primary shadow-2xl" />,
  },
];


const ServiceHighlights: React.FC = () => (
  <section className="py-20 bg-gray-50 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16"
      >
        Our Smart Services
      </motion.h2>

      <motion.div
        className="grid gap-8 sm:grid-cols-2 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </motion.div>
    </div>

  
  </section>
);

export default ServiceHighlights;