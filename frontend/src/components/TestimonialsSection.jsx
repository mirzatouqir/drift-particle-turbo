import { faker } from "@faker-js/faker";
import * as Icons from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const generateTestimonials = () => {
  const dentalQuotes = [
    "I was terrified of dentists for years. The gentle approach and calming environment here completely changed my experience. My smile has never looked better.",
    "Absolutely exceptional care from start to finish. The doctor explained every step of my treatment with patience and precision. I felt completely at ease.",
    "My whitening results are stunning. Friends keep asking what I did differently. The professionalism here is unmatched — I won't go anywhere else.",
    "After years of hiding my smile, I finally feel confident. The implant procedure was seamless and the aftercare support was outstanding.",
    "I brought my whole family here. Every appointment has been thorough, comfortable, and on time. The staff genuinely cares about your wellbeing.",
    "The attention to detail during my invisalign treatment was remarkable. Regular check-ins, clear communication, truly world-class dental care.",
  ];

  const firstNames = ["Sophia", "Marcus", "Elena", "James", "Priya", "Daniel"];

  return firstNames.map((name, i) => ({
    id: faker.string.uuid(),
    quote: dentalQuotes[i],
    firstName: name,
    rating: 5,
    avatar: `https://placehold.co/80x80/dbeafe/1d4ed8?text=${name[0]}`,
    treatment: ["Teeth Whitening", "Dental Implants", "Invisalign", "Root Canal", "Family Dentistry", "Veneers"][i],
  }));
};

const testimonials = generateTestimonials();

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
      ease: "easeOut",
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Icons.Star
          key={i}
          className="w-4 h-4 fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      variants={cardVariants}
      className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
    >
      <div
        className="h-full rounded-2xl p-8 flex flex-col gap-6
          bg-white/60 backdrop-blur-md
          border border-blue-100/80
          shadow-lg shadow-blue-100/40
          transition-all duration-300 ease-out
          hover:shadow-xl hover:shadow-blue-200/50
          hover:bg-white/80
          hover:-translate-y-1
          group"
      >
        <div className="flex items-start justify-between">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center
              bg-gradient-to-br from-blue-500 to-sky-400
              shadow-md shadow-blue-200/60"
          >
            <Icons.Quote className="w-5 h-5 text-white" />
          </div>
          <StarRating count={testimonial.rating} />
        </div>

        <p className="text-slate-600 text-sm leading-relaxed italic flex-1">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="pt-2 border-t border-blue-100/70">
          <span
            className="inline-block text-xs font-medium tracking-wide
              text-blue-500 bg-blue-50 px-3 py-1 rounded-full mb-4"
          >
            {testimonial.treatment}
          </span>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={testimonial.avatar}
                alt={testimonial.firstName}
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/80x80/dbeafe/1d4ed8?text=${testimonial.firstName[0]}`;
                }}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-200/70 shadow-sm"
              />
              <div
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full
                  bg-emerald-400 border-2 border-white shadow-sm"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 tracking-tight">
                {testimonial.firstName}
              </p>
              <p className="text-xs text-slate-400 font-medium">Verified Patient</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.offsetWidth / 3;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.offsetWidth / 3;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  return (
    <section
      id="testimonials"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10
          bg-gradient-to-br from-sky-50 via-blue-50/60 to-indigo-50/40"
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full -z-10
          bg-blue-100/50 blur-3xl translate-x-1/2 -translate-y-1/2"
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full -z-10
          bg-sky-100/60 blur-3xl -translate-x-1/3 translate-y-1/3"
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headingVariants}
          className="mb-12"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-0.5 rounded-full
                    bg-gradient-to-r from-blue-500 to-sky-400"
                />
                <span className="text-sm font-semibold tracking-widest text-blue-500 uppercase">
                  Patient Stories
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight leading-tight"
              >
                Trusted by Hundreds
                <br />
                <span
                  className="bg-gradient-to-r from-blue-600 to-sky-500
                    bg-clip-text text-transparent"
                >
                  of Happy Patients
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll testimonials left"
                className="w-11 h-11 rounded-full flex items-center justify-center
                  bg-white/80 backdrop-blur-sm
                  border border-blue-100
                  shadow-sm shadow-blue-100/50
                  text-slate-600
                  hover:bg-blue-500 hover:text-white hover:border-blue-500
                  hover:shadow-md hover:shadow-blue-200/50
                  transition-all duration-200"
              >
                <Icons.ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll testimonials right"
                className="w-11 h-11 rounded-full flex items-center justify-center
                  bg-white/80 backdrop-blur-sm
                  border border-blue-100
                  shadow-sm shadow-blue-100/50
                  text-slate-600
                  hover:bg-blue-500 hover:text-white hover:border-blue-500
                  hover:shadow-md hover:shadow-blue-200/50
                  transition-all duration-200"
              >
                <Icons.ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-6">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full
                bg-white/70 backdrop-blur-sm border border-blue-100
                shadow-sm shadow-blue-50"
            >
              <Icons.Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-slate-700">4.9</span>
              <span className="text-sm text-slate-400">/ 5.0 average rating</span>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full
                bg-white/70 backdrop-blur-sm border border-blue-100
                shadow-sm shadow-blue-50"
            >
              <Icons.Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-slate-700">500+</span>
              <span className="text-sm text-slate-400">verified reviews</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory
            pb-4 -mx-2 px-2
            scrollbar-hide
            scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </motion.div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!scrollRef.current) return;
                const cardWidth = scrollRef.current.offsetWidth / 3;
                scrollRef.current.scrollTo({
                  left: i * cardWidth,
                  behavior: "smooth",
                });
                setActiveIndex(i);
              }}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-6 h-2 bg-blue-500"
                  : "w-2 h-2 bg-blue-200 hover:bg-blue-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
