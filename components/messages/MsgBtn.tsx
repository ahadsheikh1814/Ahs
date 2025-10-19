"use client"
import { cn } from "@/lib/utils";
import { MessageSquareShare, X, Send, User, Mail, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          "bg-accent text-accent-foreground fixed right-12 bottom-12 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full shadow-2xl z-50 overflow-hidden"
        )}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        animate={showForm ? { rotate: 90 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary to-accent-foreground opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
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
        "fixed right-12 bottom-32 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
      )}
    >
      {/* Header with gradient */}
      <motion.div
        className="relative bg-accent p-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        
        <motion.h2
          className="text-2xl font-bold text-primary relative z-10"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Send a Message
        </motion.h2>
        <motion.p
          className="text-accent-foreground text-sm mt-1 relative z-10"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {"I'll get back to you soon!"}
        </motion.p>
      </motion.div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Name Field */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <motion.div
            className="relative"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <motion.div
            className="relative"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message
          </label>
          <motion.div
            className="relative"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your message..."
              rows={4}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${
                errors.message 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:border-transparent resize-none`}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
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
              className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg text-sm"
            >
              ✅ Message sent successfully! I&apos;ll get back to you soon.
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg text-sm"
            >
              ❌ Failed to send message. Please try again.
            </motion.div>
          )}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded-lg text-sm"
            >
              ⚠️ {errors.general}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-medium py-3 rounded-lg shadow-lg relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed transition-all ${
            submitStatus === 'success' 
              ? 'bg-green-500 text-white' 
              : submitStatus === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-accent text-accent-foreground'
          }`}
          whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)" }}
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