import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface SOSButtonProps {
  onSOS: () => void;
}

export function SOSButton({ onSOS }: SOSButtonProps) {

  const handleSOSClick = () => {
    onSOS();

  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        delay: 0.3 
      }}
      className="absolute bottom-52 md:bottom-64 right-4 z-50 "
    >
      {/* Animated pulse ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.6, 0, 0.6]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeOut" 
        }}
        className="absolute inset-0 bg-destructive rounded-full"
      />
      
      {/* Main SOS Button */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        <Button
          size="lg"
          variant="destructive"
          onClick={handleSOSClick}
          className="
            w-20 h-20 rounded-full p-0
            bg-destructive hover:bg-destructive/90
            shadow-2xl border-4 border-white
            transition-all duration-200
            flex flex-col items-center justify-center
            gap-1
          "
        >
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          >
            <AlertTriangle className="h-8 w-8" />
          </motion.div>
          <span className="text-xs font-bold">SOS</span>
        </Button>
      </motion.div>
    </motion.div>
  );
}