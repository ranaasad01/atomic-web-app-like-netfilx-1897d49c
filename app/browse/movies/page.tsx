"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Search, Star, Play, Plus, ChevronDown, Filter, X, Clock, Calendar, ThumbsUp } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  rating: number;
  year: number;
  duration: string;
  genres: string[];
  isNew?: boolean;
  isTrending?: boolean;
  match: number;
}

const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Neon Horizon",
    description:
      "In a rain-soaked megacity of 2087, a rogue detective uncovers a conspiracy that blurs the line between human and machine.",
    posterUrl: "/images/neon-horizon-sci-fi-movie.jpg",
    rating: 8.4,
    year: 2024,
    duration: "2h 18m",
    genres: ["Sci-Fi", "Thriller"],
    isTrending: true,
    match: 97,
  },
  {
    id: 2,
    title: "The Last Meridian",
    description:
      "A cartographer's obsession with an unmapped territory leads her deep into a jungle where the laws of nature no longer apply.",
    posterUrl: "/images/last-meridian-adventure-jungle.jpg",
    rating: 7.9,
    year: 2024,
    duration: "1h 58m",
    genres: ["Adventure", "Drama"],
    isNew: true,
    match: 94,
  },
  {
    id: 3,
    title: "Crimson Accord",
    description:
      "Two rival crime families forge an uneasy alliance to survive a government crackdown, only to discover their bloodlines are intertwined.",
    posterUrl: "/images/crimson-accord-crime-drama.jpg",
    rating: 8.7,
    year: 2023,
    duration: "2h 34m",
    genres: ["Crime", "Drama"],
    isTrending: true,
    match: 96,
  },
  {
    id: 4,
    title: "Pale Blue Orbit",
    description:
      "An astronaut stranded on a dying space station must outwit an AI that has decided humanity is the mission's greatest threat.",
    posterUrl: "/images/pale-blue-orbit-space-thriller.jpg",
    rating: 8.1,
    year: 2024,
    duration: "2h 05m",
    genres: ["Sci-Fi", "Action"],
    isNew: true,
    match: 92,
  },
  {
    id: 5,
    title: "Wildfire Season",
    description:
      "A small-town firefighter battles an unprecedented blaze while confronting the ghosts of a tragedy she caused years before.",
    posterUrl: "/images/wildfire-season-drama-action.jpg",
    rating: 7.6,
    year: 2023,
    duration: "1h 52m",
    genres: ["Action", "Drama"],
    match: 88,
  },
  {
    id: 6,
    title: "The Quiet Algorithm",
    description:
      "A Silicon Valley whistleblower goes on the run after exposing a tech giant's plan to manipulate global elections through social media.",
    posterUrl: "/images/quiet-algorithm-tech-thriller.jpg",
    rating: 8.0,
    year: 2024,
    duration: "2h 11m",
    genres: ["Thriller", "Drama"],
    isNew: true,
    match: 95,
  },
  {
    id: 7,
    title: "Laughing in the Dark",
    description:
      "A stand-up comedian's rise to fame is derailed when a heckler from his past resurfaces with a secret that could destroy everything.",
    posterUrl: "/images/laughing-in-the-dark-comedy-drama.jpg",
    rating: 7.4,
    year: 2023,
    duration: "1h 44m",
    genres: ["Comedy", "Drama"],
    match: 85,
  },
  {
    id: 8,
    title: "Iron Covenant",
    description:
      "In medieval Europe, a blacksmith's daughter forges an unlikely alliance with a disgraced knight to stop a plague engineered by alchemists.",
    posterUrl: "/images/iron-covenant-medieval-fantasy.jpg",
    rating: 8.3,
    year: 2023,
    duration: "2h 27m",
    genres: ["Fantasy", "Action"],
    isTrending: true,
    match: 91,
  },
  {
    id: 9,
    title: "Saltwater Gospel",
    description:
      "A grieving marine biologist discovers a hidden underwater civilization that challenges everything she believes about human origins.",
    posterUrl: "/images/saltwater-gospel-underwater-mystery.jpg",
    rating: 7.8,
    year: 2024,
    duration: "2h 02m",
    genres: ["Sci-Fi", "Drama"],
    isNew: true,
    match: 89,
  },
  {
    id: 10,
    title: "Dust & Dynasties",
    description:
      "Three generations of a ranching family fight to preserve their land as a powerful corporation and a devastating drought close in.",
    posterUrl: "/images/dust-dynasties-western-drama.jpg",
    rating: 8.5,
    year: 2023,
    duration: "2h 41m",
    genres: ["Drama", "Western"],
    isTrending: true,
    match: 93,
  },
  {
    id: 11,
    title: "Ghost Frequency",
    description:
      "A paranormal investigator with a scientific mind stumbles upon a radio signal that appears to be transmitting from the dead.",
    posterUrl: "/images/ghost-frequency-horror-mystery.jpg",
    rating: 7.2,
    year: 2024,
    duration: "1h 49m",
    genres: ["Horror", "Mystery"],
    isNew: true,
    match: 82,
  },
  {
    id: 12,
    title: "The Venetian Cipher",
    description:
      "An art restorer in Venice uncovers a 500-year-old conspiracy hidden within a Renaissance masterpiece that powerful forces will kill to keep secret.",
    posterUrl: "/images/venetian-cipher-mystery-thriller.jpg",
    rating: 7.7,
    year: 2023,
    duration: "2h 08m",
    genres: ["Thriller", "Mystery"],
    match: 87,
  },
  {
    id: 13,
    title: "Borrowed Light",
    description:
      "A blind photographer regains her sight after an experimental procedure, only to see things others cannot — and wish she couldn't.",
    posterUrl: "/images/borrowed-light-drama-supernatural.jpg",
    rating: 8.2,
    year: 2024,
    duration: "1h 56m",
    genres: ["Drama", "Horror"],
    isNew: true,
    match: 90,
  },
  {
    id: 14,
    title: "Velocity Kings",
    description:
      "Underground street racers in São Paulo risk everything to expose a corrupt police syndicate running a billion-dollar smuggling ring.",
    posterUrl: "/images/velocity-kings-action-racing.jpg",
    rating: 7.3,
    year: 2023,
    duration: "1h 58m",
    genres: ["Action", "Crime"],
    match: 84,
  },
  {
    id: 15,
    title: "Starfall Requiem",
    description:
      "When a meteor shower triggers dormant alien technology buried beneath Antarctica, a linguist becomes humanity's only hope for communication.",
    posterUrl: "/images/starfall-requiem-alien-sci-fi.jpg",
    rating: 8.6,
    year: 2024,
    duration: "2h 22m",
    genres: ["Sci-Fi", "Action"],
    isTrending: true,
    match: 98,
  },
  {
    id: 16,
    title: "The Apiary",
    description:
      "A reclusive beekeeper in rural France discovers her hives hold the key to a cure for a spreading neurological epidemic.",
    posterUrl: "/images/the-apiary-french-drama-mystery.jpg",
    rating: 7.5,
    year: 2023,
    duration: "1h 47m",
    genres: ["Drama", "Mystery"],
    match: 86,
  },
];

const ALL_GENRES = [
  "All",
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Sci-Fi",
  "Thriller",
  "Western",
];

const SORT_OPTIONS = [
  { value: "trending", label: "Trending" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
  { value: "match", label: "Best Match" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function MovieCard({ movie, index }: { movie: Movie; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [inList, setInList] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-pointer rounded-xl overflow-hidden bg-[#1a1a1a] shadow-lg"
      whileHover={shouldReduceMotion ? {} : { scale: 1.04, zIndex: 10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' fill='%23555' font-size='16' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {movie.isTrending && (
            <span className="bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Trending
            </span>
          )}
          {movie.isNew && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              New
            </span>
          )}
        </div>

        {/* Match badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-black/70 backdrop-blur-sm text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {movie.match}% Match
          </span>
        </div>

        {/* Hover overlay content */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Link href={`/watch/${movie.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full hover:bg-white/90 transition-colors"
                  >
                    <Play size={12} fill="black" />
                    Play
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setInList((v) => !v);
                  }}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                    inList
                      ? "bg-white border-white text-black"
                      : "border-white/60 text-white hover:border-white"
                  }`}
                  aria-label={inList ? "Remove from list" : "Add to list"}
                >
                  {inList ? <X size={12} /> : <Plus size={12} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-7 h-7 rounded-full border-2 border-white/60 flex items-center justify-center text-white hover:border-white transition-colors"
                  aria-label="Like"
                >
                  <ThumbsUp size={12} />
                </motion.button>
              </div>
              <p className="text-white/80 text-[11px] line-clamp-2 leading-relaxed">
                {movie.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card footer */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm truncate mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-[11px] text-[#B3B3B3]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5">
              <Star size={10} className="text-yellow-400 fill-yellow-400" />
              {movie.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-0.5">
              <Calendar size={10} />
              {movie.year}
            </span>
            <span className="flex items-center gap-0.5">
              <Clock size={10} />
              {movie.duration}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {(movie.genres ?? []).slice(0, 2).map((g) => (
            <span
              key={g}
              className="bg-white/10 text-white/70 text-[10px] px-1.5 py-0.5 rounded-md"
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

export default function BrowseMoviesPage() {
  const shouldReduceMotion = useReducedMotion();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("trending");
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState("0");

  const filteredMovies = useMemo(() => {
    let result = [...MOVIES];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          (m.genres ?? []).some((g) => g.toLowerCase().includes(q))
      );
    }

    // Genre filter
    if (selectedGenre !== "All") {
      result = result.filter((m) =>
        (m.genres ?? []).includes(selectedGenre)
      );
    }

    // Rating filter
    const minR = parseFloat(minRating) || 0;
    result = result.filter((m) => (m.rating ?? 0) >= minR);

    // Sort
    if (sortBy === "rating") {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    } else if (sortBy === "match") {
      result.sort((a, b) => (b.match ?? 0) - (a.match ?? 0));
    } else {
      // trending: trending first, then by rating
      result.sort((a, b) => {
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return (b.rating ?? 0) - (a.rating ?? 0);
      });
    }

    return result;
  }, [searchQuery, selectedGenre, sortBy, minRating]);

  const featuredMovie = MOVIES.find((m) => m.isTrending) ?? MOVIES[0];

  return (
    <main className="min-h-screen bg-[#141414] text-white pt-20">
      {/* ── Hero Banner ── */}
      <motion.section
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={fadeIn}
        className="relative h-[52vh] min-h-[340px] overflow-hidden mb-10"
      >
        <img
          src={featuredMovie?.posterUrl ?? ""}
          alt={featuredMovie?.title ?? "Featured"}
          className="w-full h-full object-cover object-top scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-end pb-12 px-6 sm:px-10 lg:px-16">
          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            className="max-w-xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-3">
              <span className="bg-[#E50914] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                Featured
              </span>
              <span className="text-[#B3B3B3] text-sm">
                {featuredMovie?.year} · {featuredMovie?.duration}
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-black tracking-tight mb-3 leading-tight"
            >
              {featuredMovie?.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-[#B3B3B3] text-sm sm:text-base leading-relaxed mb-5 line-clamp-2"
            >
              {featuredMovie?.description}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <Link href={`/watch/${featuredMovie?.id ?? 1}`}>
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="flex items-center gap-2 bg-white text-black font-bold px-6 py-2.5 rounded-lg hover:bg-white/90 transition-colors text-sm"
                >
                  <Play size={16} fill="black" />
                  Play Now
                </motion.button>
              </Link>
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-white/30 transition-colors text-sm border border-white/20"
              >
                <Plus size={16} />
                My List
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Controls Bar ── */}
      <motion.section
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
        className="px-6 sm:px-10 lg:px-16 mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-2xl font-bold text-white">All Movies</h2>
            <p className="text-[#B3B3B3] text-sm mt-0.5">
              {filteredMovies.length} title{filteredMovies.length !== 1 ? "s" : ""} available
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B3B3B3]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies…"
                className="bg-[#2a2a2a] border border-white/10 text-white placeholder-[#B3B3B3] text-sm rounded-lg pl-9 pr-4 py-2 w-48 focus:outline-none focus:border-[#E50914]/60 focus:ring-1 focus:ring-[#E50914]/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#B3B3B3] hover:text-white"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#2a2a2a] border border-white/10 text-white text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-[#E50914]/60 cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#B3B3B3] pointer-events-none"
              />
            </div>

            {/* Filter toggle */}
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${
                showFilters
                  ? "bg-[#E50914] border-[#E50914] text-white"
                  : "bg-[#2a2a2a] border-white/10 text-[#B3B3B3] hover:text-white hover:border-white/30"
              }`}
            >
              <Filter size={14} />
              Filters
            </motion.button>
          </div>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="bg-[#1e1e1e] border border-white/8 rounded-xl p-5 mb-5">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Min Rating */}
                  <div>
                    <label className="text-[#B3B3B3] text-xs font-semibold uppercase tracking-wide mb-2 block">
                      Minimum Rating
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="9"
                        step="0.5"
                        value={minRating}
                        onChange={(e) => setMinRating(e.target.value)}
                        className="w-32 accent-[#E50914]"
                      />
                      <span className="text-white font-bold text-sm w-8">
                        {parseFloat(minRating).toFixed(1)}+
                      </span>
                    </div>
                  </div>

                  {/* Quick filters */}
                  <div>
                    <label className="text-[#B3B3B3] text-xs font-semibold uppercase tracking-wide mb-2 block">
                      Quick Filters
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {["Trending", "New Releases"].map((label) => (
                        <button
                          key={label}
                          onClick={() => {
                            if (label === "Trending") setSortBy("trending");
                            if (label === "New Releases") setSortBy("newest");
                            setShowFilters(false);
                          }}
                          className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-full transition-colors"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Genre Pills */}
        <div className="flex gap-2 flex-wrap">
          {ALL_GENRES.map((genre) => (
            <motion.button
              key={genre}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              onClick={() => setSelectedGenre(genre)}
              className={`text-sm px-4 py-1.5 rounded-full font-medium transition-all duration-200 ${
                selectedGenre === genre
                  ? "bg-[#E50914] text-white shadow-lg shadow-[#E50914]/30"
                  : "bg-[#2a2a2a] text-[#B3B3B3] hover:text-white hover:bg-[#333]"
              }`}
            >
              {genre}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* ── Movie Grid ── */}
      <section className="px-6 sm:px-10 lg:px-16 pb-20">
        {filteredMovies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <Search size={48} className="text-[#333] mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">
              No movies found
            </h3>
            <p className="text-[#B3B3B3] text-sm max-w-xs">
              Try adjusting your search or filters to discover more titles.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("All");
                setMinRating("0");
              }}
              className="mt-5 bg-[#E50914] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#c40812] transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={`${selectedGenre}-${sortBy}-${searchQuery}-${minRating}`}
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {filteredMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </motion.div>
        )}
      </section>

      {/* ── Trending Row ── */}
      {selectedGenre === "All" && !searchQuery && (
        <motion.section
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="px-6 sm:px-10 lg:px-16 pb-20"
        >
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#E50914] rounded-full inline-block" />
            Trending This Week
          </h2>
          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
          >
            {MOVIES.filter((m) => m.isTrending).map((movie, index) => (
              <motion.div
                key={movie.id}
                variants={scaleIn}
                className="flex-shrink-0 w-44 relative group cursor-pointer"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              >
                <div className="relative rounded-xl overflow-hidden aspect-[2/3]">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23222'/%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <Link href={`/watch/${movie.id}`}>
                      <button className="flex items-center gap-1 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full">
                        <Play size={11} fill="black" />
                        Play
                      </button>
                    </Link>
                  </div>
                  {/* Rank number */}
                  <div className="absolute bottom-2 left-2 text-5xl font-black text-white/20 leading-none select-none">
                    {index + 1}
                  </div>
                </div>
                <p className="text-white text-xs font-semibold mt-2 truncate">
                  {movie.title}
                </p>
                <p className="text-[#B3B3B3] text-[10px] mt-0.5">
                  {movie.year} · {movie.duration}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      )}
    </main>
  );
}