import { Card, CardContent } from '@/components/ui/card';
import { Car, DollarSign, ClipboardList, Shield } from 'lucide-react';

export default function FeaturesShowcase() {
  const features = [
    {
      role: 'User',
      icon: <Car className="h-6 w-6 text-primary" />,
      points: [
        'Post a ride request quickly',
        'Cancel a ride if needed',
        'Track ride history and status',
      ],
    },
    {
      role: 'Driver',
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      points: [
        'View your earnings dashboard',
        'Check ride history and stats',
        'Manage availability and status',
      ],
    },
    {
      role: 'Admin',
      icon: <Shield className="h-6 w-6 text-primary" />,
      points: [
        'See summary of all users and drivers',
        'Manage ride data and delete controls',
        'Monitor platform activity',
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.role} className="hover:shadow-xl transition-all duration-300 border-gray-300">
              <CardContent className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.role}</h3>
                <ul className="space-y-2">
                  {feature.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
