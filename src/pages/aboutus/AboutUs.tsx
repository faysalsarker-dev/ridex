"use client";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  const coreValues = [
    {
      title: "Safety First",
      desc: "Your safety is our top priority — every ride includes verification, live tracking, and 24/7 support.",
    },
    {
      title: "Community Driven",
      desc: "We move together. Our platform thrives on collaboration, trust, and shared progress.",
    },
    {
      title: "Innovation",
      desc: "We’re constantly reimagining mobility — building smarter, cleaner, and faster experiences for everyone.",
    },
  ];

  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-28 px-6 text-center bg-secondary">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          About <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Our Platform</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          We’re redefining how the world moves — blending tech, design, and community to make every journey effortless.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-8 h-[3px] w-28 bg-primary rounded-full origin-left"
        />
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          src="https://img.freepik.com/premium-photo/friends-have-fun-traveling-by-cabriolet_474601-9086.jpg"
          alt="Ride sharing"
          className="rounded-3xl shadow-lg object-cover w-full h-full"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-5"
        >
          <h2 className="text-4xl font-bold">
            Our <span className="text-primary">Mission</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We’re on a mission to build a transportation network that’s more connected, sustainable, and human. Every trip should feel personal, safe, and inspiring — powered by meaningful innovation.
          </p>
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-14">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold"
          >
            Our <span className="text-primary">Core Values</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {coreValues.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-8 rounded-3xl border bg-card backdrop-blur-md shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
