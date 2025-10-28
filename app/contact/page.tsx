"use client";
import H1 from "@/components/elements/H1";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion } from 'motion/react'

const page = () => {
  return (
    <div className="min-h-screen">
      <H1>Contact Me</H1>
      <div className="relative mb-6 text-sm leading-7 text-neutral-600 md:w-[70%] dark:text-neutral-400">
        {"I'm "}open to freelancing offers. Reach out to me to inquire more
        about my work.
      </div>
      <div>
        <Form/>
      </div>
    </div>
  );
};

export default page;

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
          setTimeout(() => setSubmitStatus('idle'), 3000);
        } else {
          if (res.status === 429) {
            setErrors({ general: "Too many requests. Please try again later." });
          } else if (res.status === 400 && data.details) {
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
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl mx-auto"
      >
        <div>
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={cn(
                  "w-full px-3 py-2 rounded-md border bg-transparent",
                  "text-neutral-900 dark:text-neutral-100",
                  "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                  "focus:outline-none focus:ring-2 focus:ring-neutral-500/20 focus:border-neutral-500",
                  errors.name ? "border-red-500" : "border-neutral-300 dark:border-neutral-700"
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className={cn(
                  "w-full px-3 py-2 rounded-md border bg-transparent",
                  "text-neutral-900 dark:text-neutral-100",
                  "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                  "focus:outline-none focus:ring-2 focus:ring-neutral-500/20 focus:border-neutral-500",
                  errors.email ? "border-red-500" : "border-neutral-300 dark:border-neutral-700"
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project..."
                rows={5}
                className={cn(
                  "w-full px-3 py-2 rounded-md border bg-transparent resize-none",
                  "text-neutral-900 dark:text-neutral-100",
                  "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
                  "focus:outline-none focus:ring-2 focus:ring-neutral-500/20 focus:border-neutral-500",
                  errors.message ? "border-red-500" : "border-neutral-300 dark:border-neutral-700"
                )}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="text-sm text-green-600 dark:text-green-400">
                Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="text-sm text-red-600 dark:text-red-400">
                Failed to send message. Please try again.
              </div>
            )}
            {errors.general && (
              <div className="text-sm text-yellow-700 dark:text-yellow-400">
                {errors.general}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full py-2.5 rounded-md text-sm font-medium",
                "bg-neutral-900/90 text-white hover:bg-neutral-800/90",
                "dark:bg-neutral-100/90 dark:text-neutral-900 dark:hover:bg-white/90",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                "cursor-pointer",
                "transition-colors"
              )}
            >
              {isSubmitting ? 'Sending…' : submitStatus === 'success' ? 'Message sent' : submitStatus === 'error' ? 'Try again' : 'Send message'}
            </button>
          </form>
        </div>
      </motion.div>
    );
  };