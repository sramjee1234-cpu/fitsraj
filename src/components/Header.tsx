"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { NAV_ITEMS_NE, NAV_ITEMS_EN } from "@/lib/constants";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = language === "ne" ? NAV_ITEMS_NE : NAV_ITEMS_EN;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">FIT</span>
          <span className="text-2xl font-bold text-highlight">SRAJ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" role="navigation">
          {navItems.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <div className="relative group">
            <button className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary">
              ▾ More
            </button>
            <div className="invisible absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-gray-100 bg-white py-2 shadow-lg group-hover:visible">
              {navItems.slice(6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === "ne" ? "en" : "ne")}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
            aria-label="Switch language"
          >
            {language === "ne" ? "EN" : "NP"}
          </button>

          {/* Chat Me Button */}
          <Link
            href="/chat-me"
            className="rounded-xl bg-highlight px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-highlight/90 hover:shadow-lg"
          >
            💬 {t("Chat Bot", "Chat Bot")}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 lg:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/chat-me"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 rounded-xl bg-highlight px-5 py-3 text-center text-sm font-semibold text-white"
            >
              💬 {t("Chat Bot", "Chat Bot")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
