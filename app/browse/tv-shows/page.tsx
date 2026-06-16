"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Search, Star, Play, Plus, ChevronDown, Filter, Tv, Clock, Calendar, X } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

interface TVShow {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  year: number;
  seasons: number;
  episodes: number;
  genres: string[];
  status: "Ongoing" | "Ended" | "New";
  network: string;
  isNew?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
}

const TV_SHOWS: TVShow[] = [
  {
    id: 1,
    title: "Echoes of Tomorrow",
    description:
      "A gripping sci-fi thriller where a team of scientists discovers a signal from the future, forcing them to make impossible choices that could unravel the fabric of time itself.",
    posterUrl: "/images/echoes-of-tomorrow-tv-poster.jpg",
    backdropUrl: "/images/echoes-of-tomorrow-tv-backdrop.jpg",
    rating: 9.1,
    year: 2024,
    seasons: 3,
    episodes: 36,
    genres: ["Sci-Fi", "Thriller", "Drama"],
    status: "Ongoing",
    network: "StreamVault Original",
    isFeatured: true,
    isTrending: true,
  },
  {
    id: 2,
    title: "The Last Kingdom Falls",
    description:
      "An epic historical drama following rival noble houses as they battle for control of a fractured empire on the brink of collapse.",
    posterUrl: "/images/last-kingdom-falls-poster.jpg",
    backdropUrl: "/images/last-kingdom-falls-backdrop.jpg",
    rating: 8.7,
    year: 2023,
    seasons: 5,
    episodes: 60,
    genres: ["Drama", "History", "Action"],
    status: "Ended",
    network: "StreamVault Original",
    isTrending: true,
  },
  {
    id: 3,
    title: "Neon Nights",
    description:
      "A neo-noir crime series set in a rain-soaked cyberpunk city where a detective with a troubled past hunts a serial killer who leaves cryptic digital clues.",
    posterUrl: "/images/neon-nights-tv-poster.jpg",
    backdropUrl: "/images/neon-nights-tv-backdrop.jpg",
    rating: 8.9,
    year: 2024,
    seasons: 2,
    episodes: 20,
    genres: ["Crime", "Sci-Fi", "Thriller"],
    status: "Ongoing",
    network: "StreamVault Original",
    isNew: true,
    isTrending: true,
  },
  {
    id: 4,
    title: "Wildwood",
    description:
      "A family drama set in the Pacific Northwest, where three siblings return to their childhood home after their mother's mysterious disappearance.",
    posterUrl: "/images/wildwood-tv-poster.jpg",
    backdropUrl: "/images/wildwood-tv-backdrop.jpg",
    rating: 8.3,
    year: 2023,
    seasons: 2,
    episodes: 18,
    genres: ["Drama", "Mystery"],
    status: "Ongoing",
    network: "StreamVault Original",
  },
  {
    id: 5,
    title: "Laughing Stock",
    description:
      "A mockumentary comedy following the chaotic behind-the-scenes world of a struggling late-night talk show desperately trying to stay relevant.",
    posterUrl: "/images/laughing-stock-tv-poster.jpg",
    backdropUrl: "/images/laughing-stock-tv-backdrop.jpg",
    rating: 8.0,
    year: 2024,
    seasons: 1,
    episodes: 10,
    genres: ["Comedy"],
    status: "New",
    network: "StreamVault Original",
    isNew: true,
  },
  {
    id: 6,
    title: "Phantom Protocol",
    description:
      "Elite intelligence operatives race against time to dismantle a shadow organization that has infiltrated the highest levels of global governments.",
    posterUrl: "/images/phantom-protocol-tv-poster.jpg",
    backdropUrl: "/images/phantom-protocol-tv-backdrop.jpg",
    rating: 8.6,
    year: 2022,
    seasons: 4,
    episodes: 48,
    genres: ["Action", "Thriller", "Drama"],
    status: "Ended",
    network: "StreamVault Original",
  },
  {
    id: 7,
    title: "Starfall Academy",
    description:
      "Young gifted students at a secret academy discover their powers are tied to an ancient prophecy that could either save or destroy their world.",
    posterUrl: "/images/starfall-academy-tv-poster.jpg",
    backdropUrl: "/images/starfall-academy-tv-backdrop.jpg",
    rating: 7.9,
    year: 2024,
    seasons: 1,
    episodes: 12,
    genres: ["Fantasy", "Drama", "Adventure"],
    status: "New",
    network: "StreamVault Original",
    isNew: true,
  },
  {
    id: 8,
    title: "The Hollow Earth",
    description:
      "A documentary-style thriller following a team of geologists who discover a vast underground civilization that has been hidden from humanity for millennia.",
    posterUrl: "/images/hollow-earth-tv-poster.jpg",
    backdropUrl: "/images/hollow-earth-tv-backdrop.jpg",
    rating: 8.2,
    year: 2023,
    seasons: 2,
    episodes: 16,
    genres: ["Sci-Fi", "Adventure", "Mystery"],
    status: "Ongoing",
    network: "StreamVault Original",
  },
  {
    id: 9,
    title: "Crimson Tide Rising",
    description:
      "A political thriller set in a fictional coastal nation where a senator uncovers a conspiracy that reaches into the heart of the military-industrial complex.",
    posterUrl: "/images/crimson-tide-rising-poster.jpg",
    backdropUrl: "/images/crimson-tide-rising-poster.jpg",
    rating: 8.5,
    year: 2023,
    seasons: 3,
    episodes: 30,
    genres: ["Thriller", "Drama", "Crime"],
    status: "Ongoing",
    network: "StreamVault Original",
  },
  {
    id: 10,
    title: "Bloom & Wither",
    description:
      "A heartfelt romantic drama spanning four decades, following two artists whose lives keep intersecting in unexpected ways across continents and cultures.",
    posterUrl: "/images/bloom-and-wither-tv-poster.jpg",
    backdropUrl: "/images/bloom-and-wither-tv-backdrop.jpg",
    rating: 8.1,
    year: 2024,
    seasons: 1,
    episodes: 8,
    genres: ["Romance", "Drama"],
    status: "New",
    network: "StreamVault Original",
    isNew: true,
  },
  {
    id: 11,
    title: "Iron & Ash",
    description:
      "In a post-apocalyptic wasteland, a lone blacksmith forges alliances with scattered survivors to rebuild civilization against marauding warlords.",
    posterUrl: "/images/iron-and-ash-tv-poster.jpg",
    backdropUrl: "/images/iron-and-ash-tv-backdrop.jpg",
    rating: 8.8,
    year: 2022,
    seasons: 4,
    episodes: 40,
    genres: ["Action", "Sci-Fi", "Drama"],
    status: "Ended",
    network: "StreamVault Original",
    isTrending: true,
  },
  {
    id: 12,
    title: "Midnight Cartography",
    description:
      "An anthology series where each episode explores a different city through the eyes of a cartographer who maps not just streets, but human stories.",
    posterUrl: "/images/midnight-cartography-tv-poster.jpg",
    backdropUrl: "/images/midnight-cartography-tv-backdrop.jpg",
    rating: 7.8,
    year: 2023,
    seasons: 2,
    episodes: 24,
    genres: ["Drama", "Documentary"],
    status: "Ongoing",
    network: "StreamVault Original",
  },
];

const ALL_GENRES = [
  "All",
  "Action",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "History",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Adventure",
  "Documentary",
];

const SORT_OPTIONS = [
  { value: "trending", label: "Trending" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title", label: "A–Z" },
];

const STATUS_OPTIONS = ["All", "Ongoing", "Ended", "New"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function FeaturedBanner({ show }: { show: TVShow }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      variants={fadeIn}
      className="relative w-full h-[56vw] max-h-[600px] min-h-[340px] overflow-hidden rounded-2xl mb-10"
    >
      <img
        src={show.backdropUrl}
        alt={show.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "https://www.shutterstock.com/image-vector/fall-back-daylight-saving-time-260nw-2523661059.jpg";
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerContainer}
          className="max-w-xl"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-3">
            <span className="bg-[#E50914] text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              Featured
            </span>
            <span className="text-[#B3B3B3] text-sm">{show.network}</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3"
          >
            {show.title}
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-4 mb-4 text-sm text-[#B3B3B3]"
          >
            <span className="flex items-center gap-1 text-yellow-400 font-semibold">
              <Star size={14} fill="currentColor" />
              {show.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {show.year}
            </span>
            <span className="flex items-center gap-1">
              <Tv size={13} />
              {show.seasons} Season{show.seasons !== 1 ? "s" : ""}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                show.status === "Ongoing"
                  ? "bg-green-500/20 text-green-400"
                  : show.status === "New"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-white/10 text-white/60"
              }`}
            >
              {show.status}
            </span>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-[#B3B3B3] text-sm sm:text-base leading-relaxed mb-6 line-clamp-3"
          >
            {show.description}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex items-center gap-3">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
            >
              <Play size={16} fill="currentColor" />
              Play Now
            </motion.button>
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/25 transition-colors text-sm border border-white/20"
            >
              <Plus size={16} />
              My List
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ShowCard({ show, index }: { show: TVShow; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-pointer rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={show.posterUrl}
          alt={show.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://i.sstatic.net/1cMfK.png";
          }}
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {show.isNew && (
            <span className="bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              New
            </span>
          )}
          {show.isTrending && !show.isNew && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Trending
            </span>
          )}
        </div>
        {/* Rating badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
          <Star size={11} className="text-yellow-400" fill="currentColor" />
          <span className="text-white text-xs font-semibold">
            {show.rating.toFixed(1)}
          </span>
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
            >
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
              >
                <Play size={20} fill="black" className="text-black ml-0.5" />
              </motion.button>
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center"
              >
                <Plus size={18} className="text-white" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-1 mb-1">
          {show.title}
        </h3>
        <div className="flex items-center justify-between text-[#B3B3B3] text-xs mb-2">
          <span className="flex items-center gap-1">
            <Tv size={11} />
            {show.seasons}S · {show.episodes}EP
          </span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
              show.status === "Ongoing"
                ? "bg-green-500/20 text-green-400"
                : show.status === "New"
                ? "bg-blue-500/20 text-blue-400"
                : "bg-white/10 text-white/50"
            }`}
          >
            {show.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {(show.genres ?? []).slice(0, 2).map((g) => (
            <span
              key={g}
              className="text-[10px] text-[#B3B3B3] bg-white/8 px-1.5 py-0.5 rounded"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function TVShowsPage() {
  const shouldReduceMotion = useReducedMotion();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("trending");
  const [showFilters, setShowFilters] = useState(false);

  const featuredShow = TV_SHOWS.find((s) => s.isFeatured) ?? TV_SHOWS[0];

  const filteredShows = useMemo(() => {
    let result = [...TV_SHOWS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.genres ?? []).some((g) => g.toLowerCase().includes(q))
      );
    }

    if (selectedGenre !== "All") {
      result = result.filter((s) =>
        (s.genres ?? []).includes(selectedGenre)
      );
    }

    if (selectedStatus !== "All") {
      result = result.filter((s) => s.status === selectedStatus);
    }

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "oldest":
        result.sort((a, b) => a.year - b.year);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "trending":
      default:
        result.sort((a, b) => {
          const aScore = (a.isTrending ? 2 : 0) + (a.isNew ? 1 : 0);
          const bScore = (b.isTrending ? 2 : 0) + (b.isNew ? 1 : 0);
          return bScore - aScore || b.rating - a.rating;
        });
        break;
    }

    return result;
  }, [searchQuery, selectedGenre, selectedStatus, sortBy]);

  const trendingShows = TV_SHOWS.filter((s) => s.isTrending);
  const newShows = TV_SHOWS.filter((s) => s.isNew);

  return (
    <main className="min-h-screen bg-[#141414] text-white pt-20 pb-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerContainer}
          className="mb-8"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-[#E50914] rounded-full" />
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              TV Shows
            </h1>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-[#B3B3B3] text-base ml-4 pl-3">
            Binge-worthy series across every genre — from gripping dramas to laugh-out-loud comedies.
          </motion.p>
        </motion.div>

        {/* Featured Banner */}
        <FeaturedBanner show={featuredShow} />

        {/* Trending Now Row */}
        <motion.section
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold text-white">Trending Now</h2>
            <span className="text-[#E50914] text-sm font-semibold">🔥 Hot</span>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4"
          >
            {trendingShows.map((show, i) => (
              <ShowCard key={show.id} show={show} index={i} />
            ))}
          </motion.div>
        </motion.section>

        {/* New Arrivals Row */}
        <motion.section
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-5">
            <h2 className="text-xl font-bold text-white">New Arrivals</h2>
            <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Just Added
            </span>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4"
          >
            {newShows.map((show, i) => (
              <ShowCard key={show.id} show={show} index={i} />
            ))}
          </motion.div>
        </motion.section>

        {/* Divider */}
        <div className="border-t border-white/8 mb-10" />

        {/* Browse All Section */}
        <motion.section
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeInUp}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-white">Browse All Shows</h2>
            <span className="text-[#B3B3B3] text-sm">
              {filteredShows.length} title{filteredShows.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Search + Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B3B3B3]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search TV shows..."
                className="w-full bg-white/8 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white text-sm placeholder-[#B3B3B3] focus:outline-none focus:border-[#E50914]/60 focus:bg-white/12 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B3B3B3] hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white/8 border border-white/10 rounded-lg px-4 py-2.5 pr-9 text-white text-sm focus:outline-none focus:border-[#E50914]/60 transition-all cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B3B3B3] pointer-events-none"
              />
            </div>

            {/* Filter Toggle */}
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                showFilters
                  ? "bg-[#E50914] border-[#E50914] text-white"
                  : "bg-white/8 border-white/10 text-[#B3B3B3] hover:text-white hover:border-white/25"
              }`}
            >
              <Filter size={15} />
              Filters
            </motion.button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden mb-6"
              >
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-5">
                  {/* Genre Filter */}
                  <div>
                    <p className="text-white text-sm font-semibold mb-3">Genre</p>
                    <div className="flex flex-wrap gap-2">
                      {ALL_GENRES.map((genre) => (
                        <motion.button
                          key={genre}
                          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                          onClick={() => setSelectedGenre(genre)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            selectedGenre === genre
                              ? "bg-[#E50914] text-white"
                              : "bg-white/8 text-[#B3B3B3] hover:text-white hover:bg-white/15 border border-white/10"
                          }`}
                        >
                          {genre}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <p className="text-white text-sm font-semibold mb-3">Status</p>
                    <div className="flex flex-wrap gap-2">
                      {STATUS_OPTIONS.map((status) => (
                        <motion.button
                          key={status}
                          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                          onClick={() => setSelectedStatus(status)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            selectedStatus === status
                              ? "bg-[#E50914] text-white"
                              : "bg-white/8 text-[#B3B3B3] hover:text-white hover:bg-white/15 border border-white/10"
                          }`}
                        >
                          {status}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Reset */}
                  {(selectedGenre !== "All" || selectedStatus !== "All") && (
                    <button
                      onClick={() => {
                        setSelectedGenre("All");
                        setSelectedStatus("All");
                      }}
                      className="text-[#E50914] text-xs font-semibold hover:underline"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Genre Quick Pills (always visible) */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {ALL_GENRES.map((genre) => (
              <motion.button
                key={genre}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                onClick={() => setSelectedGenre(genre)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedGenre === genre
                    ? "bg-[#E50914] text-white"
                    : "bg-white/8 text-[#B3B3B3] hover:text-white border border-white/10"
                }`}
              >
                {genre}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          {filteredShows.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <Tv size={48} className="text-white/20 mb-4" />
              <p className="text-white/60 text-lg font-semibold mb-2">No shows found</p>
              <p className="text-[#B3B3B3] text-sm">
                Try adjusting your filters or search query.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("All");
                  setSelectedStatus("All");
                }}
                className="mt-5 text-[#E50914] text-sm font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${selectedGenre}-${selectedStatus}-${sortBy}-${searchQuery}`}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            >
              {filteredShows.map((show, i) => (
                <ShowCard key={show.id} show={show} index={i} />
              ))}
            </motion.div>
          )}
        </motion.section>

        {/* Stats Bar */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Shows", value: TV_SHOWS.length.toString(), icon: Tv },
            {
              label: "Ongoing Series",
              value: TV_SHOWS.filter((s) => s.status === "Ongoing").length.toString(),
              icon: Clock,
            },
            {
              label: "New This Month",
              value: TV_SHOWS.filter((s) => s.isNew).length.toString(),
              icon: Calendar,
            },
            {
              label: "Avg. Rating",
              value:
                (
                  TV_SHOWS.reduce((acc, s) => acc + s.rating, 0) /
                  TV_SHOWS.length
                ).toFixed(1),
              icon: Star,
            },
          ].map(({ label, value, icon: Icon }) => (
            <motion.div
              key={label}
              variants={scaleIn}
              className="bg-white/5 border border-white/8 rounded-xl p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-[#E50914]/15 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-[#E50914]" />
              </div>
              <div>
                <p className="text-white text-xl font-black">{value}</p>
                <p className="text-[#B3B3B3] text-xs">{label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}