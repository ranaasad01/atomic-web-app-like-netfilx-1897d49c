"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart, Trash2, Play, Plus, Search, Film, Star, Clock, ChevronRight } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface WatchlistItem {
  id: number;
  title: string;
  posterUrl: string;
  year: number;
  rating: number;
  duration: string;
  genres: string[];
  type: "movie" | "tv";
  description: string;
}

// ─── Mock Seed Data (used to pre-populate if localStorage is empty) ───────────

const SEED_WATCHLIST: WatchlistItem[] = [
  {
    id: 1,
    title: "Interstellar",
    posterUrl: "/images/interstellar-space-wormhole.jpg",
    year: 2014,
    rating: 8.6,
    duration: "2h 49m",
    genres: ["Sci-Fi", "Drama"],
    type: "movie",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 2,
    title: "Stranger Things",
    posterUrl: "/images/stranger-things-upside-down.jpg",
    year: 2016,
    rating: 8.7,
    duration: "4 Seasons",
    genres: ["Sci-Fi", "Horror"],
    type: "tv",
    description: "When a young boy disappears, his mother and friends must confront terrifying supernatural forces.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    posterUrl: "/images/dark-knight-batman-joker.jpg",
    year: 2008,
    rating: 9.0,
    duration: "2h 32m",
    genres: ["Action", "Thriller"],
    type: "movie",
    description: "Batman faces the Joker, a criminal mastermind who plunges Gotham City into anarchy.",
  },
  {
    id: 4,
    title: "Breaking Bad",
    posterUrl: "/images/breaking-bad-chemistry-lab.jpg",
    year: 2008,
    rating: 9.5,
    duration: "5 Seasons",
    genres: ["Drama", "Thriller"],
    type: "tv",
    description: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student.",
  },
  {
    id: 5,
    title: "Dune",
    posterUrl: "/images/dune-desert-planet-arrakis.jpg",
    year: 2021,
    rating: 8.0,
    duration: "2h 35m",
    genres: ["Sci-Fi", "Adventure"],
    type: "movie",
    description: "Paul Atreides leads nomadic tribes in a revolt against the galactic emperor on the desert planet Arrakis.",
  },
  {
    id: 6,
    title: "The Crown",
    posterUrl: "/images/the-crown-royal-palace.jpg",
    year: 2016,
    rating: 8.6,
    duration: "6 Seasons",
    genres: ["Drama", "History"],
    type: "tv",
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
  },
  {
    id: 7,
    title: "Oppenheimer",
    posterUrl: "/images/oppenheimer-atomic-bomb-explosion.jpg",
    year: 2023,
    rating: 8.5,
    duration: "3h 0m",
    genres: ["Drama", "History"],
    type: "movie",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
  },
  {
    id: 8,
    title: "Severance",
    posterUrl: "/images/severance-office-corporate-thriller.jpg",
    year: 2022,
    rating: 8.7,
    duration: "2 Seasons",
    genres: ["Thriller", "Sci-Fi"],
    type: "tv",
    description: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives.",
  },
];

const STORAGE_KEY = "streamvault_watchlist";

// ─── Card Component ───────────────────────────────────────────────────────────

interface WatchlistCardProps {
  item: WatchlistItem;
  onRemove: (id: number) => void;
  shouldReduceMotion: boolean | null;
}

function WatchlistCard({ item, onRemove, shouldReduceMotion }: WatchlistCardProps) {
  const [hovered, setHovered] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 300);
  };

  return (
    <motion.div
      layout
      variants={scaleIn}
      animate={removing ? { opacity: 0, scale: 0.85 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative group rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://ih1.redbubble.net/image.4530943030.1265/flat,750x,075,f-pad,750x1000,f8f8f8.jpg";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            item.type === "tv"
              ? "bg-blue-600/90 text-white"
              : "bg-[#E50914]/90 text-white"
          }`}>
            {item.type === "tv" ? "TV" : "FILM"}
          </span>
        </div>

        {/* Remove button */}
        <motion.button
          onClick={handleRemove}
          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white/70 hover:text-[#E50914] hover:border-[#E50914]/50 transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label={`Remove ${item.title} from list`}
        >
          <Trash2 size={14} />
        </motion.button>

        {/* Hover overlay with actions */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-end pb-4 gap-2"
            >
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="flex items-center gap-2 bg-white text-black font-bold text-sm px-5 py-2 rounded-full hover:bg-white/90 transition-colors"
              >
                <Play size={14} fill="black" />
                Play
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">{item.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold">{item.rating.toFixed(1)}</span>
            <span className="text-white/50 text-xs">·</span>
            <span className="text-white/60 text-xs">{item.year}</span>
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-3">
        <div className="flex items-center gap-1.5 flex-wrap mb-2">
          {(item.genres ?? []).slice(0, 2).map((g) => (
            <span key={g} className="text-xs text-[#B3B3B3] bg-white/8 px-2 py-0.5 rounded-full border border-white/10">
              {g}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-[#B3B3B3] text-xs">
          <Clock size={11} />
          <span>{item.duration}</span>
        </div>
        <p className="text-[#B3B3B3] text-xs mt-2 line-clamp-2 leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <motion.div
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      variants={fadeInUp}
      className="flex flex-col items-center justify-center py-32 px-4 text-center"
    >
      <motion.div
        variants={scaleIn}
        className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6"
      >
        <Heart size={36} className="text-[#E50914]" />
      </motion.div>
      <h2 className="text-white text-2xl font-bold mb-3">Your list is empty</h2>
      <p className="text-[#B3B3B3] text-base max-w-md mb-8 leading-relaxed">
        Add movies and TV shows to your list so you can easily find them later. Start exploring and save your favorites!
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/">
          <motion.span
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
            className="inline-flex items-center gap-2 bg-[#E50914] hover:bg-[#f40612] text-white font-bold px-6 py-3 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <Play size={16} fill="white" />
            Browse Content
          </motion.span>
        </Link>
        <Link href="/browse/movies">
          <motion.span
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/20 transition-colors duration-200 cursor-pointer"
          >
            <Film size={16} />
            Explore Movies
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

type FilterType = "all" | "movie" | "tv";

interface FilterBarProps {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  totalCount: number;
  shouldReduceMotion: boolean | null;
}

function FilterBar({ filter, setFilter, searchQuery, setSearchQuery, totalCount, shouldReduceMotion }: FilterBarProps) {
  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movie" },
    { label: "TV Shows", value: "tv" },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
    >
      <div className="flex items-center gap-2">
        {filters.map((f) => (
          <motion.button
            key={f.value}
            onClick={() => setFilter(f.value)}
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              filter === f.value
                ? "bg-[#E50914] text-white shadow-lg shadow-[#E50914]/30"
                : "bg-white/8 text-[#B3B3B3] hover:bg-white/15 hover:text-white border border-white/10"
            }`}
          >
            {f.label}
          </motion.button>
        ))}
        <span className="text-[#B3B3B3] text-sm ml-2">
          <span className="text-white font-semibold">{totalCount}</span> title{totalCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-64">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B3B3B3]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your list…"
          className="w-full bg-white/8 border border-white/15 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-[#B3B3B3] focus:outline-none focus:border-[#E50914]/60 focus:bg-white/12 transition-all duration-200"
        />
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MyListPage() {
  const shouldReduceMotion = useReducedMotion();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Load from localStorage after mount (avoid hydration mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as WatchlistItem[];
        setWatchlist(Array.isArray(parsed) ? parsed : SEED_WATCHLIST);
      } else {
        // Pre-populate with seed data for demo
        setWatchlist(SEED_WATCHLIST);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_WATCHLIST));
      }
    } catch {
      setWatchlist(SEED_WATCHLIST);
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever watchlist changes (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch {
      // ignore storage errors
    }
  }, [watchlist, hydrated]);

  const handleRemove = useCallback((id: number) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleClearAll = () => {
    setWatchlist([]);
  };

  // Filter + search
  const filtered = (watchlist ?? []).filter((item) => {
    const matchesType = filter === "all" || item.type === filter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (item.title ?? "").toLowerCase().includes(q) ||
      (item.genres ?? []).some((g) => g.toLowerCase().includes(q));
    return matchesType && matchesSearch;
  });

  const movieCount = watchlist.filter((i) => i.type === "movie").length;
  const tvCount = watchlist.filter((i) => i.type === "tv").length;

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Header */}
      <div className="relative pt-24 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/60 via-[#141414]/80 to-[#141414]">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2 text-[#B3B3B3] text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white">My List</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">
                  My List
                </h1>
                <p className="text-[#B3B3B3] text-base">
                  Your personal collection of saved titles
                </p>
              </div>

              {watchlist.length > 0 && (
                <motion.button
                  onClick={handleClearAll}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  className="flex items-center gap-2 text-sm text-[#B3B3B3] hover:text-[#E50914] border border-white/15 hover:border-[#E50914]/40 px-4 py-2 rounded-lg transition-all duration-200 self-start sm:self-auto"
                >
                  <Trash2 size={14} />
                  Clear All
                </motion.button>
              )}
            </motion.div>

            {/* Stats row */}
            {watchlist.length > 0 && (
              <motion.div variants={fadeInUp} className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#E50914]" />
                  <span className="text-[#B3B3B3] text-sm">
                    <span className="text-white font-semibold">{movieCount}</span> Movie{movieCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[#B3B3B3] text-sm">
                    <span className="text-white font-semibold">{tvCount}</span> TV Show{tvCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={13} className="text-[#E50914]" />
                  <span className="text-[#B3B3B3] text-sm">
                    <span className="text-white font-semibold">{watchlist.length}</span> Total
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {watchlist.length === 0 ? (
          <EmptyState shouldReduceMotion={shouldReduceMotion} />
        ) : (
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={staggerContainer}
          >
            {/* Filter Bar */}
            <FilterBar
              filter={filter}
              setFilter={setFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              totalCount={filtered.length}
              shouldReduceMotion={shouldReduceMotion}
            />

            {/* No results from search/filter */}
            {filtered.length === 0 ? (
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <Search size={40} className="text-[#B3B3B3] mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">No results found</h3>
                <p className="text-[#B3B3B3] text-sm max-w-sm">
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setFilter("all"); }}
                  className="mt-5 text-[#E50914] text-sm font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((item) => (
                    <WatchlistCard
                      key={item.id}
                      item={item}
                      onRemove={handleRemove}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Add more CTA */}
            {filtered.length > 0 && (
              <motion.div
                variants={fadeInUp}
                className="mt-12 flex flex-col items-center gap-4 py-10 border-t border-white/8"
              >
                <p className="text-[#B3B3B3] text-sm">Want to add more titles?</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/browse/movies">
                    <motion.span
                      whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/18 text-white font-semibold px-5 py-2.5 rounded-lg border border-white/15 transition-colors duration-200 cursor-pointer text-sm"
                    >
                      <Film size={15} />
                      Browse Movies
                    </motion.span>
                  </Link>
                  <Link href="/browse/tv-shows">
                    <motion.span
                      whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/18 text-white font-semibold px-5 py-2.5 rounded-lg border border-white/15 transition-colors duration-200 cursor-pointer text-sm"
                    >
                      <Plus size={15} />
                      Browse TV Shows
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}