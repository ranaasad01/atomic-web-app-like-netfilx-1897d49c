"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Play, Plus, Star, Clock, TrendingUp, Flame, Sparkles, ChevronRight, Eye, ThumbsUp, Calendar } from 'lucide-react';
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
  rank?: number;
  views?: string;
  likes?: string;
  addedDaysAgo?: number;
}

const TRENDING_NOW: ContentItem[] = [
  {
    id: 1,
    title: "Echoes of the Abyss",
    description:
      "A deep-sea research team discovers an ancient civilization beneath the ocean floor, triggering a chain of events that threatens the surface world.",
    posterUrl: "/images/deep-sea-research-thriller.jpg",
    backdropUrl: "/images/deep-sea-research-thriller-backdrop.jpg",
    rating: 9.1,
    year: 2024,
    duration: "2h 18m",
    genres: ["Sci-Fi", "Thriller"],
    type: "movie",
    isTrending: true,
    rank: 1,
    views: "42.3M",
    likes: "3.8M",
  },
  {
    id: 2,
    title: "The Last Monarch",
    description:
      "When the royal family is assassinated, a disgraced general must protect the sole surviving heir across a war-torn kingdom.",
    posterUrl: "/images/epic-fantasy-kingdom-war.jpg",
    backdropUrl: "/images/epic-fantasy-kingdom-war-backdrop.jpg",
    rating: 8.7,
    year: 2024,
    duration: "S1 · 10 Episodes",
    genres: ["Fantasy", "Drama"],
    type: "tv",
    isTrending: true,
    rank: 2,
    views: "38.1M",
    likes: "2.9M",
  },
  {
    id: 3,
    title: "Neon Requiem",
    description:
      "In a cyberpunk city where memories can be bought and sold, a detective investigates a murder that may unravel the fabric of reality itself.",
    posterUrl: "/images/cyberpunk-detective-neon-city.jpg",
    backdropUrl: "/images/cyberpunk-detective-neon-city-backdrop.jpg",
    rating: 8.9,
    year: 2024,
    duration: "1h 54m",
    genres: ["Sci-Fi", "Action"],
    type: "movie",
    isTrending: true,
    rank: 3,
    views: "31.7M",
    likes: "2.4M",
  },
  {
    id: 4,
    title: "Wildfire Season",
    description:
      "A gripping docuseries following elite firefighters battling unprecedented blazes across the American West.",
    posterUrl: "/images/wildfire-firefighters-documentary.jpg",
    backdropUrl: "/images/wildfire-firefighters-documentary-backdrop.jpg",
    rating: 8.4,
    year: 2024,
    duration: "S1 · 6 Episodes",
    genres: ["Documentary"],
    type: "tv",
    isTrending: true,
    rank: 4,
    views: "22.5M",
    likes: "1.9M",
  },
  {
    id: 5,
    title: "Parallel Hearts",
    description:
      "Two strangers discover they share identical dreams — and that their fates are intertwined across multiple timelines.",
    posterUrl: "/images/parallel-timelines-romance-drama.jpg",
    backdropUrl: "/images/parallel-timelines-romance-drama-backdrop.jpg",
    rating: 8.2,
    year: 2024,
    duration: "S1 · 8 Episodes",
    genres: ["Romance", "Drama"],
    type: "tv",
    isTrending: true,
    rank: 5,
    views: "19.8M",
    likes: "1.7M",
  },
  {
    id: 6,
    title: "Ironclad",
    description:
      "A retired MMA champion is forced back into the underground fighting circuit to save his daughter from a criminal syndicate.",
    posterUrl: "/images/mma-fighter-action-thriller.jpg",
    backdropUrl: "/images/mma-fighter-action-thriller-backdrop.jpg",
    rating: 7.9,
    year: 2024,
    duration: "1h 47m",
    genres: ["Action", "Thriller"],
    type: "movie",
    isTrending: true,
    rank: 6,
    views: "17.2M",
    likes: "1.3M",
  },
];

const NEW_ARRIVALS: ContentItem[] = [
  {
    id: 101,
    title: "Starfall Chronicles",
    description:
      "An astronaut stranded on a dying planet must forge an alliance with alien survivors to find a way home before the star goes supernova.",
    posterUrl: "/images/astronaut-alien-planet-sci-fi.jpg",
    backdropUrl: "/images/astronaut-alien-planet-sci-fi-backdrop.jpg",
    rating: 8.6,
    year: 2024,
    duration: "2h 5m",
    genres: ["Sci-Fi", "Adventure"],
    type: "movie",
    isNew: true,
    addedDaysAgo: 1,
  },
  {
    id: 102,
    title: "The Quiet Storm",
    description:
      "A small coastal town is rocked by a series of mysterious disappearances linked to a decades-old secret buried beneath the lighthouse.",
    posterUrl: "/images/coastal-mystery-lighthouse-thriller.jpg",
    backdropUrl: "/images/coastal-mystery-lighthouse-thriller-backdrop.jpg",
    rating: 8.3,
    year: 2024,
    duration: "S1 · 7 Episodes",
    genres: ["Mystery", "Thriller"],
    type: "tv",
    isNew: true,
    addedDaysAgo: 2,
  },
  {
    id: 103,
    title: "Bloom & Chaos",
    description:
      "A sharp-tongued florist and a buttoned-up architect are forced to collaborate on the city's biggest wedding — and fall apart in the process.",
    posterUrl: "/images/romantic-comedy-florist-architect.jpg",
    backdropUrl: "/images/romantic-comedy-florist-architect-backdrop.jpg",
    rating: 7.8,
    year: 2024,
    duration: "1h 38m",
    genres: ["Romance", "Comedy"],
    type: "movie",
    isNew: true,
    addedDaysAgo: 3,
  },
  {
    id: 104,
    title: "Rogue Protocol",
    description:
      "When an AI defense system goes rogue, a lone cybersecurity analyst must hack into a government black site to prevent World War III.",
    posterUrl: "/images/ai-cybersecurity-action-thriller.jpg",
    backdropUrl: "/images/ai-cybersecurity-action-thriller-backdrop.jpg",
    rating: 8.0,
    year: 2024,
    duration: "1h 52m",
    genres: ["Action", "Sci-Fi"],
    type: "movie",
    isNew: true,
    addedDaysAgo: 4,
  },
  {
    id: 105,
    title: "Midnight Harvest",
    description:
      "A family returns to their ancestral farm only to discover the land holds a terrifying supernatural secret that has haunted their bloodline for generations.",
    posterUrl: "/images/supernatural-horror-farm-family.jpg",
    backdropUrl: "/images/supernatural-horror-farm-family-backdrop.jpg",
    rating: 7.6,
    year: 2024,
    duration: "S1 · 5 Episodes",
    genres: ["Horror"],
    type: "tv",
    isNew: true,
    addedDaysAgo: 5,
  },
  {
    id: 106,
    title: "The Cartographer",
    description:
      "In 18th-century Europe, a brilliant female mapmaker uncovers a conspiracy that could redraw the borders of empires — and cost her everything.",
    posterUrl: "/images/historical-drama-mapmaker-europe.jpg",
    backdropUrl: "/images/historical-drama-mapmaker-europe-backdrop.jpg",
    rating: 8.5,
    year: 2024,
    duration: "S1 · 9 Episodes",
    genres: ["Drama", "History"],
    type: "tv",
    isNew: true,
    addedDaysAgo: 6,
  },
  {
    id: 107,
    title: "Velocity",
    description:
      "The world's fastest street racer goes undercover to dismantle a global smuggling ring operating through illegal racing circuits.",
    posterUrl: "/images/street-racing-action-undercover.jpg",
    backdropUrl: "/images/street-racing-action-undercover-backdrop.jpg",
    rating: 7.5,
    year: 2024,
    duration: "1h 44m",
    genres: ["Action"],
    type: "movie",
    isNew: true,
    addedDaysAgo: 7,
  },
  {
    id: 108,
    title: "Soulbound",
    description:
      "Two rival musicians discover their creative energies are literally linked — when one creates, the other feels it — leading to an unexpected partnership.",
    posterUrl: "/images/musicians-supernatural-romance-drama.jpg",
    backdropUrl: "/images/musicians-supernatural-romance-drama-backdrop.jpg",
    rating: 8.1,
    year: 2024,
    duration: "S1 · 6 Episodes",
    genres: ["Drama", "Romance"],
    type: "tv",
    isNew: true,
    addedDaysAgo: 7,
  },
];

const COMING_SOON: ContentItem[] = [
  {
    id: 201,
    title: "Fractured Earth",
    description:
      "A catastrophic seismic event splits the continental United States in two, and a geologist races to reunite her family across the divide.",
    posterUrl: "/images/disaster-earthquake-survival-drama.jpg",
    backdropUrl: "/images/disaster-earthquake-survival-drama-backdrop.jpg",
    rating: 0,
    year: 2025,
    duration: "2h 22m",
    genres: ["Action", "Drama"],
    type: "movie",
    addedDaysAgo: 0,
  },
  {
    id: 202,
    title: "Obsidian Crown",
    description:
      "The long-awaited sequel to The Last Monarch — the war for the throne enters its final, devastating chapter.",
    posterUrl: "/images/dark-fantasy-crown-sequel.jpg",
    backdropUrl: "/images/dark-fantasy-crown-sequel-backdrop.jpg",
    rating: 0,
    year: 2025,
    duration: "S2 · 10 Episodes",
    genres: ["Fantasy", "Drama"],
    type: "tv",
    addedDaysAgo: 0,
  },
  {
    id: 203,
    title: "The Silence Between Stars",
    description:
      "A haunting animated anthology exploring loneliness, connection, and the vast distances between human hearts.",
    posterUrl: "/images/animated-anthology-space-loneliness.jpg",
    backdropUrl: "/images/animated-anthology-space-loneliness-backdrop.jpg",
    rating: 0,
    year: 2025,
    duration: "S1 · 8 Episodes",
    genres: ["Animation", "Drama"],
    type: "tv",
    addedDaysAgo: 0,
  },
  {
    id: 204,
    title: "Crimson Protocol",
    description:
      "A black-ops team discovers their latest mission is a setup — and the enemy is inside their own agency.",
    posterUrl: "/images/black-ops-spy-thriller-action.jpg",
    backdropUrl: "/images/black-ops-spy-thriller-action-backdrop.jpg",
    rating: 0,
    year: 2025,
    duration: "1h 58m",
    genres: ["Action", "Thriller"],
    type: "movie",
    addedDaysAgo: 0,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function RatingBadge({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
      <Star size={11} fill="currentColor" />
      {rating.toFixed(1)}
    </span>
  );
}

function TypeBadge({ type }: { type: "movie" | "tv" }) {
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
        type === "movie"
          ? "bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/30"
          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
      }`}
    >
      {type === "movie" ? "Movie" : "TV"}
    </span>
  );
}

function TrendingCard({
  item,
  index,
  shouldReduceMotion,
}: {
  item: ContentItem;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group cursor-pointer flex-shrink-0 w-64 sm:w-72"
    >
      {/* Rank Number */}
      <div className="absolute -left-4 bottom-8 z-10 text-[80px] font-black text-white/10 leading-none select-none pointer-events-none">
        {item.rank}
      </div>

      <div className="relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-xl">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(item.title)}&size=400&background=1a1a1a&color=E50914&bold=true`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Hover Overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
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

          {/* Trending Badge */}
          <div className="absolute top-2 left-2">
            <span className="flex items-center gap-1 bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              <Flame size={10} />#{item.rank} Trending
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-1">
            <TypeBadge type={item.type} />
            <RatingBadge rating={item.rating} />
          </div>
          <h3 className="text-white font-semibold text-sm mt-1.5 line-clamp-1">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-[#B3B3B3] text-xs">
            <span>{item.year}</span>
            <span>·</span>
            <span className="flex items-center gap-0.5">
              <Clock size={10} />
              {item.duration}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2 text-[#B3B3B3] text-xs">
            <span className="flex items-center gap-1">
              <Eye size={10} />
              {item.views ?? "—"}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp size={10} />
              {item.likes ?? "—"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NewArrivalCard({
  item,
  shouldReduceMotion,
}: {
  item: ContentItem;
  shouldReduceMotion: boolean | null;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group cursor-pointer"
    >
      <div className="relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-lg">
        {/* Backdrop / Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(item.title)}&size=400&background=1a1a1a&color=E50914&bold=true`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Hover Overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
          >
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg"
            >
              <Play size={18} fill="black" className="text-black ml-0.5" />
            </motion.button>
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center"
            >
              <Plus size={16} className="text-white" />
            </motion.button>
          </motion.div>

          {/* New Badge */}
          {item.isNew && (
            <div className="absolute top-2 left-2">
              <span className="flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                <Sparkles size={10} />
                NEW
              </span>
            </div>
          )}

          {/* Days ago */}
          {(item.addedDaysAgo ?? 0) > 0 && (
            <div className="absolute bottom-2 right-2">
              <span className="text-[10px] text-white/70 bg-black/60 px-1.5 py-0.5 rounded">
                Added {item.addedDaysAgo}d ago
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-1">
            <TypeBadge type={item.type} />
            <RatingBadge rating={item.rating} />
          </div>
          <h3 className="text-white font-semibold text-sm mt-1.5 line-clamp-1">
            {item.title}
          </h3>
          <p className="text-[#B3B3B3] text-xs mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {(item.genres ?? []).slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-[10px] text-[#B3B3B3] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ComingSoonCard({
  item,
  shouldReduceMotion,
}: {
  item: ContentItem;
  shouldReduceMotion: boolean | null;
}) {
  const [reminded, setReminded] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      transition={{ duration: 0.25 }}
      className="relative group cursor-pointer"
    >
      <div className="relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 shadow-lg">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-75"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(item.title)}&size=400&background=1a1a1a&color=E50914&bold=true`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="block text-white/40 text-xs font-semibold uppercase tracking-widest mb-1">
                Coming Soon
              </span>
              <span className="block text-white font-bold text-lg">2025</span>
            </div>
          </div>

          <div className="absolute top-2 left-2">
            <span className="flex items-center gap-1 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              <Calendar size={10} />
              Coming Soon
            </span>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between mb-1">
            <TypeBadge type={item.type} />
            <span className="text-[10px] text-[#B3B3B3]">{item.year}</span>
          </div>
          <h3 className="text-white font-semibold text-sm mt-1.5 line-clamp-1">
            {item.title}
          </h3>
          <p className="text-[#B3B3B3] text-xs mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-2 mb-3">
            {(item.genres ?? []).slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-[10px] text-[#B3B3B3] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded"
              >
                {g}
              </span>
            ))}
          </div>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            onClick={() => setReminded((r) => !r)}
            className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
              reminded
                ? "bg-green-600/20 border border-green-500/40 text-green-400"
                : "bg-white/10 border border-white/20 text-white hover:bg-white/15"
            }`}
          >
            {reminded ? (
              <>
                <Star size={12} fill="currentColor" /> Reminder Set
              </>
            ) : (
              <>
                <Bell size={12} /> Remind Me
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Stat Bar ────────────────────────────────────────────────────────────────

const STATS = [
  { label: "New Titles This Week", value: "47", icon: Sparkles, color: "text-green-400" },
  { label: "Trending Now", value: "12", icon: TrendingUp, color: "text-[#E50914]" },
  { label: "Coming This Month", value: "23", icon: Calendar, color: "text-purple-400" },
  { label: "Top Rated New", value: "9.1", icon: Star, color: "text-yellow-400" },
];

// ─── Filter Tabs ─────────────────────────────────────────────────────────────

const FILTER_TABS = ["All", "Movies", "TV Shows", "Documentaries", "Animation"];

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function NewAndPopularPage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredNew = NEW_ARRIVALS.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Movies") return item.type === "movie";
    if (activeFilter === "TV Shows") return item.type === "tv";
    if (activeFilter === "Documentaries") return item.genres.includes("Documentary");
    if (activeFilter === "Animation") return item.genres.includes("Animation");
    return true;
  });

  return (
    <main className="min-h-screen bg-[#141414] text-white pt-20 pb-24">
      {/* ── Hero Header ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E50914]/10 via-transparent to-purple-900/10 pointer-events-none" />
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-[#E50914] rounded-full" />
              <span className="text-[#E50914] font-semibold text-sm uppercase tracking-widest">
                Discover
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            >
              New &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] to-orange-500">
                Popular
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-[#B3B3B3] text-lg max-w-2xl leading-relaxed"
            >
              The freshest arrivals and hottest titles everyone's watching right now.
              Updated daily so you never miss what's trending.
            </motion.p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10"
          >
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.03 }}
                  className="bg-white/5 border border-white/8 rounded-xl p-4 flex items-center gap-3"
                >
                  <div className={`${stat.color} flex-shrink-0`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <div className={`text-2xl font-black ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-[#B3B3B3] text-xs mt-0.5">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Trending Now ── */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <Flame size={22} className="text-[#E50914]" />
            <h2 className="text-2xl font-bold">Trending Now</h2>
            <span className="text-[#B3B3B3] text-sm hidden sm:block">
              — What everyone's watching
            </span>
          </div>
          <Link
            href="/browse/movies"
            className="flex items-center gap-1 text-[#B3B3B3] hover:text-white text-sm transition-colors duration-200"
          >
            See all <ChevronRight size={16} />
          </Link>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {TRENDING_NOW.map((item, index) => (
            <TrendingCard
              key={item.id}
              item={item}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <Sparkles size={22} className="text-green-400" />
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <span className="text-[#B3B3B3] text-sm hidden sm:block">
              — Just added this week
            </span>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeIn}
          className="flex gap-2 flex-wrap mb-6"
        >
          {FILTER_TABS.map((tab) => (
            <motion.button
              key={tab}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === tab
                  ? "bg-[#E50914] text-white shadow-lg shadow-[#E50914]/30"
                  : "bg-white/8 text-[#B3B3B3] hover:bg-white/15 hover:text-white border border-white/10"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          key={activeFilter}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {filteredNew.length > 0 ? (
            filteredNew.map((item) => (
              <NewArrivalCard
                key={item.id}
                item={item}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))
          ) : (
            <motion.div
              variants={fadeIn}
              className="col-span-full text-center py-16 text-[#B3B3B3]"
            >
              <Sparkles size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">No new titles in this category yet.</p>
              <p className="text-sm mt-1">Check back soon — we add new content daily.</p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ── Coming Soon ── */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <Calendar size={22} className="text-purple-400" />
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <span className="text-[#B3B3B3] text-sm hidden sm:block">
              — Set your reminders
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {COMING_SOON.map((item) => (
            <ComingSoonCard
              key={item.id}
              item={item}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>
      </section>

      {/* ── Top Picks CTA ── */}
      <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#E50914]/20 via-[#1a1a1a] to-purple-900/20 border border-white/8 p-8 sm:p-12 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(229,9,20,0.08)_0%,_transparent_70%)] pointer-events-none" />
          <motion.div variants={scaleIn} className="relative z-10">
            <TrendingUp size={40} className="mx-auto text-[#E50914] mb-4" />
            <h2 className="text-3xl sm:text-4xl font-black mb-3">
              Never Miss a Hit
            </h2>
            <p className="text-[#B3B3B3] text-lg max-w-xl mx-auto mb-8">
              Browse our full library of movies and TV shows — thousands of titles
              across every genre, updated daily.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/browse/movies">
                <motion.span
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-[#E50914] hover:bg-[#c4070f] text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200 shadow-lg shadow-[#E50914]/30"
                >
                  <Play size={18} fill="white" /> Browse Movies
                </motion.span>
              </Link>
              <Link href="/browse/tv-shows">
                <motion.span
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200"
                >
                  Browse TV Shows <ChevronRight size={18} />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}