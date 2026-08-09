"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { aiTools, aiToolCategories } from "@/data/ai-tools";

export default function AIToolsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTools = aiTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.nameNe.includes(searchQuery) ||
      tool.descriptionNe.includes(searchQuery);
    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fadeIn bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-accent py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            🤖 FitSraj AI Tools Hub
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {t(
              "उपयोगी AI Tools एकै ठाउँमा।",
              "Useful AI tools in one place."
            )}
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="border-b border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("AI Tool खोज्नुहोस्...", "Search AI Tools...")}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {aiToolCategories.map((cat) => (
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

      {/* Tools Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{tool.icon}</span>
                {tool.isExternal && (
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                    {t("External Tool", "External Tool")}
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {t(tool.nameNe, tool.name)}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {t(tool.descriptionNe, tool.description)}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    tool.level === "beginner"
                      ? "bg-green-100 text-green-700"
                      : tool.level === "intermediate"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {t(tool.levelNe, tool.level)}
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {t(
                    aiToolCategories.find((c) => c.id === tool.category)?.labelNe || "",
                    aiToolCategories.find((c) => c.id === tool.category)?.label || ""
                  )}
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                {tool.url !== "#" && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-xl bg-highlight px-4 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-highlight/90"
                  >
                    {t("Open Tool →", "Open Tool →")}
                  </a>
                )}
                <a
                  href="/ai-learning"
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
                >
                  {t("FitSraj बाट सिक्नुहोस्", "Learn from FitSraj")}
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="py-12 text-center">
            <span className="text-4xl">🔍</span>
            <p className="mt-4 text-gray-500">
              {t(
                "कुनै tool भेटिएन। कृपया फेरि खोज्नुहोस्।",
                "No tools found. Please search again."
              )}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
