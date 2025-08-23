
import type { Service } from "../interfaces";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";


const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.06 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Card className="p-6 flex flex-col items-center text-center
      bg-white/30 backdrop-blur-md border border-gray-200/40
      rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
      
      <div className="mb-5 p-4  text-white
         hover:scale-110 transition-transform duration-300">
        {service.icon}
      </div>
      
      <h3 className="font-bold text-xl mb-2 text-gray-900">{service.title}</h3>
      <p className="text-gray-600 text-sm md:text-base">{service.description}</p>
    </Card>
  </motion.div>
);
export default ServiceCard;
