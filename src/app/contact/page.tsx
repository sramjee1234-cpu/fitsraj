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
        
        {/* WhatsApp Contact */}
        <div className="mb-8 rounded-2xl bg-green-50 p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {t("WhatsApp मा सम्पर्क गर्नुहोस्", "Contact on WhatsApp")}
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            {t("छिटो जवाफ चाहिन्छ? WhatsApp गर्नुहोस्!", "Need quick reply? WhatsApp us!")}
          </p>
          <a
            href="https://wa.me/9768593625"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp: 9768593625
          </a>
          <p className="mt-3 text-xs text-gray-500">📞 9768593625</p>
        </div>

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
