import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faker } from "@faker-js/faker";
import * as Icons from "lucide-react";

const generateCases = () => [
  {
    id: faker.string.uuid(),
    treatment: "Teeth Whitening",
    description: "Professional-grade bleaching for a radiant, confident smile.",
    beforeAlt: "Before teeth whitening treatment",
    afterAlt: "After teeth whitening treatment",
    beforeSrc: "https://images.pexels.com/photos/16212691/pexels-photo-16212691.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    afterSrc: "https://images.pexels.com/photos/16212691/pexels-photo-16212691.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: faker.string.uuid(),
    treatment: "Porcelain Veneers",
    description: "Ultra-thin ceramic shells that transform smile shape and color.",
    beforeAlt: "Before porcelain veneers dental procedure",
    afterAlt: "After porcelain veneers perfect smile",
    beforeSrc: "https://images.pexels.com/photos/6627571/pexels-photo-6627571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    afterSrc: "https://images.pexels.com/photos/16212691/pexels-photo-16212691.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: faker.string.uuid(),
    treatment: "Invisalign Alignment",
    description: "Clear aligner therapy for straighter teeth without metal brackets.",
    beforeAlt: "Before Invisalign crooked teeth",
    afterAlt: "After Invisalign straight aligned teeth",
    beforeSrc: "https://images.pexels.com/photos/16212691/pexels-photo-16212691.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    afterSrc: "https://images.pexels.com/photos/35000849/pexels-photo-35000849.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: faker.string.uuid(),
    treatment: "Dental Implants",
    description: "Permanent titanium implants that restore full function and aesthetics.",
    beforeAlt: "Before dental implant missing tooth gap",
    afterAlt: "After dental implant restored natural tooth",
    beforeSrc: "https://images.pexels.com/photos/6502306/pexels-photo-6502306.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    afterSrc: "https://images.pexels.com/photos/6502340/pexels-photo-6502340.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: faker.string.uuid(),
    treatment: "Composite Bonding",
    description: "Tooth-colored resin sculpted to repair chips, cracks, and gaps.",
    beforeAlt: "Before composite bonding chipped teeth",
    afterAlt: "After composite bonding repaired teeth",
    beforeSrc: "https://images.pexels.com/photos/15073697/pexels-photo-15073697.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    afterSrc: "https://images.pexels.com/photos/15073697/pexels-photo-15073697.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: faker.string.uuid(),
    treatment: "Full Smile Makeover",
    description: "Comprehensive smile redesign combining multiple cosmetic treatments.",
    beforeAlt: "Before full smile makeover dental transformation",
    afterAlt: "After full smile makeover stunning results",
    beforeSrc: "https://images.pexels.com/photos/16212691/pexels-photo-16212691.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    afterSrc: "https://images.pexels.com/photos/16212691/pexels-photo-16212691.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

const cases = generateCases();

const FallbackImage = ({ label }) => (
  <div className="w-full h-full min-h-44 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100 rounded-xl">
    <Icons.ImageOff className="w-8 h-8 text-blue-200 mb-2" />
    <span className="text-xs text-blue-300 font-medium tracking-wide">{label}</span>
  </div>
);

const BeforeAfterCard = ({ item, index }) => {
  const [beforeError, setBeforeError] = useState(false);
  const [afterError, setAfterError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl border border-blue-100 shadow-lg overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:border-blue-200 max-w-xl mx-auto w-full"
    >
      <div className="grid grid-cols-2 gap-0">
        <div className="relative overflow-hidden">
          {beforeError ? (
            <FallbackImage label="Before" />
          ) : (
            <img
              src={item.beforeSrc}
              alt={item.beforeAlt}
              onError={(e) => { e.currentTarget.style.display = "none"; setBeforeError(true); }}
              className="w-full h-44 md:h-52 object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent pt-6 pb-2 px-3">
            <span className="text-white text-xs font-semibold tracking-widest uppercase opacity-90">Before</span>
          </div>
        </div>
        <div className="relative overflow-hidden border-l border-blue-50">
          {afterError ? (
            <FallbackImage label="After" />
          ) : (
            <img
              src={item.afterSrc}
              alt={item.afterAlt}
              onError={(e) => { e.currentTarget.style.display = "none"; setAfterError(true); }}
              className="w-full h-44 md:h-52 object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/50 to-transparent pt-6 pb-2 px-3">
            <span className="text-white text-xs font-semibold tracking-widest uppercase opacity-90">After</span>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-3 right-3 bg-blue-600 rounded-full p-1.5 shadow-lg"
          >
            <Icons.Sparkles className="w-3 h-3 text-white" />
          </motion.div>
        </div>
      </div>
      <div className="px-6 py-5 bg-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-800 text-base tracking-tight mb-1">{item.treatment}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
          </div>
          <motion.div
            animate={hovered ? { rotate: 20, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-shrink-0 mt-0.5"
          >
            <Icons.CheckCircle2 className="w-5 h-5 text-blue-500" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const GallerySection = () => {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const node = headerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 }
    );
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, []);

  return (
    <section
      id="gallery"
      className="relative py-20 md:py-28 bg-gradient-to-b from-white via-blue-50/40 to-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-sky-100/50 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-60" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-5">
            <Icons.Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase">Real Patient Results</span>
          </div>
          <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-slate-800 tracking-tight mb-4">
            Before & After Gallery
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every smile tells a story. Explore the transformative results our patients
            have achieved through personalized, precision dental care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {cases.map((item, index) => (
            <BeforeAfterCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="text-center mt-14"
        >
          <p className="text-slate-400 text-sm tracking-wide">
            Results may vary. Photos are from real patients with consent.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
