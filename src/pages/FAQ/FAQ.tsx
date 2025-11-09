import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const [query, setQuery] = useState("");

  const faqs = [
    {
      q: "How do I book a ride?",
      a: "Open the RideX app, enter your destination, choose your ride type, and confirm. A nearby driver will be matched instantly.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept cards, digital wallets, and cash. Add your preferred method in app settings.",
    },
    {
      q: "How is the fare calculated?",
      a: "Fares depend on distance, time, and demand. You’ll always see an estimated fare before confirming.",
    },
    {
      q: "Can I schedule a ride in advance?",
      a: "Yes, schedule rides up to 7 days in advance — just pick the 'Schedule' option before booking.",
    },
    {
      q: "What safety features do you offer?",
      a: "We provide real-time tracking, driver verification, an in-app SOS button, and 24/7 support.",
    },
    {
      q: "How do I become a driver?",
      a: "Apply on our driver portal, complete a background check, and attend a short orientation.",
    },
    {
      q: "Can I cancel my ride?",
      a: "Yes. You can cancel via the app. A small fee may apply if the driver is already en route.",
    },
    {
      q: "What if I left something in the car?",
      a: "Contact the driver directly from the app or reach our support team with your ride details.",
    },
    {
      q: "Do you operate in my city?",
      a: "We’re available in 100+ cities across 50 countries. Check our app to confirm your area.",
    },
    {
      q: "How do I rate my driver?",
      a: "After each ride, rate your experience from 1–5 stars and optionally add feedback.",
    },
  ];

  // Memoized filtering for better performance
  const filteredFaqs = useMemo(() => {
    const text = query.toLowerCase();
    return faqs.filter(
      (faq) => faq.q.toLowerCase().includes(text) || faq.a.toLowerCase().includes(text)
    );
  }, [query]);

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center pt-32 pb-24 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-[2px]"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-vector/tiny-people-sitting-standing-near-giant-faq_74855-7879.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 px-6 max-w-3xl text-white"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-lg text-gray-200 mb-10">
            Quick answers to everything about RideX — rides, safety, and more.
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search for answers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 h-14 text-base rounded-full shadow-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white text-gray-900"
            />
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="pb-24 px-4 mt-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    viewport={{ once: true }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="bg-card border border-border rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left text-lg font-semibold py-5 px-6 hover:text-primary transition-colors">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5 text-muted-foreground leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No questions found for “{query}”.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
