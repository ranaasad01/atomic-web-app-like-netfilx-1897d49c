"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Code2 as Github, MessageCircle as Twitter, Globe as Facebook, Camera as Instagram } from 'lucide-react';
import { footerSections, APP_NAME, APP_TAGLINE } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 mt-auto">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top: Brand + Social */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-12"
        >
          <motion.div variants={fadeInUp} className="max-w-xs">
            <Link href="/">
              <span className="text-[#E50914] font-black text-2xl tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="mt-3 text-[#B3B3B3] text-sm leading-relaxed">
              {APP_TAGLINE} Start watching today — no commitments, cancel anytime.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.15, color: "#E50914" }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[#B3B3B3] hover:text-white hover:border-white/40 transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Link Sections */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {footerSections.map((section) => (
              <motion.div key={section.title} variants={fadeInUp}>
                <h3 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[#B3B3B3] text-sm hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/8 mb-8" />

        {/* Bottom Bar */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#B3B3B3] text-xs"
        >
          <p>
            &copy; {new Date().getFullYear()} {APP_NAME}, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <span className="px-2 py-0.5 border border-white/20 rounded text-[10px] font-medium text-[#B3B3B3]">
              EN
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}