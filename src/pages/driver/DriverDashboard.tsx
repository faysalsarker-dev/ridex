import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Car, TrendingUp, Clock, MapPin, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DriverDashboard = () => {
  const weeklyData = [
    { day: "Mon", earnings: 45 },
    { day: "Tue", earnings: 32 },
    { day: "Wed", earnings: 67 },
    { day: "Thu", earnings: 54 },
    { day: "Fri", earnings: 89 },
    { day: "Sat", earnings: 156 },
    { day: "Sun", earnings: 123 },
  ];

  const recentRides = [
    {
      id: "1",
      rider: "Sarah Johnson",
      route: "Downtown → Airport",
      time: "2 hours ago",
      earning: 35.00,
      rating: 5
    },
    {
      id: "2",
      rider: "Mike Chen",
      route: "University → Business District",
      time: "4 hours ago",
      earning: 22.50,
      rating: 4
    },
    {
      id: "3",
      rider: "Emily Davis",
      route: "Central Station → Oakwood",
      time: "Yesterday",
      earning: 18.00,
      rating: 5
    },
  ];

  const stats = [
    {
      title: "Total Earnings",
      value: "$2,145.50",
      description: "This month",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Total Rides",
      value: "127",
      description: "This month",
      icon: Car,
      color: "text-primary"
    },
    {
      title: "This Week",
      value: "23 rides",
      description: "+12% from last week",
      icon: TrendingUp,
      color: "text-blue-500"
    },
    {
      title: "Avg Rating",
      value: "4.8",
      description: "Based on 89 reviews",
      icon: Star,
      color: "text-yellow-500"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2">Driver Dashboard</h1>
        <p className="text-xl text-muted-foreground">Track your earnings and ride statistics</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="shadow-soft hover:shadow-elevated transition-all duration-300 rounded-2xl border-border/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-soft rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Weekly Earnings</CardTitle>
              <CardDescription>Your earnings for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: string) => [`$${value}`, 'Earnings']}
                    labelFormatter={(label: string) => `${label}`}
                  />
                  <Bar dataKey="earnings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Rides */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-soft rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Recent Rides</CardTitle>
              <CardDescription>Your latest completed trips</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentRides.map((ride, index) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-xl"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{ride.rider}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: ride.rating }, (_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{ride.route}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{ride.time}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    ${ride.earning}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DriverDashboard;