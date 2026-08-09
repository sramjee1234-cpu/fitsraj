"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function TradingPage() {
  const { t } = useLanguage();

  const tradingTopics = [
    {
      icon: "📊",
      titleNe: "Trading Introduction",
      titleEn: "Trading Introduction",
      descNe: "Trading के हो र कसरी काम गर्छ।",
      descEn: "What is trading and how it works.",
    },
    {
      icon: "🕯️",
      titleNe: "Candlestick Patterns",
      titleEn: "Candlestick Patterns",
      descNe: "Candlestick patterns बुझ्ने।",
      descEn: "Understanding candlestick patterns.",
    },
    {
      icon: "📈",
      titleNe: "Support & Resistance",
      titleEn: "Support & Resistance",
      descNe: "Support र Resistance levels पहिचान गर्ने।",
      descEn: "Identifying support and resistance levels.",
    },
    {
      icon: "⚠️",
      titleNe: "Risk Management",
      titleEn: "Risk Management",
      descNe: "Risk व्यवस्थापनका तरिकाहरू।",
      descEn: "Methods for risk management.",
    },
    {
      icon: "🛑",
      titleNe: "Stop Loss",
      titleEn: "Stop Loss",
      descNe: "Stop Loss किन महत्त्वपूर्ण छ।",
      descEn: "Why stop loss is important.",
    },
    {
      icon: "🧠",
      titleNe: "Trading Psychology",
      titleEn: "Trading Psychology",
      descNe: "Trading मा मानसिकताको भूमिका।",
      descEn: "The role of psychology in trading.",
    },
    {
      icon: "📓",
      titleNe: "Trading Journal",
      titleEn: "Trading Journal",
      descNe: "Trading journal किन राख्ने।",
      descEn: "Why keep a trading journal.",
    },
  ];

  return (
    <div className="animate-fadeIn bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">📈 Trading Basics</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            {t(
              "Trading का आधारभूत कुराहरू सिक्नुहोस्।",
              "Learn the basics of trading."
            )}
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-b border-yellow-200 bg-yellow-50 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <p className="text-sm text-yellow-800">
              {t(
                "यो सामग्री शैक्षिक उद्देश्यका लागि मात्र हो। यो लगानी वा वित्तीय सल्लाह होइन। Trading मा जोखिम हुन्छ।",
                "This content is for educational purposes only. This is not investment or financial advice. Trading involves risk."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Trading Topics */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tradingTopics.map((topic) => (
            <div
              key={topic.titleEn}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              <span className="text-4xl">{topic.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {t(topic.titleNe, topic.titleEn)}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {t(topic.descNe, topic.descEn)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Important Note */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-red-50 p-8">
          <h2 className="text-xl font-bold text-red-900">⚠️ {t("महत्त्वपूर्ण सूचना", "Important Notice")}</h2>
          <ul className="mt-4 space-y-2 text-sm text-red-800">
            <li>• {t("Trading मा सधैं जोखिम हुन्छ।", "There is always risk in trading.")}</li>
            <li>• {t("तपाईंले गुमाउन सक्ने रकम मात्र लगानी गर्नुहोस्।", "Only invest what you can afford to lose.")}</li>
            <li>• {t("यो सामग्रीले नाफा ग्यारेन्टी गर्दैन।", "This content does not guarantee profits.")}</li>
            <li>• {t("पहिले सिक्नुहोस्, पछि लगानी गर्नुहोस्।", "Learn first, then invest.")}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
