"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION } from "@/lib/data";
import { Star, Users, Globe, Award, Play, Shield, Zap, Heart, ChevronRight, Check } from 'lucide-react';
import Link from "next/link";

const stats = [
  { label: "Active Subscribers", value: "230M+", icon: Users, color: "#E50914" },
  { label: "Countries & Territories", value: "190+", icon: Globe, color: "#0080FF" },
  { label: "Titles Available", value: "15,000+", icon: Play, color: "#FFD700" },
  { label: "Awards Won", value: "2,800+", icon: Award, color: "#00C853" },
];

const values = [
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your viewing data is yours. We use it only to improve your recommendations — never sold to third parties.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Streaming",
    description:
      "Adaptive bitrate technology ensures you get the best quality your connection can handle, with zero buffering.",
  },
  {
    icon: Heart,
    title: "Content for Everyone",
    description:
      "From kids' animation to prestige drama, we curate content that resonates across every age group and culture.",
  },
  {
    icon: Star,
    title: "Award-Winning Originals",
    description:
      "Our in-house studios produce critically acclaimed originals that have won Emmys, Oscars, and Golden Globes.",
  },
];

const timeline = [
  {
    year: "2007",
    title: "Streaming Begins",
    description:
      "StreamVault launches its first streaming service, offering 1,000 titles to subscribers in North America.",
  },
  {
    year: "2010",
    title: "Mobile Expansion",
    description:
      "We bring StreamVault to iOS and Android, letting subscribers watch on the go for the first time.",
  },
  {
    year: "2013",
    title: "Original Content",
    description:
      "Our first original series premieres to critical acclaim, marking our entry into content production.",
  },
  {
    year: "2016",
    title: "Global Rollout",
    description:
      "StreamVault expands to 130 countries simultaneously, becoming a truly global streaming platform.",
  },
  {
    year: "2019",
    title: "4K & HDR",
    description:
      "We introduce 4K Ultra HD and Dolby Vision HDR streaming, setting a new standard for home entertainment.",
  },
  {
    year: "2024",
    title: "AI-Powered Discovery",
    description:
      "Our new AI recommendation engine learns your taste in real time, surfacing hidden gems you'll love.",
  },
];

const team = [
  {
    name: "Elena Vasquez",
    role: "Chief Executive Officer",
    bio: "Former head of digital media at a Fortune 500 company, Elena has led StreamVault's global expansion since 2015.",
    image: "https://swearer.brown.edu/sites/default/files/styles/portrait_classic_xsml/public/2025-09/Elena%20Headshot_4%20copy.jpeg?h=5ec5ce13&itok=_YCwmIuL",
    color: "#E50914",
  },
  {
    name: "Marcus Chen",
    role: "Chief Content Officer",
    bio: "Award-winning producer with credits on over 40 films and series, Marcus oversees all original programming.",
    image: "https://podcastle.org/wp-content/uploads/2024/09/photo_2024-06-24_16-15-54-660x989.jpg",
    color: "#0080FF",
  },
  {
    name: "Priya Nair",
    role: "Chief Technology Officer",
    bio: "Priya architected our adaptive streaming engine and leads a team of 2,000+ engineers worldwide.",
    image: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    color: "#FFD700",
  },
  {
    name: "James Okafor",
    role: "Chief Creative Officer",
    bio: "James champions diverse storytelling and has greenlit projects from creators across 60+ countries.",
    image: "https://achiya.org/wp-content/uploads/writers/james-okafor-4d4bc7.webp",
    color: "#00C853",
  },
];

const plans = [
  { name: "Standard", price: "$9.99", features: ["Full HD streaming", "2 screens at once", "Unlimited downloads", "Ad-free experience"] },
  { name: "Premium", price: "$15.99", features: ["4K Ultra HD + HDR", "4 screens at once", "Unlimited downloads", "Dolby Atmos audio"], highlight: true },
  { name: "Family", price: "$19.99", features: ["4K Ultra HD + HDR", "6 screens at once", "6 user profiles", "Kids safety controls"] },
];

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#141414] text-white overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0000] via-[#141414] to-[#0a0a14]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(229,9,20,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,128,255,0.10),transparent_60%)]" />

        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full border border-[#E50914]/10 opacity-40" />
        <div className="absolute top-32 right-32 w-48 h-48 rounded-full border border-[#E50914]/15 opacity-30" />
        <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full border border-white/5 opacity-30" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914] text-sm font-semibold tracking-widest uppercase mb-6">
                Our Story
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6"
            >
              Entertainment{" "}
              <span className="text-[#E50914]">Reimagined</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-[#B3B3B3] max-w-2xl mx-auto leading-relaxed mb-10"
            >
              {APP_DESCRIPTION} We started with a simple idea: great stories deserve a great stage. Today, {APP_NAME} is the world's leading entertainment platform.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse/movies">
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#E50914] hover:bg-[#c40812] text-white font-bold rounded-lg transition-colors duration-200 text-base"
                >
                  <Play size={18} fill="white" />
                  Start Watching
                </motion.button>
              </Link>
              <Link href="/browse/new-popular">
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-lg transition-colors duration-200 text-base"
                >
                  New & Popular
                  <ChevronRight size={18} />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/8 hover:border-white/15 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${stat.color}20`, border: `1px solid ${stat.color}40` }}
                  >
                    <Icon size={22} style={{ color: stat.color }} />
                  </div>
                  <span className="text-3xl sm:text-4xl font-black text-white mb-1">{stat.value}</span>
                  <span className="text-sm text-[#B3B3B3] font-medium">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInLeft}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914] text-xs font-semibold tracking-widest uppercase mb-5">
                Our Mission
              </span>
              <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-6">
                Stories That Move the World
              </h2>
              <p className="text-[#B3B3B3] text-lg leading-relaxed mb-6">
                At {APP_NAME}, we believe that storytelling is the most powerful force for empathy and understanding. Our mission is to connect creators with audiences across every border, language, and culture.
              </p>
              <p className="text-[#B3B3B3] leading-relaxed mb-8">
                We invest billions each year in original content from filmmakers, writers, and showrunners around the globe — because the best stories come from everywhere. Whether it's a Korean thriller, a Brazilian telenovela, or an indie documentary from Iceland, we bring it to your screen.
              </p>
              <div className="flex flex-col gap-3">
                {["Invest $17B+ annually in original content", "Partner with creators in 50+ countries", "Subtitle content in 30+ languages", "Support emerging filmmakers worldwide"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-[#E50914]" />
                    </div>
                    <span className="text-[#B3B3B3] text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInRight}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#1a0000] to-[#0a0a14] border border-white/10">
                <img
                  src="https://i.ytimg.com/vi/_-mueaVu-9Y/maxresdefault.jpg"
                  alt="StreamVault production studio"
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <p className="text-white font-semibold text-sm">"We don't just license content — we build worlds."</p>
                    <p className="text-[#B3B3B3] text-xs mt-1">— Elena Vasquez, CEO</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-[#E50914] rounded-2xl px-5 py-3 shadow-2xl shadow-[#E50914]/30">
                <p className="text-white font-black text-2xl leading-none">17+</p>
                <p className="text-white/80 text-xs font-medium">Years of Innovation</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#0080FF]/15 border border-[#0080FF]/30 text-[#0080FF] text-xs font-semibold tracking-widest uppercase mb-5">
              What We Stand For
            </span>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Our Core Values</h2>
            <p className="text-[#B3B3B3] text-lg max-w-xl mx-auto">
              Everything we build, every decision we make, is guided by these principles.
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/8 hover:border-[#E50914]/30 hover:bg-white/8 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E50914]/15 border border-[#E50914]/30 flex items-center justify-center mb-5 group-hover:bg-[#E50914]/25 transition-colors duration-300">
                    <Icon size={22} className="text-[#E50914]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{value.title}</h3>
                  <p className="text-[#B3B3B3] text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30 text-[#FFD700] text-xs font-semibold tracking-widest uppercase mb-5">
              Our Journey
            </span>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">From Startup to Global Stage</h2>
            <p className="text-[#B3B3B3] text-lg max-w-xl mx-auto">
              Seventeen years of relentless innovation, one milestone at a time.
            </p>
          </motion.div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E50914]/60 via-[#E50914]/20 to-transparent hidden lg:block" />

            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="space-y-8 lg:space-y-0"
            >
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={item.year}
                    variants={isLeft ? slideInLeft : slideInRight}
                    className={`relative lg:flex lg:items-center lg:gap-8 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} mb-8`}
                  >
                    {/* Card */}
                    <div className="lg:w-[calc(50%-2rem)] flex-shrink-0">
                      <motion.div
                        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                        className={`p-6 rounded-2xl bg-white/5 border border-white/8 hover:border-[#E50914]/30 transition-all duration-300 ${isLeft ? "lg:text-right" : "lg:text-left"}`}
                      >
                        <span className="inline-block px-3 py-1 rounded-full bg-[#E50914] text-white text-xs font-black mb-3">
                          {item.year}
                        </span>
                        <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                        <p className="text-[#B3B3B3] text-sm leading-relaxed">{item.description}</p>
                      </motion.div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex w-4 h-4 rounded-full bg-[#E50914] border-4 border-[#141414] flex-shrink-0 z-10 shadow-lg shadow-[#E50914]/40" />

                    {/* Spacer */}
                    <div className="hidden lg:block lg:w-[calc(50%-2rem)] flex-shrink-0" />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#00C853]/15 border border-[#00C853]/30 text-[#00C853] text-xs font-semibold tracking-widest uppercase mb-5">
              Leadership
            </span>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Meet the Team</h2>
            <p className="text-[#B3B3B3] text-lg max-w-xl mx-auto">
              Visionaries, storytellers, and engineers united by a passion for great entertainment.
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -8 }}
                className="group rounded-2xl overflow-hidden bg-white/5 border border-white/8 hover:border-white/20 transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#1a0000] to-[#0a0a14]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div
                    className="absolute top-4 right-4 w-3 h-3 rounded-full"
                    style={{ backgroundColor: member.color, boxShadow: `0 0 12px ${member.color}` }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg leading-tight">{member.name}</h3>
                  <p className="text-[#E50914] text-xs font-semibold uppercase tracking-wide mt-1 mb-3">{member.role}</p>
                  <p className="text-[#B3B3B3] text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Plans Snapshot ───────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914] text-xs font-semibold tracking-widest uppercase mb-5">
              Pricing
            </span>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">Simple, Transparent Plans</h2>
            <p className="text-[#B3B3B3] text-lg max-w-xl mx-auto">
              No hidden fees. No contracts. Cancel anytime. Pick the plan that fits your life.
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
                className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                  plan.highlight
                    ? "bg-[#E50914]/10 border-[#E50914]/50 shadow-2xl shadow-[#E50914]/10"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#E50914] text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-white font-black text-xl mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-[#B3B3B3] text-sm">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center flex-shrink-0">
                        <Check size={9} className="text-[#E50914]" />
                      </div>
                      <span className="text-[#B3B3B3] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/login">
                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-colors duration-200 ${
                      plan.highlight
                        ? "bg-[#E50914] hover:bg-[#c40812] text-white"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                    }`}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#1a0000] via-[#0a0a0a] to-[#0a0a14] border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Ready to Watch?
            </h2>
            <p className="text-[#B3B3B3] text-xl mb-10 max-w-lg mx-auto">
              {APP_TAGLINE} Join 230 million subscribers and start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="flex items-center gap-2 px-10 py-4 bg-[#E50914] hover:bg-[#c40812] text-white font-black rounded-xl transition-colors duration-200 text-lg shadow-2xl shadow-[#E50914]/30"
                >
                  <Play size={20} fill="white" />
                  Start Free Trial
                </motion.button>
              </Link>
              <Link href="/browse/movies">
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="flex items-center gap-2 px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-colors duration-200 text-lg"
                >
                  Browse Content
                  <ChevronRight size={20} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}