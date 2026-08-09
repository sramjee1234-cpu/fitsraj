"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function AIGharDailoPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    preferredDate: "",
    participants: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend/form service
    setIsSubmitted(true);
  };

  const stats = [
    { labelNe: "घर पुगेका", labelEn: "Homes Reached", value: 0, icon: "🏠" },
    { labelNe: "तालिम प्राप्त", labelEn: "People Trained", value: 0, icon: "👥" },
    { labelNe: "क्षेत्रहरू", labelEn: "Areas Covered", value: 0, icon: "📍" },
  ];

  const whatTheyLearn = [
    { icon: "🤖", titleNe: "AI के हो?", titleEn: "What is AI?" },
    { icon: "💬", titleNe: "ChatGPT प्रयोग", titleEn: "ChatGPT Usage" },
    { icon: "✨", titleNe: "Gemini प्रयोग", titleEn: "Gemini Usage" },
    { icon: "🖼️", titleNe: "AI बाट फोटो", titleEn: "Photos with AI" },
    { icon: "🎬", titleNe: "AI बाट भिडियो", titleEn: "Videos with AI" },
    { icon: "📱", titleNe: "दैनिक जीवनमा AI", titleEn: "AI in Daily Life" },
  ];

  return (
    <div className="animate-fadeIn bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-orange-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            🇳🇵 FitSraj AI घरदैलो अभियान
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-orange-100">
            {t(
              "AI तपाईंको घरसम्म",
              "AI at your doorstep"
            )}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-orange-200">
            {t(
              "काठमाडौं उपत्यकाका घर–घरमा पुगेर सामान्य मानिसलाई AI को आधारभूत ज्ञान र दैनिक जीवनमा AI प्रयोग गर्ने तरिका निःशुल्क सिकाउने अभियान।",
              "A campaign to reach every home in Kathmandu valley and teach basic AI knowledge and daily AI usage for free."
            )}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.labelEn}
                className="rounded-2xl bg-white p-6 text-center shadow-sm"
              >
                <span className="text-3xl">{stat.icon}</span>
                <div className="mt-3 text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{t(stat.labelNe, stat.labelEn)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What People Learn */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">
          {t("मानिसहरूले के सिक्छन्?", "What Do People Learn?")}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whatTheyLearn.map((item) => (
            <div
              key={item.titleEn}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="font-medium text-gray-900">
                {t(item.titleNe, item.titleEn)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section className="bg-orange-50 py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            {t("हाम्रो घरमा Training चाहिन्छ", "We Need Training at Our Home")}
          </h2>
          <p className="mb-8 text-gray-600">
            {t(
              "तलको फारम भर्नुहोस् र हामी तपाईंसँग सम्पर्क गर्छौं।",
              "Fill the form below and we will contact you."
            )}
          </p>

          {isSubmitted ? (
            <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
              <span className="text-4xl">✅</span>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {t("धन्यवाद!", "Thank You!")}
              </h3>
              <p className="mt-2 text-gray-600">
                {t(
                  "तपाईंको फारम प्राप्त भयो। हामी छिटो सम्पर्क गर्छौं।",
                  "Your form has been received. We will contact you soon."
                )}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t("नाम", "Name")} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t("फोन", "Phone")} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t("ठाउँ", "Location")} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {t("मनपर्ने मिति", "Preferred Date")}
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {t("सहभागी संख्या", "Number of Participants")}
                  </label>
                  <input
                    type="number"
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t("सन्देश", "Message")}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              <p className="text-xs text-gray-500">
                {t(
                  "तपाईंको जानकारी सुरक्षित रहन्छ र केवल तालिमको लागि मात्र प्रयोग गरिन्छ।",
                  "Your information is safe and will only be used for training purposes."
                )}
              </p>
              <button
                type="submit"
                className="w-full rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-700"
              >
                {t("फारम पेश गर्नुहोस्", "Submit Form")}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
