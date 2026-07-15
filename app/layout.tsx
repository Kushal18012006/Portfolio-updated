import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CanvasBackground from "@/components/CanvasBackground";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kushal Tripathi | Software Developer | Java & Frontend Developer",
  description: "Personal portfolio of Kushal Tripathi, a Computer Science undergraduate passionate about Software Development, Java, DSA, and building beautiful, responsive, and scalable web applications.",
  keywords: [
    "Kushal Tripathi",
    "Software Developer",
    "Java Developer",
    "Frontend Developer",
    "DSA Enthusiast",
    "Mathura",
    "Uttar Pradesh",
    "India",
    "Web Developer Portfolio",
    "React Developer",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Kushal Tripathi", url: "https://kushaltripathi.dev" }],
  creator: "Kushal Tripathi",
  metadataBase: new URL("https://kushaltripathi.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kushaltripathi.dev",
    title: "Kushal Tripathi | Software Developer | Java & Frontend Developer",
    description: "Computer Science undergraduate passionate about Software Development, Java, DSA, and building beautiful, responsive web applications.",
    siteName: "Kushal Tripathi Portfolio",
    images: [
      {
        url: "/assets/profile.png",
        width: 800,
        height: 800,
        alt: "Kushal Tripathi Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kushal Tripathi | Software Developer | Java & Frontend Developer",
    description: "Computer Science undergraduate passionate about Software Development, Java, DSA, and building beautiful, responsive web applications.",
    images: ["/assets/profile.png"],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Structured Data for Google Rich Snippets
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kushal Tripathi",
  jobTitle: "Software Developer",
  url: "https://kushaltripathi.dev",
  sameAs: [
    "https://github.com",
    "https://linkedin.com",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mathura",
    addressRegion: "Uttar Pradesh",
    addressCountry: "India",
  },
  colleague: [],
  knowsAbout: [
    "Java",
    "JavaScript",
    "Python",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Data Structures",
    "Algorithms",
    "Software Engineering",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans min-h-full flex flex-col relative overflow-x-hidden selection:bg-accent-cyan/30 selection:text-white">
        {/* Loading Entrance Animation */}
        <PageLoader />

        {/* Global Utilities */}
        <CustomCursor />
        <ScrollProgressBar />
        <CanvasBackground />
        
        {/* Background Noise Filter Texture */}
        <div className="noise-overlay" />

        {/* Navigation bar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative z-10">{children}</main>

        {/* Back to Top Navigation */}
        <BackToTop />
      </body>
    </html>
  );
}
