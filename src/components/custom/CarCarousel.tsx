

import { useState, useEffect } from "react";
import redCar from "@/assets/red-car.png";
import blueBugatti from "@/assets/blue-bugatti.png";
import silverCar from "@/assets/silver-car.png";

interface CarData {
  id: number;
  image: string;
  name: string;
  price: string;
  featured?: boolean;
}

const cars: CarData[] = [
  {
    id: 1,
    image: redCar,
    name: "Red Sports Car",
    price: "$60",
  },
  {
    id: 2,
    image: blueBugatti,
    name: "BUGATI VERON",
    price: "$80",
    featured: true,
  },
  {
    id: 3,
    image: silverCar,
    name: "Silver Luxury",
    price: "$70",
  },
];

export const CarCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with featured car

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cars.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getCarPosition = (index: number) => {
    const diff = (index - currentIndex + cars.length) % cars.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === 2) return "left"; 
    return "hidden";
  };

  const getCarStyle = (position: string) => {
    switch (position) {
      case "center":
        return "scale-100 z-20 translate-x-0";
      case "left":
        return "scale-75 z-10 -translate-x-32 opacity-80";
      case "right":
        return "scale-75 z-10 translate-x-32 opacity-80";
      default:
        return "hidden";
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-[400px] px-16">
      {/* Car Images */}
      <div className="relative w-full max-w-4xl flex items-center justify-center">
        {cars.map((car, index) => {
          const position = getCarPosition(index);
          

          return (
            <div
              key={car.id}
              className={`absolute transition-all duration-700 ease-out ${getCarStyle(position)}`}
            >
      

              <img
                src={car.image}
                alt={car.name}
                className="w-96 h-auto object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
