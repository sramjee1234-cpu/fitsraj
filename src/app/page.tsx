"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  SITE_DESCRIPTION_NE,
  SITE_DESCRIPTION_EN,
  YOUTUBE_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  TIKTOK_URL,
} from "@/lib/constants";

function BirthdayCalculator() {
  const { t } = useLanguage();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalWeeks: number;
    totalDays: number;
  } | null>(null);

  const calculateAge = () => {
    if (!day || !month || !year) return;
    const birth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(
      (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalWeeks = Math.floor(totalDays / 7);

    setResult({ years, months, days, totalDays, totalWeeks });
  };

  return (
    <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-4">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📅</span>
            <h2 className="text-sm font-bold text-gray-900">
              {t("मेरो उमेर गणना", "My Age Calculator")}
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="YYYY"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                min="1900"
                max="2099"
                className="w-1/3 rounded-lg border border-gray-200 px-3 py-2 text-sm text-center focus:border-highlight focus:outline-none focus:ring-1 focus:ring-highlight/20"
              />
              <input
                type="number"
                placeholder="MM"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                min="1"
                max="12"
                className="w-1/3 rounded-lg border border-gray-200 px-3 py-2 text-sm text-center focus:border-highlight focus:outline-none focus:ring-1 focus:ring-highlight/20"
              />
              <input
                type="number"
                placeholder="DD"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                min="1"
                max="31"
                className="w-1/3 rounded-lg border border-gray-200 px-3 py-2 text-sm text-center focus:border-highlight focus:outline-none focus:ring-1 focus:ring-highlight/20"
              />
            </div>
            <button
              onClick={calculateAge}
              className="w-full rounded-lg bg-highlight px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-highlight/90"
            >
              {t("गणना गर्नुहोस्", "Calculate")}
            </button>
          </div>
          {result && (
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
              <div className="rounded-lg bg-blue-50 p-3 text-center">
                <div className="text-xl font-bold text-blue-600">{result.years}</div>
                <div className="text-xs text-gray-500">{t("बर्ष (Years)", "Years")}</div>
              </div>
              <div className="rounded-lg bg-green-50 p-3 text-center">
                <div className="text-xl font-bold text-green-600">{result.months}</div>
                <div className="text-xs text-gray-500">{t("महिना (Months)", "Months")}</div>
              </div>
              <div className="rounded-lg bg-orange-50 p-3 text-center">
                <div className="text-xl font-bold text-orange-600">{result.days}</div>
                <div className="text-xs text-gray-500">{t("दिन (Days)", "Days")}</div>
              </div>
              <div className="rounded-lg bg-purple-50 p-3 text-center">
                <div className="text-xl font-bold text-purple-600">{result.totalWeeks.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{t("हप्ता (Weeks)", "Weeks")}</div>
              </div>
              <div className="rounded-lg bg-pink-50 p-3 text-center">
                <div className="text-xl font-bold text-pink-600">{result.totalDays.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{t("जम्मा दिन", "Total Days")}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function VisitorCounter() {
  const { t } = useLanguage();
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("fitsraj_visits");
    const count = stored ? parseInt(stored, 10) + 1 : 1247;
    localStorage.setItem("fitsraj_visits", count.toString());
    setVisits(count);
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">👁️</span>
        <div>
          <div className="text-xl font-bold text-white">{visits.toLocaleString()}</div>
          <div className="text-xs text-white/60">{t("Total Visitors", "Total Visitors")}</div>
        </div>
      </div>
    </div>
  );
}

function TopLinks() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-end gap-3">
      <div className="flex items-center gap-3">
        <Link href="/about" className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20">
          👤 {t("About", "About")}
        </Link>
        <Link href="/chat-me" className="flex items-center gap-1.5 rounded-lg bg-highlight px-3 py-2 text-sm text-white transition-colors hover:bg-highlight/90">
          💬 {t("Chat Bot", "Chat Bot")}
        </Link>
        <Link href="/contact" className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20">
          📧 {t("Contact", "Contact")}
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/ai-photo-prompts" className="flex items-center gap-1.5 rounded-lg bg-purple-500 px-3 py-2 text-sm text-white transition-colors hover:bg-purple-600">
          📸 {t("AI Prompts", "AI Prompts")}
        </Link>
        <Link href="/shop" className="flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-2 text-sm text-white transition-colors hover:bg-green-600">
          🛒 {t("Health Store", "Health Store")}
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const heroSlides = [
    { ne: "AI सिकौँ। Fit बनौँ। आफ्नो भविष्य बनाऔँ।", en: "Learn AI. Stay Fit. Build Your Future." },
    { ne: "ChatGPT, Gemini सिक्नुहोस्।", en: "Learn ChatGPT, Gemini." },
    { ne: "AI Tools महारत हासिल गर्नुहोस्।", en: "Master AI Tools." },
    { ne: "Prompt Engineering सिक्नुहोस्।", en: "Learn Prompt Engineering." },
    { ne: "AI बाट भिडियो बनाउनुहोस्।", en: "Create Videos with AI." },
    { ne: "AI बाट चित्र बनाउनुहोस्।", en: "Create Images with AI." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const features = [
    { icon: "🤖", title: "AI Learning", descNe: "AI को बारेमा सिक्नुहोस्", descEn: "Learn about AI", href: "/ai-learning" },
    { icon: "📚", title: "Free eBooks", descNe: "निःशुल्क किताबहरू पढ्नुहोस्", descEn: "Read free books", href: "/free-ebooks" },
    { icon: "🎥", title: "Free Courses", descNe: "निःशुल्क कोर्सहरू हेर्नुहोस्", descEn: "Watch free courses", href: "/free-courses" },
    { icon: "💪", title: "Fitness", descNe: "Fitness सिक्नुहोस्", descEn: "Learn fitness", href: "/fitness" },
    { icon: "📈", title: "Trading", descNe: "Trading आधारभूत सिक्नुहोस्", descEn: "Learn trading basics", href: "/trading" },
    { icon: "🎙️", title: "Podcast", descNe: "Podcast सुन्नुहोस्", descEn: "Listen to podcast", href: "/podcast" },
    { icon: "🇳🇵", title: "AI Ghar-Dailo", descNe: "घरदैलो अभियान", descEn: "Door-to-door campaign", href: "/ai-ghar-dailo" },
  ];

  const dailyMotivation = {
    quoteNe: 'आजको प्रेरणा: "तपाईंको सपना पूरा गर्ने एकमात्र व्यक्ति तपाईं हुनुहुन्छ।"',
    quoteEn: 'Today\'s Motivation: "The only person who can fulfill your dream is you."',
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex items-center gap-8 lg:gap-12">
            {/* Left - Logo */}
            <div className="hidden lg:block flex-shrink-0">
              <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-white/20 shadow-xl">
                <img
                  src="/fitsraj-logo.jpg"
                  alt="FitSraj Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Center - Main Content (full width) */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
                {t("नेपालको #१ AI Learning Platform", "Nepal's #1 AI Learning Platform")}
              </div>
              <div className="relative h-16 sm:h-20 lg:h-28 overflow-hidden">
                {heroSlides.map((slide, index) => (
                  <h1
                    key={index}
                    className={`absolute inset-0 flex items-center text-4xl font-bold tracking-tight text-white transition-all duration-700 sm:text-5xl lg:text-left lg:justify-start xl:text-6xl ${
                      index === heroSlideIndex
                        ? "opacity-100 translate-y-0"
                        : index < heroSlideIndex
                        ? "opacity-0 -translate-y-full"
                        : "opacity-0 translate-y-full"
                    }`}
                  >
                    {t(slide.ne, slide.en)}
                  </h1>
                ))}
              </div>
              <div className="mt-4 flex justify-center gap-2 lg:justify-start">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setHeroSlideIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === heroSlideIndex
                        ? "w-8 bg-highlight"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
              <p className="mt-4 max-w-3xl text-base text-gray-300 sm:text-lg">
                {t(SITE_DESCRIPTION_NE, SITE_DESCRIPTION_EN)}
              </p>
            </div>

            {/* Right - Visitor + Links */}
            <div className="hidden lg:flex flex-shrink-0 flex-col items-end gap-3">
              <VisitorCounter />
              <TopLinks />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile About/Contact - Bottom */}
      <section className="lg:hidden bg-gradient-to-br from-primary via-secondary to-accent py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-center gap-3">
            <Link href="/about" className="flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              👤 {t("About", "About")}
            </Link>
            <Link href="/chat-me" className="flex items-center gap-1.5 rounded-lg bg-highlight px-4 py-2 text-sm text-white transition-colors hover:bg-highlight/90">
              💬 {t("Chat Bot", "Chat Bot")}
            </Link>
            <Link href="/contact" className="flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              📧 {t("Contact", "Contact")}
            </Link>
          </div>
        </div>
      </section>

      {/* Grace Community */}
      <section className="bg-white py-4 mt-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <a href="https://www.gracecommunity.world/ref/22404e1c4a" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg hover:scale-105">
              <span className="text-lg">🙏</span>
              Grace Community
            </a>
          </div>
        </div>
      </section>

      {/* Social Links - Top */}
      <section className="bg-white py-4 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6">
            <span className="text-sm text-gray-500">{t("Follow FitSraj Official", "Follow FitSraj Official")}</span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-pink-600 transition-colors hover:text-pink-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Instagram
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-red-600 transition-colors hover:text-red-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              YouTube
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-blue-600 transition-colors hover:text-blue-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-900 transition-colors hover:text-gray-700">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              TikTok
            </a>
          </div>
        </div>
      </section>

      {/* Mobile About/Contact - Bottom */}
      <section className="lg:hidden bg-gradient-to-br from-primary via-secondary to-accent py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-center gap-3">
            <Link href="/about" className="flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              👤 {t("About", "About")}
            </Link>
            <Link href="/chat-me" className="flex items-center gap-1.5 rounded-lg bg-highlight px-4 py-2 text-sm text-white transition-colors hover:bg-highlight/90">
              💬 {t("Chat Bot", "Chat Bot")}
            </Link>
            <Link href="/contact" className="flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20">
              📧 {t("Contact", "Contact")}
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Motivation */}
      <section className="border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 text-center">
            <span className="text-2xl">🌅</span>
            <p className="text-lg font-medium text-gray-800">
              {t(dailyMotivation.quoteNe, dailyMotivation.quoteEn)}
            </p>
          </div>
        </div>
      </section>

      {/* AI Tools Hub - Top */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              🤖 {t("AI Tools Hub", "AI Tools Hub")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              {t(
                "उपयोगी AI Tools एकै ठाउँमा।",
                "Useful AI tools in one place."
              )}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {[
              { name: "ChatGPT", url: "https://chatgpt.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/120px-ChatGPT_logo.svg.png" },
              { name: "Gemini", url: "https://gemini.google.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/120px-Google_Gemini_logo.svg.png" },
              { name: "NotebookLM", url: "https://notebooklm.google.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Google_NotebookLM_Logo.svg/120px-Google_NotebookLM_Logo.svg.png" },
              { name: "Google Flow", url: "https://flow.google.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Google_Flow_Logo.svg/120px-Google_Flow_Logo.svg.png" },
              { name: "InShot", url: "https://inshot.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/InShot_Logo.svg/120px-InShot_Logo.svg.png" },
              { name: "Canva", url: "https://canva.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/120px-Canva_icon_2021.svg.png" },
              { name: "Claude", url: "https://claude.ai", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Claude_AI_logo.svg/120px-Claude_AI_logo.svg.png" },
              { name: "Suno", url: "https://suno.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Suno_AI_logo.svg/120px-Suno_AI_logo.svg.png" },
            ].map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-5 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="h-10 w-10 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        const span = document.createElement("span");
                        span.className = "text-2xl font-bold text-gray-700";
                        span.textContent = tool.name[0];
                        parent.appendChild(span);
                      }
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{tool.name}</span>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/ai-tools"
              className="inline-flex items-center gap-2 rounded-xl bg-highlight px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-highlight/90"
            >
              {t("सबै AI Tools हेर्नुहोस्", "View All AI Tools")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Birthday Calculator */}
      <BirthdayCalculator />

      {/* Features Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t("तपाईंले के सिक्न सक्नुहुन्छ?", "What Can You Learn?")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              {t(
                "FitSraj मा विभिन्न विषयहरू सिक्न सक्नुहुन्छ",
                "You can learn various topics on FitSraj"
              )}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="card-hover group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-highlight">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {t(feature.descNe, feature.descEn)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-16 animate-gradient">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {t(
              "तपाईंको AI यात्रा सुरु गर्न तयार हुनुहुन्छ?",
              "Ready to Start Your AI Journey?"
            )}
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            {t(
              "आज नै सिक्न सुरु गर्नुहोस्",
              "Start learning today"
            )}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/ai-learning"
              className="rounded-xl bg-highlight px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-highlight/90 hover:shadow-xl btn-press"
            >
              {t("AI Learning सुरु गर्नुहोस्", "Start AI Learning")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


