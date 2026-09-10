import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { QuantumCanvas } from "@/components/canvas/QuantumCanvas";
import { BackgroundAmbient } from "@/components/canvas/BackgroundAmbient";
import { PERSONAL_INFO } from "@/data/portfolioData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
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
  title: "ringularity0 | Computer Engineer, Cloud & Quantum Systems",
  description: "Portfolio of ringularity0 (Vansh Singh - UMass Amherst Computer Engineering & Business Analytics). Cloud automation, quantum machine learning, and embedded mechatronics.",
  keywords: [
    "ringularity0",
    "Vansh Singh",
    "UMass Amherst",
    "Computer Engineering",
    "Business Analytics",
    "Quantum Machine Learning",
    "PennyLane",
    "AWS Braket",
    "Terraform",
    "Embedded Systems",
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
    title: "ringularity0 | Computer Engineer & Cloud / Quantum Systems",
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
      className={`dark scroll-smooth ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
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
