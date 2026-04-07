import type { Metadata } from "next";
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import MobileNavBar from "@/components/MobileNavBar";

export const metadata: Metadata = {
  title: "Anuraag Vinod Kumar — Portfolio",
  description: "Creative Technologist, UI/UX Designer, and Full-Stack Developer. Exploring the intersection of design and engineering through interactive experiences, data visualization, and digital media.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Anuraag Vinod Kumar — Portfolio",
    description: "Creative Technologist, UI/UX Designer, and Full-Stack Developer. Portfolio showcasing projects in design, development, and creative technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased bg-[#0a0a0a] text-[#e8e8e8]"
      >
        <NoiseOverlay />
        {children}
        <MobileNavBar />
      </body>
    </html>
  );
}
