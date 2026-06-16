"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Check, Sparkles } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

const FEATURES = [
  "Stream thousands of movies & TV shows",
  "Watch on any device, anywhere",
  "Download for offline viewing",
  "Cancel anytime — no commitments",
];

const PLANS = [
  { name: "Basic", price: "$6.99", quality: "1080p", screens: 1, downloads: 1 },
  { name: "Standard", price: "$13.99", quality: "1080p", screens: 2, downloads: 2, popular: false },
  { name: "Premium", price: "$19.99", quality: "4K Ultra HD", screens: 4, downloads: 6, popular: true },
];

type Mode = "signin" | "signup";

export default function LoginSignUpPage() {
  const shouldReduceMotion = useReducedMotion();
  const [mode, setMode] = useState<Mode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Premium");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const newErrors = { name: "", email: "", password: "", confirm: "" };
    let valid = true;

    if (mode === "signup" && !form.name.trim()) {
      newErrors.name = "Full name is required.";
      valid = false;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "A valid email address is required.";
      valid = false;
    }
    if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      valid = false;
    }
    if (mode === "signup" && form.password !== form.confirm) {
      newErrors.confirm = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setSubmitted(false);
    setErrors({ name: "", email: "", password: "", confirm: "" });
  };

  const passwordStrength = (() => {
    const p = form.password;
    if (p.length === 0) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength] ?? "";
  const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"][passwordStrength] ?? "bg-gray-600";

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      {/* Hero Background */}
      <div className="relative min-h-screen flex flex-col">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ytimg.com/vi/_-mueaVu-9Y/hqdefault.jpg"
            alt="StreamVault background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#141414]/80 to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-stretch max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 gap-12 lg:gap-20">
          {/* Left — Branding & Features */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={staggerContainer}
            className="flex-1 flex flex-col justify-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                <Sparkles size={12} />
                Start streaming today
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                Unlimited
                <span className="block text-[#E50914]">Entertainment</span>
                Awaits You
              </h1>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-[#B3B3B3] text-lg leading-relaxed mb-8 max-w-md">
              {APP_TAGLINE} Join millions of viewers streaming the world's best content on {APP_NAME}.
            </motion.p>

            <motion.ul variants={staggerContainer} className="space-y-3 mb-10">
              {FEATURES.map((feat) => (
                <motion.li
                  key={feat}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-[#E5E5E5] text-sm"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center">
                    <Check size={11} className="text-[#E50914]" />
                  </span>
                  {feat}
                </motion.li>
              ))}
            </motion.ul>

            {/* Plan Selector (sign-up only) */}
            <AnimatePresence>
              {mode === "signup" && (
                <motion.div
                  key="plans"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-xs font-semibold text-[#B3B3B3] uppercase tracking-widest mb-3">
                    Choose your plan
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {PLANS.map((plan) => (
                      <motion.button
                        key={plan.name}
                        type="button"
                        onClick={() => setSelectedPlan(plan.name)}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                        className={`relative flex-1 rounded-xl border p-4 text-left transition-all duration-200 ${
                          selectedPlan === plan.name
                            ? "border-[#E50914] bg-[#E50914]/10 shadow-lg shadow-[#E50914]/10"
                            : "border-white/10 bg-white/5 hover:border-white/25"
                        }`}
                      >
                        {plan.popular && (
                          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#E50914] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">
                            Most Popular
                          </span>
                        )}
                        <p className="font-bold text-white text-sm">{plan.name}</p>
                        <p className="text-[#E50914] font-black text-lg">{plan.price}<span className="text-[#B3B3B3] text-xs font-normal">/mo</span></p>
                        <p className="text-[#B3B3B3] text-xs mt-1">{plan.quality} · {plan.screens} screen{plan.screens > 1 ? "s" : ""}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right — Auth Form */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={scaleIn}
            className="w-full lg:w-[440px] flex-shrink-0 flex flex-col justify-center"
          >
            <div className="bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-8">
              {/* Mode Toggle */}
              <div className="flex bg-[#0f0f0f] rounded-xl p-1 mb-8">
                {(["signin", "signup"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => switchMode(m)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      mode === m
                        ? "bg-[#E50914] text-white shadow-md shadow-[#E50914]/30"
                        : "text-[#B3B3B3] hover:text-white"
                    }`}
                  >
                    {m === "signin" ? "Sign In" : "Sign Up"}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-4">
                      <Check size={28} className="text-green-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      {mode === "signin" ? "Welcome back!" : "Account created!"}
                    </h2>
                    <p className="text-[#B3B3B3] text-sm mb-6">
                      {mode === "signin"
                        ? "You're now signed in to StreamVault. Enjoy watching!"
                        : `Your ${selectedPlan} plan is ready. Start exploring thousands of titles.`}
                    </p>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 bg-[#E50914] hover:bg-[#c40812] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
                    >
                      Go to Home <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.form
                    key={mode}
                    initial={{ opacity: 0, x: mode === "signin" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: mode === "signin" ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <div>
                      <h2 className="text-2xl font-black text-white mb-1">
                        {mode === "signin" ? "Welcome back" : "Create your account"}
                      </h2>
                      <p className="text-[#B3B3B3] text-sm">
                        {mode === "signin"
                          ? "Sign in to continue watching."
                          : "Join StreamVault and start streaming instantly."}
                      </p>
                    </div>

                    {/* Name (sign-up only) */}
                    <AnimatePresence>
                      {mode === "signup" && (
                        <motion.div
                          key="name-field"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <label className="block text-xs font-semibold text-[#B3B3B3] mb-1.5 uppercase tracking-wide">
                            Full Name
                          </label>
                          <div className="relative">
                            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666]" />
                            <input
                              type="text"
                              value={form.name}
                              onChange={(e) => updateField("name", e.target.value)}
                              placeholder="Jane Doe"
                              className={`w-full bg-[#0f0f0f] border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:ring-2 transition-all duration-200 ${
                                errors.name
                                  ? "border-red-500 focus:ring-red-500/30"
                                  : "border-white/10 focus:border-[#E50914]/60 focus:ring-[#E50914]/20"
                              }`}
                            />
                          </div>
                          {errors.name && (
                            <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-[#B3B3B3] mb-1.5 uppercase tracking-wide">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666]" />
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="you@example.com"
                          className={`w-full bg-[#0f0f0f] border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.email
                              ? "border-red-500 focus:ring-red-500/30"
                              : "border-white/10 focus:border-[#E50914]/60 focus:ring-[#E50914]/20"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-xs font-semibold text-[#B3B3B3] mb-1.5 uppercase tracking-wide">
                        Password
                      </label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666]" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={form.password}
                          onChange={(e) => updateField("password", e.target.value)}
                          placeholder="Min. 8 characters"
                          className={`w-full bg-[#0f0f0f] border rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.password
                              ? "border-red-500 focus:ring-red-500/30"
                              : "border-white/10 focus:border-[#E50914]/60 focus:ring-[#E50914]/20"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                      )}
                      {/* Strength bar (sign-up only) */}
                      {mode === "signup" && form.password.length > 0 && (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4].map((i) => (
                              <div
                                key={i}
                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                  i <= passwordStrength ? strengthColor : "bg-white/10"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-[#B3B3B3]">
                            Strength: <span className="text-white font-medium">{strengthLabel}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password (sign-up only) */}
                    <AnimatePresence>
                      {mode === "signup" && (
                        <motion.div
                          key="confirm-field"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <label className="block text-xs font-semibold text-[#B3B3B3] mb-1.5 uppercase tracking-wide">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#666]" />
                            <input
                              type={showConfirm ? "text" : "password"}
                              value={form.confirm}
                              onChange={(e) => updateField("confirm", e.target.value)}
                              placeholder="Re-enter your password"
                              className={`w-full bg-[#0f0f0f] border rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:ring-2 transition-all duration-200 ${
                                errors.confirm
                                  ? "border-red-500 focus:ring-red-500/30"
                                  : "border-white/10 focus:border-[#E50914]/60 focus:ring-[#E50914]/20"
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirm((v) => !v)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors"
                              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                            >
                              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          {errors.confirm && (
                            <p className="text-red-400 text-xs mt-1">{errors.confirm}</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Forgot password (sign-in only) */}
                    {mode === "signin" && (
                      <div className="flex justify-end -mt-2">
                        <Link
                          href="/help"
                          className="text-xs text-[#B3B3B3] hover:text-white transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={shouldReduceMotion ? {} : { scale: loading ? 1 : 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: loading ? 1 : 0.98 }}
                      className="w-full bg-[#E50914] hover:bg-[#c40812] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg shadow-[#E50914]/25"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          {mode === "signin" ? "Signing in…" : "Creating account…"}
                        </>
                      ) : (
                        <>
                          {mode === "signin" ? "Sign In" : "Create Account"}
                          <ArrowRight size={16} />
                        </>
                      )}
                    </motion.button>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-[#555] text-xs">or continue with</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Social sign-in buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Google", icon: "G" },
                        { label: "Apple", icon: "" },
                      ].map(({ label, icon }) => (
                        <motion.button
                          key={label}
                          type="button"
                          whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                          className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-200"
                        >
                          <span className="font-bold text-base leading-none">{icon}</span>
                          {label}
                        </motion.button>
                      ))}
                    </div>

                    {/* Switch mode */}
                    <p className="text-center text-sm text-[#B3B3B3]">
                      {mode === "signin" ? (
                        <>
                          New to {APP_NAME}?{" "}
                          <button
                            type="button"
                            onClick={() => switchMode("signup")}
                            className="text-white font-semibold hover:text-[#E50914] transition-colors"
                          >
                            Sign up now
                          </button>
                        </>
                      ) : (
                        <>
                          Already have an account?{" "}
                          <button
                            type="button"
                            onClick={() => switchMode("signin")}
                            className="text-white font-semibold hover:text-[#E50914] transition-colors"
                          >
                            Sign in
                          </button>
                        </>
                      )}
                    </p>

                    {mode === "signup" && (
                      <p className="text-center text-xs text-[#555] leading-relaxed">
                        By creating an account, you agree to our{" "}
                        <Link href="/terms" className="text-[#B3B3B3] hover:text-white underline underline-offset-2">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-[#B3B3B3] hover:text-white underline underline-offset-2">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Trust badges */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex items-center justify-center gap-6 mt-6 text-[#555] text-xs"
            >
              {["No ads", "Cancel anytime", "4K streaming"].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <Check size={11} className="text-[#E50914]" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}