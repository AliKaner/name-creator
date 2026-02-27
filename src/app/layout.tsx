import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aetheria Forge - Fantasy Name Generator",
  description: "Generate authentic, lore-friendly names for your next fantasy epic, roleplaying campaign, or worldbuilding project.",
  keywords: [
    "fantasy name generator",
    "rpg names",
    "dnd names",
    "worldbuilding",
    "character names",
    "elven names",
    "orc names",
    "npc generator"
  ],
  authors: [{ name: "Aetheria Forge" }],
  creator: "Aetheria Forge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aetheriaforge.com",
    title: "Aetheria Forge - Authentic Fantasy Names",
    description: "Generate millions of unique, lore-friendly names for your fantasy worlds and RPG campaigns.",
    siteName: "Aetheria Forge",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aetheria Forge - Fantasy Name Generator",
    description: "Generate authentic names for your next fantasy adventure.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
