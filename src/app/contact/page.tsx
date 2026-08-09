"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiry: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryOptions = [
    { value: "ai-training", label: "AI Training" },
    { value: "video-editing", label: "Video Editing Training" },
    { value: "fitness", label: "Fitness" },
    { value: "trading", label: "Trading Education" },
    { value: "business", label: "Business" },
    { value: "collaboration", label: "Collaboration" },
    { value: "ai-ghar-dailo", label: "AI Ghar-Dailo" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend/form service
    setIsSubmitted(true);
  };

  return (
    <div className="animate-fadeIn bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-accent py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {t("Contact", "Contact")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            {t(
              "हामीसँग सम्पर्क गर्नुहोस्।",
              "Get in touch with us."
            )}
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {isSubmitted ? (
          <div className="rounded-2xl bg-gray-50 p-8 text-center">
            <span className="text-4xl">✅</span>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              {t("धन्यवाद!", "Thank You!")}
            </h3>
            <p className="mt-2 text-gray-600">
              {t(
                "तपाईंको सन्देश प्राप्त भयो। हामी छिटो सम्पर्क गर्छौं।",
                "Your message has been received. We will contact you soon."
              )}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t("नाम", "Name")} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t("Email", "Email")} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t("फोन", "Phone")}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {t("विषय", "Subject")} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t("Inquiry Type", "Inquiry Type")}
              </label>
              <select
                value={formData.inquiry}
                onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20"
              >
                <option value="">{t("छान्नुहोस्...", "Select...")}</option>
                {inquiryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t("सन्देश", "Message")} *
              </label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-highlight px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-highlight/90"
            >
              {t("सन्देश पठाउनुहोस्", "Send Message")}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
