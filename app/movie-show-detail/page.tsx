"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Play, Plus, Check, ThumbsUp, Share2, Star, Clock, Calendar, ChevronDown, ChevronRight, X, Volume2, VolumeX } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const FEATURED_CONTENT = {
  id: 1,
  title: "Echoes of the Abyss",
  tagline: "Some depths were never meant to be explored.",
  description:
    "When a deep-sea research team discovers an ancient signal emanating from the Mariana Trench, they descend into a world of unimaginable terror. As their equipment fails and crew members vanish one by one, marine biologist Dr. Lena Marsh must unravel the mystery before the abyss consumes them all. A gripping sci-fi thriller that blurs the line between science and the supernatural.",
  posterUrl: "https://m.media-amazon.com/images/M/MV5BYWJkNDYwYWMtM2VmMC00ZGNiLTg5MDEtNDAwNmQ5Mzc4Mzc1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  backdropUrl: "https://img.itch.zone/aW1nLzIwMzUxNTUyLnBuZw==/original/DFbW94.png",
  rating: 8.4,
  year: 2024,
  duration: "2h 18m",
  maturityRating: "TV-MA",
  genres: ["Sci-Fi", "Thriller", "Horror"],
  type: "movie" as const,
  cast: [
    { name: "Mara Voss", role: "Dr. Lena Marsh", avatarUrl: "/images/cast-mara-voss.jpg" },
    { name: "Idris Okafor", role: "Commander Reyes", avatarUrl: "/images/cast-idris-okafor.jpg" },
    { name: "Yuki Tanaka", role: "Dr. Hiroshi", avatarUrl: "/images/cast-yuki-tanaka.jpg" },
    { name: "Cleo Hartmann", role: "Engineer Sasha", avatarUrl: "/images/cast-cleo-hartmann.jpg" },
    { name: "Damon Pierce", role: "Captain Vance", avatarUrl: "/images/cast-damon-pierce.jpg" },
    { name: "Nadia Flores", role: "Dr. Amara", avatarUrl: "/images/cast-nadia-flores.jpg" },
  ],
  director: "Sofia Reinholt",
  writer: "Marcus Delacroix",
  studio: "Abyss Pictures",
  languages: ["English", "Japanese", "Spanish"],
  subtitles: ["English", "French", "German", "Spanish", "Japanese"],
  awards: ["Best Visual Effects – Saturn Awards 2024", "Audience Choice – Sundance 2024"],
  isFeatured: true,
  isNew: true,
  isTrending: true,
  matchScore: 97,
};

const RELATED_CONTENT = [
  {
    id: 2,
    title: "The Leviathan Protocol",
    posterUrl: "/images/leviathan-protocol-poster.jpg",
    rating: 7.9,
    year: 2023,
    duration: "1h 54m",
    genres: ["Sci-Fi", "Action"],
    type: "movie" as const,
    matchScore: 94,
  },
  {
    id: 3,
    title: "Dark Waters",
    posterUrl: "/images/dark-waters-series-poster.jpg",
    rating: 8.1,
    year: 2023,
    duration: "3 Seasons",
    genres: ["Thriller", "Drama"],
    type: "tv" as const,
    matchScore: 91,
  },
  {
    id: 4,
    title: "Submerged",
    posterUrl: "/images/submerged-movie-poster.jpg",
    rating: 7.5,
    year: 2022,
    duration: "1h 47m",
    genres: ["Horror", "Sci-Fi"],
    type: "movie" as const,
    matchScore: 88,
  },
  {
    id: 5,
    title: "Abyssal Zone",
    posterUrl: "/images/abyssal-zone-poster.jpg",
    rating: 8.6,
    year: 2024,
    duration: "2 Seasons",
    genres: ["Sci-Fi", "Mystery"],
    type: "tv" as const,
    matchScore: 96,
  },
  {
    id: 6,
    title: "Pressure",
    posterUrl: "/images/pressure-thriller-poster.jpg",
    rating: 7.2,
    year: 2022,
    duration: "1h 38m",
    genres: ["Thriller"],
    type: "movie" as const,
    matchScore: 85,
  },
  {
    id: 7,
    title: "The Deep Ones",
    posterUrl: "/images/the-deep-ones-poster.jpg",
    rating: 7.8,
    year: 2023,
    duration: "1h 59m",
    genres: ["Horror", "Fantasy"],
    type: "movie" as const,
    matchScore: 89,
  },
];

const REVIEWS = [
  {
    id: "r1",
    author: "CinematicMind",
    rating: 9,
    date: "Dec 2024",
    text: "An absolute masterpiece of underwater horror. The cinematography is breathtaking and the tension never lets up. Mara Voss delivers a career-defining performance.",
    helpful: 142,
  },
  {
    id: "r2",
    author: "SciFiEnthusiast",
    rating: 8,
    date: "Nov 2024",
    text: "Echoes of the Abyss manages to be both scientifically grounded and genuinely terrifying. The third act is a relentless thrill ride that left me speechless.",
    helpful: 98,
  },
  {
    id: "r3",
    author: "FilmCritic_Pro",
    rating: 7,
    date: "Nov 2024",
    text: "Strong performances and stunning visuals elevate what could have been a generic creature feature. A few pacing issues in the second act, but overall a solid entry in the genre.",
    helpful: 67,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating / 2);
  const hasHalf = rating / 2 - fullStars >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : i === fullStars && hasHalf
              ? "fill-yellow-400/50 text-yellow-400"
              : "text-white/20"
          }
        />
      ))}
      <span className="text-yellow-400 font-semibold text-sm ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function RelatedCard({ item }: { item: (typeof RELATED_CONTENT)[0] }) {
  const [inList, setInList] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={scaleIn}
      whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
      className="group relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://i.sstatic.net/1cMfK.png" +
              encodeURIComponent(item.title);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2">
            <motion.button
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              className="flex-1 bg-white text-black text-xs font-bold py-1.5 rounded-md flex items-center justify-center gap-1 hover:bg-white/90 transition-colors"
            >
              <Play size={12} fill="black" /> Play
            </motion.button>
            <motion.button
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              onClick={() => setInList((v) => !v)}
              className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white hover:border-white transition-colors"
            >
              {inList ? <Check size={12} /> : <Plus size={12} />}
            </motion.button>
          </div>
        </div>
        <div className="absolute top-2 right-2">
          <span className="bg-[#E50914] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {item.matchScore}% Match
          </span>
        </div>
        {item.type === "tv" && (
          <div className="absolute top-2 left-2">
            <span className="bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded border border-white/20">
              TV
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-white text-sm font-semibold truncate">{item.title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[#B3B3B3] text-xs">{item.year}</span>
          <span className="text-[#B3B3B3] text-xs">{item.duration}</span>
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          <Star size={11} className="fill-yellow-400 text-yellow-400" />
          <span className="text-yellow-400 text-xs font-medium">{item.rating.toFixed(1)}</span>
          <span className="text-[#666] text-xs ml-1">{item.genres[0]}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function MovieShowDetailPage() {
  const [inMyList, setInMyList] = useState(false);
  const [liked, setLiked] = useState(false);
  const [muted, setMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "cast" | "reviews" | "details">("overview");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const content = FEATURED_CONTENT;

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      {/* ── Hero Backdrop ── */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={content.backdropUrl}
            alt={content.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://img.itch.zone/aW1nLzIwMzUxNTUyLnBuZw==/original/DFbW94.png";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
        </motion.div>

        {/* Mute toggle */}
        <motion.button
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => setMuted((v) => !v)}
          className="absolute bottom-8 right-8 w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center text-white hover:border-white transition-colors z-10"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end pb-12 px-6 sm:px-10 lg:px-16 max-w-screen-2xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            {/* Badges */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2 mb-4">
              {content.isNew && (
                <span className="bg-[#E50914] text-white text-xs font-bold px-2.5 py-1 rounded">
                  NEW
                </span>
              )}
              {content.isTrending && (
                <span className="bg-white/10 border border-white/20 text-white text-xs font-medium px-2.5 py-1 rounded backdrop-blur-sm">
                  🔥 Trending Now
                </span>
              )}
              <span className="bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] text-xs font-bold px-2.5 py-1 rounded">
                {content.matchScore}% Match
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-3"
            >
              {content.title}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[#B3B3B3] text-lg italic mb-5">
              {content.tagline}
            </motion.p>

            {/* Meta */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 mb-6 text-sm">
              <StarRating rating={content.rating} />
              <span className="text-[#B3B3B3]">|</span>
              <span className="flex items-center gap-1 text-[#B3B3B3]">
                <Calendar size={14} /> {content.year}
              </span>
              <span className="text-[#B3B3B3]">|</span>
              <span className="flex items-center gap-1 text-[#B3B3B3]">
                <Clock size={14} /> {content.duration}
              </span>
              <span className="text-[#B3B3B3]">|</span>
              <span className="border border-white/30 text-white/80 text-xs px-1.5 py-0.5 rounded">
                {content.maturityRating}
              </span>
            </motion.div>

            {/* Genre Tags */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-7">
              {content.genres.map((g) => (
                <span
                  key={g}
                  className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full border border-white/10"
                >
                  {g}
                </span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors text-base shadow-lg shadow-black/40"
              >
                <Play size={20} fill="black" /> Play
              </motion.button>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                onClick={() => setInMyList((v) => !v)}
                className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-lg border transition-all text-base ${
                  inMyList
                    ? "bg-white/20 border-white/40 text-white"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }`}
              >
                {inMyList ? <Check size={18} /> : <Plus size={18} />}
                {inMyList ? "In My List" : "My List"}
              </motion.button>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                onClick={() => setLiked((v) => !v)}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                  liked
                    ? "bg-[#E50914]/20 border-[#E50914] text-[#E50914]"
                    : "border-white/30 text-white/70 hover:border-white hover:text-white"
                }`}
                aria-label="Like"
              >
                <ThumbsUp size={18} fill={liked ? "currentColor" : "none"} />
              </motion.button>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                className="w-11 h-11 rounded-full border border-white/30 text-white/70 flex items-center justify-center hover:border-white hover:text-white transition-all"
                aria-label="Share"
              >
                <Share2 size={18} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Tab Navigation ── */}
      <section className="sticky top-16 lg:top-20 z-30 bg-[#141414]/95 backdrop-blur-md border-b border-white/8">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {(["overview", "cast", "reviews", "details"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-4 text-sm font-semibold capitalize whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab ? "text-white" : "text-[#B3B3B3] hover:text-white"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab Content ── */}
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <AnimatePresence mode="wait">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
              {/* Left: Description + Awards */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <motion.div
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeInUp}
                >
                  <h2 className="text-xl font-bold mb-3 text-white">About the Film</h2>
                  <p className={`text-[#B3B3B3] leading-relaxed text-base ${!showFullDescription ? "line-clamp-4" : ""}`}>
                    {content.description}
                  </p>
                  <button
                    onClick={() => setShowFullDescription((v) => !v)}
                    className="mt-2 text-[#E50914] text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    {showFullDescription ? "Show less" : "Read more"}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${showFullDescription ? "rotate-180" : ""}`}
                    />
                  </button>
                </motion.div>

                {/* Awards */}
                <motion.div
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeInUp}
                >
                  <h2 className="text-xl font-bold mb-4 text-white">Awards & Recognition</h2>
                  <div className="space-y-3">
                    {content.awards.map((award, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3"
                      >
                        <span className="text-yellow-400 text-lg">🏆</span>
                        <span className="text-white/80 text-sm">{award}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Top Cast Preview */}
                <motion.div
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={staggerContainer}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Top Cast</h2>
                    <button
                      onClick={() => setActiveTab("cast")}
                      className="text-[#E50914] text-sm font-medium hover:underline flex items-center gap-1"
                    >
                      View all <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {content.cast.slice(0, 3).map((member) => (
                      <motion.div
                        key={member.name}
                        variants={scaleIn}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                        className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl p-3"
                      >
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=333&color=fff&size=48`;
                          }}
                        />
                        <div className="min-w-0">
                          <p className="text-white text-sm font-semibold truncate">{member.name}</p>
                          <p className="text-[#B3B3B3] text-xs truncate">{member.role}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right: Sidebar Info */}
              <motion.div
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={slideInRight}
                className="space-y-6"
              >
                {/* Poster */}
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
                  <img
                    src={content.posterUrl}
                    alt={content.title}
                    className="w-full aspect-[2/3] object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://m.media-amazon.com/images/M/MV5BYWJkNDYwYWMtM2VmMC00ZGNiLTg5MDEtNDAwNmQ5Mzc4Mzc1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg";
                    }}
                  />
                </div>

                {/* Quick Info */}
                <div className="bg-white/5 border border-white/8 rounded-2xl p-5 space-y-4">
                  <h3 className="text-white font-bold text-base">Quick Info</h3>
                  {[
                    { label: "Director", value: content.director },
                    { label: "Writer", value: content.writer },
                    { label: "Studio", value: content.studio },
                    { label: "Release Year", value: String(content.year) },
                    { label: "Runtime", value: content.duration },
                    { label: "Rating", value: content.maturityRating },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start gap-2">
                      <span className="text-[#B3B3B3] text-sm">{label}</span>
                      <span className="text-white text-sm font-medium text-right">{value ?? "—"}</span>
                    </div>
                  ))}
                </div>

                {/* Languages */}
                <div className="bg-white/5 border border-white/8 rounded-2xl p-5">
                  <h3 className="text-white font-bold text-base mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {content.languages.map((lang) => (
                      <span
                        key={lang}
                        className="bg-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-white font-bold text-base mt-4 mb-3">Subtitles</h3>
                  <div className="flex flex-wrap gap-2">
                    {content.subtitles.map((sub) => (
                      <span
                        key={sub}
                        className="bg-white/5 border border-white/15 text-white/60 text-xs px-2.5 py-1 rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* CAST TAB */}
          {activeTab === "cast" && (
            <motion.div
              key="cast"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-2">Cast & Crew</h2>
              <p className="text-[#B3B3B3] mb-8">
                Directed by <span className="text-white font-semibold">{content.director}</span> · Written by{" "}
                <span className="text-white font-semibold">{content.writer}</span>
              </p>
              <motion.div
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
              >
                {content.cast.map((member) => (
                  <motion.div
                    key={member.name}
                    variants={scaleIn}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -4 }}
                    className="group text-center"
                  >
                    <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#E50914]/60 transition-colors duration-300 mb-3">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=222&color=fff&size=96`;
                        }}
                      />
                    </div>
                    <p className="text-white text-sm font-semibold leading-tight">{member.name}</p>
                    <p className="text-[#B3B3B3] text-xs mt-0.5">{member.role}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Crew Section */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6 text-white">Key Crew</h3>
                <motion.div
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {[
                    { role: "Director", name: content.director },
                    { role: "Screenplay", name: content.writer },
                    { role: "Studio", name: content.studio },
                    { role: "Cinematographer", name: "Elias Brandt" },
                    { role: "Composer", name: "Yuna Sato" },
                    { role: "Visual Effects", name: "Apex VFX Studio" },
                  ].map((crew) => (
                    <motion.div
                      key={crew.role}
                      variants={fadeInUp}
                      className="bg-white/5 border border-white/8 rounded-xl px-5 py-4 flex justify-between items-center"
                    >
                      <span className="text-[#B3B3B3] text-sm">{crew.role}</span>
                      <span className="text-white text-sm font-semibold">{crew.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Rating Summary */}
              <motion.div
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                variants={fadeInUp}
                className="bg-white/5 border border-white/8 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-8"
              >
                <div className="text-center">
                  <div className="text-6xl font-black text-white">{content.rating.toFixed(1)}</div>
                  <StarRating rating={content.rating} />
                  <p className="text-[#B3B3B3] text-sm mt-1">StreamVault Rating</p>
                </div>
                <div className="flex-1 w-full space-y-2">
                  {[
                    { stars: 5, pct: 62 },
                    { stars: 4, pct: 24 },
                    { stars: 3, pct: 9 },
                    { stars: 2, pct: 3 },
                    { stars: 1, pct: 2 },
                  ].map(({ stars, pct }) => (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-[#B3B3B3] text-xs w-4 text-right">{stars}</span>
                      <Star size={12} className="fill-yellow-400 text-yellow-400 flex-shrink-0" />
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + (5 - stars) * 0.1, ease: "easeOut" }}
                          className="h-full bg-yellow-400 rounded-full"
                        />
                      </div>
                      <span className="text-[#B3B3B3] text-xs w-8">{pct}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Review Cards */}
              <motion.div
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                variants={staggerContainer}
                className="space-y-5"
              >
                {REVIEWS.map((review) => (
                  <motion.div
                    key={review.id}
                    variants={fadeInUp}
                    className="bg-white/5 border border-white/8 rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E50914] to-[#ff6b6b] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{review.author}</p>
                          <p className="text-[#B3B3B3] text-xs">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < review.rating ? "bg-[#E50914]" : "bg-white/15"}`}
                          />
                        ))}
                        <span className="text-white text-xs font-bold ml-1">{review.rating}/10</span>
                      </div>
                    </div>
                    <p
                      className={`text-[#B3B3B3] text-sm leading-relaxed ${
                        expandedReview === review.id ? "" : "line-clamp-3"
                      }`}
                    >
                      {review.text}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <button
                        onClick={() =>
                          setExpandedReview(expandedReview === review.id ? null : review.id)
                        }
                        className="text-[#E50914] text-xs font-medium hover:underline"
                      >
                        {expandedReview === review.id ? "Show less" : "Read more"}
                      </button>
                      <div className="flex items-center gap-1 text-[#B3B3B3] text-xs">
                        <ThumbsUp size={12} />
                        <span>{review.helpful} found helpful</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* DETAILS TAB */}
          {activeTab === "details" && (
            <motion.div
              key="details"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl"
            >
              <h2 className="text-2xl font-bold mb-8">Full Details</h2>
              <motion.div
                initial={shouldReduceMotion ? false : "hidden"}
                animate="visible"
                variants={staggerContainer}
                className="space-y-4"
              >
                {[
                  { label: "Original Title", value: content.title },
                  { label: "Type", value: content.type === "movie" ? "Feature Film" : "TV Series" },
                  { label: "Release Year", value: String(content.year) },
                  { label: "Runtime", value: content.duration },
                  { label: "Maturity Rating", value: content.maturityRating },
                  { label: "Genres", value: content.genres.join(", ") },
                  { label: "Director", value: content.director },
                  { label: "Writer", value: content.writer },
                  { label: "Production Studio", value: content.studio },
                  { label: "Audio Languages", value: content.languages.join(", ") },
                  { label: "Subtitles Available", value: content.subtitles.join(", ") },
                  { label: "StreamVault Rating", value: `${content.rating.toFixed(1)} / 10` },
                  { label: "Match Score", value: `${content.matchScore}%` },
                ].map(({ label, value }) => (
                  <motion.div
                    key={label}
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-4 border-b border-white/8"
                  >
                    <span className="text-[#B3B3B3] text-sm sm:w-48 flex-shrink-0">{label}</span>
                    <span className="text-white text-sm font-medium">{value ?? "—"}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Related Content ── */}
      <section className="max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-16 py-12 border-t border-white/8">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">More Like This</h2>
            <Link
              href="/browse/movies"
              className="text-[#E50914] text-sm font-medium hover:underline flex items-center gap-1"
            >
              Browse all <ChevronRight size={14} />
            </Link>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {RELATED_CONTENT.map((item) => (
              <RelatedCard key={item.id} item={item} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── CTA Banner ── */}
      <motion.section
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeIn}
        className="mx-6 sm:mx-10 lg:mx-16 mb-12 rounded-3xl overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#E50914] via-[#b00710] to-[#7a0009]" />
        <div className="absolute inset-0 bg-[url('https://img.itch.zone/aW1nLzIwMzUxNTUyLnBuZw==/original/DFbW94.png')] bg-cover bg-center opacity-10" />
        <div className="relative px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-2xl font-black mb-1">Ready to watch?</h3>
            <p className="text-white/80 text-sm">
              Stream <span className="font-semibold">{content.title}</span> and thousands more — anytime, anywhere.
            </p>
          </div>
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
          >
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-[#E50914] font-black px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors text-base shadow-xl shadow-black/30 whitespace-nowrap"
            >
              <Play size={18} fill="currentColor" /> Start Watching
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}