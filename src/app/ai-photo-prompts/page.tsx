"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface PhotoPrompt {
  id: number;
  title: string;
  titleEn: string;
  emoji: string;
  bgColor: string;
  prompts: string[];
  image?: string;
}

const defaultPrompts: PhotoPrompt[] = [
  {
    id: 1,
    title: "सुन्दर प्राकृतिक दृश्य",
    titleEn: "Beautiful Nature Scene",
    emoji: "🏔️",
    bgColor: "from-green-400 to-blue-500",
    prompts: [
      "A majestic mountain landscape with snow-capped peaks, crystal clear lake reflection, golden hour lighting, ultra realistic photography, 8K resolution",
      "A peaceful bamboo forest with sunlight filtering through, morning mist, a small wooden bridge, serene atmosphere, National Geographic style",
      "A waterfall cascading into a turquoise pool surrounded by lush tropical plants, rainbow in the mist, paradise-like setting, drone photography perspective",
      "Cherry blossom trees lining a Japanese garden path, pink petals falling, koi pond reflection, soft dreamy lighting, cinematic composition",
      "Northern lights dancing over a frozen lake in Iceland, star-filled sky, snow-covered mountains, long exposure photography, vivid colors"
    ]
  },
  {
    id: 2,
    title: "AI Fashion Portrait",
    titleEn: "AI Fashion Portrait",
    emoji: "👨‍🎨",
    bgColor: "from-purple-500 to-pink-500",
    prompts: [
      "Professional portrait of a stylish person wearing modern streetwear, neon city lights background, bokeh effect, fashion magazine style, high contrast",
      "Creative portrait with geometric shapes and colorful lighting, cyberpunk aesthetic, reflective surfaces, avant-garde fashion, editorial photography",
      "Elegant portrait in a flower garden, soft pastel colors, dreamy atmosphere, golden hour lighting, Vogue magazine style photography",
      "Dynamic portrait with wind-blown hair, dramatic lighting, dark moody background, high fashion outfit, cinematic color grading",
      "Artistic portrait surrounded by floating digital elements, futuristic style, holographic effects, sci-fi fashion, conceptual photography"
    ]
  },
  {
    id: 3,
    title: "AI Food Photography",
    titleEn: "AI Food Photography",
    emoji: "🍕",
    bgColor: "from-orange-400 to-red-500",
    prompts: [
      "Gourmet burger with melting cheese, fresh vegetables, sesame bun, dark moody background, food photography, steam rising, professional studio lighting",
      "Colorful smoothie bowls arranged artistically, fresh fruits, granola topping, marble surface, top-down view, Instagram food photography style",
      "Traditional Nepali dal bhat thali with multiple small bowls, brass plate, rustic wooden table, warm lighting, cultural food photography",
      "Artisan coffee latte art in a ceramic cup, croissant on the side, cafe setting, soft natural window light, cozy morning atmosphere",
      "Fresh sushi platter with salmon, tuna, shrimp, wasabi, soy sauce, dark slate board, minimalist Japanese aesthetic, professional food styling"
    ]
  },
  {
    id: 4,
    title: "Motivational Quote Image",
    titleEn: "Motivational Quote Image",
    emoji: "💪",
    bgColor: "from-yellow-400 to-orange-500",
    prompts: [
      "Epic sunrise over mountain peaks, silhouette of person standing triumphantly, golden light rays, motivational atmosphere, inspirational landscape photography",
      "Person running on beach at dawn, determination, waves crashing, dramatic sky, fitness motivation, action sports photography",
      "Zen garden with raked sand patterns, single cherry blossom tree, peaceful meditation space, mindfulness concept, minimalist photography",
      "Successful business person looking at city skyline from rooftop, golden hour, confident pose, achievement concept, professional photography",
      "Athlete crossing finish line, confetti falling, stadium lights, victory moment, celebration, sports photography, dramatic lighting"
    ]
  },
  {
    id: 5,
    title: "AI Art & Fantasy",
    titleEn: "AI Art & Fantasy",
    emoji: "🎨",
    bgColor: "from-indigo-500 to-purple-600",
    prompts: [
      "Magical floating island in the sky, waterfalls flowing into clouds, ancient temple, fantasy world, concept art, digital painting, vivid colors",
      "Futuristic smart city with flying cars, neon lights, holographic billboards, cyberpunk night scene, Blade Runner style, cinematic wide shot",
      "Underwater ancient ruins with bioluminescent creatures, coral growth, sun rays piercing water, marine exploration, fantasy photography",
      "Enchanted forest with glowing mushrooms, fairy lights, mystical creatures hiding, magical atmosphere, storybook illustration style, warm lighting",
      "Steampunk airship flying over Victorian city, brass gears, steam clouds, sunset sky, adventure concept, detailed mechanical design, retro-futuristic"
    ]
  },
  {
    id: 6,
    title: "Travel & Adventure",
    titleEn: "Travel & Adventure",
    emoji: "✈️",
    bgColor: "from-teal-400 to-cyan-500",
    prompts: [
      "Backpacker standing at edge of Grand Canyon, epic view, adventure spirit, travel photography, wide angle lens, golden hour",
      "Traditional colorful houses of Santorini Greece, blue domes, white walls, Mediterranean sea, travel bucket list destination, postcard perfect",
      "Person kayaking through limestone karsts in Thailand, emerald green water, tropical paradise, adventure travel photography, aerial drone shot",
      "Ancient temples of Angkor Wat at sunrise, reflection in water, misty morning, spiritual atmosphere, architectural photography, Cambodia",
      "Northern Norway fjord with northern lights, small red cabin, snow-covered mountains, Arctic adventure, travel photography, long exposure"
    ]
  },
  {
    id: 7,
    title: "Product Photography",
    titleEn: "Product Photography",
    emoji: "📱",
    bgColor: "from-gray-700 to-gray-900",
    prompts: [
      "Premium wireless headphones floating in air, dramatic lighting, dark background, product photography, Apple-style minimalist, reflection surface",
      "Luxury watch on marble surface, close-up detail shot, professional studio lighting, luxury product photography, high-end commercial style",
      "Smartphone with holographic display floating, tech concept, blue glow, futuristic product visualization, 3D render, clean background",
      "Organic skincare products arranged on natural stone, botanical elements, clean beauty brand aesthetic, lifestyle product photography",
      "Sneakers with water splash effect, dynamic action shot, vibrant colors, sports product photography, commercial advertising style, high speed capture"
    ]
  },
  {
    id: 8,
    title: "Nepali Culture & Heritage",
    titleEn: "Nepali Culture & Heritage",
    emoji: "🏔️",
    bgColor: "from-red-500 to-yellow-500",
    prompts: [
      "Traditional Newari architecture in Bhaktapur Durbar Square, terracotta temples, wooden carved windows, tourists exploring, cultural heritage photography",
      "Colorful prayer flags fluttering with Himalayan mountains background, Buddhist monastery, spiritual atmosphere, Nepal travel photography",
      "Dashain festival celebration, people flying kites, family gathering, traditional food, festive atmosphere, documentary photography style",
      "Traditional Tharu dance performance, colorful costumes, cultural show, Chitwan Nepal, cultural documentation photography, vibrant colors",
      "Annapurna Base Camp trek with mountaineers, dramatic mountain panorama, trekking adventure, Nepal Himalayas, adventure travel photography"
    ]
  },
];

export default function AIPhotoPromptsPage() {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [photoPrompts, setPhotoPrompts] = useState<PhotoPrompt[]>(defaultPrompts);

  useEffect(() => {
    const stored = localStorage.getItem("fitsraj_prompts");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) setPhotoPrompts(parsed);
    }
  }, []);

  const handleCopy = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {t("AI Photo Prompts", "AI Photo Prompts")}
          </h1>
          <p className="mt-4 text-lg text-pink-100">
            {t(
              "फोटोसँगै राम्रा Prompt पाउनुहोस्। Copy गर्नुहोस्, AI मा Paste गर्नुहोस्!",
              "Get prompts with photos. Copy and paste into AI!"
            )}
          </p>
          <p className="mt-2 text-sm text-pink-200">
            {t(
              "कसैलाई Prompt लेख्न आउँदैन? हामीले सबै सजिलो बनाइदियौं!",
              "Don't know how to write prompts? We made it easy!"
            )}
          </p>
        </div>
      </section>

      {/* Photo Prompt Cards */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {photoPrompts.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              {/* Photo Preview */}
              <div className={`flex h-48 items-center justify-center bg-gradient-to-br ${item.bgColor}`}>
                {item.image ? (
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-8xl">{item.emoji}</span>
                )}
              </div>

              {/* Title */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {t(item.title, item.titleEn)}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {t("5 Prompts उपलब्ध", "5 Prompts Available")}
                </p>

                {/* Toggle Prompts */}
                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="mt-4 w-full rounded-xl bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-100"
                >
                  {expandedId === item.id ? t("Prompts लुकाउनुहोस्", "Hide Prompts") : t("Prompts हेर्नुहोस्", "View Prompts")}
                </button>

                {/* Prompts List */}
                {expandedId === item.id && (
                  <div className="mt-4 space-y-3">
                    {item.prompts.map((prompt, index) => (
                      <div key={index} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">{prompt}</p>
                        <button
                          onClick={() => handleCopy(prompt)}
                          className="mt-2 rounded-lg bg-purple-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-purple-700"
                        >
                          {copiedPrompt === prompt ? "✅ Copied!" : "📋 Copy Prompt"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            {t("कसरी प्रयोग गर्ने?", "How to Use?")}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { step: "1", icon: "📸", title: "फोटो छान्नुहोस्", titleEn: "Choose Photo" },
              { step: "2", icon: "📋", title: "Prompt Copy गर्नुहोस्", titleEn: "Copy Prompt" },
              { step: "3", icon: "🤖", title: "AI मा Paste गर्नुहोस्", titleEn: "Paste in AI" },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl">
                  {step.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {t(step.title, step.titleEn)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
