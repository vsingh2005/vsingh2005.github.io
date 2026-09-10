import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { QuantumCanvas } from "@/components/canvas/QuantumCanvas";
import { BackgroundAmbient } from "@/components/canvas/BackgroundAmbient";
import { PERSONAL_INFO } from "@/data/portfolioData";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vsingh2005.github.io"),
  title: "ringularity0 | Computer Engineer, Cloud & Embedded Systems",
  description: "Portfolio of Vansh Singh (ringularity0) — UMass Amherst Computer Engineering & Business Analytics. Cloud automation with Terraform/AWS, embedded mechatronics, and applied data systems.",
  keywords: [
    "ringularity0",
    "Vansh Singh",
    "UMass Amherst",
    "Computer Engineering",
    "Business Analytics",
    "Terraform",
    "AWS",
    "Embedded Systems",
    "Robotics",
    "Mechatronics",
    "ASME IAM3D"
  ],
  authors: [{ name: "ringularity0", url: PERSONAL_INFO.github }],
  creator: "ringularity0",
  icons: {
    icon: "/avatar.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vsingh2005.github.io",
    title: "ringularity0 | Computer Engineer, Cloud & Embedded Systems",
    description: PERSONAL_INFO.tagline,
    siteName: "ringularity0 Portfolio",
    images: [{ url: "/avatar.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ringularity0 | Engineering Portfolio",
    description: PERSONAL_INFO.tagline,
    images: ["/avatar.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${plusJakarta.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-background text-text-primary antialiased selection:bg-accent-blue/30 selection:text-white relative font-sans">
        {/* Film grain noise */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Dynamic atmospheric ambient glow & grid */}
        <BackgroundAmbient />

        {/* Interactive Quantum particle canvas */}
        <QuantumCanvas />

        {/* Smooth spring cursor */}
        <CustomCursor />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="relative z-10 pt-24 min-h-screen flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
