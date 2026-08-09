"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ebooks } from "@/data/ebooks";

export default function FreeEbooksPage() {
  const { t } = useLanguage();

  return (
    <div className="animate-fadeIn bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-accent py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            📚 Free eBook Library
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {t(
              "निःशुल्क eBook हरू पढ्नुहोस् र सिक्नुहोस्।",
              "Read and learn from free eBooks."
            )}
          </p>
        </div>
      </section>

      {/* eBooks Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ebooks.map((ebook) => (
            <div
              key={ebook.id}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              {/* Cover */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-6xl">📖</span>
              </div>

              <div className="p-6">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {ebook.category}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">
                  {t(ebook.titleNe, ebook.title)}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {t(ebook.descriptionNe, ebook.description)}
                </p>

                <div className="mt-6 flex gap-3">
                  <a
                    href={ebook.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-xl bg-highlight px-4 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-highlight/90"
                  >
                    {t("Read Free", "Read Free")}
                  </a>
                  <a
                    href={ebook.pdfUrl}
                    download
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
                  >
                    {t("Download", "Download")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
