
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Link, useNavigate } from "react-router";

const HeroSection = () => {
  const { data, isLoading } = useUserInfoQuery({});
  const navigate = useNavigate();
  const user = data?.data;

  return (
    <section className="relative h-[100vh] flex items-center justify-center text-center overflow-hidden bg-black">
      {/* ===== Background Image ===== */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* ===== Animated Gradient Overlay ===== */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-60 mix-blend-screen"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* ===== Floating Blobs ===== */}
      <motion.div
        className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-primary/30 rounded-full blur-[120px]"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/30 rounded-full blur-[100px]"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* ===== Content ===== */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 px-6 max-w-3xl text-white"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Move{" "}
          <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
            Smarter
          </span>
          ,  
          <br className="hidden md:block" />  
          Live{" "}
          <span className="bg-gradient-to-r from-pink-500 to-primary bg-clip-text text-transparent">
            Better
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Get where you need to go with ease — fast, safe, and reliable rides at your fingertips.
        </motion.p>

        {/* ===== Buttons ===== */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link to={!isLoading && user ? "/book" : "/register"}>
            <Button
              size="lg"
              className="relative overflow-hidden bg-primary text-white rounded-full px-10 py-6 text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] group"
            >
              <span className="relative z-10 flex items-center">
                Book a Ride
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.span
                className="absolute inset-0 bg-white/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </Button>
          </Link>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/about")}
            className="rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300"
          >
            Learn More
          </Button>
        </motion.div>
      </motion.div>

      {/* ===== Light Rays ===== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
};

export default HeroSection;
