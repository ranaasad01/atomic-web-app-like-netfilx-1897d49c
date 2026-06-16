"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, Plus, Check, Star, Clock, Calendar, ChevronLeft, Volume2, VolumeX, Share2, ThumbsUp } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";

// ─── Mock Data ───────────────────────────────────────────────────────────────

interface CastMember {
  id: number;
  name: string;
  character: string;
  avatar: string;
}

interface SimilarTitle {
  id: number;
  title: string;
  poster: string;
  year: number;
  rating: number;
  type: "movie" | "tv";
  genres: string[];
}

interface MovieDetail {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  backdropUrl: string;
  posterUrl: string;
  year: number;
  duration: string;
  rating: number;
  voteCount: number;
  genres: string[];
  director: string;
  cast: CastMember[];
  trailerKey: string;
  maturityRating: string;
  language: string;
  similar: SimilarTitle[];
}

const MOVIE_DATA: Record<string, MovieDetail> = {
  "1": {
    id: 1,
    title: "Echoes of the Abyss",
    tagline: "Some depths were never meant to be explored.",
    overview:
      "When a deep-sea research team discovers an ancient signal emanating from the Mariana Trench, they descend into a world that defies all known science. As the pressure mounts and crew members begin experiencing vivid hallucinations, marine biologist Dr. Lena Marsh must unravel the mystery before the ocean claims them all. A breathtaking blend of psychological horror and hard science fiction that will leave you questioning the nature of consciousness itself.",
    backdropUrl: "/images/echoes-abyss-cinematic-ocean-backdrop.jpg",
    posterUrl: "/images/echoes-abyss-movie-poster.jpg",
    year: 2024,
    duration: "2h 18m",
    rating: 8.4,
    voteCount: 24817,
    genres: ["Sci-Fi", "Thriller", "Horror"],
    director: "Nadia Okonkwo",
    maturityRating: "R",
    language: "English",
    trailerKey: "dQw4w9WgXcQ",
    cast: [
      { id: 1, name: "Zara Voss", character: "Dr. Lena Marsh", avatar: "https://sofiaglobe.com/wp-content/uploads/2013/07/protest-sofia-delacroix-1-alexander-varbenov.jpg" },
      { id: 2, name: "Marcus Hale", character: "Commander Reyes", avatar: "https://elliottequip.com/wp-content/uploads/2018/07/BT45127_E45127-A.jpg" },
      { id: 3, name: "Priya Nair", character: "Dr. Yuki Tanaka", avatar: "https://static.wikia.nocookie.net/sakura-quest/images/1/14/Kai_Nakamura.png/revision/latest?cb=20250622110529" },
      { id: 4, name: "Eliot Crane", character: "Engineer Bosch", avatar: "https://static.wikia.nocookie.net/sakura-quest/images/1/14/Kai_Nakamura.png/revision/latest?cb=20250622110529" },
      { id: 5, name: "Sofia Delacroix", character: "Navigator Chen", avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ" },
      { id: 6, name: "Tobias Wren", character: "Dr. Harmon", avatar: "https://elliottequip.com/wp-content/uploads/2018/07/BT45127_E45127-A.jpg" },
    ],
    similar: [
      { id: 2, title: "Gravity's Edge", poster: "/images/movie-gravitys-edge-poster.jpg", year: 2023, rating: 7.9, type: "movie", genres: ["Sci-Fi", "Action"] },
      { id: 3, title: "The Hollow Signal", poster: "/images/movie-hollow-signal-poster.jpg", year: 2024, rating: 8.1, type: "movie", genres: ["Thriller", "Mystery"] },
      { id: 4, title: "Dark Meridian", poster: "/images/movie-dark-meridian-poster.jpg", year: 2022, rating: 7.6, type: "movie", genres: ["Horror", "Sci-Fi"] },
      { id: 5, title: "Submerged", poster: "/images/movie-submerged-poster.jpg", year: 2023, rating: 7.3, type: "movie", genres: ["Thriller"] },
      { id: 6, title: "Leviathan Rising", poster: "/images/movie-leviathan-rising-poster.jpg", year: 2024, rating: 8.7, type: "tv", genres: ["Sci-Fi", "Drama"] },
      { id: 7, title: "Pressure Point", poster: "/images/movie-pressure-point-poster.jpg", year: 2022, rating: 7.8, type: "movie", genres: ["Action", "Thriller"] },
    ],
  },
  "2": {
    id: 2,
    title: "Gravity's Edge",
    tagline: "The universe has no mercy.",
    overview:
      "Stranded 400 kilometers above Earth after a catastrophic debris storm destroys their shuttle, astronauts Kai and Priya must use every ounce of ingenuity to survive. With oxygen dwindling and communication cut off, they embark on a harrowing journey across orbital stations in a desperate bid to return home. A visceral, visually stunning survival epic that redefines the space thriller genre.",
    backdropUrl: "/images/gravitys-edge-space-cinematic-backdrop.jpg",
    posterUrl: "/images/movie-gravitys-edge-poster.jpg",
    year: 2023,
    duration: "1h 54m",
    rating: 7.9,
    voteCount: 18432,
    genres: ["Sci-Fi", "Action", "Drama"],
    director: "James Okafor",
    maturityRating: "PG-13",
    language: "English",
    trailerKey: "dQw4w9WgXcQ",
    cast: [
      { id: 1, name: "Kai Nakamura", character: "Commander Kai", avatar: "https://static.wikia.nocookie.net/sakura-quest/images/1/14/Kai_Nakamura.png/revision/latest?cb=20250622110529" },
      { id: 2, name: "Priya Nair", character: "Dr. Priya", avatar: "https://static.wikia.nocookie.net/sakura-quest/images/1/14/Kai_Nakamura.png/revision/latest?cb=20250622110529" },
      { id: 3, name: "Eliot Crane", character: "Mission Control", avatar: "https://static.wikia.nocookie.net/sakura-quest/images/1/14/Kai_Nakamura.png/revision/latest?cb=20250622110529" },
      { id: 4, name: "Sofia Delacroix", character: "Station Chief", avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ" },
      { id: 5, name: "Marcus Hale", character: "Cosmonaut Volkov", avatar: "https://elliottequip.com/wp-content/uploads/2018/07/BT45127_E45127-A.jpg" },
      { id: 6, name: "Zara Voss", character: "Ground Analyst", avatar: "https://sofiaglobe.com/wp-content/uploads/2013/07/protest-sofia-delacroix-1-alexander-varbenov.jpg" },
    ],
    similar: [
      { id: 1, title: "Echoes of the Abyss", poster: "/images/echoes-abyss-movie-poster.jpg", year: 2024, rating: 8.4, type: "movie", genres: ["Sci-Fi", "Thriller"] },
      { id: 3, title: "The Hollow Signal", poster: "/images/movie-hollow-signal-poster.jpg", year: 2024, rating: 8.1, type: "movie", genres: ["Thriller", "Mystery"] },
      { id: 4, title: "Dark Meridian", poster: "/images/movie-dark-meridian-poster.jpg", year: 2022, rating: 7.6, type: "movie", genres: ["Horror", "Sci-Fi"] },
      { id: 5, title: "Submerged", poster: "/images/movie-submerged-poster.jpg", year: 2023, rating: 7.3, type: "movie", genres: ["Thriller"] },
      { id: 6, title: "Leviathan Rising", poster: "/images/movie-leviathan-rising-poster.jpg", year: 2024, rating: 8.7, type: "tv", genres: ["Sci-Fi", "Drama"] },
      { id: 7, title: "Pressure Point", poster: "/images/movie-pressure-point-poster.jpg", year: 2022, rating: 7.8, type: "movie", genres: ["Action", "Thriller"] },
    ],
  },
};

const DEFAULT_MOVIE = MOVIE_DATA["1"];

// ─── Star Rating Component ────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating / 2);
  const hasHalf = (rating / 2) % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} size={14} className="fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalf && (
        <div className="relative">
          <Star size={14} className="text-white/20" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={14} className="text-white/20" />
      ))}
    </div>
  );
}

// ─── Trailer Modal ────────────────────────────────────────────────────────────

function TrailerModal({ trailerKey, onClose }: { trailerKey: string; onClose: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={shouldReduceMotion ? {} : { scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black transition-colors"
            aria-label="Close trailer"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Similar Title Card ───────────────────────────────────────────────────────

function SimilarCard({ item }: { item: SimilarTitle }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={scaleIn}
      whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -4 }}
      transition={{ duration: 0.25 }}
      className="group cursor-pointer"
    >
      <Link href={`/movie/${item.id}`}>
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-white/5 shadow-lg shadow-black/40">
          <img
            src={item.poster}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(item.title)}&background=1a1a2e&color=E50914&size=300&bold=true`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center gap-1.5 mb-1">
              <Star size={11} className="fill-yellow-400 text-yellow-400" />
              <span className="text-yellow-400 text-xs font-semibold">{item.rating.toFixed(1)}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {(item.genres ?? []).slice(0, 2).map((g) => (
                <span key={g} className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                  {g}
                </span>
              ))}
            </div>
          </div>
          {item.type === "tv" && (
            <div className="absolute top-2 left-2 bg-[#E50914] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              SERIES
            </div>
          )}
        </div>
        <div className="mt-2.5 px-0.5">
          <p className="text-white text-sm font-semibold leading-tight line-clamp-1 group-hover:text-[#E50914] transition-colors">
            {item.title}
          </p>
          <p className="text-[#B3B3B3] text-xs mt-0.5">{item.year}</p>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Cast Card ────────────────────────────────────────────────────────────────

function CastCard({ member }: { member: CastMember }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={shouldReduceMotion ? {} : { y: -4 }}
      className="flex flex-col items-center text-center group"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#E50914]/60 transition-colors duration-300 shadow-lg shadow-black/40">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a1a1a&color=E50914&size=80&bold=true`;
          }}
        />
      </div>
      <p className="mt-2 text-white text-xs sm:text-sm font-semibold leading-tight">{member.name}</p>
      <p className="text-[#B3B3B3] text-[11px] sm:text-xs mt-0.5 leading-tight">{member.character}</p>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const movie = MOVIE_DATA[params?.id ?? "1"] ?? DEFAULT_MOVIE;

  const [inMyList, setInMyList] = useState(false);
  const [liked, setLiked] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const ratingPercent = Math.round((movie.rating / 10) * 100);

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      {/* ── Cinematic Backdrop Hero ── */}
      <section className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[75vh] overflow-hidden">
        {/* Backdrop Image */}
        <motion.div
          initial={shouldReduceMotion ? {} : { scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={imgError ? "/images/cinematic-dark-backdrop.jpg" : movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
            onError={() => setImgError(true)}
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/70 via-transparent to-transparent" />

        {/* Back Button */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="absolute top-24 left-4 sm:left-8 lg:left-12"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 lg:px-12 pb-10">
          <motion.div
            initial={shouldReduceMotion ? {} : "hidden"}
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            {/* Genres */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-3">
              {(movie.genres ?? []).map((g) => (
                <span
                  key={g}
                  className="text-xs font-semibold bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] px-2.5 py-1 rounded-full"
                >
                  {g}
                </span>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-2"
            >
              {movie.title}
            </motion.h1>

            {/* Tagline */}
            <motion.p variants={fadeInUp} className="text-[#B3B3B3] text-sm sm:text-base italic mb-4">
              {movie.tagline}
            </motion.p>

            {/* Meta row */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <div className="flex items-center gap-1.5">
                <StarRating rating={movie.rating} />
                <span className="text-yellow-400 font-bold text-sm">{movie.rating.toFixed(1)}</span>
                <span className="text-[#B3B3B3] text-xs">({(movie.voteCount ?? 0).toLocaleString()} votes)</span>
              </div>
              <span className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-1.5 text-[#B3B3B3] text-sm">
                <Calendar size={14} />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#B3B3B3] text-sm">
                <Clock size={14} />
                <span>{movie.duration}</span>
              </div>
              <span className="border border-white/30 text-white/70 text-xs px-2 py-0.5 rounded font-semibold">
                {movie.maturityRating}
              </span>
              <span className="text-[#B3B3B3] text-xs uppercase tracking-wide">{movie.language}</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                onClick={() => setTrailerOpen(true)}
                className="flex items-center gap-2.5 bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors shadow-lg shadow-black/30"
              >
                <Play size={18} className="fill-black" />
                Watch Trailer
              </motion.button>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                onClick={() => setInMyList((v) => !v)}
                className={`flex items-center gap-2.5 font-semibold px-5 py-3 rounded-lg border transition-all duration-200 shadow-lg shadow-black/30 ${
                  inMyList
                    ? "bg-[#E50914] border-[#E50914] text-white"
                    : "bg-white/10 border-white/30 text-white hover:bg-white/20"
                }`}
                aria-label={inMyList ? "Remove from My List" : "Add to My List"}
              >
                {inMyList ? <Check size={18} /> : <Plus size={18} />}
                {inMyList ? "In My List" : "My List"}
              </motion.button>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.93 }}
                onClick={() => setLiked((v) => !v)}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  liked
                    ? "bg-blue-500/20 border-blue-400 text-blue-400"
                    : "bg-white/10 border-white/30 text-white hover:bg-white/20"
                }`}
                aria-label="Like"
              >
                <ThumbsUp size={16} className={liked ? "fill-blue-400" : ""} />
              </motion.button>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.93 }}
                className="w-11 h-11 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Share"
              >
                <Share2 size={16} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Content Body ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-16">

        {/* ── Overview + Details ── */}
        <motion.section
          initial={shouldReduceMotion ? {} : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          {/* Overview */}
          <motion.div variants={slideInLeft} className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#E50914] rounded-full inline-block" />
              Overview
            </h2>
            <p className="text-[#B3B3B3] leading-relaxed text-base">{movie.overview}</p>

            {/* Rating bar */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#B3B3B3] font-medium">Audience Score</span>
                <span className="text-white font-bold">{ratingPercent}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${ratingPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-[#E50914] to-orange-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Details sidebar */}
          <motion.div variants={slideInRight} className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#E50914] rounded-full inline-block" />
              Details
            </h2>
            {[
              { label: "Director", value: movie.director },
              { label: "Release Year", value: String(movie.year) },
              { label: "Duration", value: movie.duration },
              { label: "Rating", value: movie.maturityRating },
              { label: "Language", value: movie.language },
              { label: "Genres", value: (movie.genres ?? []).join(", ") },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5 border-b border-white/8 pb-3">
                <span className="text-[#B3B3B3] text-xs uppercase tracking-wider font-semibold">{label}</span>
                <span className="text-white text-sm font-medium">{value}</span>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Cast ── */}
        <motion.section
          initial={shouldReduceMotion ? {} : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#E50914] rounded-full inline-block" />
            Top Cast
          </motion.h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
            {(movie.cast ?? []).map((member) => (
              <CastCard key={member.id} member={member} />
            ))}
          </div>
        </motion.section>

        {/* ── Trailer Section ── */}
        <motion.section
          initial={shouldReduceMotion ? {} : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#E50914] rounded-full inline-block" />
            Official Trailer
          </motion.h2>
          <motion.div
            variants={scaleIn}
            className="relative aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/8 shadow-2xl shadow-black/60 cursor-pointer group max-w-3xl"
            onClick={() => setTrailerOpen(true)}
          >
            <img
              src={`https://img.youtube.com/vi/${movie.trailerKey}/maxresdefault.jpg`}
              alt="Trailer thumbnail"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = movie.backdropUrl;
              }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.12 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/60 flex items-center justify-center shadow-2xl"
              >
                <Play size={28} className="fill-white text-white ml-1" />
              </motion.div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-white font-semibold text-sm drop-shadow">{movie.title} — Official Trailer</span>
              <span className="text-white/70 text-xs">Click to play</span>
            </div>
          </motion.div>
        </motion.section>

        {/* ── More Like This ── */}
        <motion.section
          initial={shouldReduceMotion ? {} : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#E50914] rounded-full inline-block" />
            More Like This
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {(movie.similar ?? []).map((item) => (
              <SimilarCard key={item.id} item={item} />
            ))}
          </motion.div>
        </motion.section>

        {/* ── My List CTA Banner ── */}
        <motion.section
          initial={shouldReduceMotion ? {} : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#E50914]/20 via-[#1a1a2e] to-[#0a0a1a] border border-[#E50914]/20 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(229,9,20,0.15),_transparent_60%)]" />
            <div className="relative z-10 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {inMyList ? "Added to Your List!" : "Save for Later"}
              </h3>
              <p className="text-[#B3B3B3] text-sm max-w-md">
                {inMyList
                  ? `${movie.title} is in your list. Find it anytime under My List.`
                  : `Add ${movie.title} to your list and watch it whenever you're ready.`}
              </p>
            </div>
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              onClick={() => setInMyList((v) => !v)}
              className={`relative z-10 flex items-center gap-2.5 font-bold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg ${
                inMyList
                  ? "bg-white/10 border border-white/30 text-white hover:bg-white/20"
                  : "bg-[#E50914] text-white hover:bg-[#c40812] shadow-[#E50914]/30"
              }`}
            >
              {inMyList ? <Check size={18} /> : <Plus size={18} />}
              {inMyList ? "Remove from List" : "Add to My List"}
            </motion.button>
          </div>
        </motion.section>
      </div>

      {/* ── Trailer Modal ── */}
      {trailerOpen && (
        <TrailerModal trailerKey={movie.trailerKey} onClose={() => setTrailerOpen(false)} />
      )}
    </main>
  );
}