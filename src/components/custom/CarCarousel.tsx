

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
          const isFeatured = position === "center";

          return (
            <div
              key={car.id}
              className={`absolute transition-all duration-700 ease-out ${getCarStyle(position)}`}
            >
              {/* Featured Car Price Badge */}
              {isFeatured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 z-30">
                  <div className="bg-primary text-white px-8 py-4 rounded-full shadow-lg">
                    <div className="text-center">
                      <div className="font-bold text-lg">{car.name}</div>
                      <div className="text-2xl font-bold">
                        {car.price}<span className="text-sm">/day</span>
                      </div>
                      <Button size="sm" className="mt-2">
                        Rent
                      </Button>
                    </div>
                  </div>
                </div>
              )}

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
