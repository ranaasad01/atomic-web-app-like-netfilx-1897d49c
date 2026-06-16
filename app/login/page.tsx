"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, Sparkles } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const FEATURES = [
  "Stream thousands of movies & TV shows",
  "Watch on any device, anywhere",
  "Download for offline viewing",
  "Cancel anytime — no commitments",
];

const PLAN_BADGES = [
  { label: "4K Ultra HD", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { label: "Dolby Atmos", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { label: "HDR10+", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
];

export default function LoginPage() {
  const shouldReduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col lg:flex-row">
      {/* ── Left Panel — Branding ── */}
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={fadeIn}
        className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/streaming-hero-cinematic-collage.jpg')" }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 py-16 max-w-2xl">
          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
          >
            {/* Logo */}
            <motion.div variants={fadeInUp} className="mb-12">
              <Link href="/">
                <span className="text-[#E50914] font-black text-4xl xl:text-5xl tracking-tight select-none">
                  {APP_NAME}
                </span>
              </Link>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4"
            >
              Your world of
              <span className="block text-[#E50914]">entertainment</span>
              awaits.
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[#B3B3B3] text-lg leading-relaxed mb-10">
              {APP_TAGLINE} Sign in to continue watching where you left off.
            </motion.p>

            {/* Feature list */}
            <motion.ul variants={staggerContainer} className="space-y-3 mb-10">
              {FEATURES.map((feature) => (
                <motion.li
                  key={feature}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-white/80 text-sm"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center">
                    <Check size={11} className="text-[#E50914]" />
                  </span>
                  {feature}
                </motion.li>
              ))}
            </motion.ul>

            {/* Plan badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
              {PLAN_BADGES.map((badge) => (
                <span
                  key={badge.label}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}
                >
                  {badge.label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right Panel — Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-16 lg:py-12">
        {/* Mobile logo */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={fadeInUp}
          className="lg:hidden mb-10 text-center"
        >
          <Link href="/">
            <span className="text-[#E50914] font-black text-3xl tracking-tight">
              {APP_NAME}
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={scaleIn}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl shadow-2xl shadow-black/60 p-8 sm:p-10">
            {success ? (
              /* ── Success State ── */
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-5">
                  <Check size={28} className="text-green-400" />
                </div>
                <h2 className="text-white text-2xl font-bold mb-2">Welcome back!</h2>
                <p className="text-[#B3B3B3] text-sm mb-6">
                  You&apos;re signed in. Redirecting to your dashboard…
                </p>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="h-full bg-[#E50914] rounded-full"
                  />
                </div>
              </motion.div>
            ) : (
              /* ── Login Form ── */
              <motion.div
                variants={staggerContainer}
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
              >
                <motion.div variants={fadeInUp} className="mb-8">
                  <h1 className="text-white text-2xl sm:text-3xl font-bold mb-1">Sign In</h1>
                  <p className="text-[#B3B3B3] text-sm">
                    New to {APP_NAME}?{" "}
                    <Link
                      href="/signup"
                      className="text-white font-medium hover:text-[#E50914] transition-colors duration-200 underline underline-offset-2"
                    >
                      Create an account
                    </Link>
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} noValidate>
                  <motion.div variants={staggerContainer} className="space-y-4">
                    {/* Email */}
                    <motion.div variants={fadeInUp}>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#B3B3B3] mb-1.5"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666]">
                          <Mail size={16} />
                        </span>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#E50914]/60 focus:ring-2 focus:ring-[#E50914]/20 transition-all duration-200"
                        />
                      </div>
                    </motion.div>

                    {/* Password */}
                    <motion.div variants={fadeInUp}>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-[#B3B3B3]"
                        >
                          Password
                        </label>
                        <Link
                          href="/forgot-password"
                          className="text-xs text-[#B3B3B3] hover:text-white transition-colors duration-200"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666]">
                          <Lock size={16} />
                        </span>
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl pl-10 pr-12 py-3 text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#E50914]/60 focus:ring-2 focus:ring-[#E50914]/20 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#666] hover:text-[#B3B3B3] transition-colors duration-200"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </motion.div>

                    {/* Remember me */}
                    <motion.div variants={fadeInUp} className="flex items-center gap-3">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={rememberMe}
                        onClick={() => setRememberMe((v) => !v)}
                        className={`w-5 h-5 rounded flex-shrink-0 border flex items-center justify-center transition-all duration-200 ${
                          rememberMe
                            ? "bg-[#E50914] border-[#E50914]"
                            : "bg-transparent border-white/20 hover:border-white/40"
                        }`}
                      >
                        {rememberMe && <Check size={11} className="text-white" />}
                      </button>
                      <span className="text-sm text-[#B3B3B3]">Remember me for 30 days</span>
                    </motion.div>

                    {/* Error */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Submit */}
                    <motion.div variants={fadeInUp} className="pt-1">
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                        className="w-full bg-[#E50914] hover:bg-[#c4070f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg shadow-[#E50914]/20"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              />
                            </svg>
                            Signing in…
                          </>
                        ) : (
                          <>
                            Sign In
                            <ArrowRight size={16} />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </form>

                {/* Divider */}
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center gap-3 my-6"
                >
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[#555] text-xs font-medium">OR CONTINUE WITH</span>
                  <div className="flex-1 h-px bg-white/10" />
                </motion.div>

                {/* Social sign-in */}
                <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Google",
                      icon: (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      ),
                    },
                    {
                      label: "Apple",
                      icon: (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                      ),
                    },
                  ].map((provider) => (
                    <motion.button
                      key={provider.label}
                      type="button"
                      variants={fadeInUp}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                      className="flex items-center justify-center gap-2 bg-[#2a2a2a] hover:bg-[#333] border border-white/10 hover:border-white/20 rounded-xl py-3 text-white text-sm font-medium transition-all duration-200"
                    >
                      {provider.icon}
                      {provider.label}
                    </motion.button>
                  ))}
                </motion.div>

                {/* Footer note */}
                <motion.p
                  variants={fadeInUp}
                  className="text-center text-[#555] text-xs mt-6 leading-relaxed"
                >
                  By signing in, you agree to our{" "}
                  <Link href="/terms" className="text-[#B3B3B3] hover:text-white transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#B3B3B3] hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  .
                </motion.p>
              </motion.div>
            )}
          </div>

          {/* Sparkle note */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mt-6 text-[#555] text-xs"
          >
            <Sparkles size={12} className="text-[#E50914]/60" />
            <span>Secure, encrypted sign-in powered by {APP_NAME}</span>
            <Sparkles size={12} className="text-[#E50914]/60" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}