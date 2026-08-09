"use client";

import { useLanguage } from "@/context/LanguageContext";
import { fitnessChallenges } from "@/data/fitness";

export default function FitnessPage() {
  const { t } = useLanguage();

  return (
    <div className="animate-fadeIn bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            💪 FitSraj Fitness Movement
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-green-100">
            {t(
              "हिँडौँ, दौडौँ, जे गरे पनि शरीर चलाऔँ।",
              "Walk, run, move your body no matter what."
            )}
          </p>
        </div>
      </section>

      {/* Fitness Challenges */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">
          {t("Fitness चुनौतीहरू", "Fitness Challenges")}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fitnessChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              <span className="text-4xl">{challenge.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {t(challenge.titleNe, challenge.title)}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {t(challenge.descriptionNe, challenge.description)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10K Step Challenge */}
      <section className="bg-green-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              🚶 {t("१० हजार कदम चुनौती", "10K Step Challenge")}
            </h2>
            <p className="mt-4 text-gray-600">
              {t(
                "हरेक दिन १०,००० कदम हिँड्नुहोस् र ३० दिनसम्म चलाउनुहोस्। यो चुनौती तपाईंको स्वास्थ्य र Fitness लाई सुधार गर्न मद्दत गर्छ।",
                "Walk 10,000 steps daily for 30 days. This challenge helps improve your health and fitness."
              )}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">10,000</div>
                <div className="text-sm text-gray-500">{t("कदम/दिन", "Steps/Day")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">30</div>
                <div className="text-sm text-gray-500">{t("दिन", "Days")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">FREE</div>
                <div className="text-sm text-gray-500">{t("निःशुल्क", "Free")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Motivation */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center text-white">
          <span className="text-4xl">🌅</span>
          <h2 className="mt-4 text-2xl font-bold">{t("आजको Fitness प्रेरणा", "Today's Fitness Motivation")}</h2>
          <p className="mt-4 text-lg text-green-100">
            {t(
              "\"शरीर नै तपाईंको पहिलो घर हो। यसलाई सम्हाल्नुहोस्।\"",
              "\"Your body is your first home. Take care of it.\""
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
