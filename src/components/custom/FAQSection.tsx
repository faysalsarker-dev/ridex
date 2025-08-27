"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  { question: "How can I post a ride?", answer: "Users can post a ride by filling out the ride request form on the dashboard." },
  { question: "How can I cancel a ride?", answer: "Users can cancel a ride anytime before the driver starts the trip." },
  { question: "How can drivers see their earnings?", answer: "Drivers can check their earnings in the 'Earnings' section of their dashboard." },
  { question: "Can admin delete users?", answer: "Yes, the admin can delete users or drivers from the admin panel." },
  { question: "Is my data secure?", answer: "All user data is encrypted and stored securely in our database." },
  { question: "Can I edit my ride after posting?", answer: "Yes, you can edit ride details before it is accepted by a driver." },
  { question: "How do I reset my password?", answer: "You can reset your password using the 'Forgot Password' link on the login page." },
  { question: "How do I become a driver?", answer: "Sign up as a driver and complete the verification process to start accepting rides." },
  { question: "What payment methods are accepted?", answer: "We accept all major credit/debit cards and digital wallets." },
];

export default function MinimalFAQ() {
  const [search, setSearch] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFaqs = useMemo(() => {
    if (!search) return [];
    return faqData.filter(
      (item) =>
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const randomSuggestions = useMemo(() => {
    const shuffled = faqData.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 ">Frequently Asked Questions</h2>


        <div className="grid md:grid-cols-2 gap-12 items-center">
         
          <Card className="bg-white shadow-xl rounded-2xl p-8 border-gray-300">
            <h2 className="text-2xl font-bold  text-gray-900 ">Search Your Questions</h2>

            {/* Search Input */}
            <Input
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-6 rounded-xl border-gray-300 h-12 bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />

            {/* Random Suggested Questions */}
            {!search && (
              <div className="mb-6 space-y-3">
                {randomSuggestions.map((faq, idx) => (
                  <Card
                    key={idx}
                    className="shadow-md border-gray-300 rounded-xl cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => setSearch(faq.question)}
                  >
                    <CardContent>
                      <p className="text-gray-800 font-medium">{faq.question}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Filtered FAQ Results */}
            {search && filteredFaqs.length > 0 && (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card
                      className="shadow-lg rounded-2xl cursor-pointer hover:shadow-xl transition-all"
                      onClick={() => toggleExpand(index)}
                    >
                      <CardContent className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-lg text-gray-800">{faq.question}</h3>
                          {expandedIndex === index ? (
                            <ChevronUp className="w-5 h-5 text-primary" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-primary" />
                          )}
                        </div>

                        <AnimatePresence>
                          {expandedIndex === index && (
                            <motion.p
                              className="mt-3 text-gray-700"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {faq.answer}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {search && filteredFaqs.length === 0 && (
              <p className="text-gray-500 text-center mt-4">No matching questions found.</p>
            )}
          </Card>


 <div>
            <img
              src="https://img.freepik.com/free-vector/pack-flat-people-asking-questions_23-2148917153.jpg" 
              alt="FAQ Illustration"
              className="rounded-2xl shadow-xl object-cover w-full h-full"
            />
          </div>


        </div>
      </div>
    </section>
  );
}
