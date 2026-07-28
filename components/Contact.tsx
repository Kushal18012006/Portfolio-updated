"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Download, Send, CheckCircle2, AlertCircle } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import confetti from "canvas-confetti";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/kushal.tripathi2006@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Message] ${formData.subject}`,
          message: formData.message,
          _template: "table",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      
      // Trigger canvas-confetti on successful submit!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#4F46E5", "#7C3AED", "#06B6D4"],
      });

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Clear success notification after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-slate-950/20">
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        {/* Title */}
        <div className="text-center mb-16 space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-sora tracking-tight text-white"
          >
            Contact Me
          </motion.h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-accent-purple to-accent-cyan mx-auto mt-4" />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl md:text-2xl font-bold font-sora text-slate-200">
              Let's build something beautiful together.
            </h3>
            <p className="text-sm text-slate-400 font-sans leading-relaxed">
              If you are looking for a dedicated software engineer, or simply want to connect, feel free to drop a message!
            </p>

            {/* Info Cards */}
            <div className="space-y-3 pt-2">
              <div className="glassmorphism p-4 rounded-2xl flex items-center gap-4 border border-white/5">
                <div className="p-3 rounded-xl bg-slate-900 text-accent-cyan border border-white/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Email Me</div>
                  <a href="mailto:kushal.tripathi2006@gmail.com" className="text-xs font-bold text-white hover:text-accent-cyan font-mono transition-colors">
                    kushal.tripathi2006@gmail.com
                  </a>
                </div>
              </div>

              <div className="glassmorphism p-4 rounded-2xl flex items-center gap-4 border border-white/5">
                <div className="p-3 rounded-xl bg-slate-900 text-accent-cyan border border-white/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Location</div>
                  <div className="text-xs font-bold text-white font-mono">
                    Mathura, Uttar Pradesh, India
                  </div>
                </div>
              </div>

              <div className="glassmorphism p-4 rounded-2xl flex items-center gap-4 border border-white/5">
                <div className="p-3 rounded-xl bg-slate-900 text-accent-cyan border border-white/10">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Qualifications</div>
                  <a
                    href="/assets/resume.pdf"
                    download="Kushal_Tripathi_Resume.pdf"
                    className="text-xs font-bold text-white hover:text-accent-cyan font-mono transition-colors flex items-center gap-1.5"
                  >
                    Download Resume PDF
                  </a>
                </div>
              </div>
            </div>

            {/* Socials row */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/Kushal18012006"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl glassmorphism text-slate-400 hover:text-white flex items-center justify-center gap-2 text-xs font-mono tracking-wider transition-colors"
              >
                <GithubIcon className="w-4 h-4" /> GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/kushal-tripathi-56838232b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl glassmorphism text-slate-400 hover:text-white flex items-center justify-center gap-2 text-xs font-mono tracking-wider transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" /> LINKEDIN
              </a>
            </div>
          </div>

          {/* Right Panel: Interactive Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glassmorphism p-8 rounded-3xl border border-white/5 space-y-5 relative overflow-hidden">
              <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
              
              {/* Header */}
              <h3 className="text-lg font-bold font-sora text-white pb-3 border-b border-white/5">
                Send Message
              </h3>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-slate-600 focus:outline-none focus:border-accent-cyan transition-colors"
                />
                {errors.name && <span className="text-[10px] text-rose-500 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</span>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-slate-600 focus:outline-none focus:border-accent-cyan transition-colors"
                />
                {errors.email && <span className="text-[10px] text-rose-500 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</span>}
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Collaboration Request"
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-slate-600 focus:outline-none focus:border-accent-cyan transition-colors"
                />
                {errors.subject && <span className="text-[10px] text-rose-500 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.subject}</span>}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Kushal, I would like to discuss..."
                  rows={4}
                  className="w-full bg-slate-950/70 border border-white/10 rounded-xl px-4 py-3 text-xs font-sans text-white placeholder-slate-600 focus:outline-none focus:border-accent-cyan transition-colors resize-none"
                />
                {errors.message && <span className="text-[10px] text-rose-500 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</span>}
              </div>

              {/* Button & Feedback */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-cyan text-white text-xs font-mono tracking-widest font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                >
                  {status === "sending" ? (
                    <>SENDING...</>
                  ) : (
                    <>
                      SEND MESSAGE <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                {/* Form Submit Feedback Animations */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="text-xs font-mono text-emerald-400 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> MESSAGE SENT SUCCESSFULLY!
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="text-xs font-mono text-rose-500 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" /> ERROR SENDING MESSAGE.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
