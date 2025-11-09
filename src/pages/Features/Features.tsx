import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  MapPin, 
  CreditCard, 
  Star, 
  Navigation, 
  Wallet,
  BarChart,
  Shield,
  MessageSquare,
  Settings,
  Users,
  TrendingUp,
  Clock
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const riderFeatures = [
    { icon: MapPin, title: "Real-Time Tracking", description: "Track your driver's location in real-time" },
    { icon: CreditCard, title: "Multiple Payment Options", description: "Pay with card, wallet, or cash" },
    { icon: Star, title: "Rate Your Experience", description: "Provide feedback on every ride" },
    { icon: Shield, title: "Safety Features", description: "Emergency button and ride sharing" },
    { icon: MessageSquare, title: "In-App Chat", description: "Message your driver directly" },
    { icon: Clock, title: "Schedule Rides", description: "Book rides in advance" },
  ];

  const driverFeatures = [
    { icon: Navigation, title: "Smart Navigation", description: "Get the best routes automatically" },
    { icon: Wallet, title: "Instant Earnings", description: "Withdraw earnings instantly" },
    { icon: BarChart, title: "Earnings Dashboard", description: "Track your earnings and analytics" },
    { icon: Users, title: "Passenger Rating", description: "See passenger ratings before accepting" },
    { icon: Shield, title: "Insurance Coverage", description: "Full coverage during rides" },
    { icon: TrendingUp, title: "Surge Pricing", description: "Earn more during peak hours" },
  ];

  const adminFeatures = [
    { icon: Users, title: "User Management", description: "Manage riders and drivers efficiently" },
    { icon: BarChart, title: "Analytics Dashboard", description: "Comprehensive business insights" },
    { icon: CreditCard, title: "Payment Processing", description: "Secure payment management" },
    { icon: Settings, title: "System Configuration", description: "Customize platform settings" },
    { icon: Shield, title: "Security Controls", description: "Advanced security and fraud detection" },
    { icon: MessageSquare, title: "Support System", description: "Integrated customer support tools" },
  ];

  return (
    <>
      
      <section className="pt-32 pb-20 bg-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Powerful <span className="bg-primary bg-clip-text text-transparent">Features</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover all the capabilities designed to make your experience seamless, whether you're a rider, driver, or admin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Tabs */}
      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="rider" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="rider" className="text-base">Rider Features</TabsTrigger>
              <TabsTrigger value="driver" className="text-base">Driver Features</TabsTrigger>
              <TabsTrigger value="admin" className="text-base">Admin Features</TabsTrigger>
            </TabsList>

            <TabsContent value="rider">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {riderFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border group">
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gradient-primary transition-all duration-300">
                          <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="driver">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {driverFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border group">
                      <CardHeader>
                        <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gradient-primary transition-all duration-300">
                          <feature.icon className="w-6 h-6 text-accent group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="admin">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {adminFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border group">
                      <CardHeader>
                        <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gradient-primary transition-all duration-300">
                          <feature.icon className="w-6 h-6 text-secondary group-hover:text-primary-foreground transition-colors duration-300" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

    </>
  );
};

export default Features;
