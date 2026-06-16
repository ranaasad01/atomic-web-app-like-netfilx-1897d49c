"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useParams } from "next/navigation";
import { Play, Plus, Check, Star, ChevronDown, Film, Tv, ArrowRight, X, Filter, SlidersHorizontal } from 'lucide-react';
import { genres, type ContentItem, type Genre } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";

// ─── Inline Mock Data ────────────────────────────────────────────────────────

const MOCK_CONTENT: ContentItem[] = [
  {
    id: 1,
    title: "Neon Horizon",
    description:
      "A rogue AI awakens in a cyberpunk megacity and must choose between its creators and humanity's survival.",
    posterUrl: "/images/neon-horizon-cyberpunk-movie.jpg",
    backdropUrl: "/images/neon-horizon-cyberpunk-backdrop.jpg",
    rating: 8.4,
    year: 2024,
    duration: "2h 18m",
    genres: ["Sci-Fi", "Action", "Thriller"],
    type: "movie",
    isTrending: true,
    isNew: true,
  },
  {
    id: 2,
    title: "Crimson Tides",
    description:
      "A deep-sea research team uncovers an ancient organism that rewrites everything we know about evolution.",
    posterUrl: "/images/crimson-tides-ocean-thriller.jpg",
    backdropUrl: "/images/crimson-tides-ocean-backdrop.jpg",
    rating: 7.9,
    year: 2024,
    duration: "1h 54m",
    genres: ["Thriller", "Horror", "Sci-Fi"],
    type: "movie",
    isTrending: true,
  },
  {
    id: 3,
    title: "The Last Ember",
    description:
      "In a post-collapse world, a former firefighter leads a ragtag group across a burning continent to reach the last safe city.",
    posterUrl: "/images/last-ember-post-apocalyptic.jpg",
    backdropUrl: "/images/last-ember-backdrop.jpg",
    rating: 8.1,
    year: 2023,
    duration: "2h 32m",
    genres: ["Action", "Drama", "Sci-Fi"],
    type: "movie",
  },
  {
    id: 4,
    title: "Velvet Underground",
    description:
      "A jazz musician in 1960s New York discovers a secret society that has been shaping world events through music.",
    posterUrl: "/images/velvet-underground-jazz-drama.jpg",
    backdropUrl: "/images/velvet-underground-backdrop.jpg",
    rating: 8.7,
    year: 2023,
    duration: "2h 05m",
    genres: ["Drama", "Thriller", "Romance"],
    type: "movie",
  },
  {
    id: 5,
    title: "Ghost Protocol: Reborn",
    description:
      "An elite operative believed dead returns to dismantle the shadow organization that betrayed her.",
    posterUrl: "/images/ghost-protocol-action-spy.jpg",
    backdropUrl: "/images/ghost-protocol-backdrop.jpg",
    rating: 7.6,
    year: 2024,
    duration: "2h 10m",
    genres: ["Action", "Thriller"],
    type: "movie",
    isNew: true,
  },
  {
    id: 6,
    title: "Starfall Chronicles",
    description:
      "When a meteor shower reveals alien artifacts buried beneath Earth, a linguist races to decode their message before governments weaponize them.",
    posterUrl: "/images/starfall-chronicles-sci-fi.jpg",
    backdropUrl: "/images/starfall-chronicles-backdrop.jpg",
    rating: 8.2,
    year: 2024,
    duration: "2h 24m",
    genres: ["Sci-Fi", "Drama"],
    type: "movie",
    isTrending: true,
    isNew: true,
  },
  {
    id: 7,
    title: "Laughing in the Dark",
    description:
      "A stand-up comedian navigates grief, fame, and family chaos in this heartfelt and hilarious dramedy.",
    posterUrl: "/images/laughing-dark-comedy-drama.jpg",
    backdropUrl: "/images/laughing-dark-backdrop.jpg",
    rating: 7.8,
    year: 2023,
    duration: "1h 48m",
    genres: ["Comedy", "Drama"],
    type: "movie",
  },
  {
    id: 8,
    title: "Iron Veil",
    description:
      "A Cold War spy thriller set in divided Berlin where a double agent must choose a side before the wall falls.",
    posterUrl: "/images/iron-veil-cold-war-spy.jpg",
    backdropUrl: "/images/iron-veil-backdrop.jpg",
    rating: 8.5,
    year: 2023,
    duration: "2h 15m",
    genres: ["Thriller", "Drama", "Action"],
    type: "movie",
  },
  {
    id: 9,
    title: "Bloom",
    description:
      "A botanist discovers that plants in her greenhouse are developing consciousness, sparking a philosophical and ecological crisis.",
    posterUrl: "/images/bloom-botanical-sci-fi.jpg",
    backdropUrl: "/images/bloom-backdrop.jpg",
    rating: 7.4,
    year: 2024,
    duration: "1h 58m",
    genres: ["Sci-Fi", "Drama", "Fantasy"],
    type: "movie",
    isNew: true,
  },
  {
    id: 10,
    title: "Midnight Carnival",
    description:
      "A traveling carnival hides a dark secret — every performer has made a deal they can never escape.",
    posterUrl: "/images/midnight-carnival-horror-fantasy.jpg",
    backdropUrl: "/images/midnight-carnival-backdrop.jpg",
    rating: 7.7,
    year: 2023,
    duration: "1h 52m",
    genres: ["Horror", "Fantasy", "Thriller"],
    type: "movie",
  },
  {
    id: 11,
    title: "The Cartographer",
    description:
      "A 19th-century mapmaker stumbles upon a continent that shouldn't exist, and the civilization that calls it home.",
    posterUrl: "/images/cartographer-adventure-fantasy.jpg",
    backdropUrl: "/images/cartographer-backdrop.jpg",
    rating: 8.0,
    year: 2024,
    duration: "2h 28m",
    genres: ["Fantasy", "Adventure", "Drama"],
    type: "movie",
  },
  {
    id: 12,
    title: "Parallel Lives",
    description:
      "Two strangers in different timelines realize they are living mirror versions of each other's lives — and one must sacrifice everything to save the other.",
    posterUrl: "/images/parallel-lives-romance-sci-fi.jpg",
    backdropUrl: "/images/parallel-lives-backdrop.jpg",
    rating: 8.3,
    year: 2024,
    duration: "2h 02m",
    genres: ["Romance", "Sci-Fi", "Drama"],
    type: "movie",
    isTrending: true,
  },
  {
    id: 13,
    title: "Apex Predator",
    description:
      "A wildlife documentarian embedded with a military unit discovers the jungle holds something far more dangerous than any animal.",
    posterUrl: "/images/apex-predator-action-horror.jpg",
    backdropUrl: "/images/apex-predator-backdrop.jpg",
    rating: 7.5,
    year: 2023,
    duration: "1h 44m",
    genres: ["Action", "Horror", "Thriller"],
    type: "movie",
  },
  {
    id: 14,
    title: "Echoes of Tomorrow",
    description:
      "A grief counselor begins receiving messages from her future self warning of a catastrophe only she can prevent.",
    posterUrl: "/images/echoes-tomorrow-sci-fi-drama.jpg",
    backdropUrl: "/images/echoes-tomorrow-backdrop.jpg",
    rating: 8.6,
    year: 2024,
    duration: "2h 20m",
    genres: ["Sci-Fi", "Drama", "Thriller"],
    type: "movie",
    isNew: true,
    isTrending: true,
  },
  {
    id: 15,
    title: "Shattered Glass",
    description:
      "A documentary crew filming inside a maximum-security prison becomes entangled in a dangerous escape plot.",
    posterUrl: "/images/shattered-glass-crime-documentary.jpg",
    backdropUrl: "/images/shattered-glass-backdrop.jpg",
    rating: 7.9,
    year: 2023,
    duration: "1h 56m",
    genres: ["Documentary", "Thriller", "Drama"],
    type: "movie",
  },
  {
    id: 16,
    title: "Wildfire Season",
    description:
      "A family torn apart by circumstance reunites when their hometown is threatened by an unstoppable wildfire.",
    posterUrl: "/images/wildfire-season-drama.jpg",
    backdropUrl: "/images/wildfire-season-backdrop.jpg",
    rating: 7.6,
    year: 2024,
    duration: "1h 50m",
    genres: ["Drama", "Action"],
    type: "movie",
    isNew: true,
  },
  {
    id: 17,
    title: "The Animator",
    description:
      "A behind-the-scenes look at the golden age of animation through the eyes of a visionary artist who changed the industry forever.",
    posterUrl: "/images/animator-animation-documentary.jpg",
    backdropUrl: "/images/animator-backdrop.jpg",
    rating: 8.1,
    year: 2023,
    duration: "1h 38m",
    genres: ["Animation", "Documentary"],
    type: "movie",
  },
  {
    id: 18,
    title: "Frostbound",
    description:
      "Stranded in the Arctic after a plane crash, a group of survivors must battle the elements — and each other — to stay alive.",
    posterUrl: "/images/frostbound-survival-thriller.jpg",
    backdropUrl: "/images/frostbound-backdrop.jpg",
    rating: 7.8,
    year: 2024,
    duration: "2h 06m",
    genres: ["Thriller", "Action", "Drama"],
    type: "movie",
  },
];

const PAGE_SIZE = 9;

// ─── Genre Metadata ──────────────────────────────────────────────────────────

const GENRE_META: Record<string, { color: string; description: string; emoji: string }> = {
  action: {
    color: "#E50914",
    description: "High-octane thrills, explosive set pieces, and heroes who never back down.",
    emoji: "💥",
  },
  comedy: {
    color: "#FFD700",
    description: "Laugh-out-loud moments, witty writing, and stories that leave you smiling.",
    emoji: "😂",
  },
  drama: {
    color: "#8B5CF6",
    description: "Powerful performances and emotionally resonant stories that stay with you.",
    emoji: "🎭",
  },
  horror: {
    color: "#FF4500",
    description: "Spine-chilling scares, psychological dread, and monsters both real and imagined.",
    emoji: "👻",
  },
  "sci-fi": {
    color: "#00BFFF",
    description: "Visions of the future, alternate realities, and the science that shapes tomorrow.",
    emoji: "🚀",
  },
  romance: {
    color: "#FF69B4",
    description: "Love stories that sweep you off your feet and break your heart in the best way.",
    emoji: "❤️",
  },
  thriller: {
    color: "#FF8C00",
    description: "Edge-of-your-seat suspense, twists you never saw coming, and relentless tension.",
    emoji: "🔪",
  },
  animation: {
    color: "#00C853",
    description: "Animated worlds that defy imagination — for every age and every heart.",
    emoji: "✨",
  },
  documentary: {
    color: "#20B2AA",
    description: "True stories, real people, and the world as it actually is — stranger than fiction.",
    emoji: "🎬",
  },
  fantasy: {
    color: "#9B59B6",
    description: "Epic quests, magical realms, and heroes destined for greatness beyond imagination.",
    emoji: "🧙",
  },
};

// ─── Watchlist Hook ──────────────────────────────────────────────────────────

function useWatchlist() {
  const [watchlist, setWatchlist] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("streamvault_watchlist");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setWatchlist(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback((id: number) => {
    setWatchlist((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem("streamvault_watchlist", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const isInList = useCallback((id: number) => watchlist.includes(id), [watchlist]);

  return { watchlist, toggle, isInList };
}

// ─── Content Card ────────────────────────────────────────────────────────────

interface ContentCardProps {
  item: ContentItem;
  onToggleWatchlist: (id: number) => void;
  inWatchlist: boolean;
}

function ContentCard({ item, onToggleWatchlist, inWatchlist }: ContentCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 shadow-lg hover:shadow-2xl hover:shadow-black/60 transition-all duration-300 cursor-pointer"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-[#222]">
        {!imgError ? (
          <img
            src={item.posterUrl}
            alt={item.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
            <Film size={40} className="text-white/20" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.isNew && (
            <span className="bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              New
            </span>
          )}
          {item.isTrending && (
            <span className="bg-orange-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Trending
            </span>
          )}
        </div>

        {/* Watchlist button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatchlist(item.id);
          }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            inWatchlist
              ? "bg-[#E50914] text-white"
              : "bg-black/60 text-white/70 hover:text-white hover:bg-black/80 opacity-0 group-hover:opacity-100"
          }`}
          aria-label={inWatchlist ? "Remove from My List" : "Add to My List"}
        >
          {inWatchlist ? <Check size={14} /> : <Plus size={14} />}
        </motion.button>

        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
          >
            <Play size={20} className="text-white fill-white ml-0.5" />
          </motion.div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm leading-tight truncate mb-1">
          {item.title}
        </h3>
        <div className="flex items-center gap-2 text-[#B3B3B3] text-xs mb-2">
          <span className="flex items-center gap-1">
            <Star size={10} className="text-yellow-400 fill-yellow-400" />
            {item.rating.toFixed(1)}
          </span>
          <span className="w-0.5 h-0.5 rounded-full bg-white/30" />
          <span>{item.year}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-white/30" />
          <span>{item.duration}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {(item.genres ?? []).slice(0, 2).map((g) => (
            <span
              key={g}
              className="text-[10px] text-[#B3B3B3] bg-white/8 px-2 py-0.5 rounded-full border border-white/10"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Sort Options ────────────────────────────────────────────────────────────

type SortKey = "trending" | "rating" | "year" | "title";

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Trending", value: "trending" },
  { label: "Top Rated", value: "rating" },
  { label: "Newest", value: "year" },
  { label: "A–Z", value: "title" },
];

function sortContent(items: ContentItem[], key: SortKey): ContentItem[] {
  const arr = [...items];
  switch (key) {
    case "trending":
      return arr.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    case "rating":
      return arr.sort((a, b) => b.rating - a.rating);
    case "year":
      return arr.sort((a, b) => b.year - a.year);
    case "title":
      return arr.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return arr;
  }
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function GenreBrowsePage() {
  const params = useParams();
  const rawSlug = Array.isArray(params?.genre) ? params.genre[0] : (params?.genre ?? "");
  const slug = (rawSlug ?? "").toLowerCase();

  const shouldReduceMotion = useReducedMotion();

  // Find matching genre
  const genreData: Genre | undefined = genres.find((g) => g.slug === slug);
  const genreName = genreData?.name ?? slug.charAt(0).toUpperCase() + slug.slice(1);
  const meta = GENRE_META[slug] ?? {
    color: "#E50914",
    description: `Explore the best ${genreName} titles on StreamVault.`,
    emoji: "🎬",
  };

  // Filter content by genre
  const allFiltered = MOCK_CONTENT.filter((item) =>
    (item.genres ?? []).some(
      (g) => g.toLowerCase() === genreName.toLowerCase() || g.toLowerCase() === slug
    )
  );

  // If no exact match, show all (fallback for demo)
  const baseContent = allFiltered.length > 0 ? allFiltered : MOCK_CONTENT;

  const [sortKey, setSortKey] = useState<SortKey>("trending");
  const [typeFilter, setTypeFilter] = useState<"all" | "movie" | "tv">("all");
  const [page, setPage] = useState(1);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const { toggle, isInList } = useWatchlist();

  const filtered = baseContent.filter((item) =>
    typeFilter === "all" ? true : item.type === typeFilter
  );
  const sorted = sortContent(filtered, sortKey);
  const visible = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < sorted.length;

  const handleLoadMore = () => setPage((p) => p + 1);

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      {/* ── Hero Banner ── */}
      <section
        className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${meta.color}22 0%, #141414 60%)`,
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: meta.color }}
        />

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
              <Link
                href="/browse/movies"
                className="text-[#B3B3B3] text-sm hover:text-white transition-colors"
              >
                Browse
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-white text-sm font-medium">{genreName}</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-4">
              <span className="text-5xl" role="img" aria-label={genreName}>
                {meta.emoji}
              </span>
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
                  {genreName}
                </h1>
                <p className="text-[#B3B3B3] text-base sm:text-lg mt-1 max-w-xl">
                  {meta.description}
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-3 flex-wrap">
              <span
                className="text-sm font-semibold px-3 py-1 rounded-full border"
                style={{ color: meta.color, borderColor: `${meta.color}50`, background: `${meta.color}15` }}
              >
                {sorted.length} Titles
              </span>
              {genreData && (
                <span className="text-[#B3B3B3] text-sm">
                  Genre ID #{genreData.id}
                </span>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Filters & Sort Bar ── */}
      <section className="sticky top-16 lg:top-20 z-30 bg-[#141414]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            {(["all", "movie", "tv"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTypeFilter(t); setPage(1); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  typeFilter === t
                    ? "bg-[#E50914] text-white shadow-lg"
                    : "text-[#B3B3B3] hover:text-white"
                }`}
              >
                {t === "movie" && <Film size={13} />}
                {t === "tv" && <Tv size={13} />}
                {t === "all" && <SlidersHorizontal size={13} />}
                {t === "all" ? "All" : t === "movie" ? "Movies" : "TV Shows"}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu((v) => !v)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-[#B3B3B3] hover:text-white transition-all duration-200"
            >
              <Filter size={14} />
              Sort: {SORT_OPTIONS.find((o) => o.value === sortKey)?.label ?? "Trending"}
              <ChevronDown size={14} className={`transition-transform ${showSortMenu ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showSortMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortKey(opt.value); setPage(1); setShowSortMenu(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                        sortKey === opt.value
                          ? "bg-[#E50914]/20 text-[#E50914] font-semibold"
                          : "text-[#B3B3B3] hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Content Grid ── */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {sorted.length === 0 ? (
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <span className="text-6xl mb-6">🎬</span>
            <h2 className="text-2xl font-bold text-white mb-3">No titles found</h2>
            <p className="text-[#B3B3B3] mb-8 max-w-sm">
              We couldn't find any {typeFilter !== "all" ? typeFilter : ""} titles in the{" "}
              {genreName} genre right now. Try a different filter.
            </p>
            <Link
              href="/"
              className="flex items-center gap-2 bg-[#E50914] hover:bg-[#c40812] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Back to Home <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {visible.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    onToggleWatchlist={toggle}
                    inWatchlist={isInList(item.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More */}
            {hasMore && (
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mt-12"
              >
                <motion.button
                  onClick={handleLoadMore}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200"
                >
                  <ChevronDown size={18} />
                  Load More ({sorted.length - visible.length} remaining)
                </motion.button>
              </motion.div>
            )}

            {!hasMore && sorted.length > PAGE_SIZE && (
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[#B3B3B3] text-sm mt-10"
              >
                You've seen all {sorted.length} titles in {genreName}.
              </motion.p>
            )}
          </>
        )}
      </section>

      {/* ── Other Genres ── */}
      <section className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-xl font-bold text-white mb-6">
              Explore Other Genres
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap gap-3"
            >
              {genres
                .filter((g) => g.slug !== slug)
                .map((g) => {
                  const gMeta = GENRE_META[g.slug] ?? { color: "#E50914", emoji: "🎬" };
                  return (
                    <motion.div key={g.id} variants={scaleIn}>
                      <Link
                        href={`/browse/${g.slug}`}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-[#B3B3B3] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                      >
                        <span>{gMeta.emoji}</span>
                        {g.name}
                      </Link>
                    </motion.div>
                  );
                })}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}