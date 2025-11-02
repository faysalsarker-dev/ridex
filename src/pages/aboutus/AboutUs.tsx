"use client";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative py-28 px-6 text-center overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          About <span className="text-primary">Our Platform</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          We’re redefining how the world moves — combining technology, design,
          and community to make transportation effortless and inspiring.
        </motion.p>

        {/* subtle animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-8 h-[3px] w-24 bg-primary rounded-full origin-left"
        />
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          src="https://img.freepik.com/premium-photo/friends-have-fun-traveling-by-cabriolet_474601-9086.jpg"
          alt="Ride sharing"
          className="rounded-3xl shadow-2xl object-cover"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-5"
        >
          <h2 className="text-4xl font-bold">
            Our <span className="text-primary">Mission</span>
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            We believe in creating a smarter, greener, and more human way to
            move. Our mission is to connect people and places through seamless
            technology — where every trip feels personal, safe, and meaningful.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
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
            {[
              {
                title: "Safety First",
                desc: "Every ride is protected with advanced verification and real-time monitoring to keep you secure.",
              },
              {
                title: "Community Driven",
                desc: "We grow with our community — building connections and opportunities that matter.",
              },
              {
                title: "Innovation",
                desc: "Pushing boundaries through data and design to make every trip smarter and more sustainable.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-8 rounded-3xl border bg-white/70 backdrop-blur-md shadow-sm hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
