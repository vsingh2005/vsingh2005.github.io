import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { PERSONAL_INFO } from "@/data/portfolioData";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
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
  title: "Vansh | Computer Engineer & Cloud Architect",
  description: "Portfolio of Vansh (ringularity0) — UMass Amherst Computer Engineering & Business Analytics. Cloud automation with Terraform/AWS, quantum machine learning, and high-impact systems.",
  keywords: [
    "Vansh",
    "ringularity0",
    "UMass Amherst",
    "Computer Engineering",
    "Cloud Architect",
    "Terraform",
    "AWS",
    "ASME IAM3D",
    "Quantum Machine Learning",
    "PennyLane"
  ],
  authors: [{ name: "Vansh", url: PERSONAL_INFO.github }],
  creator: "Vansh",
  icons: {
    icon: "/mii.png",
    shortcut: "/mii.png",
    apple: "/mii.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vsingh2005.github.io",
    title: "Vansh | Computer Engineer & Cloud Architect",
    description: PERSONAL_INFO.tagline,
    siteName: "Vansh Portfolio",
    images: [{ url: "/mii.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vansh | Computer Engineer & Cloud Architect",
    description: PERSONAL_INFO.tagline,
    images: ["/mii.png"],
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
      suppressHydrationWarning
      className={`dark scroll-smooth ${plusJakarta.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased selection:bg-brand-blue selection:text-white relative font-sans transition-colors duration-200">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="relative z-10 pt-20 flex-1">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

