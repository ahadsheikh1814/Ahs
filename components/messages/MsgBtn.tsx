"use client"
import { cn } from "@/lib/utils";
import { MessageSquareShare, X, Send, User, Mail, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const MsgBtn = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  
  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div
        onClick={() => setShowForm(!showForm)}
        className={cn(
          "fixed right-5 bottom-6 md:right-10 md:bottom-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-slate-950/90 text-slate-50 shadow-xl shadow-black/40 backdrop-blur z-50"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        animate={showForm ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <motion.div
          animate={showForm ? { rotate: -90, scale: 0 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <MessageSquareShare className="relative z-10" />
        </motion.div>
        <motion.div
          className="absolute"
          initial={{ rotate: 90, scale: 0 }}
          animate={showForm ? { rotate: 0, scale: 1 } : { rotate: 90, scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          <X className="relative z-10" />
        </motion.div>
      </motion.div>

      {/* Form */}
      <AnimatePresence>
        {showForm && <Form />}
      </AnimatePresence>
    </>
  );
};

export default MsgBtn;

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
  
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (res.ok && data.success) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
        // Auto-hide success message after 3 seconds
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        // Handle different error types
        if (res.status === 429) {
          setErrors({ general: "Too many requests. Please try again later." });
        } else if (res.status === 400 && data.details) {
          // Handle validation errors from server
          const serverErrors: {[key: string]: string} = {};
          data.details.forEach((error: { path: string[]; message: string }) => {
            serverErrors[error.path[0]] = error.message;
          });
          setErrors(serverErrors);
        } else {
          setSubmitStatus('error');
          setTimeout(() => setSubmitStatus('idle'), 5000);
        }
      }
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "fixed inset-x-4 top-20 md:inset-auto md:right-10 md:bottom-28 md:top-auto w-auto md:w-96 rounded-sm border border-slate-200/70 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg shadow-2xl shadow-black/40 overflow-hidden z-50"
      )}
    >
      {/* Header */}
      <motion.div
        className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-slate-200/70 dark:border-slate-800 bg-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        
        <motion.h2
          className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50 relative z-10"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Send a Message
        </motion.h2>
        <motion.p
          className="mt-1 text-xs text-slate-500 dark:text-slate-400 relative z-10"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {"I'll get back to you soon!"}
        </motion.p>
      </motion.div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="px-6 pb-5 pt-4 space-y-4">
        {/* Name Field */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-2 tracking-wide uppercase">
            Name
          </label>
          <motion.div
            className="relative"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className={`w-full pl-10 pr-4 py-2.5 rounded-sm border transition-all ${
                errors.name 
                  ? 'border-rose-500/80 focus:ring-rose-500' 
                  : 'border-slate-200/80 dark:border-slate-800 focus:ring-sky-500'
              } bg-white/90 dark:bg-slate-900/90 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-rose-500"
              >
                {errors.name}
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-2 tracking-wide uppercase">
            Email
          </label>
          <motion.div
            className="relative"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className={`w-full pl-10 pr-4 py-2.5 rounded-sm border transition-all ${
                errors.email 
                  ? 'border-rose-500/80 focus:ring-rose-500' 
                  : 'border-slate-200/80 dark:border-slate-800 focus:ring-sky-500'
              } bg-white/90 dark:bg-slate-900/90 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-rose-500"
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        {/* Message Field */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-2 tracking-wide uppercase">
            Message
          </label>
          <motion.div
            className="relative"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your message..."
              rows={4}
              className={`w-full pl-10 pr-4 py-2.5 rounded-sm border transition-all ${
                errors.message 
                  ? 'border-rose-500/80 focus:ring-rose-500' 
                  : 'border-slate-200/80 dark:border-slate-800 focus:ring-sky-500'
              } bg-white/90 dark:bg-slate-900/90 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent resize-none`}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-rose-500"
              >
                {errors.message}
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        {/* Status Messages */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-sm border border-emerald-200/80 dark:border-emerald-700/80 bg-emerald-50 dark:bg-emerald-900/40 px-4 py-2.5 text-xs text-emerald-800 dark:text-emerald-200"
            >
              ✅ Message sent successfully! I&apos;ll get back to you soon.
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-sm border border-rose-200/80 dark:border-rose-700/80 bg-rose-50 dark:bg-rose-900/40 px-4 py-2.5 text-xs text-rose-800 dark:text-rose-200"
            >
              ❌ Failed to send message. Please try again.
            </motion.div>
          )}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-sm border border-amber-200/80 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-900/40 px-4 py-2.5 text-xs text-amber-800 dark:text-amber-200"
            >
              ⚠️ {errors.general}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-sm py-2.5 text-sm font-medium shadow-lg relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed transition-all ${
            submitStatus === 'success' 
              ? 'bg-emerald-500 text-white' 
              : submitStatus === 'error'
              ? 'bg-rose-500 text-white'
              : 'bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <motion.div
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Sending...
              </>
            ) : submitStatus === 'success' ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ✅
                </motion.div>
                Message Sent!
              </>
            ) : submitStatus === 'error' ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ❌
                </motion.div>
                Try Again
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </span>
        </motion.button>
      </form>
    </motion.div>
  );
};