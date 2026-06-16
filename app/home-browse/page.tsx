"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Plus, Info, Star, ChevronLeft, ChevronRight, Heart, Clock, TrendingUp, Flame, Sparkles, Eye } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

interface ContentItem {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  year: number;
  duration: string;
  genres: string[];
  type: "movie" | "tv";
  isNew?: boolean;
  isTrending?: boolean;
  match?: number;
}

const FEATURED: ContentItem = {
  id: 1,
  title: "Echoes of the Abyss",
  description:
    "A deep-sea research team discovers an ancient signal emanating from the ocean floor. As they descend into the crushing darkness, they uncover a civilization that predates humanity — and a force that has been waiting millennia to be found.",
  posterUrl: "/images/echoes-abyss-poster.jpg",
  backdropUrl: "/images/echoes-abyss-backdrop.jpg",
  rating: 9.1,
  year: 2024,
  duration: "2h 18m",
  genres: ["Sci-Fi", "Thriller", "Mystery"],
  type: "movie",
  isTrending: true,
};

const TRENDING: ContentItem[] = [
  {
    id: 2,
    title: "Neon Requiem",
    description: "A jazz musician in a cyberpunk city uncovers a conspiracy that reaches the highest levels of corporate power.",
    posterUrl: "/images/neon-requiem-poster.jpg",
    backdropUrl: "/images/neon-requiem-backdrop.jpg",
    rating: 8.7,
    year: 2024,
    duration: "1h 52m",
    genres: ["Thriller", "Sci-Fi"],
    type: "movie",
    isTrending: true,
    match: 97,
  },
  {
    id: 3,
    title: "The Last Meridian",
    description: "Three strangers are bound together by a mysterious compass that leads them across continents.",
    posterUrl: "/images/last-meridian-poster.jpg",
    backdropUrl: "/images/last-meridian-backdrop.jpg",
    rating: 8.4,
    year: 2024,
    duration: "3 Seasons",
    genres: ["Adventure", "Drama"],
    type: "tv",
    isTrending: true,
    match: 94,
  },
  {
    id: 4,
    title: "Crimson Hollow",
    description: "A detective returns to her hometown to solve a murder that mirrors a cold case from her past.",
    posterUrl: "/images/crimson-hollow-poster.jpg",
    backdropUrl: "/images/crimson-hollow-backdrop.jpg",
    rating: 8.9,
    year: 2023,
    duration: "2 Seasons",
    genres: ["Crime", "Drama"],
    type: "tv",
    match: 91,
  },
  {
    id: 5,
    title: "Starfall",
    description: "When a meteor shower brings alien spores to Earth, a botanist races to find a cure before civilization collapses.",
    posterUrl: "/images/starfall-movie-poster.jpg",
    backdropUrl: "/images/starfall-movie-backdrop.jpg",
    rating: 7.8,
    year: 2024,
    duration: "1h 44m",
    genres: ["Sci-Fi", "Action"],
    type: "movie",
    isNew: true,
    match: 88,
  },
  {
    id: 6,
    title: "The Quiet Hours",
    description: "An intimate portrait of a family navigating grief, love, and forgiveness across three generations.",
    posterUrl: "/images/quiet-hours-drama-poster.jpg",
    backdropUrl: "/images/quiet-hours-drama-backdrop.jpg",
    rating: 9.0,
    year: 2024,
    duration: "1h 58m",
    genres: ["Drama", "Romance"],
    type: "movie",
    match: 95,
  },
  {
    id: 7,
    title: "Phantom Protocol",
    description: "Elite hackers are recruited by a shadow government to prevent a digital apocalypse.",
    posterUrl: "/images/phantom-protocol-poster.jpg",
    backdropUrl: "/images/phantom-protocol-backdrop.jpg",
    rating: 8.2,
    year: 2023,
    duration: "2 Seasons",
    genres: ["Action", "Thriller"],
    type: "tv",
    match: 90,
  },
  {
    id: 8,
    title: "Velvet Underground",
    description: "A rockumentary following the rise and fall of the most influential band you've never heard of.",
    posterUrl: "/images/velvet-underground-doc-poster.jpg",
    backdropUrl: "/images/velvet-underground-doc-backdrop.jpg",
    rating: 8.6,
    year: 2024,
    duration: "1h 36m",
    genres: ["Documentary", "Music"],
    type: "movie",
    isNew: true,
    match: 86,
  },
];

const NEW_RELEASES: ContentItem[] = [
  {
    id: 9,
    title: "Iron Bloom",
    description: "A retired soldier tends a flower shop by day and fights underground crime by night.",
    posterUrl: "/images/iron-bloom-action-poster.jpg",
    backdropUrl: "/images/iron-bloom-action-backdrop.jpg",
    rating: 8.1,
    year: 2024,
    duration: "1h 49m",
    genres: ["Action", "Comedy"],
    type: "movie",
    isNew: true,
    match: 92,
  },
  {
    id: 10,
    title: "Solstice",
    description: "A remote Arctic research station becomes the epicenter of a supernatural event during the longest night of the year.",
    posterUrl: "/images/solstice-horror-poster.jpg",
    backdropUrl: "/images/solstice-horror-backdrop.jpg",
    rating: 8.5,
    year: 2024,
    duration: "1h 55m",
    genres: ["Horror", "Mystery"],
    type: "movie",
    isNew: true,
    match: 89,
  },
  {
    id: 11,
    title: "The Cartographer",
    description: "A mapmaker in 1800s London discovers her maps are predicting the future.",
    posterUrl: "/images/cartographer-period-poster.jpg",
    backdropUrl: "/images/cartographer-period-backdrop.jpg",
    rating: 8.8,
    year: 2024,
    duration: "2 Seasons",
    genres: ["Fantasy", "Drama"],
    type: "tv",
    isNew: true,
    match: 96,
  },
  {
    id: 12,
    title: "Dust & Thunder",
    description: "Two rival ranching families in the American Southwest must unite against a common corporate enemy.",
    posterUrl: "/images/dust-thunder-western-poster.jpg",
    backdropUrl: "/images/dust-thunder-western-backdrop.jpg",
    rating: 7.9,
    year: 2024,
    duration: "1h 41m",
    genres: ["Western", "Drama"],
    type: "movie",
    isNew: true,
    match: 83,
  },
  {
    id: 13,
    title: "Laughing Matter",
    description: "A stand-up comedian's rise to fame is complicated by the very trauma that fuels her best material.",
    posterUrl: "/images/laughing-matter-comedy-poster.jpg",
    backdropUrl: "/images/laughing-matter-comedy-backdrop.jpg",
    rating: 8.3,
    year: 2024,
    duration: "1 Season",
    genres: ["Comedy", "Drama"],
    type: "tv",
    isNew: true,
    match: 91,
  },
  {
    id: 14,
    title: "Mirage City",
    description: "In a city that only appears at night, a detective has until dawn to solve an impossible crime.",
    posterUrl: "/images/mirage-city-noir-poster.jpg",
    backdropUrl: "/images/mirage-city-noir-backdrop.jpg",
    rating: 8.7,
    year: 2024,
    duration: "1h 47m",
    genres: ["Fantasy", "Thriller"],
    type: "movie",
    isNew: true,
    match: 94,
  },
];

const CONTINUE_WATCHING: (ContentItem & { progress: number; episode?: string })[] = [
  {
    id: 3,
    title: "The Last Meridian",
    description: "",
    posterUrl: "/images/last-meridian-poster.jpg",
    backdropUrl: "/images/last-meridian-backdrop.jpg",
    rating: 8.4,
    year: 2024,
    duration: "3 Seasons",
    genres: ["Adventure", "Drama"],
    type: "tv",
    progress: 65,
    episode: "S2 E4",
  },
  {
    id: 7,
    title: "Phantom Protocol",
    description: "",
    posterUrl: "/images/phantom-protocol-poster.jpg",
    backdropUrl: "/images/phantom-protocol-backdrop.jpg",
    rating: 8.2,
    year: 2023,
    duration: "2 Seasons",
    genres: ["Action", "Thriller"],
    type: "tv",
    progress: 30,
    episode: "S1 E7",
  },
  {
    id: 5,
    title: "Starfall",
    description: "",
    posterUrl: "/images/starfall-movie-poster.jpg",
    backdropUrl: "/images/starfall-movie-backdrop.jpg",
    rating: 7.8,
    year: 2024,
    duration: "1h 44m",
    genres: ["Sci-Fi", "Action"],
    type: "movie",
    progress: 82,
  },
  {
    id: 11,
    title: "The Cartographer",
    description: "",
    posterUrl: "/images/cartographer-period-poster.jpg",
    backdropUrl: "/images/cartographer-period-backdrop.jpg",
    rating: 8.8,
    year: 2024,
    duration: "2 Seasons",
    genres: ["Fantasy", "Drama"],
    type: "tv",
    progress: 15,
    episode: "S1 E2",
  },
];

const GENRES = [
  { id: 1, name: "Action", icon: "⚡", color: "from-orange-600 to-red-700" },
  { id: 2, name: "Comedy", icon: "😂", color: "from-yellow-500 to-orange-500" },
  { id: 3, name: "Drama", icon: "🎭", color: "from-purple-600 to-indigo-700" },
  { id: 4, name: "Horror", icon: "👻", color: "from-gray-700 to-gray-900" },
  { id: 5, name: "Sci-Fi", icon: "🚀", color: "from-blue-600 to-cyan-600" },
  { id: 6, name: "Romance", icon: "💕", color: "from-pink-500 to-rose-600" },
  { id: 7, name: "Thriller", icon: "🔪", color: "from-slate-600 to-slate-800" },
  { id: 8, name: "Documentary", icon: "🎬", color: "from-green-600 to-teal-700" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ContentCard({ item, index = 0 }: { item: ContentItem; index?: number }) {
  const [hovered, setHovered] = useState(false);
  const [inList, setInList] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-shrink-0 w-44 sm:w-52 cursor-pointer group"
    >
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : hovered
            ? { scale: 1.08, zIndex: 20 }
            : { scale: 1, zIndex: 1 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative rounded-lg overflow-hidden bg-[#1a1a1a] shadow-lg"
        style={{ zIndex: hovered ? 20 : 1, position: "relative" }}
      >
        {/* Poster */}
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%231a1a2e'/%3E%3Ctext x='100' y='150' text-anchor='middle' fill='%23666' font-size='14' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {item.isNew && (
              <span className="bg-[#E50914] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                NEW
              </span>
            )}
            {item.isTrending && (
              <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Flame size={8} /> HOT
              </span>
            )}
          </div>

          {/* Match % */}
          {item.match != null && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                {item.match}% Match
              </span>
            </div>
          )}

          {/* Hover actions */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                aria-label={`Play ${item.title}`}
              >
                <Play size={14} fill="black" className="text-black ml-0.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setInList((v) => !v);
                }}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                  inList
                    ? "bg-[#E50914] border-[#E50914] text-white"
                    : "border-white/60 text-white hover:border-white"
                }`}
                aria-label={inList ? "Remove from list" : "Add to list"}
              >
                {inList ? <Heart size={12} fill="white" /> : <Plus size={12} />}
              </motion.button>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={10} fill="currentColor" />
              <span className="text-white text-[10px] font-semibold">
                {item.rating.toFixed(1)}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Card info (shown on hover) */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={hovered ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden bg-[#1f1f1f] px-3 py-2"
        >
          <p className="text-white text-xs font-semibold truncate">{item.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#B3B3B3] text-[10px]">{item.year}</span>
            <span className="text-[#B3B3B3] text-[10px]">•</span>
            <span className="text-[#B3B3B3] text-[10px]">{item.duration}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {(item.genres ?? []).slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-[#B3B3B3] text-[9px] border border-white/20 rounded px-1 py-0.5"
              >
                {g}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ContinueCard({
  item,
  index = 0,
}: {
  item: ContentItem & { progress: number; episode?: string };
  index?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
      className="relative flex-shrink-0 w-64 sm:w-72 cursor-pointer group rounded-lg overflow-hidden bg-[#1a1a1a] shadow-lg"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={item.backdropUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%231a1a2e'/%3E%3C/svg%3E";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl"
          >
            <Play size={20} fill="black" className="text-black ml-1" />
          </motion.div>
        </div>

        {/* Episode badge */}
        {item.episode && (
          <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
            {item.episode}
          </div>
        )}

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white text-sm font-semibold truncate">{item.title}</p>
          {/* Progress bar */}
          <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E50914] rounded-full transition-all duration-300"
              style={{ width: `${item.progress ?? 0}%` }}
            />
          </div>
          <p className="text-[#B3B3B3] text-[10px] mt-1">{item.progress ?? 0}% watched</p>
        </div>
      </div>
    </motion.div>
  );
}

function RowSlider({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <motion.section
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeInUp}
      className="mb-10"
    >
      <div className="flex items-center gap-2 mb-4 px-4 sm:px-8 lg:px-12">
        {icon && <span className="text-[#E50914]">{icon}</span>}
        <h2 className="text-white text-lg sm:text-xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="relative group/row">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-r from-[#141414] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 focus:outline-none"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-8 lg:px-12 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-3"
          >
            {children}
          </motion.div>
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-l from-[#141414] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 focus:outline-none"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </motion.section>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomeBrowsePage() {
  const [activeGenre, setActiveGenre] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const genreFilters = ["All", "Movies", "TV Shows", "New", "Trending"];

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      {/* ── Hero / Featured ─────────────────────────────────────────────── */}
      <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
        {/* Backdrop */}
        <div className="absolute inset-0">
          <img
            src={FEATURED.backdropUrl}
            alt={FEATURED.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%230d0d1a'/%3E%3C/svg%3E";
            }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-4 sm:px-8 lg:px-12 max-w-2xl">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={staggerContainer}
          >
            {/* Trending badge */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-[#E50914]" />
              <span className="text-[#E50914] text-sm font-semibold tracking-wider uppercase">
                #1 Trending Today
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-4 drop-shadow-2xl"
            >
              {FEATURED.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 mb-4 text-sm"
            >
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={14} fill="currentColor" />
                <span className="text-white font-semibold">{FEATURED.rating.toFixed(1)}</span>
              </div>
              <span className="text-[#B3B3B3]">{FEATURED.year}</span>
              <span className="text-[#B3B3B3]">•</span>
              <span className="text-[#B3B3B3]">{FEATURED.duration}</span>
              <span className="text-[#B3B3B3]">•</span>
              <span className="border border-white/40 text-white/80 text-xs px-1.5 py-0.5 rounded">
                {FEATURED.type === "movie" ? "FILM" : "SERIES"}
              </span>
            </motion.div>

            {/* Genres */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-5">
              {FEATURED.genres.map((g) => (
                <span
                  key={g}
                  className="text-[#B3B3B3] text-xs border border-white/20 rounded-full px-3 py-1"
                >
                  {g}
                </span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-[#B3B3B3] text-sm sm:text-base leading-relaxed mb-6 line-clamp-3"
            >
              {FEATURED.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 flex-wrap">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-lg text-sm hover:bg-white/90 transition-colors duration-200 shadow-lg"
              >
                <Play size={18} fill="black" />
                Play Now
              </motion.button>
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-lg text-sm hover:bg-white/30 transition-colors duration-200 border border-white/20"
              >
                <Info size={18} />
                More Info
              </motion.button>
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-4 py-3 rounded-lg text-sm hover:bg-white/20 transition-colors duration-200 border border-white/20"
              >
                <Plus size={18} />
                My List
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Genre Filter Tabs ────────────────────────────────────────────── */}
      <motion.div
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="px-4 sm:px-8 lg:px-12 py-6 flex items-center gap-2 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {genreFilters.map((filter) => (
          <motion.button
            key={filter}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            onClick={() => setActiveGenre(filter)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeGenre === filter
                ? "bg-[#E50914] text-white shadow-lg shadow-red-900/40"
                : "bg-white/10 text-[#B3B3B3] hover:bg-white/20 hover:text-white"
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </motion.div>

      {/* ── Continue Watching ────────────────────────────────────────────── */}
      <motion.section
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-4 px-4 sm:px-8 lg:px-12">
          <Clock size={18} className="text-[#E50914]" />
          <h2 className="text-white text-lg sm:text-xl font-bold tracking-tight">
            Continue Watching
          </h2>
        </div>
        <div className="relative group/row">
          <div
            className="flex gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-8 lg:px-12 pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-3"
            >
              {CONTINUE_WATCHING.map((item, i) => (
                <ContinueCard key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── Trending Now ─────────────────────────────────────────────────── */}
      <RowSlider
        title="Trending Now"
        icon={<Flame size={18} />}
      >
        {TRENDING.map((item, i) => (
          <ContentCard key={item.id} item={item} index={i} />
        ))}
      </RowSlider>

      {/* ── New Releases ─────────────────────────────────────────────────── */}
      <RowSlider
        title="New Releases"
        icon={<Sparkles size={18} />}
      >
        {NEW_RELEASES.map((item, i) => (
          <ContentCard key={item.id} item={item} index={i} />
        ))}
      </RowSlider>

      {/* ── Top Picks For You ────────────────────────────────────────────── */}
      <RowSlider
        title="Top Picks For You"
        icon={<Star size={18} />}
      >
        {[...TRENDING].reverse().map((item, i) => (
          <ContentCard key={`pick-${item.id}`} item={item} index={i} />
        ))}
      </RowSlider>

      {/* ── Browse by Genre ──────────────────────────────────────────────── */}
      <motion.section
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
        className="mb-12 px-4 sm:px-8 lg:px-12"
      >
        <div className="flex items-center gap-2 mb-6">
          <Eye size={18} className="text-[#E50914]" />
          <h2 className="text-white text-lg sm:text-xl font-bold tracking-tight">
            Browse by Genre
          </h2>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
        >
          {GENRES.map((genre, i) => (
            <motion.div
              key={genre.id}
              variants={scaleIn}
              custom={i}
              whileHover={shouldReduceMotion ? {} : { scale: 1.06, y: -4 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className={`relative cursor-pointer rounded-xl bg-gradient-to-br ${genre.color} p-4 flex flex-col items-center justify-center gap-2 aspect-square shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <span className="text-3xl">{genre.icon}</span>
              <span className="text-white text-xs font-bold text-center leading-tight">
                {genre.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Because You Watched ──────────────────────────────────────────── */}
      <RowSlider
        title="Because You Watched The Last Meridian"
        icon={<TrendingUp size={18} />}
      >
        {NEW_RELEASES.slice().reverse().map((item, i) => (
          <ContentCard key={`byw-${item.id}`} item={item} index={i} />
        ))}
      </RowSlider>

      {/* ── Promotional Banner ───────────────────────────────────────────── */}
      <motion.section
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
        className="mx-4 sm:mx-8 lg:mx-12 mb-12 rounded-2xl overflow-hidden relative"
      >
        <div className="bg-gradient-to-r from-[#E50914] via-[#b00710] to-[#7a0009] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-2">
              Limited Time Offer
            </p>
            <h2 className="text-white text-2xl sm:text-3xl font-black leading-tight mb-2">
              Upgrade to Premium
            </h2>
            <p className="text-white/80 text-sm max-w-md">
              Get 4K Ultra HD, Dolby Atmos sound, and simultaneous streams on up to 4 devices.
              First month free — no commitment required.
            </p>
          </div>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            className="flex-shrink-0 bg-white text-[#E50914] font-black px-8 py-3 rounded-xl text-sm hover:bg-white/90 transition-colors duration-200 shadow-xl"
          >
            Get Premium Free
          </motion.button>
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-12 right-24 w-56 h-56 bg-white/5 rounded-full pointer-events-none" />
      </motion.section>

      {/* ── Recently Added ───────────────────────────────────────────────── */}
      <RowSlider
        title="Recently Added"
        icon={<Sparkles size={18} />}
      >
        {[...NEW_RELEASES, ...TRENDING].slice(0, 8).map((item, i) => (
          <ContentCard key={`recent-${item.id}-${i}`} item={item} index={i} />
        ))}
      </RowSlider>

      {/* ── Bottom spacer for footer ─────────────────────────────────────── */}
      <div className="h-8" />
    </main>
  );
}