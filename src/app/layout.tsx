import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Outfit is a great Google Sans alternative
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"], // Regular and Medium as requested
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "4nuraag",
  description: "Portfolio",
};

import NoiseOverlay from "@/components/NoiseOverlay";
import MobileNavBar from "@/components/MobileNavBar";
import LazyBackgroundBeams from "@/components/LazyBackgroundBeams";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} font-sans antialiased`}
      >
        <NoiseOverlay />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          {/* Base Background Layer */}
          <div className="fixed inset-0 -z-[60] bg-background transition-colors duration-500 pointer-events-none" />

          {/* Animated Beams Layer — lazy loaded, pauses when off-screen */}
          <LazyBackgroundBeams className="-z-[50] fixed inset-0" />

          {children}
          <MobileNavBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
