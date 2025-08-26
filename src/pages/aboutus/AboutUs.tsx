import { motion } from "framer-motion";

const AboutUsPage = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center bg-gradient-to-r from-primary/10 via-background to-accent/10">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-6"
        >
          About <span className="text-primary">Our Platform</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg text-muted-foreground max-w-3xl mx-auto"
        >
          We are transforming the way people move. Our platform connects drivers
          and riders with ease, ensuring safety, reliability, and comfort in
          every ride.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          src="https://img.freepik.com/premium-photo/friends-have-fun-traveling-by-cabriolet_474601-9086.jpg"
          alt="Ride sharing"
          className="rounded-2xl shadow-xl"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-semibold">
            Our <span className="text-accent">Mission</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is simple: make transportation accessible, affordable,
            and sustainable. We believe in empowering communities while
            prioritizing safety, convenience, and eco-friendly practices.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold"
          >
            Our <span className="text-primary">Core Values</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Safety First",
                desc: "We prioritize safety for riders and drivers with verified profiles and secure rides.",
              },
              {
                title: "Community Driven",
                desc: "We build connections that strengthen communities while reducing transportation gaps.",
              },
              {
                title: "Innovation",
                desc: "We embrace technology to deliver better, faster, and more eco-friendly rides.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-2xl bg-background border shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2 text-accent">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
