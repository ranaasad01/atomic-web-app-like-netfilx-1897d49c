// ─── Brand Constants ────────────────────────────────────────────────────────
export const APP_NAME = "StreamVault";
export const APP_TAGLINE = "Unlimited movies, TV shows, and more.";
export const APP_DESCRIPTION =
  "Watch anywhere. Cancel anytime. Stream thousands of titles across every genre.";

// ─── Navigation ─────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  /** If true, only show when user is authenticated */
  authOnly?: boolean;
  /** If true, only show when user is NOT authenticated */
  guestOnly?: boolean;
  /** If true, render as a CTA button */
  cta?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/browse/movies" },
  { label: "TV Shows", href: "/browse/tv-shows" },
  { label: "New & Popular", href: "/browse/new-popular" },
  { label: "My List", href: "/my-list", authOnly: true },
  { label: "Search", href: "/search" },
];

export const authNavLinks: NavLink[] = [
  { label: "Sign In", href: "/login", cta: true, guestOnly: true },
];

// ─── Footer Links ────────────────────────────────────────────────────────────
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Account", href: "/account" },
      { label: "Devices", href: "/devices" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Preferences", href: "/cookies" },
      { label: "Corporate Info", href: "/corporate" },
    ],
  },
  {
    title: "Browse",
    links: [
      { label: "Movies", href: "/browse/movies" },
      { label: "TV Shows", href: "/browse/tv-shows" },
      { label: "New & Popular", href: "/browse/new-popular" },
      { label: "My List", href: "/my-list" },
    ],
  },
];

// ─── Shared Types ────────────────────────────────────────────────────────────
export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export const genres: Genre[] = [
  { id: 28, name: "Action", slug: "action" },
  { id: 35, name: "Comedy", slug: "comedy" },
  { id: 18, name: "Drama", slug: "drama" },
  { id: 27, name: "Horror", slug: "horror" },
  { id: 878, name: "Sci-Fi", slug: "sci-fi" },
  { id: 10749, name: "Romance", slug: "romance" },
  { id: 53, name: "Thriller", slug: "thriller" },
  { id: 16, name: "Animation", slug: "animation" },
  { id: 99, name: "Documentary", slug: "documentary" },
  { id: 14, name: "Fantasy", slug: "fantasy" },
];

export interface ContentItem {
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
  cast?: string[];
  director?: string;
  trailerKey?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export const MOCK_PROFILES: UserProfile[] = [
  { id: "1", name: "Alex", avatar: "/images/profile-avatar-1.jpg", color: "#E50914" },
  { id: "2", name: "Jordan", avatar: "/images/profile-avatar-2.jpg", color: "#0080FF" },
  { id: "3", name: "Sam", avatar: "/images/profile-avatar-3.jpg", color: "#FFD700" },
  { id: "4", name: "Kids", avatar: "/images/profile-avatar-kids.jpg", color: "#00C853" },
];