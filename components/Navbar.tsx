"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Bell, User, Menu, X, ChevronDown } from 'lucide-react';
import { navLinks, APP_NAME } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <motion.header
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#141414]/95 backdrop-blur-md shadow-2xl shadow-black/50"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="flex items-center gap-2"
            >
              <span className="text-[#E50914] font-black text-2xl lg:text-3xl tracking-tight select-none">
                {APP_NAME}
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 block ${
                      isActive
                        ? "text-white"
                        : "text-[#B3B3B3] hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E50914] rounded-full"
                      />
                    )}
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Search */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onSubmit={handleSearchSubmit}
                    className="overflow-hidden"
                  >
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Titles, people, genres"
                      className="w-full bg-black/80 border border-white/30 text-white text-sm px-3 py-1.5 rounded-md outline-none focus:border-white/70 placeholder-[#B3B3B3] transition-colors"
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                onClick={() => setSearchOpen((v) => !v)}
                className="p-2 text-[#B3B3B3] hover:text-white transition-colors rounded-md"
                aria-label="Toggle search"
              >
                {searchOpen ? <X size={20} /> : <Search size={20} />}
              </motion.button>
            </div>

            {/* Notifications */}
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              className="hidden sm:flex p-2 text-[#B3B3B3] hover:text-white transition-colors rounded-md relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E50914] rounded-full" />
            </motion.button>

            {/* Profile */}
            <Link href="/profile-selection">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="hidden sm:flex items-center gap-1.5 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-md bg-[#E50914] flex items-center justify-center overflow-hidden">
                  <User size={16} className="text-white" />
                </div>
                <ChevronDown
                  size={14}
                  className="text-[#B3B3B3] group-hover:text-white transition-colors"
                />
              </motion.div>
            </Link>

            {/* Sign In CTA */}
            <Link href="/login">
              <motion.span
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                className="hidden sm:inline-flex items-center px-4 py-1.5 bg-[#E50914] hover:bg-[#f6121d] text-white text-sm font-semibold rounded-md transition-colors duration-200 cursor-pointer"
              >
                Sign In
              </motion.span>
            </Link>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 text-[#B3B3B3] hover:text-white transition-colors rounded-md"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="lg:hidden overflow-hidden bg-[#141414]/98 backdrop-blur-md border-t border-white/10"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#E50914]/20 text-white border-l-2 border-[#E50914]"
                          : "text-[#B3B3B3] hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.25 }}
                className="mt-3 pt-3 border-t border-white/10 flex gap-3"
              >
                <Link href="/login" className="flex-1">
                  <span className="block text-center px-4 py-2.5 bg-[#E50914] hover:bg-[#f6121d] text-white text-sm font-semibold rounded-lg transition-colors">
                    Sign In
                  </span>
                </Link>
                <Link href="/profile-selection" className="flex-1">
                  <span className="block text-center px-4 py-2.5 border border-white/20 hover:border-white/40 text-white text-sm font-medium rounded-lg transition-colors">
                    Profiles
                  </span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}