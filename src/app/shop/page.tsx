"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  nameEn: string;
  emoji: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  descriptionEn: string;
  inStock: boolean;
  link: string;
  image?: string;
}

const defaultProducts: Product[] = [
  { id: 1, name: "Organic Ashwagandha Powder", nameEn: "Organic Ashwagandha Powder", emoji: "🌿", price: "Rs. 850", originalPrice: "Rs. 1,200", rating: 4.8, reviews: 234, category: "Ayurvedic", description: "तनाव कम गर्न, निद्रा सुधार्न, र ऊर्जा बढाउन।", descriptionEn: "Reduces stress, improves sleep, boosts energy.", inStock: true, link: "https://hamrobazaar.com" },
  { id: 2, name: "Multivitamin Tablets (60 Days)", nameEn: "Multivitamin Tablets (60 Days)", emoji: "💊", price: "Rs. 1,450", originalPrice: "Rs. 2,000", rating: 4.7, reviews: 189, category: "Supplement", description: "दैनिक आवश्यक सबै भिटामिन र मिनरल।", descriptionEn: "All daily essential vitamins and minerals.", inStock: true, link: "https://hamrobazaar.com" },
  { id: 3, name: "Protein Powder (Chocolate)", nameEn: "Protein Powder (Chocolate)", emoji: "🥤", price: "Rs. 2,500", originalPrice: "Rs. 3,500", rating: 4.6, reviews: 312, category: "Fitness", description: "मासपेशी बनाउन र recovery को लागि।", descriptionEn: "For muscle building and recovery.", inStock: true, link: "https://hamrobazaar.com" },
  { id: 4, name: "Omega-3 Fish Oil Capsules", nameEn: "Omega-3 Fish Oil Capsules", emoji: "🐟", price: "Rs. 1,100", originalPrice: "Rs. 1,500", rating: 4.5, reviews: 167, category: "Heart Health", description: "मुटुको स्वास्थ्य र दिमागको विकासको लागि।", descriptionEn: "For heart health and brain development.", inStock: true, link: "https://hamrobazaar.com" },
  { id: 5, name: "Green Tea Extract (90 Capsules)", nameEn: "Green Tea Extract (90 Capsules)", emoji: "🍵", price: "Rs. 950", originalPrice: "Rs. 1,300", rating: 4.4, reviews: 145, category: "Weight Loss", description: "तौल घटाउन र antioxidant को लागि।", descriptionEn: "For weight loss and antioxidants.", inStock: true, link: "https://hamrobazaar.com" },
  { id: 6, name: "Resistance Bands Set (5 Pieces)", nameEn: "Resistance Bands Set (5 Pieces)", emoji: "🏋️", price: "Rs. 1,800", originalPrice: "Rs. 2,500", rating: 4.7, reviews: 278, category: "Fitness Equipment", description: "घरमै व्यायाम गर्न।", descriptionEn: "Exercise at home.", inStock: true, link: "https://hamrobazaar.com" },
  { id: 7, name: "Digital Body Weight Scale", nameEn: "Digital Body Weight Scale", emoji: "⚖️", price: "Rs. 1,200", originalPrice: "Rs. 1,800", rating: 4.3, reviews: 156, category: "Health Monitor", description: "तौल, BMI मापन गर्न।", descriptionEn: "Measure weight and BMI.", inStock: true, link: "https://hamrobazaar.com" },
  { id: 8, name: "Yoga Mat (Non-Slip, 6mm)", nameEn: "Yoga Mat (Non-Slip, 6mm)", emoji: "🧘", price: "Rs. 900", originalPrice: "Rs. 1,400", rating: 4.6, reviews: 203, category: "Yoga", description: "योगा को लागि comfortable mat।", descriptionEn: "Comfortable mat for yoga.", inStock: true, link: "https://hamrobazaar.com" },
];

export default function ShopPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("fitsraj_products");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) setProducts(parsed);
    }
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {t("🏥 Health Store", "🏥 Health Store")}
          </h1>
          <p className="mt-4 text-lg text-green-100">
            {t("स्वस्थ जीवनका लागि उत्कृष्ट products।", "Excellent products for a healthy life.")}
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-white py-6 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="text"
              placeholder={t("🔍 Search products...", "🔍 Search products...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 sm:w-80"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                    selectedCategory === cat ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-gray-500">
          {filteredProducts.length} {t("products भेटियो", "products found")}
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg">
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-7xl">{product.emoji}</span>
                )}
              </div>
              <div className="p-5">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">{product.category}</span>
                <h3 className="mt-3 text-lg font-bold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                <div className="mt-3 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                  ))}
                  <span className="ml-1 text-xs text-gray-500">{product.rating} ({product.reviews})</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xl font-bold text-green-600">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                </div>
                <Link href={product.link} target="_blank" rel="noopener noreferrer" className="mt-4 block w-full rounded-xl bg-green-600 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-green-700">
                  {t("🛒 Buy Now", "🛒 Buy Now")}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-6xl">🔍</div>
            <p className="mt-4 text-gray-500">{t("कुनै product भेटिएन।", "No products found.")}</p>
          </div>
        )}
      </section>
    </div>
  );
}
