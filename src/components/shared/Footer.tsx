import { Link } from "react-router";
import { Car, Facebook, Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full mt-24 bg-gradient-to-b from-white/70 to-white/90 backdrop-blur-md">
      <div className="container mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-primary"
            >
              <Car className="h-6 w-6" />
              Ride<span className="text-accent">X</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Experience smooth and secure rides with RideX — built for
              convenience, powered by innovation.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-primary mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-primary transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-primary mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/help" className="hover:text-primary transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-primary mb-3">
              Get in Touch
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
              <Mail className="h-4 w-4" />
              <a href="mailto:support@ridex.com">support@ridex.com</a>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <Link
                to="#"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                to="#"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                to="#"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                to="#"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
              >
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-10 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} RideX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
