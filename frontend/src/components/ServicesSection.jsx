import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const services = [
  {
    icon: 'Smile',
    name: 'Teeth Whitening',
    description: 'Professional-grade whitening for a brighter, confident smile in one visit.',
  },
  {
    icon: 'Shield',
    name: 'Preventive Care',
    description: 'Comprehensive cleanings and exams to keep your teeth healthy long-term.',
  },
  {
    icon: 'Star',
    name: 'Dental Veneers',
    description: 'Ultra-thin porcelain shells crafted to perfect your smile aesthetics.',
  },
  {
    icon: 'Activity',
    name: 'Root Canal Therapy',
    description: 'Gentle, effective treatment to relieve pain and save your natural tooth.',
  },
  {
    icon: 'Package',
    name: 'Dental Implants',
    description: 'Permanent, natural-looking replacements for missing teeth with lasting results.',
  },
  {
    icon: 'Settings',
    name: 'Orthodontics',
    description: 'Discreet aligners and braces tailored to straighten your smile comfortably.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-blue-600 mb-3 font-inter">
            Our Specialties
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight font-inter leading-tight">
            Comprehensive Dental Care
          </h2>
          <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto font-inter leading-relaxed">
            From routine cleanings to advanced cosmetic procedures, every treatment is delivered with precision, comfort, and care.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const IconComponent = Icons[service.icon] || Icons.HelpCircle;
            return (
              <motion.div
                key={service.name}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 40px 0 rgba(37,99,235,0.13)',
                }}
                className="group relative bg-white/60 backdrop-blur-md border border-blue-200/60 rounded-2xl p-8 shadow-lg hover:border-blue-400/80 transition-colors duration-300 cursor-default"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md mb-6">
                  <IconComponent className="text-white" size={26} strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 font-inter mb-2 tracking-tight">
                  {service.name}
                </h3>
                <p className="text-sm text-slate-500 font-inter leading-relaxed">
                  {service.description}
                </p>
                <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;
