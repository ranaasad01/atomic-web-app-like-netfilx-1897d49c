import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StreamVault — Watch Movies & TV Shows Online",
  description:
    "Stream thousands of movies, TV shows, and originals. Watch anywhere, anytime. Cancel anytime.",
  keywords: ["streaming", "movies", "tv shows", "watch online", "StreamVault"],
  authors: [{ name: "StreamVault" }],
  openGraph: {
    title: "StreamVault — Watch Movies & TV Shows Online",
    description:
      "Stream thousands of movies, TV shows, and originals. Watch anywhere, anytime.",
    type: "website",
    siteName: "StreamVault",
  },
  twitter: {
    card: "summary_large_image",
    title: "StreamVault — Watch Movies & TV Shows Online",
    description:
      "Stream thousands of movies, TV shows, and originals. Watch anywhere, anytime.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#141414] text-white antialiased font-sans min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}