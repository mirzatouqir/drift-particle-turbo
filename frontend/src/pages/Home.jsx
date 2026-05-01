import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

import Header from '../components/Header.jsx';
import HeroBanner from '../components/HeroBanner.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import TestimonialsSection from '../components/TestimonialsSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Footer from '../components/Footer.jsx';
import AppointmentFormModal from '../components/AppointmentFormModal.jsx';

const GallerySection = lazy(() => import('../components/GallerySection.jsx'));

const SectionDivider = () => (
  <div className="w-full max-w-screen-xl mx-auto px-6 md:px-10">
    <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
  </div>
);

const AppointmentCTASection = ({ onOpenModal }) => {
  return (
    <section
      id="appointment-cta"
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 -z-10" />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-cta" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-cta)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-screen-xl mx-auto flex flex-col items-center text-center gap-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/25"
        >
          <Icons.Sparkles className="w-4 h-4 text-sky-300" />
          <span className="text-sm font-medium text-sky-200 tracking-wide font-inter">New Patients Welcome</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.18 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-3xl font-inter"
        >
          Ready for a{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-200">
            Healthier Smile?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.28 }}
          className="text-blue-100/80 text-lg md:text-xl max-w-xl leading-relaxed font-inter"
        >
          Book your consultation today and experience compassionate, precision dental care tailored to you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.38 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onOpenModal}
            aria-label="Book an appointment now"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-2xl bg-white text-blue-700 text-base font-bold font-inter shadow-xl shadow-blue-900/30 hover:bg-blue-50 hover:shadow-2xl hover:shadow-blue-900/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <Icons.CalendarCheck className="w-5 h-5" />
            Book Appointment Now
          </button>
          <a
            href="tel:+15552345678"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/30 text-white text-base font-semibold font-inter hover:bg-white/20 hover:border-white/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <Icons.Phone className="w-5 h-5 text-sky-300" />
            +1 (555) 234-5678
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-2"
        >
          {[
            { icon: 'ShieldCheck', text: 'Insurance Accepted' },
            { icon: 'Clock', text: 'Flexible Scheduling' },
            { icon: 'Heart', text: 'Gentle & Caring' },
          ].map((item) => {
            const ItemIcon = Icons?.[item.icon] || Icons.HelpCircle;
            return (
              <div key={item.text} className="flex items-center gap-2">
                <ItemIcon className="w-4 h-4 text-sky-300" />
                <span className="text-blue-100/80 text-sm font-medium font-inter">{item.text}</span>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-blue-300/50 hover:shadow-xl hover:shadow-blue-400/60 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <Icons.ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#contact') {
        openModal();
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter antialiased">
      <Header />

      <main>
        <div id="home">
          <HeroBanner />
        </div>

        <div className="py-16" />
        <SectionDivider />

        <div className="py-4" />
        <AboutSection />

        <div className="py-4" />
        <SectionDivider />
        <div className="py-4" />

        <ServicesSection />

        <SectionDivider />

        <TestimonialsSection />

        <SectionDivider />

        <Suspense
          fallback={
            <div className="w-full py-32 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
                <span className="text-slate-400 text-sm font-inter">Loading gallery…</span>
              </div>
            </div>
          }
        >
          <GallerySection />
        </Suspense>

        <SectionDivider />

        <AppointmentCTASection onOpenModal={openModal} />

        <ContactSection />
      </main>

      <Footer />

      <AppointmentFormModal isOpen={modalOpen} onClose={closeModal} />

      <ScrollToTopButton />
    </div>
  );
}

export default Home;
