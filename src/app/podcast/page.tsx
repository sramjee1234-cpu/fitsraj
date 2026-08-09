"use client";

import { useLanguage } from "@/context/LanguageContext";
import { podcastEpisodes } from "@/data/podcasts";

export default function PodcastPage() {
  const { t } = useLanguage();

  return (
    <div className="animate-fadeIn bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">🎙️ FitSraj Podcast</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-purple-100">
            {t(
              "प्रेरणादायी कथाहरू र AI सिक्ने यात्रा।",
              "Inspiring stories and AI learning journey."
            )}
          </p>
        </div>
      </section>

      {/* Podcast Episodes */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {podcastEpisodes.map((episode) => (
            <div
              key={episode.id}
              className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg sm:flex-row"
            >
              {/* Episode Number */}
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100">
                <span className="text-2xl font-bold text-purple-600">
                  {episode.id.split("-")[0].replace("ep", "#")}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                    {episode.category}
                  </span>
                  <span className="text-sm text-gray-500">{episode.duration}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{episode.date}</span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-gray-900">
                  {t(episode.titleNe, episode.title)}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {t(episode.descriptionNe, episode.description)}
                </p>

                <div className="mt-4 flex gap-3">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-purple-700">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {t("Play", "Play")}
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {t("Share", "Share")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
