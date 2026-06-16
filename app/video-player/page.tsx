"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward, Settings, Subtitles, ThumbsUp, ThumbsDown, Share2, Plus, ChevronRight, Star, Clock, Calendar, Eye, ArrowLeft, X, Check } from 'lucide-react';
import Link from "next/link";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const FEATURED_MOVIE = {
  id: 1,
  title: "Echoes of the Abyss",
  description:
    "A deep-sea research team discovers an ancient signal emanating from the ocean floor. As they descend into the crushing darkness, they uncover a civilization that predates humanity — and a force that has been waiting millennia for their arrival.",
  year: 2024,
  duration: "2h 18m",
  rating: "PG-13",
  score: 8.7,
  genres: ["Sci-Fi", "Thriller", "Mystery"],
  director: "Mara Voss",
  cast: ["Elena Reyes", "James Okafor", "Priya Nair", "Tobias Wren", "Lena Schulz"],
  posterUrl: "/images/echoes-abyss-poster.jpg",
  backdropUrl: "/images/echoes-abyss-backdrop.jpg",
  views: "12.4M",
  likes: 94,
};

const RELATED_CONTENT = [
  {
    id: 2,
    title: "The Mariana Protocol",
    year: 2023,
    duration: "1h 52m",
    score: 8.1,
    genres: ["Sci-Fi", "Action"],
    posterUrl: "/images/mariana-protocol-poster.jpg",
    type: "movie",
  },
  {
    id: 3,
    title: "Dark Meridian",
    year: 2024,
    duration: "2h 04m",
    score: 7.9,
    genres: ["Thriller", "Drama"],
    posterUrl: "/images/dark-meridian-poster.jpg",
    type: "movie",
  },
  {
    id: 4,
    title: "Void Signal",
    year: 2022,
    duration: "1h 44m",
    score: 8.4,
    genres: ["Mystery", "Sci-Fi"],
    posterUrl: "/images/void-signal-poster.jpg",
    type: "movie",
  },
  {
    id: 5,
    title: "Abyssal",
    year: 2023,
    duration: "Season 1",
    score: 8.6,
    genres: ["Sci-Fi", "Horror"],
    posterUrl: "/images/abyssal-series-poster.jpg",
    type: "tv",
  },
  {
    id: 6,
    title: "Pressure Point",
    year: 2024,
    duration: "1h 58m",
    score: 7.7,
    genres: ["Action", "Thriller"],
    posterUrl: "/images/pressure-point-poster.jpg",
    type: "movie",
  },
  {
    id: 7,
    title: "The Deep Archive",
    year: 2021,
    duration: "2h 11m",
    score: 8.2,
    genres: ["Mystery", "Drama"],
    posterUrl: "/images/deep-archive-poster.jpg",
    type: "movie",
  },
];

const REVIEWS = [
  {
    id: 1,
    author: "CinematicMind",
    avatar: "https://www.ibm.com/content/adobe-cms/us/en/new/product-blog/the-s3-glacier-storage-classes-bring-the-benefits-of-tape-into-the-mainstream/jcr:content/root/table_of_contents/body-article-8/image_copy.coreimg.png/1763588622080/s3-glacier-1-1.png",
    rating: 9,
    date: "Jan 12, 2025",
    text: "An absolute masterpiece of underwater sci-fi. The practical effects combined with stunning CGI create a world that feels genuinely alien and terrifying. Mara Voss has crafted something truly special.",
    likes: 342,
  },
  {
    id: 2,
    author: "FilmCritic_Pro",
    avatar: "https://resizing.flixster.com/gWWM2Ov0VLAuazwELZCVc9grUQI=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzgyMGM0ZDJiLWNmYjAtNGI3NS1hYTgzLTQ5YmU2ZjQwZWE0ZC5qcGc=",
    rating: 8,
    date: "Jan 10, 2025",
    text: "Tense, atmospheric, and intellectually stimulating. The pacing is deliberate but rewards patient viewers with a third act that is genuinely breathtaking. Elena Reyes delivers a career-best performance.",
    likes: 218,
  },
  {
    id: 3,
    author: "SciFiEnthusiast",
    avatar: "https://butwhytho.net/wp-content/uploads/2025/12/Avatar-3-But-Why-Tho-3.jpg",
    rating: 9,
    date: "Jan 8, 2025",
    text: "Reminded me of the best of Arrival and The Abyss, but entirely its own thing. The sound design alone deserves an award. I watched it twice in one sitting.",
    likes: 189,
  },
];

const QUALITY_OPTIONS = ["Auto", "4K Ultra HD", "1080p HD", "720p", "480p"];
const SUBTITLE_OPTIONS = ["Off", "English", "Spanish", "French", "German", "Japanese"];
const SPEED_OPTIONS = ["0.5x", "0.75x", "1x", "1.25x", "1.5x", "2x"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProgressBar({
  progress,
  buffered,
  onSeek,
}: {
  progress: number;
  buffered: number;
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
      className="group relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer hover:h-3 transition-all duration-150"
    >
      {/* Buffered */}
      <div
        className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
        style={{ width: `${buffered * 100}%` }}
      />
      {/* Progress */}
      <div
        className="absolute inset-y-0 left-0 bg-[#E50914] rounded-full"
        style={{ width: `${progress * 100}%` }}
      />
      {/* Thumb */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 -ml-2"
        style={{ left: `${progress * 100}%` }}
      />
    </div>
  );
}

function VolumeSlider({
  volume,
  onChange,
}: {
  volume: number;
  onChange: (v: number) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onChange(pct);
  };

  return (
    <div
      ref={barRef}
      onClick={handleClick}
      className="relative w-20 h-1.5 bg-white/20 rounded-full cursor-pointer"
    >
      <div
        className="absolute inset-y-0 left-0 bg-white rounded-full"
        style={{ width: `${volume * 100}%` }}
      />
    </div>
  );
}

function SettingsPanel({
  quality,
  subtitle,
  speed,
  onQuality,
  onSubtitle,
  onSpeed,
  onClose,
}: {
  quality: string;
  subtitle: string;
  speed: string;
  onQuality: (q: string) => void;
  onSubtitle: (s: string) => void;
  onSpeed: (s: string) => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"quality" | "subtitles" | "speed">("quality");

  const tabs: { key: "quality" | "subtitles" | "speed"; label: string }[] = [
    { key: "quality", label: "Quality" },
    { key: "subtitles", label: "Subtitles" },
    { key: "speed", label: "Speed" },
  ];

  const options =
    tab === "quality"
      ? QUALITY_OPTIONS
      : tab === "subtitles"
      ? SUBTITLE_OPTIONS
      : SPEED_OPTIONS;

  const current = tab === "quality" ? quality : tab === "subtitles" ? subtitle : speed;
  const onSelect =
    tab === "quality" ? onQuality : tab === "subtitles" ? onSubtitle : onSpeed;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute bottom-16 right-4 w-64 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="text-white text-sm font-semibold">Playback Settings</span>
        <button onClick={onClose} className="text-[#B3B3B3] hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
      <div className="flex border-b border-white/10">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 text-xs font-medium transition-colors duration-150 ${
              tab === t.key
                ? "text-white border-b-2 border-[#E50914]"
                : "text-[#B3B3B3] hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ul className="py-2 max-h-48 overflow-y-auto">
        {options.map((opt) => (
          <li key={opt}>
            <button
              onClick={() => {
                onSelect(opt);
                onClose();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-white/5 transition-colors duration-150"
            >
              <span className={current === opt ? "text-white font-medium" : "text-[#B3B3B3]"}>
                {opt}
              </span>
              {current === opt && <Check size={14} className="text-[#E50914]" />}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function RelatedCard({ item }: { item: (typeof RELATED_CONTENT)[0] }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={scaleIn}
      whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -4 }}
      className="group cursor-pointer"
    >
      <Link href={`/video-player?id=${item.id}`}>
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#1a1a1a] mb-2">
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%231a1a1a'/%3E%3Ctext x='100' y='150' text-anchor='middle' fill='%23555' font-size='14' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <div className="flex items-center gap-1.5">
              <Play size={14} className="text-white fill-white" />
              <span className="text-white text-xs font-medium">Play</span>
            </div>
          </div>
          {item.type === "tv" && (
            <div className="absolute top-2 left-2 bg-[#E50914] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              SERIES
            </div>
          )}
        </div>
        <h4 className="text-white text-sm font-medium leading-tight mb-1 group-hover:text-[#E50914] transition-colors duration-200">
          {item.title}
        </h4>
        <div className="flex items-center gap-2 text-[#B3B3B3] text-xs">
          <span className="flex items-center gap-1">
            <Star size={10} className="text-yellow-400 fill-yellow-400" />
            {item.score}
          </span>
          <span>·</span>
          <span>{item.year}</span>
          <span>·</span>
          <span>{item.duration}</span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function VideoPlayerPage() {
  const shouldReduceMotion = useReducedMotion();

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.18);
  const [buffered, setBuffered] = useState(0.45);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState("1080p HD");
  const [subtitle, setSubtitle] = useState("Off");
  const [speed, setSpeed] = useState("1x");
  const [liked, setLiked] = useState<null | "up" | "down">(null);
  const [inMyList, setInMyList] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "related">("details");

  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Simulate playback progress
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return Math.min(1, p + 0.001);
      });
    }, 300);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Auto-hide controls
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    if (isPlaying) {
      controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    resetControlsTimer();
    return () => {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    };
  }, [isPlaying, resetControlsTimer]);

  const handlePlayerMouseMove = () => resetControlsTimer();

  const togglePlay = () => setIsPlaying((p) => !p);
  const toggleMute = () => setIsMuted((m) => !m);
  const handleSeek = (pct: number) => setProgress(pct);
  const handleVolume = (v: number) => {
    setVolume(v);
    if (v > 0) setIsMuted(false);
  };

  const formatTime = (pct: number) => {
    const totalSeconds = Math.round(pct * 138 * 60); // 2h18m = 138 min
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      : `${m}:${String(s).padStart(2, "0")}`;
  };

  const currentTime = formatTime(progress);
  const totalTime = "2:18:00";

  const tabs: { key: "details" | "reviews" | "related"; label: string }[] = [
    { key: "details", label: "Details" },
    { key: "reviews", label: "Reviews" },
    { key: "related", label: "More Like This" },
  ];

  return (
    <main className="min-h-screen bg-[#141414] text-white pt-16 lg:pt-20">
      {/* Hidden h1 for accessibility/SEO */}
      <h1 className="sr-only">Now Playing: {FEATURED_MOVIE.title}</h1>

      {/* ── Video Player ── */}
      <div
        ref={playerRef}
        onMouseMove={handlePlayerMouseMove}
        onClick={() => {
          if (!showSettings) togglePlay();
        }}
        className="relative w-full bg-black"
        style={{ aspectRatio: "16/9", maxHeight: "80vh" }}
      >
        {/* Backdrop / Poster as fake video */}
        <img
          src={FEATURED_MOVIE.backdropUrl}
          alt={FEATURED_MOVIE.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%230a0a0a'/%3E%3Ctext x='960' y='540' text-anchor='middle' fill='%23333' font-size='48' font-family='sans-serif'%3EEchoes of the Abyss%3C/text%3E%3C/svg%3E";
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Play/Pause center indicator */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Play size={36} className="text-white fill-white ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls overlay */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex flex-col justify-between pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar */}
              <div className="flex items-center gap-3 px-4 pt-4 pointer-events-auto">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5"
                >
                  <ArrowLeft size={16} />
                  <span className="text-sm font-medium">Back</span>
                </Link>
                <div className="flex-1" />
                <div className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <span className="text-white text-sm font-semibold">{FEATURED_MOVIE.title}</span>
                </div>
              </div>

              {/* Bottom controls */}
              <div className="px-4 pb-4 pointer-events-auto">
                {/* Progress bar */}
                <div className="mb-3">
                  <ProgressBar progress={progress} buffered={buffered} onSeek={handleSeek} />
                  <div className="flex items-center justify-between mt-1.5 text-xs text-white/70">
                    <span>{currentTime}</span>
                    <span>{totalTime}</span>
                  </div>
                </div>

                {/* Control buttons */}
                <div className="flex items-center gap-2 relative">
                  {/* Left controls */}
                  <div className="flex items-center gap-1">
                    <motion.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                      onClick={() => setProgress((p) => Math.max(0, p - 0.02))}
                      className="w-9 h-9 flex items-center justify-center text-white hover:text-white/80 transition-colors"
                    >
                      <SkipBack size={20} />
                    </motion.button>

                    <motion.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                      onClick={togglePlay}
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-black hover:bg-white/90 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause size={20} className="fill-black" />
                      ) : (
                        <Play size={20} className="fill-black ml-0.5" />
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                      onClick={() => setProgress((p) => Math.min(1, p + 0.02))}
                      className="w-9 h-9 flex items-center justify-center text-white hover:text-white/80 transition-colors"
                    >
                      <SkipForward size={20} />
                    </motion.button>

                    {/* Volume */}
                    <div className="flex items-center gap-2 ml-1">
                      <motion.button
                        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                        whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                        onClick={toggleMute}
                        className="w-9 h-9 flex items-center justify-center text-white hover:text-white/80 transition-colors"
                      >
                        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </motion.button>
                      <VolumeSlider volume={isMuted ? 0 : volume} onChange={handleVolume} />
                    </div>
                  </div>

                  <div className="flex-1" />

                  {/* Right controls */}
                  <div className="flex items-center gap-1">
                    <span className="text-white/60 text-xs mr-1">{quality}</span>

                    <motion.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSettings((s) => !s);
                      }}
                      className={`w-9 h-9 flex items-center justify-center transition-colors ${
                        showSettings ? "text-[#E50914]" : "text-white hover:text-white/80"
                      }`}
                    >
                      <Settings size={18} />
                    </motion.button>

                    <motion.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                      className="w-9 h-9 flex items-center justify-center text-white hover:text-white/80 transition-colors"
                    >
                      <Subtitles size={18} />
                    </motion.button>

                    <motion.button
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                      onClick={() => setIsFullscreen((f) => !f)}
                      className="w-9 h-9 flex items-center justify-center text-white hover:text-white/80 transition-colors"
                    >
                      {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </motion.button>
                  </div>

                  {/* Settings Panel */}
                  <AnimatePresence>
                    {showSettings && (
                      <SettingsPanel
                        quality={quality}
                        subtitle={subtitle}
                        speed={speed}
                        onQuality={setQuality}
                        onSubtitle={setSubtitle}
                        onSpeed={setSpeed}
                        onClose={() => setShowSettings(false)}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Content Below Player ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">
            {/* Title + Meta */}
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={fadeInUp}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-black text-white mb-2">
                    {FEATURED_MOVIE.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[#B3B3B3]">
                    <span className="flex items-center gap-1.5">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-semibold">{FEATURED_MOVIE.score}</span>
                      <span>/10</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#B3B3B3]" />
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {FEATURED_MOVIE.year}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#B3B3B3]" />
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} />
                      {FEATURED_MOVIE.duration}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#B3B3B3]" />
                    <span className="flex items-center gap-1.5">
                      <Eye size={13} />
                      {FEATURED_MOVIE.views} views
                    </span>
                    <span className="border border-white/30 text-white/70 text-xs px-1.5 py-0.5 rounded">
                      {FEATURED_MOVIE.rating}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    onClick={() => setLiked(liked === "up" ? null : "up")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      liked === "up"
                        ? "bg-[#E50914] border-[#E50914] text-white"
                        : "border-white/20 text-[#B3B3B3] hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <ThumbsUp size={15} />
                    <span>{FEATURED_MOVIE.likes}%</span>
                  </motion.button>

                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    onClick={() => setLiked(liked === "down" ? null : "down")}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm transition-all duration-200 ${
                      liked === "down"
                        ? "bg-white/10 border-white/40 text-white"
                        : "border-white/20 text-[#B3B3B3] hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <ThumbsDown size={15} />
                  </motion.button>

                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    onClick={() => setInMyList((v) => !v)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      inMyList
                        ? "bg-white/10 border-white/40 text-white"
                        : "border-white/20 text-[#B3B3B3] hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {inMyList ? <Check size={15} /> : <Plus size={15} />}
                    <span>{inMyList ? "In My List" : "My List"}</span>
                  </motion.button>

                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/20 text-[#B3B3B3] hover:border-white/40 hover:text-white transition-all duration-200"
                  >
                    <Share2 size={15} />
                  </motion.button>
                </div>
              </div>

              {/* Genre tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {FEATURED_MOVIE.genres.map((g) => (
                  <span
                    key={g}
                    className="bg-white/8 border border-white/10 text-[#B3B3B3] text-xs px-3 py-1 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={fadeIn}
              className="border-b border-white/10 mb-6"
            >
              <div className="flex gap-0">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={`px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                      activeTab === t.key
                        ? "text-white border-[#E50914]"
                        : "text-[#B3B3B3] border-transparent hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-[#B3B3B3] leading-relaxed mb-8 text-base">
                    {FEATURED_MOVIE.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-white/50 text-xs uppercase tracking-widest mb-2 font-semibold">
                        Director
                      </h3>
                      <p className="text-white font-medium">{FEATURED_MOVIE.director}</p>
                    </div>
                    <div>
                      <h3 className="text-white/50 text-xs uppercase tracking-widest mb-2 font-semibold">
                        Cast
                      </h3>
                      <p className="text-white font-medium">
                        {(FEATURED_MOVIE.cast ?? []).join(", ")}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-white/50 text-xs uppercase tracking-widest mb-2 font-semibold">
                        Quality
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] text-xs font-bold px-2 py-0.5 rounded">
                          4K
                        </span>
                        <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-2 py-0.5 rounded">
                          HDR
                        </span>
                        <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-2 py-0.5 rounded">
                          Dolby
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white/50 text-xs uppercase tracking-widest mb-2 font-semibold">
                        Subtitles
                      </h3>
                      <p className="text-white font-medium">
                        English, Spanish, French, German, Japanese
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  {REVIEWS.map((review) => (
                    <motion.div
                      key={review.id}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      className="bg-white/4 border border-white/8 rounded-xl p-5"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-10 h-10 rounded-full object-cover bg-[#2a2a2a] flex-shrink-0"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%232a2a2a' rx='20'/%3E%3Ctext x='20' y='25' text-anchor='middle' fill='%23666' font-size='16' font-family='sans-serif'%3E${review.author.charAt(0)}%3C/text%3E%3C/svg%3E`;
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-white font-semibold text-sm">{review.author}</span>
                            <span className="text-[#B3B3B3] text-xs flex-shrink-0">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < review.rating ? "bg-[#E50914]" : "bg-white/15"
                                }`}
                              />
                            ))}
                            <span className="text-[#B3B3B3] text-xs ml-1">{review.rating}/10</span>
                          </div>
                          <p className="text-[#B3B3B3] text-sm leading-relaxed">{review.text}</p>
                          <div className="flex items-center gap-1 mt-3 text-[#B3B3B3] text-xs">
                            <ThumbsUp size={12} />
                            <span>{review.likes} found this helpful</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "related" && (
                <motion.div
                  key="related"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                  >
                    {RELATED_CONTENT.map((item) => (
                      <RelatedCard key={item.id} item={item} />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Sidebar: Up Next ── */}
          <motion.aside
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={fadeInUp}
            className="lg:w-80 xl:w-96 flex-shrink-0"
          >
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Up Next</h3>
                <Link
                  href="/browse/movies"
                  className="text-[#E50914] text-sm font-medium flex items-center gap-1 hover:text-red-400 transition-colors"
                >
                  See all <ChevronRight size={14} />
                </Link>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                {RELATED_CONTENT.slice(0, 4).map((item) => (
                  <motion.div key={item.id} variants={fadeInUp}>
                    <Link href={`/video-player?id=${item.id}`}>
                      <motion.div
                        whileHover={shouldReduceMotion ? {} : { x: 4 }}
                        className="flex gap-3 group cursor-pointer"
                      >
                        <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-[#1a1a1a] flex-shrink-0">
                          <img
                            src={item.posterUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='63' viewBox='0 0 112 63'%3E%3Crect width='112' height='63' fill='%231a1a1a'/%3E%3C/svg%3E";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <Play size={18} className="text-white fill-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 py-0.5">
                          <h4 className="text-white text-sm font-semibold leading-tight mb-1 group-hover:text-[#E50914] transition-colors duration-200 line-clamp-2">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[#B3B3B3] text-xs">
                            <Star size={10} className="text-yellow-400 fill-yellow-400" />
                            <span>{item.score}</span>
                            <span>·</span>
                            <span>{item.duration}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {(item.genres ?? []).slice(0, 2).map((g) => (
                              <span
                                key={g}
                                className="text-[10px] text-[#B3B3B3] bg-white/6 px-1.5 py-0.5 rounded"
                              >
                                {g}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Continue Watching Progress */}
              <div className="mt-8 bg-white/4 border border-white/8 rounded-xl p-4">
                <h4 className="text-white font-semibold text-sm mb-3">Your Progress</h4>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-[#E50914]/20 border border-[#E50914]/30 flex items-center justify-center flex-shrink-0">
                    <Play size={18} className="text-[#E50914] fill-[#E50914]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{FEATURED_MOVIE.title}</p>
                    <p className="text-[#B3B3B3] text-xs mt-0.5">
                      {currentTime} / {totalTime}
                    </p>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E50914] rounded-full transition-all duration-300"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <p className="text-[#B3B3B3] text-xs mt-2">
                  {Math.round(progress * 100)}% complete
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}