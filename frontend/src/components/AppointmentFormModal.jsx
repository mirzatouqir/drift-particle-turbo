import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  date: '',
  notes: '',
};

const INITIAL_ERRORS = {
  name: '',
  email: '',
  phone: '',
  date: '',
};

function validate(form) {
  const errors = { name: '', email: '', phone: '', date: '' };
  let valid = true;

  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = 'Full name must be at least 2 characters.';
    valid = false;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim() || !emailRe.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
    valid = false;
  }

  const phoneRe = /^[\d\s()\-+]{7,15}$/;
  if (!form.phone.trim() || !phoneRe.test(form.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
    valid = false;
  }

  if (!form.date) {
    errors.date = 'Please select a preferred appointment date.';
    valid = false;
  } else {
    const selected = new Date(form.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      errors.date = 'Please select a future date.';
      valid = false;
    }
  }

  return { errors, valid };
}

function AppointmentFormModal({ isOpen, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const resetAll = useCallback(() => {
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setTouched({});
    setSubmitting(false);
    setSubmitted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      resetAll();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, resetAll]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const { errors: newErrors } = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.currentTarget;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const { errors: newErrors } = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true, date: true };
    setTouched(allTouched);
    const { errors: newErrors, valid } = validate(form);
    setErrors(newErrors);
    if (!valid) return;
    setSubmitting(true);
    await new Promise((res) => setTimeout(res, 1600));
    setSubmitting(false);
    setSubmitted(true);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 24, scale: 0.97 },
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const fieldClass = (fieldName) =>
    `w-full rounded-xl px-4 py-3 bg-slate-50 border text-slate-800 placeholder-slate-400 text-sm font-inter outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 ${
      touched[fieldName] && errors[fieldName]
        ? 'border-red-400 bg-red-50/60'
        : 'border-slate-200 hover:border-slate-300'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-modal="true"
          role="dialog"
          aria-label="Book an Appointment"
        >
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="panel"
            className="relative z-10 w-full max-w-lg"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-blue-900/10 overflow-hidden">
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 px-8 pt-8 pb-6">
                <div className="absolute inset-0 opacity-20" style={undefined}>
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/30 -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/20 translate-y-1/2 -translate-x-1/2" />
                </div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icons.CalendarDays className="text-blue-100" size={18} strokeWidth={2} />
                      <span className="text-blue-100 text-xs font-inter font-medium uppercase tracking-widest">
                        Schedule a Visit
                      </span>
                    </div>
                    <h2 className="text-white text-2xl font-inter font-semibold tracking-tight leading-snug">
                      Book Your Appointment
                    </h2>
                    <p className="text-blue-100/80 text-sm font-inter mt-1">
                      We&apos;ll confirm within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white/70 hover:text-white hover:bg-white/20 rounded-xl p-2 transition-all duration-200 flex-shrink-0 ml-4"
                    aria-label="Close modal"
                  >
                    <Icons.X size={20} strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="px-8 py-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="flex flex-col items-center text-center py-6 gap-5"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-300/40">
                        <Icons.CheckCircle2 className="text-white" size={32} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-slate-800 text-xl font-inter font-semibold mb-1">
                          Appointment Requested!
                        </h3>
                        <p className="text-slate-500 text-sm font-inter leading-relaxed max-w-xs mx-auto">
                          Thank you, <span className="font-medium text-slate-700">{form.name.split(' ')[0]}</span>. Our team will reach out to{' '}
                          <span className="font-medium text-slate-700">{form.email}</span> to confirm your visit.
                        </p>
                      </div>
                      <button
                        onClick={onClose}
                        className="mt-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-inter font-medium px-8 py-3 hover:shadow-lg hover:shadow-blue-400/30 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      noValidate
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-inter font-medium text-slate-600 tracking-wide">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <Icons.User
                              size={15}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                              strokeWidth={2}
                            />
                            <input
                              type="text"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Dr. Jane Smith"
                              autoComplete="name"
                              className={`${fieldClass('name')} pl-9`}
                            />
                          </div>
                          {touched.name && errors.name && (
                            <p className="text-red-500 text-xs font-inter flex items-center gap-1">
                              <Icons.AlertCircle size={11} strokeWidth={2} />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-inter font-medium text-slate-600 tracking-wide">
                            Email <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <Icons.Mail
                              size={15}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                              strokeWidth={2}
                            />
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="you@email.com"
                              autoComplete="email"
                              className={`${fieldClass('email')} pl-9`}
                            />
                          </div>
                          {touched.email && errors.email && (
                            <p className="text-red-500 text-xs font-inter flex items-center gap-1">
                              <Icons.AlertCircle size={11} strokeWidth={2} />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-inter font-medium text-slate-600 tracking-wide">
                            Phone <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <Icons.Phone
                              size={15}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                              strokeWidth={2}
                            />
                            <input
                              type="tel"
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="+1 (555) 000-0000"
                              autoComplete="tel"
                              className={`${fieldClass('phone')} pl-9`}
                            />
                          </div>
                          {touched.phone && errors.phone && (
                            <p className="text-red-500 text-xs font-inter flex items-center gap-1">
                              <Icons.AlertCircle size={11} strokeWidth={2} />
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-inter font-medium text-slate-600 tracking-wide">
                            Preferred Date <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <Icons.CalendarDays
                              size={15}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                              strokeWidth={2}
                            />
                            <input
                              type="date"
                              name="date"
                              value={form.date}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              min={todayStr}
                              className={`${fieldClass('date')} pl-9`}
                            />
                          </div>
                          {touched.date && errors.date && (
                            <p className="text-red-500 text-xs font-inter flex items-center gap-1">
                              <Icons.AlertCircle size={11} strokeWidth={2} />
                              {errors.date}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-inter font-medium text-slate-600 tracking-wide">
                          Notes <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                          name="notes"
                          value={form.notes}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Describe your concern or reason for visit…"
                          className="w-full rounded-xl px-4 py-3 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 placeholder-slate-400 text-sm font-inter outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1 text-xs text-slate-400 font-inter">
                        <Icons.Lock size={11} strokeWidth={2} />
                        <span>Your information is private and secure.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-inter font-semibold text-sm py-4 px-8 hover:shadow-xl hover:shadow-blue-400/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <Icons.Loader2 size={16} strokeWidth={2} className="animate-spin" />
                            Sending Request…
                          </>
                        ) : (
                          <>
                            <Icons.CalendarCheck size={16} strokeWidth={2} />
                            Confirm Appointment
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AppointmentFormModal;