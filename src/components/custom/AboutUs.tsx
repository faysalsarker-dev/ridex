import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const AboutUsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-primary/20 via-background to-accent/15 rounded-lg">
      <div className="max-w-6xl mx-auto text-center px-6 space-y-8">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-tight"
        >
          About <span className="text-primary">Us</span>
        </motion.h2>

        {/* Short description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          We are on a mission to redefine ride-sharing with innovation, safety,
          and community-driven values. Whether you’re a driver or rider, our
          goal is to create seamless and reliable journeys.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 shadow-lg"
            onClick={() => navigate("/about")}
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
