"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { aiLessons } from "@/data/lessons";

export default function AILearningPage() {
  const { t } = useLanguage();
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  return (
    <div className="animate-fadeIn bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-accent py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">🤖 AI Learning</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {t(
              "AI को बारेमा सिक्नुहोस् - ChatGPT, Gemini, Prompt Engineering र अन्य।",
              "Learn about AI - ChatGPT, Gemini, Prompt Engineering and more."
            )}
          </p>
        </div>
      </section>

      {/* Lessons */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {aiLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <button
                onClick={() =>
                  setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t(lesson.titleNe, lesson.title)}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {t(lesson.descriptionNe, lesson.description)}
                  </p>
                </div>
                <svg
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    expandedLesson === lesson.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedLesson === lesson.id && (
                <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                  {/* Video Placeholder */}
                  <div className="mb-6 flex h-48 items-center justify-center rounded-xl bg-gray-100">
                    <span className="text-gray-400">🎥 Video Placeholder</span>
                  </div>

                  {/* Reading Section */}
                  <div className="mb-6 rounded-xl bg-blue-50 p-4">
                    <h4 className="mb-2 font-semibold text-blue-900">
                      📖 {t("पढ्ने सामग्री", "Reading Section")}
                    </h4>
                    <p className="text-sm text-blue-800">
                      {t(lesson.readingSectionNe, lesson.readingSection)}
                    </p>
                  </div>

                  {/* Practice Task */}
                  <div className="mb-6 rounded-xl bg-green-50 p-4">
                    <h4 className="mb-2 font-semibold text-green-900">
                      ✅ {t("अभ्यास कार्य", "Practice Task")}
                    </h4>
                    <p className="text-sm text-green-800">
                      {t(lesson.practiceTaskNe, lesson.practiceTask)}
                    </p>
                  </div>

                  {/* Related Tool */}
                  {lesson.relatedToolUrl && (
                    <a
                      href={lesson.relatedToolUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-highlight px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-highlight/90"
                    >
                      {t("सम्बन्धित AI Tool", "Related AI Tool")} →
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
