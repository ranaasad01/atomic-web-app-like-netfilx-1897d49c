"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Search, X, TrendingUp, Star, Clock, Film, Tv, AlertCircle } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Inline Mock Data ────────────────────────────────────────────────────────

interface MockContent {
  id: number;
  title: string;
  type: "movie" | "tv";
  year: number;
  rating: number;
  genres: string[];
  posterUrl: string;
  description: string;
  duration: string;
}

const ALL_CONTENT: MockContent[] = [
  {
    id: 1,
    title: "Interstellar",
    type: "movie",
    year: 2014,
    rating: 8.6,
    genres: ["Sci-Fi", "Drama"],
    posterUrl: "/images/interstellar-space-wormhole.jpg",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    duration: "2h 49m",
  },
  {
    id: 2,
    title: "Breaking Bad",
    type: "tv",
    year: 2008,
    rating: 9.5,
    genres: ["Drama", "Thriller"],
    posterUrl: "/images/breaking-bad-chemistry-teacher.jpg",
    description: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student.",
    duration: "5 Seasons",
  },
  {
    id: 3,
    title: "The Dark Knight",
    type: "movie",
    year: 2008,
    rating: 9.0,
    genres: ["Action", "Thriller"],
    posterUrl: "/images/dark-knight-batman-joker.jpg",
    description: "Batman faces the Joker, a criminal mastermind who plunges Gotham City into anarchy.",
    duration: "2h 32m",
  },
  {
    id: 4,
    title: "Stranger Things",
    type: "tv",
    year: 2016,
    rating: 8.7,
    genres: ["Sci-Fi", "Horror"],
    posterUrl: "/images/stranger-things-upside-down.jpg",
    description: "When a boy disappears, his friends and family uncover a series of extraordinary mysteries.",
    duration: "4 Seasons",
  },
  {
    id: 5,
    title: "Inception",
    type: "movie",
    year: 2010,
    rating: 8.8,
    genres: ["Sci-Fi", "Action"],
    posterUrl: "/images/inception-dream-city-folding.jpg",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task.",
    duration: "2h 28m",
  },
  {
    id: 6,
    title: "The Crown",
    type: "tv",
    year: 2016,
    rating: 8.6,
    genres: ["Drama", "History"],
    posterUrl: "/images/the-crown-royal-palace.jpg",
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign.",
    duration: "6 Seasons",
  },
  {
    id: 7,
    title: "Dune",
    type: "movie",
    year: 2021,
    rating: 8.0,
    genres: ["Sci-Fi", "Adventure"],
    posterUrl: "/images/dune-desert-planet-sandworm.jpg",
    description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.",
    duration: "2h 35m",
  },
  {
    id: 8,
    title: "Squid Game",
    type: "tv",
    year: 2021,
    rating: 8.0,
    genres: ["Drama", "Thriller"],
    posterUrl: "/images/squid-game-players-green-suits.jpg",
    description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games.",
    duration: "2 Seasons",
  },
  {
    id: 9,
    title: "Oppenheimer",
    type: "movie",
    year: 2023,
    rating: 8.3,
    genres: ["Drama", "History"],
    posterUrl: "/images/oppenheimer-atomic-bomb-explosion.jpg",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    duration: "3h 0m",
  },
  {
    id: 10,
    title: "The Witcher",
    type: "tv",
    year: 2019,
    rating: 8.2,
    genres: ["Fantasy", "Action"],
    posterUrl: "/images/witcher-geralt-sword-monster.jpg",
    description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    duration: "3 Seasons",
  },
  {
    id: 11,
    title: "Avatar: The Way of Water",
    type: "movie",
    year: 2022,
    rating: 7.6,
    genres: ["Sci-Fi", "Adventure"],
    posterUrl: "/images/avatar-way-of-water-ocean-pandora.jpg",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
    duration: "3h 12m",
  },
  {
    id: 12,
    title: "Wednesday",
    type: "tv",
    year: 2022,
    rating: 8.1,
    genres: ["Comedy", "Horror"],
    posterUrl: "/images/wednesday-addams-nevermore-academy.jpg",
    description: "Wednesday Addams investigates a murder spree while making new friends and enemies at Nevermore Academy.",
    duration: "2 Seasons",
  },
  {
    id: 13,
    title: "The Batman",
    type: "movie",
    year: 2022,
    rating: 7.8,
    genres: ["Action", "Thriller"],
    posterUrl: "/images/the-batman-dark-gotham-rain.jpg",
    description: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
    duration: "2h 56m",
  },
  {
    id: 14,
    title: "House of the Dragon",
    type: "tv",
    year: 2022,
    rating: 8.4,
    genres: ["Fantasy", "Drama"],
    posterUrl: "/images/house-of-dragon-targaryen-fire.jpg",
    description: "An internal succession war within House Targaryen at the height of its power.",
    duration: "2 Seasons",
  },
  {
    id: 15,
    title: "Everything Everywhere All at Once",
    type: "movie",
    year: 2022,
    rating: 7.8,
    genres: ["Sci-Fi", "Comedy"],
    posterUrl: "/images/everything-everywhere-multiverse-laundromat.jpg",
    description: "A middle-aged Chinese immigrant is swept up in an insane adventure where she alone can save the world.",
    duration: "2h 19m",
  },
  {
    id: 16,
    title: "Severance",
    type: "tv",
    year: 2022,
    rating: 8.7,
    genres: ["Sci-Fi", "Thriller"],
    posterUrl: "/images/severance-office-workers-lumon.jpg",
    description: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives.",
    duration: "2 Seasons",
  },
  {
    id: 17,
    title: "Top Gun: Maverick",
    type: "movie",
    year: 2022,
    rating: 8.3,
    genres: ["Action", "Drama"],
    posterUrl: "/images/top-gun-maverick-fighter-jet.jpg",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
    duration: "2h 11m",
  },
  {
    id: 18,
    title: "The Last of Us",
    type: "tv",
    year: 2023,
    rating: 8.8,
    genres: ["Drama", "Horror"],
    posterUrl: "/images/last-of-us-post-apocalyptic-city.jpg",
    description: "Joel and Ellie must survive in a post-apocalyptic world overrun by infected humans.",
    duration: "2 Seasons",
  },
  {
    id: 19,
    title: "Barbie",
    type: "movie",
    year: 2023,
    rating: 6.9,
    genres: ["Comedy", "Fantasy"],
    posterUrl: "/images/barbie-pink-dreamhouse-world.jpg",
    description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbieland.",
    duration: "1h 54m",
  },
  {
    id: 20,
    title: "Succession",
    type: "tv",
    year: 2018,
    rating: 8.9,
    genres: ["Drama", "Comedy"],
    posterUrl: "/images/succession-roy-family-corporate.jpg",
    description: "The Roy family controls one of the biggest media and entertainment conglomerates in the world.",
    duration: "4 Seasons",
  },
];

const TRENDING_SEARCHES = [
  "Interstellar",
  "Breaking Bad",
  "Stranger Things",
  "The Dark Knight",
  "Squid Game",
  "Oppenheimer",
  "The Last of Us",
  "Succession",
];

// ─── Utility ─────────────────────────────────────────────────────────────────

function searchContent(query: string): MockContent[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return ALL_CONTENT.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.genres.some((g) => g.toLowerCase().includes(q)) ||
      item.description.toLowerCase().includes(q)
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ContentCard({ item, index }: { item: MockContent; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
      className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/60"
    >
      <Link href={`/browse/${item.type === "movie" ? "movies" : "tv-shows"}`}>
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-[#222]">
          {!imgError ? (
            <img
              src={item.posterUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
              {item.type === "movie" ? (
                <Film size={40} className="text-white/20" />
              ) : (
                <Tv size={40} className="text-white/20" />
              )}
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Type badge */}
          <div className="absolute top-2 left-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                item.type === "movie"
                  ? "bg-[#E50914]/90 text-white"
                  : "bg-blue-600/90 text-white"
              }`}
            >
              {item.type === "movie" ? (
                <Film size={9} />
              ) : (
                <Tv size={9} />
              )}
              {item.type === "movie" ? "Movie" : "TV"}
            </span>
          </div>

          {/* Rating badge */}
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/70 text-yellow-400 backdrop-blur-sm">
              <Star size={9} fill="currentColor" />
              {item.rating.toFixed(1)}
            </span>
          </div>

          {/* Hover info */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white/80 text-xs line-clamp-3 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm leading-tight line-clamp-1 group-hover:text-[#E50914] transition-colors duration-200">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 text-[#B3B3B3] text-xs">
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {item.duration}
            </span>
            <span className="text-white/20">•</span>
            <span>{item.year}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {(item.genres ?? []).slice(0, 2).map((g) => (
              <span
                key={g}
                className="px-1.5 py-0.5 rounded text-[10px] bg-white/8 text-white/50 border border-white/10"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="flex flex-col items-center justify-center py-24 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        <AlertCircle size={36} className="text-white/30" />
      </div>
      <h2 className="text-white text-2xl font-bold mb-2">No results found</h2>
      <p className="text-[#B3B3B3] text-base max-w-sm">
        We couldn&apos;t find anything matching{" "}
        <span className="text-white font-semibold">&ldquo;{query}&rdquo;</span>. Try a
        different title, genre, or keyword.
      </p>
      <div className="mt-8 flex flex-wrap gap-2 justify-center">
        {["Action", "Drama", "Sci-Fi", "Comedy", "Thriller"].map((g) => (
          <span
            key={g}
            className="px-3 py-1.5 rounded-full text-sm bg-white/8 text-white/60 border border-white/10 hover:bg-white/15 hover:text-white cursor-pointer transition-colors duration-200"
          >
            {g}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<MockContent[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Auto-focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Read URL param on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") ?? "";
      if (q) {
        setQuery(q);
        setDebouncedQuery(q);
      }
    }
  }, []);

  // Debounce
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Search
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setResults(searchContent(debouncedQuery));
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const handleClear = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    setResults([]);
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleTrendingClick = useCallback((term: string) => {
    setQuery(term);
  }, []);

  const showTrending = !query.trim();
  const showResults = debouncedQuery.trim().length > 0;
  const showEmpty = showResults && !isSearching && results.length === 0;

  return (
    <main className="min-h-screen bg-[#141414] pt-24 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ── */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={fadeInUp}
          className="mb-10"
        >
          <h1 className="text-white text-3xl sm:text-4xl font-black tracking-tight mb-2">
            Search
          </h1>
          <p className="text-[#B3B3B3] text-base">
            Find movies, TV shows, genres, and more.
          </p>
        </motion.div>

        {/* ── Search Input ── */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={fadeIn}
          className="relative mb-10"
        >
          <div className="relative flex items-center group">
            <div className="absolute left-4 text-[#B3B3B3] group-focus-within:text-white transition-colors duration-200 pointer-events-none z-10">
              <Search size={22} />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, genres, actors…"
              className="w-full bg-[#1a1a1a] border border-white/10 focus:border-[#E50914]/60 rounded-2xl pl-12 pr-12 py-4 text-white text-lg placeholder-[#555] outline-none transition-all duration-300 focus:bg-[#1f1f1f] focus:shadow-lg focus:shadow-[#E50914]/10"
              aria-label="Search content"
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleClear}
                  className="absolute right-4 text-[#B3B3B3] hover:text-white transition-colors duration-200 z-10"
                  aria-label="Clear search"
                >
                  <X size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Searching indicator */}
          <AnimatePresence>
            {isSearching && query.trim() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-6 left-0 text-[#B3B3B3] text-sm flex items-center gap-2"
              >
                <span className="inline-block w-3 h-3 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin" />
                Searching…
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Trending Searches (shown when input is empty) ── */}
        <AnimatePresence mode="wait">
          {showTrending && (
            <motion.section
              key="trending"
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
              variants={staggerContainer}
              className="mb-14"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-5">
                <TrendingUp size={20} className="text-[#E50914]" />
                <h2 className="text-white text-xl font-bold">Trending Searches</h2>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="flex flex-wrap gap-3"
              >
                {TRENDING_SEARCHES.map((term, i) => (
                  <motion.button
                    key={term}
                    variants={scaleIn}
                    custom={i}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.06, backgroundColor: "#E50914" }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    onClick={() => handleTrendingClick(term)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/8 border border-white/10 text-white/80 hover:text-white text-sm font-medium transition-all duration-200 hover:border-[#E50914]/50 hover:shadow-lg hover:shadow-[#E50914]/20"
                  >
                    <Search size={13} className="text-[#E50914]" />
                    {term}
                  </motion.button>
                ))}
              </motion.div>

              {/* All content preview when no query */}
              <motion.div variants={fadeInUp} className="mt-12">
                <h2 className="text-white text-xl font-bold mb-6">Browse All Titles</h2>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                  {ALL_CONTENT.map((item, i) => (
                    <ContentCard key={item.id} item={item} index={i} />
                  ))}
                </motion.div>
              </motion.div>
            </motion.section>
          )}

          {/* ── Results ── */}
          {showResults && !isSearching && (
            <motion.section
              key="results"
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              variants={fadeIn}
            >
              {showEmpty ? (
                <EmptyState query={debouncedQuery} />
              ) : (
                <>
                  <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
                    <h2 className="text-white text-xl font-bold">
                      Results for{" "}
                      <span className="text-[#E50914]">&ldquo;{debouncedQuery}&rdquo;</span>
                    </h2>
                    <span className="text-[#B3B3B3] text-sm">
                      {results.length} title{results.length !== 1 ? "s" : ""} found
                    </span>
                  </motion.div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                  >
                    {results.map((item, i) => (
                      <ContentCard key={item.id} item={item} index={i} />
                    ))}
                  </motion.div>
                </>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}