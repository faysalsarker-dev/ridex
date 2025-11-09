import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email").max(255),
  message: z.string().min(1, "Message is required").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    console.log("Form Data:", data);
    toast.loading("Sending message...");
    try {
      await new Promise((res) => setTimeout(res, 1500)); // simulate API call
      toast.dismiss();
      toast.success("Message sent successfully!");
      reset();
    } catch {
      toast.dismiss();
      toast.error("Something went wrong!");
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary-foreground" />,
      title: "Phone",
      detail: "+1 (555) 123-4567",
    },
    {
      icon: <Mail className="w-6 h-6 text-primary-foreground" />,
      title: "Email",
      detail: "support@ridex.com",
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary-foreground" />,
      title: "Office",
      detail: "123 Tech Street\nSan Francisco, CA 94102",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Get In{" "}
            <span className="bg-primary bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We’d love to hear from you — reach out and we’ll get
            back to you soon.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 max-w-6xl">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-10 bg-card/80"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>
            </div>

            {contactInfo.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}

            <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-3">Business Hours</h3>
              <p>Mon - Fri: 9AM - 6PM</p>
              <p>Sat: 10AM - 4PM</p>
              <p>Sun: Closed</p>
              <p className="text-sm opacity-80 mt-3">
                24/7 support available through the app
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-8 shadow-lg space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <Input
                {...register("name")}
                placeholder="Your name"
                className={`rounded-2xl ${
                  errors.name ? "border-destructive" : ""
                }`}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <Input
                type="email"
                {...register("email")}
                placeholder="your@email.com"
                className={`rounded-2xl ${
                  errors.email ? "border-destructive" : ""
                }`}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Message *
              </label>
              <Textarea
                {...register("message")}
                rows={6}
                placeholder="Tell us how we can help..."
                className={`rounded-2xl resize-none ${
                  errors.message ? "border-destructive" : ""
                }`}
              />
              {errors.message && (
                <p className="text-sm text-destructive mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : <>Send Message <Send className="ml-2" size={18} /></>}
            </Button>
          </motion.form>
        </div>
      </section>
    </>
  );
};

export default Contact;
