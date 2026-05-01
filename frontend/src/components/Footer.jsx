import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBookAppointment = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (href) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-blue-800">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex-shrink-0"
          >
            <span className="text-white text-2xl font-bold tracking-tight font-inter select-none">
              Dental<span className="text-sky-300">Venture</span>
            </span>
            <p className="text-blue-200 text-xs mt-1 tracking-wide">Your smile is our priority.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="flex-shrink-0"
          >
            <button
              onClick={handleBookAppointment}
              aria-label="Book an appointment"
              className="bg-white text-blue-800 font-semibold text-sm px-7 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-50 active:scale-95 transition-all duration-200 tracking-wide font-inter"
            >
              Book Appointment
            </button>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            aria-label="Footer navigation"
            className="flex items-center gap-6 md:gap-8"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                aria-label={`Navigate to ${link.label}`}
                className="text-blue-100 text-sm font-medium font-inter relative group hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer p-0"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out" />
              </button>
            ))}
          </motion.nav>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="mt-6 pt-5 border-t border-blue-700 flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <p className="text-blue-300 text-xs font-inter tracking-wide">
            &copy; {currentYear} DentalVenture. All rights reserved.
          </p>
          <p className="text-blue-400 text-xs font-inter tracking-wide">
            Excellence in dental care &mdash; trusted by thousands.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}