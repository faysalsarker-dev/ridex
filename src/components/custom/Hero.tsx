
import { CarCarousel } from "./CarCarousel";

const Hero = () => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Message Section - pushed to top area */}
      <div className="pt-16 md:pt-28 text-center px-4 z-20">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Easy And Fast Way To <span className="text-primary">Book</span> Your Ride
        </h2>
        <h3 className="text-lg md:text-xl text-gray-500 mt-3 max-w-2xl mx-auto">
          Get a ride anytime, anywhere. Whether you're heading to work, a night out, or the airport – 
          our reliable drivers are just a tap away.
        </h3>
      </div>

      {/* Bottom Section with Circle + Carousel */}
      <div className="absolute bottom-[-1%] w-full">
        <div className="relative flex justify-center items-center">
       
          <div className="w-72 h-72 md:w-96 md:h-96 bg-primary rounded-full absolute -top-16 mx-auto" />

          {/* Car carousel on top */}
          <div className="relative z-10 w-full max-w-5xl mx-auto">
            <CarCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

