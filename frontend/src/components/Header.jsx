import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const MenuIcon = Icons?.Menu || Icons.HelpCircle;
  const XIcon = Icons?.X || Icons.HelpCircle;

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-blue-100/40 border-b border-white/60'
          : 'bg-white/60 backdrop-blur-md border-b border-white/30',
      ].join(' ')}
    >
      <div className="max-w-screen-xl mx-auto px-8 py-4 flex items-center justify-between">

        <motion.a
          href="/"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-3 select-none"
          onClick={() => setActiveLink('Home')}
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 shadow-md shadow-blue-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M12 2C9.5 2 7 4 7 7c0 1.5.4 3.2.9 4.8C8.6 14.2 9.5 17 10 19c.3 1.2.6 2.5 1 3 .2.3.5.5.8.5h.4c.3 0 .6-.2.8-.5.4-.5.7-1.8 1-3 .5-2 1.4-4.8 2.1-7.2.5-1.6.9-3.3.9-4.8 0-3-2.5-5-5-5z"
                fill="white"
                fillOpacity="0.95"
              />
            </svg>
          </span>
          <span className="text-[1.15rem] font-semibold tracking-tight text-slate-800 font-inter">
            Dr.<span className="text-blue-600"> Dental</span> Care
          </span>
        </motion.a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 * i, ease: 'easeOut' }}
              onClick={() => setActiveLink(link.label)}
              className={[
                'relative px-4 py-2 rounded-full text-sm font-medium font-inter transition-all duration-200 group',
                activeLink === link.label
                  ? 'text-blue-600 bg-blue-50/80'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/60',
              ].join(' ')}
              aria-current={activeLink === link.label ? 'page' : undefined}
            >
              {link.label}
              <span
                className={[
                  'absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-blue-500 transition-all duration-300',
                  activeLink === link.label ? 'w-4 opacity-100' : 'w-0 opacity-0 group-hover:w-4 group-hover:opacity-60',
                ].join(' ')}
              />
            </motion.a>
          ))}

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45, ease: 'easeOut' }}
            className="ml-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-semibold font-inter shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Book Appointment
          </motion.a>
        </nav>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/90 backdrop-blur-xl border-t border-blue-50"
          >
            <nav className="flex flex-col px-6 py-4 gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => { setActiveLink(link.label); setMobileOpen(false); }}
                  className={[
                    'px-4 py-3 rounded-2xl text-sm font-medium font-inter transition-all duration-150',
                    activeLink === link.label
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/70',
                  ].join(' ')}
                  aria-current={activeLink === link.label ? 'page' : undefined}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-semibold font-inter text-center shadow-md shadow-blue-200 hover:opacity-90 transition-opacity duration-150"
              >
                Book Appointment
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
