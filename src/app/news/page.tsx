"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { newsItems, newsCategories } from "@/data/news";

export default function NewsPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredNews =
    selectedCategory === "all"
      ? newsItems
      : newsItems.filter((n) => n.category.toLowerCase().includes(selectedCategory));

  const dailyRashifal = {
    titleNe: "🔮 दैनिक राशीफल",
    titleEn: "🔮 Daily Horoscope",
    contentNe: "आजको राशीफल यहाँ देख्नुहोस्। (Demo Content)",
    contentEn: "View today's horoscope here. (Demo Content)",
  };

  return (
    <div className="animate-fadeIn bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-accent py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">📰 Daily Nepal</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {t(
              "नेपाल र विश्वका समाचारहरू।",
              "News from Nepal and the world."
            )}
          </p>
        </div>
      </section>

      {/* Demo Notice */}
      <section className="border-b border-yellow-200 bg-yellow-50 py-3">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-yellow-800">
            {t(
              "⚠️ यो Demo Content हो। वास्तविक समाचार जडान गरिएको छैन।",
              "⚠️ This is demo content. Real news is not connected."
            )}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-gray-100 bg-gray-50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {newsCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-highlight text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {t(cat.labelNe, cat.label)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Items */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {news.category}
                </span>
                <span className="text-xs text-gray-400">{news.date}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {t(news.titleNe, news.title)}
              </h3>
              {news.isDemo && (
                <span className="mt-2 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  Demo
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Daily Rashifal */}
      <section className="border-t border-gray-100 bg-purple-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              {t(dailyRashifal.titleNe, dailyRashifal.titleEn)}
            </h2>
            <p className="mt-4 text-gray-600">
              {t(dailyRashifal.contentNe, dailyRashifal.contentEn)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
