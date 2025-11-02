import { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How do I book a ride?",
      answer:
        "Simply open the RideX app, enter your destination, choose your ride type, and confirm. A nearby driver will be matched to you within seconds.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, digital wallets, and cash payments. You can add your preferred payment method in the app settings.",
    },
    {
      question: "How is the fare calculated?",
      answer:
        "Fares are calculated based on distance, time, and current demand. You'll always see the estimated fare before confirming your ride.",
    },
    {
      question: "Can I schedule a ride in advance?",
      answer:
        "Yes! You can schedule rides up to 7 days in advance. Just select the 'Schedule' option when booking your ride.",
    },
    {
      question: "What safety features do you offer?",
      answer:
        "We offer real-time ride tracking, driver verification, an in-app emergency button, ride sharing with friends, and 24/7 support.",
    },
    {
      question: "How do I become a driver?",
      answer:
        "Visit our driver portal, complete the online application, pass the background check, and attend a brief orientation session.",
    },
    {
      question: "Can I cancel my ride?",
      answer:
        "Yes, you can cancel rides through the app. Cancellation fees may apply if you cancel after the driver has already started heading to your pickup location.",
    },
    {
      question: "What if I left something in the car?",
      answer:
        "Contact the driver through the app immediately. If you can't reach them, contact our support team with your ride details.",
    },
    {
      question: "Do you operate in my city?",
      answer:
        "We currently operate in over 100 cities across 50 countries. Check our website or app to see if we're available in your area.",
    },
    {
      question: "How do I rate my driver?",
      answer:
        "After each ride, you'll be prompted to rate your experience. You can rate from 1–5 stars and provide optional feedback.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background text-foreground ">
      {/* Hero Section */}
      <section className="relative mt-10 flex flex-col justify-center items-center text-center pt-32 pb-24 overflow-hidden max-w-6xl mx-auto rounded-lg">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-vector/tiny-people-sitting-standing-near-giant-faq_74855-7879.jpg)",
          }}
        ></div>

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6 max-w-3xl text-white"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 leading-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          <p className="text-lg text-gray-200 mb-10">
            Find quick answers to common questions about RideX and our services.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto w-full">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base rounded-full shadow-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white text-gray-900"
            />
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="pb-24 px-4 bg-background mt-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-5">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left text-lg font-semibold py-5 px-6 hover:text-primary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No questions found matching your search.
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
