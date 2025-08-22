"use client";

import { motion } from "framer-motion";
import { Users, HeartHandshake, Shield } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="relative py-20 bg-[#0D0914] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About <span className="text-indigo-400">Us</span>
            </h2>
            <p className="text-gray-300 mb-6">
              We are a community-driven ride-sharing platform designed to connect
              riders and drivers seamlessly. Our goal is to make rides safe,
              reliable, and affordable while giving drivers the flexibility to
              earn on their own terms.
            </p>
            <p className="text-gray-400">
              Unlike traditional systems, we let users <span className="text-indigo-400">post ride requests</span>,
              and drivers can choose to accept them. This creates a more flexible
              and transparent experience for both sides.
            </p>
          </motion.div>

          {/* Right Side - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            <div className="bg-[#1B1427] p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition">
              <Users className="w-10 h-10 text-indigo-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Community First</h3>
              <p className="text-gray-400 text-sm">
                We value both riders and drivers, building a platform where
                everyone wins.
              </p>
            </div>
            <div className="bg-[#1B1427] p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition">
              <Shield className="w-10 h-10 text-indigo-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-400 text-sm">
                Verified drivers, real-time tracking, and secure payments keep
                every ride safe.
              </p>
            </div>
            <div className="bg-[#1B1427] p-6 rounded-2xl shadow-lg hover:shadow-indigo-500/20 transition">
              <HeartHandshake className="w-10 h-10 text-indigo-400 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Trustworthy</h3>
              <p className="text-gray-400 text-sm">
                Transparency in ride posting & acceptance ensures mutual trust
                between riders and drivers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
