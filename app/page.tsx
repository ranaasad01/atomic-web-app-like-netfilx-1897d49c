"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Play, Info, Star, Check, ChevronRight, ChevronLeft, Tv, Download, Users, Shield, Zap, ArrowRight } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION } from "@/lib/data";

// ─── Inline Mock Data ────────────────────────────────────────────────────────

const FEATURED_HERO = {
  id: 1,
  title: "Echoes of the Abyss",
  description:
    "A gripping sci-fi thriller where a deep-sea research crew discovers an ancient alien signal that threatens to unravel the fabric of reality itself. With time running out and trust eroding, they must choose between humanity's survival and the truth.",
  backdropUrl: "/images/sci-fi-deep-sea-thriller-hero.jpg",
  rating: 9.1,
  year: 2024,
  duration: "2h 18m",
  genres: ["Sci-Fi", "Thriller", "Drama"],
  type: "movie" as const,
};

const TRENDING_NOW = [
  {
    id: 101,
    title: "Neon Requiem",
    posterUrl: "/images/neon-cyberpunk-city-movie.jpg",
    rating: 8.7,
    year: 2024,
    genres: ["Action", "Sci-Fi"],
    type: "movie" as const,
    isNew: true,
  },
  {
    id: 102,
    title: "The Last Meridian",
    posterUrl: "/images/epic-adventure-mountains-film.jpg",
    rating: 8.4,
    year: 2024,
    genres: ["Drama", "Adventure"],
    type: "tv" as const,
    isNew: false,
  },
  {
    id: 103,
    title: "Crimson Protocol",
    posterUrl: "/images/spy-thriller-action-movie.jpg",
    rating: 8.9,
    year: 2024,
    genres: ["Thriller", "Action"],
    type: "movie" as const,
    isNew: true,
  },
  {
    id: 104,
    title: "Hollow Earth",
    posterUrl: "/images/horror-underground-mystery-series.jpg",
    rating: 8.2,
    year: 2023,
    genres: ["Horror", "Mystery"],
    type: "tv" as const,
    isNew: false,
  },
  {
    id: 105,
    title: "Solaris Dreams",
    posterUrl: "/images/space-drama-astronaut-film.jpg",
    rating: 9.0,
    year: 2024,
    genres: ["Sci-Fi", "Drama"],
    type: "movie" as const,
    isNew: true,
  },
  {
    id: 106,
    title: "The Gilded Cage",
    posterUrl: "/images/period-drama-mansion-series.jpg",
    rating: 8.6,
    year: 2024,
    genres: ["Drama", "Romance"],
    type: "tv" as const,
    isNew: false,
  },
];

const POPULAR_TV = [
  {
    id: 201,
    title: "Fractured Minds",
    posterUrl: "/images/psychological-thriller-tv-show.jpg",
    rating: 9.2,
    year: 2024,
    genres: ["Thriller", "Drama"],
    type: "tv" as const,
  },
  {
    id: 202,
    title: "Kingdom of Ash",
    posterUrl: "/images/fantasy-medieval-kingdom-series.jpg",
    rating: 8.8,
    year: 2024,
    genres: ["Fantasy", "Action"],
    type: "tv" as const,
  },
  {
    id: 203,
    title: "Midnight Syndicate",
    posterUrl: "/images/crime-noir-detective-series.jpg",
    rating: 8.5,
    year: 2023,
    genres: ["Crime", "Drama"],
    type: "tv" as const,
  },
  {
    id: 204,
    title: "Starfall",
    posterUrl: "/images/sci-fi-space-opera-series.jpg",
    rating: 8.9,
    year: 2024,
    genres: ["Sci-Fi", "Adventure"],
    type: "tv" as const,
  },
  {
    id: 205,
    title: "The Reckoning",
    posterUrl: "/images/western-revenge-drama-series.jpg",
    rating: 8.3,
    year: 2024,
    genres: ["Western", "Drama"],
    type: "tv" as const,
  },
  {
    id: 206,
    title: "Viral",
    posterUrl: "/images/pandemic-thriller-drama-series.jpg",
    rating: 8.7,
    year: 2024,
    genres: ["Thriller", "Drama"],
    type: "tv" as const,
  },
];

const NEW_RELEASES = [
  {
    id: 301,
    title: "Phantom Circuit",
    posterUrl: "/images/hacker-tech-thriller-movie.jpg",
    rating: 8.1,
    year: 2024,
    genres: ["Thriller", "Tech"],
    type: "movie" as const,
  },
  {
    id: 302,
    title: "Bloom",
    posterUrl: "/images/romantic-drama-spring-film.jpg",
    rating: 7.9,
    year: 2024,
    genres: ["Romance", "Drama"],
    type: "movie" as const,
  },
  {
    id: 303,
    title: "Iron Veil",
    posterUrl: "/images/superhero-action-blockbuster.jpg",
    rating: 8.4,
    year: 2024,
    genres: ["Action", "Fantasy"],
    type: "movie" as const,
  },
  {
    id: 304,
    title: "Whisper Network",
    posterUrl: "/images/conspiracy-mystery-thriller-film.jpg",
    rating: 8.6,
    year: 2024,
    genres: ["Mystery", "Thriller"],
    type: "movie" as const,
  },
  {
    id: 305,
    title: "Dust & Bone",
    posterUrl: "/images/post-apocalyptic-survival-film.jpg",
    rating: 8.8,
    year: 2024,
    genres: ["Sci-Fi", "Action"],
    type: "movie" as const,
  },
  {
    id: 306,
    title: "Laughter Riot",
    posterUrl: "/images/comedy-ensemble-cast-film.jpg",
    rating: 7.7,
    year: 2024,
    genres: ["Comedy"],
    type: "movie" as const,
  },
];

const VALUE_PROPS = [
  {
    icon: Tv,
    title: "Watch on Any Screen",
    description:
      "Stream seamlessly on your TV, laptop, tablet, or phone. Pick up exactly where you left off — any device, any time.",
    color: "#E50914",
  },
  {
    icon: Download,
    title: "Download & Watch Offline",
    description:
      "Save your favorites to your device and watch without an internet connection. Perfect for flights, commutes, and travel.",
    color: "#0080FF",
  },
  {
    icon: Users,
    title: "Up to 5 Profiles",
    description:
      "Create individual profiles for everyone in your household. Personalized recommendations, separate watchlists, and kids-safe mode.",
    color: "#FFD700",
  },
  {
    icon: Shield,
    title: "No Ads, Ever",
    description:
      "Enjoy uninterrupted viewing with zero advertisements. Pure, immersive entertainment — exactly the way it was meant to be seen.",
    color: "#00C853",
  },
  {
    icon: Zap,
    title: "4K Ultra HD & Dolby",
    description:
      "Experience cinema-quality visuals and Dolby Atmos surround sound on supported titles. Your living room becomes a movie theater.",
    color: "#FF6B35",
  },
  {
    icon: Check,
    title: "Cancel Anytime",
    description:
      "No contracts, no hidden fees. Subscribe month-to-month and cancel whenever you want — no questions asked.",
    color: "#9B59B6",
  },
];

const PLANS = [
  {
    name: "Basic",
    price: "$8.99",
    period: "/month",
    description: "Great for solo viewers",
    features: [
      "HD streaming (1080p)",
      "1 screen at a time",
      "1 profile",
      "Mobile downloads",
      "Ad-free viewing",
    ],
    cta: "Start Basic",
    highlighted: false,
    color: "#B3B3B3",
  },
  {
    name: "Standard",
    price: "$15.49",
    period: "/month",
    description: "Perfect for couples & small families",
    features: [
      "Full HD streaming (1080p)",
      "2 screens at a time",
      "Up to 3 profiles",
      "Mobile & tablet downloads",
      "Ad-free viewing",
      "Spatial audio",
    ],
    cta: "Start Standard",
    highlighted: true,
    color: "#E50914",
  },
  {
    name: "Premium",
    price: "$22.99",
    period: "/month",
    description: "The ultimate family plan",
    features: [
      "4K Ultra HD + HDR",
      "4 screens at a time",
      "Up to 5 profiles",
      "Downloads on 6 devices",
      "Ad-free viewing",
      "Dolby Atmos audio",
      "Early access to new releases",
    ],
    cta: "Start Premium",
    highlighted: false,
    color: "#FFD700",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    location: "New York, USA",
    avatar: "https://mormonartist.net/images/interviews/sarah-m-eden/sarah-m-eden-01.jpg",
    rating: 5,
    text: "StreamVault completely replaced my cable subscription. The content library is insane — I've discovered so many incredible shows I never would have found otherwise. The 4K quality is stunning.",
  },
  {
    id: 2,
    name: "James K.",
    location: "London, UK",
    avatar: "https://www.cultclassicmag.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fcultclassic%2FZtsdkxoQrfVKlzDS_0025_22.jpg%3Fauto%3Dformat%2Ccompress&w=3840&q=75",
    rating: 5,
    text: "The offline download feature is a game-changer for my commute. I download episodes every morning and watch them on the tube. Absolutely worth every penny.",
  },
  {
    id: 3,
    name: "Priya R.",
    location: "Mumbai, India",
    avatar: "https://static.toiimg.com/thumb/msid-95521932,width-400,height-225,resizemode-72/95521932.jpg",
    rating: 5,
    text: "The recommendation algorithm is eerily good. It knows exactly what I want to watch before I do. The kids profile keeps my daughter entertained with age-appropriate content.",
  },
];

const STATS = [
  { value: "250M+", label: "Active Subscribers" },
  { value: "190+", label: "Countries & Territories" },
  { value: "15,000+", label: "Titles Available" },
  { value: "4K", label: "Ultra HD Quality" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ContentCard({
  item,
  index,
}: {
  item: (typeof TRENDING_NOW)[0];
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      whileHover={shouldReduceMotion ? {} : { scale: 1.05, zIndex: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex-shrink-0 w-40 sm:w-48 md:w-52 rounded-xl overflow-hidden cursor-pointer group"
      style={{ position: "relative" }}
    >
      <div className="aspect-[2/3] bg-[#1a1a1a] relative overflow-hidden">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%231a1a1a'/%3E%3Ctext x='100' y='150' text-anchor='middle' fill='%23555' font-size='14' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {item.isNew && (
          <span className="absolute top-2 left-2 bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            New
          </span>
        )}

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-3"
            >
              <p className="text-white font-semibold text-sm leading-tight truncate">
                {item.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Star size={10} className="text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 text-xs font-medium">
                  {item.rating.toFixed(1)}
                </span>
                <span className="text-[#B3B3B3] text-xs">{item.year}</span>
              </div>
              <div className="flex gap-1 mt-2">
                <button className="flex-1 bg-white text-black text-xs font-bold py-1.5 rounded-md flex items-center justify-center gap-1 hover:bg-white/90 transition-colors">
                  <Play size={10} className="fill-black" />
                  Play
                </button>
                <button className="w-8 h-7 bg-white/20 backdrop-blur-sm rounded-md flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Info size={12} className="text-white" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ContentRow({
  title,
  items,
  viewAllHref,
}: {
  title: string;
  items: (typeof TRENDING_NOW)[0][];
  viewAllHref: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
      className="relative"
    >
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <h2 className="text-white text-xl sm:text-2xl font-bold">{title}</h2>
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-[#E50914] text-sm font-medium hover:text-red-400 transition-colors group"
        >
          See All
          <ChevronRight
            size={16}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>

      <div className="relative group/row">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-full bg-gradient-to-r from-[#141414] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        <motion.div
          ref={scrollRef}
          variants={staggerContainer}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {(items ?? []).map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} />
          ))}
        </motion.div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-full bg-gradient-to-l from-[#141414] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#141414] text-white overflow-x-hidden">
      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Backdrop */}
        <div className="absolute inset-0">
          <img
            src={FEATURED_HERO.backdropUrl}
            alt={FEATURED_HERO.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-4">
              <span className="bg-[#E50914] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Featured
              </span>
              <span className="text-[#B3B3B3] text-sm">
                {FEATURED_HERO.year} · {FEATURED_HERO.duration}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-4"
              style={{ color: "#f31212" }}
            >
              {FEATURED_HERO.title}
            </motion.h1>

            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1.5">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-400 font-bold text-lg">
                  {FEATURED_HERO.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-[#B3B3B3]">·</span>
              <div className="flex gap-2">
                {FEATURED_HERO.genres.map((g) => (
                  <span
                    key={g}
                    className="text-[#B3B3B3] text-sm border border-white/20 px-2 py-0.5 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-[#B3B3B3] text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            >
              {FEATURED_HERO.description}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3.5 rounded-xl text-base hover:bg-white/90 transition-colors shadow-lg shadow-black/30"
              >
                <Play size={20} className="fill-black" />
                Play Now
              </motion.button>
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-xl text-base hover:bg-white/25 transition-colors border border-white/20"
              >
                <Info size={20} />
                More Info
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#B3B3B3] text-xs uppercase tracking-widest">
            Scroll to explore
          </span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
        className="bg-[#0a0a0a] border-y border-white/5 py-10"
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-black text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-[#B3B3B3] text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Content Rows ── */}
      <section className="py-12 space-y-10">
        <ContentRow
          title="🔥 Trending Now"
          items={TRENDING_NOW}
          viewAllHref="/browse/new-popular"
        />
        <ContentRow
          title="📺 Popular TV Shows"
          items={POPULAR_TV}
          viewAllHref="/browse/tv-shows"
        />
        <ContentRow
          title="🎬 New Releases"
          items={NEW_RELEASES}
          viewAllHref="/browse/movies"
        />
      </section>

      {/* ── Value Props ── */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
            >
              Everything you love about streaming,{" "}
              <span className="text-[#E50914]">perfected.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#B3B3B3] text-lg max-w-2xl mx-auto"
            >
              {APP_DESCRIPTION}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {VALUE_PROPS.map((prop) => {
              const Icon = prop.icon;
              return (
                <motion.div
                  key={prop.title}
                  variants={scaleIn}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : { y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }
                  }
                  className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-7 cursor-default transition-shadow duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${prop.color}20` }}
                  >
                    <Icon size={24} style={{ color: prop.color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-[#B3B3B3] text-sm leading-relaxed">
                    {prop.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Plans ── */}
      <section className="py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
            >
              Choose your plan
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#B3B3B3] text-lg">
              Flexible pricing for every household. No contracts, cancel anytime.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {PLANS.map((plan) => (
              <motion.div
                key={plan.name}
                variants={scaleIn}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : { y: -8, boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }
                }
                className={`relative rounded-2xl p-8 border transition-shadow duration-300 ${
                  plan.highlighted
                    ? "bg-[#1a0a0a] border-[#E50914]/60 shadow-2xl shadow-[#E50914]/10"
                    : "bg-[#1a1a1