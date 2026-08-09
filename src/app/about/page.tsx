"use client";

import { useLanguage } from "@/context/LanguageContext";
import { founder } from "@/data/founder";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="animate-fadeIn bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-accent py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {t("FitSraj को बारेमा", "About FitSraj")}
          </h1>
        </div>
      </section>

      {/* Founder */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row">
          {/* Photo */}
          <div className="flex h-48 w-48 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
            <span className="text-6xl">👤</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {t(founder.nameNe, founder.name)}
            </h2>
            <p className="mt-1 text-highlight">{t("Founder", "Founder")}</p>
            <p className="mt-4 text-gray-600">
              {t(founder.bioNe, founder.bio)}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">
                🎯 {t("हाम्रो Mission", "Our Mission")}
              </h3>
              <p className="mt-4 text-gray-600">
                {t(
                  "नेपालीहरूलाई AI र डिजिटल सीपमा सशक्त बनाउने। हामी विश्वास गर्छौं कि प्रत्येक नेपालीले AI को फाइदा लिन सक्छ।",
                  "Empowering Nepalis with AI and digital skills. We believe every Nepali can benefit from AI."
                )}
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">
                🔭 {t("हाम्रो Vision", "Our Vision")}
              </h3>
              <p className="mt-4 text-gray-600">
                {t(
                  "१ वर्षमा १ लाख नेपालीलाई Fit र AI-साक्षर बनाउने। एउटा AI-सक्षम नेपाल बनाउने।",
                  "Making 1 lakh Nepalis Fit and AI-literate in 1 year. Building an AI-capable Nepal."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">
          🚀 {t("हाम्रो यात्रा", "Our Journey")}
        </h2>
        <div className="space-y-6">
          {[
            { step: "01", titleNe: "सुरुवात", titleEn: "Beginning", descNe: "AI सिक्ने र सिकाउने यात्रा सुरु भयो।", descEn: "The journey of learning and teaching AI began." },
            { step: "02", titleNe: "AI शिक्षा", titleEn: "AI Education", descNe: "नेपाली भाषामा AI शिक्षा प्रदान गर्न सुरु भयो।", descEn: "Started providing AI education in Nepali language." },
            { step: "03", titleNe: "AI घरदैलो", titleEn: "AI Ghar-Dailo", descNe: "घर–घरमा पुगेर AI सिकाउने अभियान सुरु भयो।", descEn: "Door-to-door AI teaching campaign started." },
            { step: "04", titleNe: "विस्तार", titleEn: "Expansion", descNe: "Fitness, Trading, र अन्य विषयहरू थपिए।", descEn: "Fitness, Trading, and other topics were added." },
          ].map((item) => (
            <div key={item.step} className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-highlight text-lg font-bold text-white">
                {item.step}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t(item.titleNe, item.titleEn)}
                </h3>
                <p className="mt-1 text-gray-600">
                  {t(item.descNe, item.descEn)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
