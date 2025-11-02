
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Testimonial } from "../interfaces";
import TestimonialCard from "./TestimonialCard";
import { motion } from "framer-motion";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    message:
      "The ride was smooth and the driver was super friendly. Highly recommend this service!",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    message:
      "Quick booking and safe ride. The app is really convenient to use.",
    location: "San Francisco, USA",
  },
  {
    id: 3,
    name: "Carlos Mendes",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 5,
    message:
      "Affordable rides and the driver arrived on time. Loved it!",
    location: "Miami, USA",
  },
  {
    id: 4,
    name: "Sophia Lee",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    message:
      "Excellent experience every time — reliable, fast, and super comfortable!",
    location: "Toronto, Canada",
  },
];

const Testimonials: React.FC = () => (
  <section className="relative py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
    {/* Decorative glowing shapes */}
    <div className="absolute top-[-10%] left-[15%] w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />
    <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-indigo-400/10 blur-[120px] rounded-full" />

    <div className="relative z-10 max-w-6xl mx-auto px-6">
      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-900 dark:text-white"
      >
        What Our Riders Say
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16"
      >
        Real experiences from real riders — here’s what people love about our platform.
      </motion.p>

      {/* Testimonial Swiper */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !bg-gray-400 dark:!bg-gray-600",
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-primary",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={30}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!pb-14"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="h-full"
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default Testimonials;
