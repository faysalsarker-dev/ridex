import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Zod schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form Submitted:", data);
    toast.success("Message sent successfully!");
    reset();
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl text-center mb-8 font-bold">Contact With Us!</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div >
            <img
              src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg" // replace with your image path
              alt="Contact Us"
              className="rounded-2xl shadow-xl object-cover w-full h-full"
            />
          </div>

          {/* Right Side - Form */}
          <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Get in Touch
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="font-medium text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register("name")}
                  className="mt-2 rounded-xl border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  {...register("email")}
                  className="mt-2 rounded-xl border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="font-medium text-gray-700">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  rows={5}
                  {...register("message")}
                  className="mt-2 rounded-xl border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-indigo-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
