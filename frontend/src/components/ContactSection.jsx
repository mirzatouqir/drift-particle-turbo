import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const contactInfo = [
  {
    icon: 'Phone',
    label: 'Phone',
    value: '+1 (555) 234-5678',
    href: 'tel:+15552345678',
  },
  {
    icon: 'Mail',
    label: 'Email',
    value: 'hello@drsmilecare.com',
    href: 'mailto:hello@drsmilecare.com',
  },
  {
    icon: 'MapPin',
    label: 'Address',
    value: '142 Serenity Blvd, Suite 3, San Francisco, CA 94105',
    href: 'https://maps.google.com',
  },
];

const openHours = [
  { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 3:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 -z-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-200/25 rounded-full blur-3xl -z-10" />

      <div className="max-w-screen-xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
              Contact Our Clinic
            </h2>
            <p className="mt-2 text-slate-500 text-sm leading-relaxed">
              We&apos;re here to answer your questions and help you smile with confidence.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-[24px] shadow-xl shadow-blue-100/40 p-8 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => {
                const IconComponent = Icons[item.icon] || Icons.HelpCircle;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.icon === 'MapPin' ? '_blank' : undefined}
                    rel={item.icon === 'MapPin' ? 'noopener noreferrer' : undefined}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-4 group cursor-pointer"
                    aria-label={`${item.label}: ${item.value}`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-[14px] bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-200/50 group-hover:shadow-blue-300/60 transition-shadow duration-300">
                      <IconComponent size={18} className="text-white" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">
                        {item.label}
                      </span>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors duration-200 leading-snug mt-0.5">
                        {item.value}
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <div className="border-t border-slate-200/70 pt-5">
              <div className="flex items-center gap-2 mb-3">
                <Icons.Clock size={14} className="text-blue-500" strokeWidth={2} />
                <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">
                  Opening Hours
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {openHours.map((row) => (
                  <div key={row.day} className="flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-500">{row.day}</span>
                    <span
                      className={`text-xs font-semibold ${
                        row.hours === 'Closed'
                          ? 'text-rose-400'
                          : 'text-slate-700'
                      }`}
                    >
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200/70 pt-5">
              <div className="flex items-center gap-2 mb-3">
                <Icons.Navigation size={14} className="text-blue-500" strokeWidth={2} />
                <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">
                  Find Us
                </span>
              </div>
              <div className="relative w-full h-36 rounded-2xl overflow-hidden border-2 border-slate-200/80 ring-1 ring-slate-100 bg-slate-100 group cursor-pointer">
                <img
                  src="img{{dental clinic san francisco map street view urban}"
                  alt="Clinic location map"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-300/50">
                    <Icons.MapPin size={16} className="text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    142 Serenity Blvd, SF
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-200/40 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
