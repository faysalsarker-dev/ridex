
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardContent } from '@/components/ui/card';
import type { Testimonial } from '../interfaces';




const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <Card className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center text-center max-w-sm mx-auto border-gray-300">
    <Avatar className="mb-4">
      <AvatarImage src={testimonial.image} />
      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
    </Avatar>
    <CardContent className="p-0">
      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{testimonial.location}</p>
      <div className="mb-3">
        {'⭐'.repeat(testimonial.rating)}
      </div>
      <p className="text-gray-700">{testimonial.message}</p>
    </CardContent>
  </Card>
);


export default TestimonialCard;
