import { NewsItem } from "@/types";

export const newsItems: NewsItem[] = [
  {
    id: "demo-1",
    title: "AI Technology Updates - Demo",
    titleNe: "AI प्रविधि अपडेट - Demo",
    category: "AI & Technology",
    date: "2026-01-15",
    isDemo: true,
  },
  {
    id: "demo-2",
    title: "Nepal Digital Economy News - Demo",
    titleNe: "नेपाल डिजिटल अर्थतन्त्र समाचार - Demo",
    category: "Business",
    date: "2026-01-16",
    isDemo: true,
  },
  {
    id: "demo-3",
    title: "Fitness Trends in Nepal - Demo",
    titleNe: "नेपालमा Fitness प्रवृत्तिहरू - Demo",
    category: "Nepal",
    date: "2026-01-17",
    isDemo: true,
  },
];

export const newsCategories = [
  { id: "all", label: "All", labelNe: "सबै" },
  { id: "nepal", label: "Nepal", labelNe: "नेपाल" },
  { id: "world", label: "World", labelNe: "विश्व" },
  { id: "ai-tech", label: "AI & Technology", labelNe: "AI र प्रविधि" },
  { id: "business", label: "Business", labelNe: "व्यापार" },
  { id: "entertainment", label: "Entertainment", labelNe: "मनोरञ्जन" },
];
