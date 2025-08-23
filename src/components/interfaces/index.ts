export interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  message: string;
  location: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}