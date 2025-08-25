

import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import type { Testimonial } from '../interfaces';
import TestimonialCard from './TestimonialCard';



const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Doe',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    message: 'The ride was smooth and the driver was super friendly. Highly recommend this service!',
    location: 'New York, USA',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
    message: 'Quick booking and safe ride. The app is really convenient to use.',
    location: 'San Francisco, USA',
  },
  {
    id: 3,
    name: 'Carlos Mendes',
    image: 'https://randomuser.me/api/portraits/men/77.jpg',
    rating: 5,
    message: 'Affordable rides and the driver arrived on time. Loved it!',
    location: 'Miami, USA',
  },
  {
    id: 1,
    name: 'John Doe',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    message: 'The ride was smooth and the driver was super friendly. Highly recommend this service!',
    location: 'New York, USA',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
    message: 'Quick booking and safe ride. The app is really convenient to use.',
    location: 'San Francisco, USA',
  },
  {
    id: 3,
    name: 'Carlos Mendes',
    image: 'https://randomuser.me/api/portraits/men/77.jpg',
    rating: 5,
    message: 'Affordable rides and the driver arrived on time. Loved it!',
    location: 'Miami, USA',
  },
];



const Testimonials: React.FC = () => (
  <div className="py-12 ">
    <h2 className="text-3xl font-bold text-center mb-8">What Our Riders Say</h2>
    <Swiper
      modules={[ Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      spaceBetween={30}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <TestimonialCard testimonial={testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default Testimonials;
