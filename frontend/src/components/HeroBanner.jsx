import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

function HeroBanner() {
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-100 flex items-center justify-center py-24 px-6">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-200/40 to-sky-300/20 blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-100/50 to-blue-100/30 blur-2xl -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="absolute top-8 right-8 md:top-16 md:right-16 opacity-10 pointer-events-none select-none">
        <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="170" cy="170" rx="160" ry="160" stroke="#2563eb" strokeWidth="2" />
          <ellipse cx="170" cy="170" rx="120" ry="120" stroke="#0ea5e9" strokeWidth="1.5" />
          <path d="M120 200 C120 160 140 130 170 125 C200 130 220 160 220 200 C220 230 210 255 200 265 C195 270 185 272 180 268 C175 265 175 255 170 255 C165 255 165 265 160 268 C155 272 145 270 140 265 C130 255 120 230 120 200Z" stroke="#2563eb" strokeWidth="2" fill="none" />
          <path d="M150 180 C150 165 158 155 170 153 C182 155 190 165 190 180" stroke="#0ea5e9" strokeWidth="1.5" fill="none" />
          <circle cx="155" cy="158" r="4" fill="#2563eb" />
          <circle cx="185" cy="158" r="4" fill="#2563eb" />
          <path d="M60 170 Q170 80 280 170" stroke="#6366f1" strokeWidth="1" fill="none" strokeDasharray="6 4" />
          <path d="M60 200 Q170 110 280 200" stroke="#6366f1" strokeWidth="1" fill="none" strokeDasharray="6 4" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto flex flex-col items-center text-center gap-8">

        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-blue-100 shadow-sm"
        >
          <Icons.ShieldCheck className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-600 tracking-wide">Board-Certified Dental Professional</span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight tracking-tight max-w-4xl"
        >
          Dr. Eleanor
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
            Whitmore, DDS
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-2xl md:text-3xl font-medium text-slate-600"
        >
          Cosmetic & Restorative Dentistry
        </motion.p>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg md:text-xl text-slate-500 font-semibold tracking-[0.04em] max-w-2xl leading-relaxed"
        >
          Crafting confident smiles with precision, care, and a gentle touch — because your health and comfort come first.
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white text-base font-semibold shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-[1.03] transition-all duration-300"
          >
            <Icons.CalendarDays className="w-5 h-5" />
            Book an Appointment
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/70 backdrop-blur-md border border-blue-100 text-slate-700 text-base font-semibold shadow-sm hover:bg-white hover:scale-[1.03] transition-all duration-300"
          >
            <Icons.Stethoscope className="w-5 h-5 text-blue-500" />
            Explore Services
          </a>
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
        >
          {[
            { icon: 'Award', label: '15+ Years Experience', sub: 'Board-certified specialist' },
            { icon: 'Users', label: '3,200+ Happy Patients', sub: 'Trusted by families' },
            { icon: 'Star', label: '4.9 / 5 Rating', sub: 'Google & Healthgrades' },
          ].map((stat, i) => {
            const Icon = Icons?.[stat.icon] || Icons.HelpCircle;
            return (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-md hover:shadow-lg hover:bg-white/80 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-100 to-sky-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-800 leading-tight">{stat.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.sub}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}

export default HeroBanner;
