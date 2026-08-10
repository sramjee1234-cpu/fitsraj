import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fitsraj.com"),
  title: {
    default: "FitSraj - AI सिकौँ। Fit बनौँ। आफ्नो भविष्य बनाऔँ।",
    template: "%s | FitSraj",
  },
  description:
    "FitSraj एउटा नेपाली Digital Learning & Lifestyle Platform हो, जहाँ AI, Video Editing, Fitness, Trading र Personal Growth सम्बन्धी उपयोगी ज्ञान सरल भाषामा सिक्न सकिन्छ।",
  keywords: [
    "FitSraj",
    "AI Learning Nepali",
    "AI Course Nepal",
    "Free AI Course Nepal",
    "ChatGPT Nepali",
    "Gemini Nepali",
    "NotebookLM Nepali",
    "Google Flow Nepali",
    "AI Tools Nepal",
    "Video Editing Nepali",
    "Fitness Nepal",
    "Trading Basics Nepali",
  ],
  authors: [{ name: "FitSraj" }],
  creator: "FitSraj",
  openGraph: {
    type: "website",
    locale: "ne_NP",
    url: "https://fitsraj.com",
    siteName: "FitSraj",
    title: "FitSraj - AI सिकौँ। Fit बनौँ। आफ्नो भविष्य बनाऔँ।",
    description:
      "FitSraj एउटा नेपाली Digital Learning & Lifestyle Platform हो।",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FitSraj",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FitSraj - AI सिकौँ। Fit बनौँ। आफ्नो भविष्य बनाऔँ।",
    description:
      "FitSraj एउटा नेपाली Digital Learning & Lifestyle Platform हो।",
    images: ["/og-image.jpg"],
  },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ne">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
