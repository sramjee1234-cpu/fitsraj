"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { courses, courseCategories } from "@/data/courses";

export default function FreeCoursesPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  return (
    <div className="animate-fadeIn bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-accent py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            🎥 Free Video Lessons
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {t(
              "निःशुल्क भिडियो बाट सिक्नुहोस्।",
              "Learn from free videos."
            )}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-gray-100 bg-gray-50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {courseCategories.map((cat) => (
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

      {/* Courses Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              {/* Thumbnail */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {t(
                      courseCategories.find((c) => c.id === course.category)?.labelNe || "",
                      courseCategories.find((c) => c.id === course.category)?.label || ""
                    )}
                  </span>
                  <span className="text-sm text-gray-500">{course.duration}</span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-gray-900">
                  {t(course.titleNe, course.title)}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {t(course.descriptionNe, course.description)}
                </p>

                <a
                  href={course.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-highlight px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-highlight/90"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {t("Watch Now", "Watch Now")}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
