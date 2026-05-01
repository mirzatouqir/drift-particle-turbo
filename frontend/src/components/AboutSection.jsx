import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const qualifications = [
  { id: 1, text: 'Doctor of Dental Surgery (DDS), Harvard School of Dental Medicine' },
  { id: 2, text: 'Board Certified, American Board of General Dentistry' },
  { id: 3, text: 'Fellowship, Academy of General Dentistry (FAGD)' },
  { id: 4, text: '15+ Years of Clinical Excellence & Patient Care' },
  { id: 5, text: 'Certified in Advanced Cosmetic & Implant Dentistry' },
  { id: 6, text: 'Member, American Dental Association (ADA)' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

function AboutSection() {
  const CheckIcon = Icons?.CheckCircle2 || Icons?.HelpCircle;

  return (
    <section
      id="about"
      className="relative w-full py-16 px-4 md:px-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50 via-white to-indigo-50"
      />
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl -z-10"
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-indigo-100/50 blur-3xl -z-10"
      />

      <motion.div
        className="max-w-screen-xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        <motion.p
          variants={itemVariants}
          className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-2 font-inter"
        >
          Meet Your Doctor
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 font-inter leading-tight"
        >
          About Dr. Elena Voss
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="relative bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl shadow-lg shadow-blue-100/40 p-8 md:p-10"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/70 to-sky-50/40 -z-10" />

          <div className="flex flex-col md:flex-row gap-10 items-start">
            <motion.div
              variants={itemVariants}
              className="flex-shrink-0 flex flex-col items-center gap-4"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-400/20 blur-lg scale-110"
                />
                <img
                  src="https://placehold.co/180x180/e2e8f0/64748b?text=Dr.+Voss"
                  alt="Dr. Elena Voss"
                  width={180}
                  height={180}
                  className="relative w-44 h-44 rounded-full object-cover shadow-xl border-4 border-white ring-2 ring-blue-100"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/180x180/e2e8f0/64748b?text=Dr.+Voss';
                  }}
                />
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-slate-800 font-inter">Dr. Elena Voss</p>
                <p className="text-xs font-medium text-blue-600 tracking-wide uppercase font-inter">DDS, FAGD</p>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="flex-1 flex flex-col gap-6"
            >
              <motion.p
                variants={itemVariants}
                className="text-slate-600 font-inter text-base leading-[1.75] max-w-lg"
              >
                Dr. Elena Voss brings over 15 years of dedicated clinical experience to every patient interaction. 
                Trained at Harvard and committed to continuous education, she blends technical precision with genuine 
                warmth to create a dental experience that is comfortable, transparent, and transformative. 
                Her philosophy is simple: every smile deserves expert, personalized care.
              </motion.p>

              <motion.div variants={itemVariants}>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 font-inter">
                  Credentials & Qualifications
                </p>
                <ul className="flex flex-col gap-3">
                  {qualifications.map((qual, idx) => (
                    <motion.li
                      key={qual.id}
                      variants={itemVariants}
                      custom={idx}
                      className="flex items-start gap-3 group"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                        <CheckIcon
                          size={11}
                          className="text-blue-600 group-hover:text-white transition-colors duration-300"
                          strokeWidth={2.5}
                        />
                      </span>
                      <span className="text-sm text-slate-600 font-inter leading-snug">
                        {qual.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3 pt-2"
              >
                {[
                  { icon: 'Award', label: '15+ Years' },
                  { icon: 'Users', label: '4,800+ Patients' },
                  { icon: 'Star', label: '4.9 Rating' },
                ].map((stat) => {
                  const StatIcon = Icons?.[stat.icon] || Icons?.HelpCircle;
                  return (
                    <div
                      key={stat.label}
                      className="flex items-center gap-2 bg-white/80 border border-blue-100 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300"
                    >
                      <StatIcon size={15} className="text-blue-500" strokeWidth={2} />
                      <span className="text-xs font-semibold text-slate-700 font-inter">{stat.label}</span>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AboutSection;
