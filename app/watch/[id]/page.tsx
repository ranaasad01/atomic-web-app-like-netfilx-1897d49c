"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipForward, SkipBack, Star, Clock, ChevronRight } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

interface WatchItem {
  id: string;
  title: string;
  description: string;
  year: number;
  duration: string;
  rating: number;
  genres: string[];
  director: string;
  cast: string[];
  trailerKey: string;
  backdropUrl: string;
  posterUrl: string;
  type: "movie" | "tv";
  episode?: string;
}

const WATCH_ITEMS: Record<string, WatchItem> = {
  "1": {
    id: "1",
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Breathtaking visuals and a deeply emotional story make this a modern sci-fi masterpiece.",
    year: 2014,
    duration: "2h 49m",
    rating: 8.7,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    trailerKey: "zSWdZVtXT7E",
    backdropUrl: "/images/interstellar-space-wormhole.jpg",
    posterUrl: "/images/interstellar-movie-poster.jpg",
    type: "movie",
  },
  "2": {
    id: "2",
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. An epic continuation of the legendary saga.",
    year: 2024,
    duration: "2h 46m",
    rating: 8.5,
    genres: ["Sci-Fi", "Action", "Adventure"],
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    trailerKey: "Way9Dexny3w",
    backdropUrl: "/images/dune-desert-sandworm.jpg",
    posterUrl: "/images/dune-part-two-poster.jpg",
    type: "movie",
  },
  "3": {
    id: "3",
    title: "Oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. A gripping historical drama.",
    year: 2023,
    duration: "3h 0m",
    rating: 8.9,
    genres: ["Drama", "History", "Thriller"],
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    trailerKey: "uYPbbksJxIg",
    backdropUrl: "/images/oppenheimer-atomic-explosion.jpg",
    posterUrl: "/images/oppenheimer-movie-poster.jpg",
    type: "movie",
  },
  "4": {
    id: "4",
    title: "The Batman",
    description:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    year: 2022,
    duration: "2h 56m",
    rating: 7.8,
    genres: ["Action", "Crime", "Drama"],
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright"],
    trailerKey: "mqqft2x_Aa4",
    backdropUrl: "/images/batman-gotham-city-rain.jpg",
    posterUrl: "/images/the-batman-movie-poster.jpg",
    type: "movie",
  },
  "5": {
    id: "5",
    title: "Avatar: The Way of Water",
    description:
      "Jake Sully and Ney'tiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora.",
    year: 2022,
    duration: "3h 12m",
    rating: 7.6,
    genres: ["Sci-Fi", "Action", "Adventure"],
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Kate Winslet"],
    trailerKey: "d9MyW72ELq0",
    backdropUrl: "/images/avatar-pandora-ocean-bioluminescent.jpg",
    posterUrl: "/images/avatar-way-of-water-poster.jpg",
    type: "movie",
  },
};

const UP_NEXT_IDS = ["2", "3", "4", "5"];

const DEFAULT_ITEM: WatchItem = WATCH_ITEMS["1"];

// ─── Up Next Card ─────────────────────────────────────────────────────────────

function UpNextCard({ item, isActive }: { item: WatchItem; isActive: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02, x: 4 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      className={`group relative flex gap-3 p-2 rounded-xl cursor-pointer transition-colors duration-200 ${
        isActive
          ? "bg-white/10 ring-1 ring-[#E50914]/50"
          : "hover:bg-white/8"
      }`}
    >
      <Link href={`/watch/${item.id}`} className="flex gap-3 w-full">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-28 h-16 rounded-lg overflow-hidden bg-white/5">
          <img
            src={item.backdropUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='64' viewBox='0 0 112 64'%3E%3Crect width='112' height='64' fill='%23222'/%3E%3C/svg%3E";
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
            <Play size={18} className="text-white fill-white" />
          </div>
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold truncate leading-tight">
            {item.title}
          </p>
          <p className="text-[#B3B3B3] text-xs mt-0.5">{item.year}</p>
          <div className="flex items-center gap-1 mt-1">
            <Clock size={10} className="text-[#B3B3B3]" />
            <span className="text-[#B3B3B3] text-xs">{item.duration}</span>
          </div>
        </div>
        <ChevronRight
          size={14}
          className="text-[#B3B3B3] self-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </Link>
    </motion.div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({
  progress,
  onSeek,
}: {
  progress: number;
  onSeek: (pct: number) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(pct);
  };

  return (
    <div
      ref={barRef}
      onClick={handleClick}
      className="group relative w-full h-1 bg-white/20 rounded-full cursor-pointer hover:h-2 transition-all duration-150"
    >
      <div
        className="absolute left-0 top-0 h-full bg-[#E50914] rounded-full transition-all duration-300"
        style={{ width: `${progress * 100}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{ left: `calc(${progress * 100}% - 6px)` }}
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const id = typeof params?.id === "string" ? params.id : "1";
  const item: WatchItem = WATCH_ITEMS[id] ?? DEFAULT_ITEM;

  const upNextItems = UP_NEXT_IDS.filter((uid) => uid !== id)
    .slice(0, 4)
    .map((uid) => WATCH_ITEMS[uid])
    .filter(Boolean) as WatchItem[];

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0.18);
  const [volume, setVolume] = useState(0.8);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [elapsed, setElapsed] = useState("32:14");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Hide navbar via body class
  useEffect(() => {
    document.body.classList.add("hide-navbar");
    return () => {
      document.body.classList.remove("hide-navbar");
    };
  }, []);

  // Auto-hide controls
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    resetControlsTimer();
    return () => {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    };
  }, [resetControlsTimer]);

  // Simulate progress when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 0.001, 1);
        // Update elapsed display
        const totalSeconds = 169 * 60; // 2h49m for Interstellar
        const elapsedSeconds = Math.floor(next * totalSeconds);
        const m = Math.floor(elapsedSeconds / 60);
        const s = elapsedSeconds % 60;
        setElapsed(`${m}:${s.toString().padStart(2, "0")}`);
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSeek = (pct: number) => {
    setProgress(pct);
  };

  const handleMouseMove = () => {
    resetControlsTimer();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && playerRef.current) {
      playerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const iframeUrl = `https://www.youtube.com/embed/${item.trailerKey}?autoplay=0&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&enablejsapi=1`;

  return (
    <div
      className="fixed inset-0 bg-black flex overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={playerRef}
    >
      {/* ── Top Bar ── */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-0 left-0 right-0 z-30 flex items-center gap-4 px-6 py-5 bg-gradient-to-b from-black/90 via-black/50 to-transparent"
          >
            <motion.button
              onClick={() => router.back()}
              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
              aria-label="Go back"
            >
              <ArrowLeft
                size={22}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              <span className="text-sm font-medium hidden sm:block">Back</span>
            </motion.button>

            <div className="flex-1 min-w-0">
              <h1 className="text-white font-bold text-lg sm:text-xl truncate leading-tight">
                {item.title}
              </h1>
              {item.episode && (
                <p className="text-[#B3B3B3] text-sm">{item.episode}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-xs text-white/80">
                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                {(item.rating ?? 0).toFixed(1)}
              </span>
              <span className="hidden sm:block text-[#B3B3B3] text-xs bg-white/10 rounded-full px-3 py-1">
                {item.year}
              </span>
              <motion.button
                onClick={() => setSidebarOpen((v) => !v)}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="text-[#B3B3B3] hover:text-white transition-colors text-xs bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 font-medium"
              >
                {sidebarOpen ? "Hide" : "Up Next"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content Area ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Video Player ── */}
        <div className="relative flex-1 bg-black flex items-center justify-center">
          {/* YouTube iframe */}
          <div className="absolute inset-0">
            <iframe
              src={iframeUrl}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Overlay — captures clicks for play/pause, blocks YouTube UI */}
          <div
            className="absolute inset-0 z-10 cursor-pointer"
            onClick={() => setIsPlaying((v) => !v)}
          />

          {/* Center Play/Pause Flash */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                key="play-indicator"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.3 }}
                transition={{ duration: 0.25 }}
                className="absolute z-20 pointer-events-none"
              >
                <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Play size={32} className="text-white fill-white ml-1" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Bottom Controls ── */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-6 pt-16 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
              >
                {/* Progress */}
                <div className="mb-4">
                  <ProgressBar progress={progress} onSeek={handleSeek} />
                  <div className="flex justify-between mt-1.5 text-xs text-[#B3B3B3]">
                    <span>{elapsed}</span>
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <motion.button
                    onClick={() => setIsPlaying((v) => !v)}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    className="text-white hover:text-[#E50914] transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause size={28} className="fill-white" />
                    ) : (
                      <Play size={28} className="fill-white" />
                    )}
                  </motion.button>

                  {/* Skip Back */}
                  <motion.button
                    onClick={() => setProgress((p) => Math.max(0, p - 0.05))}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Skip back 10 seconds"
                  >
                    <SkipBack size={22} />
                  </motion.button>

                  {/* Skip Forward */}
                  <motion.button
                    onClick={() => setProgress((p) => Math.min(1, p + 0.05))}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Skip forward 10 seconds"
                  >
                    <SkipForward size={22} />
                  </motion.button>

                  {/* Volume */}
                  <div
                    className="relative flex items-center gap-2"
                    onMouseEnter={() => setShowVolumeSlider(true)}
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <motion.button
                      onClick={() => setIsMuted((v) => !v)}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                      className="text-white/80 hover:text-white transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                    </motion.button>
                    <AnimatePresence>
                      {showVolumeSlider && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 80 }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              setVolume(val);
                              if (val > 0) setIsMuted(false);
                            }}
                            className="w-20 h-1 accent-[#E50914] cursor-pointer"
                            aria-label="Volume"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Title (center) */}
                  <div className="flex-1 text-center hidden sm:block">
                    <span className="text-white/70 text-sm font-medium truncate">
                      {item.title}
                    </span>
                  </div>

                  {/* Settings */}
                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 30 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Settings"
                  >
                    <Settings size={20} />
                  </motion.button>

                  {/* Fullscreen */}
                  <motion.button
                    onClick={toggleFullscreen}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Toggle fullscreen"
                  >
                    <Maximize size={20} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Up Next Sidebar ── */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ opacity: 0, x: 320 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 320 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="hidden lg:flex flex-col w-80 xl:w-96 bg-[#141414]/95 backdrop-blur-md border-l border-white/8 overflow-y-auto flex-shrink-0"
            >
              {/* Sidebar Header */}
              <div className="sticky top-0 bg-[#141414]/95 backdrop-blur-md z-10 px-5 pt-20 pb-4 border-b border-white/8">
                <h2 className="text-white font-bold text-base">Up Next</h2>
                <p className="text-[#B3B3B3] text-xs mt-0.5">
                  More titles you might enjoy
                </p>
              </div>

              {/* Current Item Info */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="px-5 py-5 border-b border-white/8"
              >
                <motion.div variants={fadeInUp} className="relative rounded-xl overflow-hidden mb-4 aspect-video">
                  <img
                    src={item.backdropUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23222'/%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      {(item.genres ?? []).slice(0, 2).map((g) => (
                        <span
                          key={g}
                          className="text-[10px] bg-[#E50914]/80 text-white px-2 py-0.5 rounded-full font-medium"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                      <Star size={11} className="fill-yellow-400" />
                      {(item.rating ?? 0).toFixed(1)}
                    </span>
                    <span className="text-[#B3B3B3] text-xs">{item.year}</span>
                    <span className="text-[#B3B3B3] text-xs">{item.duration}</span>
                  </div>
                  <p className="text-[#B3B3B3] text-xs leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-3 space-y-1.5">
                  <div className="flex gap-2 text-xs">
                    <span className="text-[#B3B3B3] w-14 flex-shrink-0">Director</span>
                    <span className="text-white font-medium">{item.director}</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="text-[#B3B3B3] w-14 flex-shrink-0">Cast</span>
                    <span className="text-white font-medium">
                      {(item.cast ?? []).slice(0, 3).join(", ")}
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Up Next List */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="px-4 py-4 space-y-1 flex-1"
              >
                {upNextItems.map((upItem) => (
                  <UpNextCard key={upItem.id} item={upItem} isActive={false} />
                ))}
              </motion.div>

              {/* Browse More */}
              <div className="px-5 py-4 border-t border-white/8">
                <Link href="/browse/movies">
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/8 hover:bg-white/15 text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 border border-white/10"
                  >
                    Browse More Movies
                    <ChevronRight size={16} />
                  </motion.div>
                </Link>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile Up Next (bottom sheet) ── */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-auto"
            >
              {/* Handled by bottom controls above; mobile sidebar omitted for clean UX */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}