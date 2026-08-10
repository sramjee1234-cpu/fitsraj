"use client";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  emoji: string;
  price: string;
  originalPrice: string;
  category: string;
  description: string;
  link: string;
}

interface PhotoPrompt {
  id: number;
  title: string;
  emoji: string;
  prompts: string[];
}

const defaultProducts: Product[] = [
  { id: 1, name: "Organic Ashwagandha Powder", emoji: "🌿", price: "Rs. 850", originalPrice: "Rs. 1,200", category: "Ayurvedic", description: "तनाव कम गर्न, निद्रा सुधार्न।", link: "https://hamrobazaar.com" },
  { id: 2, name: "Multivitamin Tablets", emoji: "💊", price: "Rs. 1,450", originalPrice: "Rs. 2,000", category: "Supplement", description: "दैनिक भिटामिन र मिनरल।", link: "https://hamrobazaar.com" },
  { id: 3, name: "Protein Powder", emoji: "🥤", price: "Rs. 2,500", originalPrice: "Rs. 3,500", category: "Fitness", description: "मासपेशी बनाउन।", link: "https://hamrobazaar.com" },
];

const defaultPrompts: PhotoPrompt[] = [
  { id: 1, title: "Nature Photography", emoji: "🏔️", prompts: ["A majestic mountain landscape with snow-capped peaks, ultra realistic, 8K", "Cherry blossom trees in Japanese garden, pink petals, dreamy lighting", "Northern lights over frozen lake, star-filled sky, vivid colors"] },
  { id: 2, title: "Portrait Photography", emoji: "👨‍🎨", prompts: ["Professional portrait, neon city lights, bokeh effect, fashion magazine style", "Creative portrait with geometric shapes, cyberpunk aesthetic", "Elegant portrait in flower garden, soft pastel colors, Vogue style"] },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "prompts" | "settings">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [prompts, setPrompts] = useState<PhotoPrompt[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingPrompt, setEditingPrompt] = useState<PhotoPrompt | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem("fitsraj_products");
    const storedPrompts = localStorage.getItem("fitsraj_prompts");
    if (storedProducts) setProducts(JSON.parse(storedProducts));
    else setProducts(defaultProducts);
    if (storedPrompts) setPrompts(JSON.parse(storedPrompts));
    else setPrompts(defaultPrompts);
  }, []);

  const handleLogin = () => {
    if (password === "fitsraj2026") {
      setIsAuthenticated(true);
    } else {
      alert("Password galat छ!");
    }
  };

  const saveChanges = () => {
    localStorage.setItem("fitsraj_products", JSON.stringify(products));
    localStorage.setItem("fitsraj_prompts", JSON.stringify(prompts));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now(),
      name: "New Product",
      emoji: "📦",
      price: "Rs. 0",
      originalPrice: "Rs. 0",
      category: "General",
      description: "Product description here",
      link: "https://hamrobazaar.com",
    };
    setProducts([...products, newProduct]);
    setShowAddProduct(false);
  };

  const deleteProduct = (id: number) => {
    if (confirm("Delete गर्ने?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const addPrompt = () => {
    const newPrompt: PhotoPrompt = {
      id: Date.now(),
      title: "New Category",
      emoji: "📸",
      prompts: ["Your prompt here"],
    };
    setPrompts([...prompts, newPrompt]);
    setShowAddPrompt(false);
  };

  const deletePrompt = (id: number) => {
    if (confirm("Delete गर्ने?")) {
      setPrompts(prompts.filter((p) => p.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-center text-2xl font-bold text-gray-900">🔒 Admin Panel</h1>
          <p className="mt-2 text-center text-sm text-gray-500">Password आवश्यक छ</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Password लेख्नुहोस्..."
            className="mt-6 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-highlight focus:outline-none"
          />
          <button
            onClick={handleLogin}
            className="mt-4 w-full rounded-xl bg-highlight px-4 py-3 text-sm font-semibold text-white hover:bg-highlight/90"
          >
            Login
          </button>
          <p className="mt-4 text-center text-xs text-gray-400">Default: fitsraj2026</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">🔧 Admin Panel</h1>
          <div className="flex gap-3">
            {saved && <span className="text-sm text-green-600 font-medium">✅ Saved!</span>}
            <button onClick={saveChanges} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
              💾 Save Changes
            </button>
            <a href="/" className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
              ← Website
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          {(["products", "prompts", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                activeTab === tab ? "bg-highlight text-white" : "bg-white text-gray-600 border"
              }`}
            >
              {tab === "products" ? "🏥 Products" : tab === "prompts" ? "📸 Prompts" : "⚙️ Settings"}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Health Products ({products.length})</h2>
              <button onClick={addProduct} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                + Add Product
              </button>
            </div>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="rounded-xl border bg-white p-4">
                  {editingProduct?.id === product.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input value={editingProduct.emoji} onChange={(e) => setEditingProduct({ ...editingProduct, emoji: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" placeholder="Emoji" />
                        <input value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" placeholder="Name" />
                        <input value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" placeholder="Price" />
                        <input value={editingProduct.originalPrice} onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" placeholder="Original Price" />
                        <input value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" placeholder="Category" />
                        <input value={editingProduct.link} onChange={(e) => setEditingProduct({ ...editingProduct, link: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" placeholder="Buy Link" />
                      </div>
                      <textarea value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Description" />
                      <div className="flex gap-2">
                        <button onClick={() => { setProducts(products.map((p) => p.id === editingProduct.id ? editingProduct : p)); setEditingProduct(null); }} className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white">Save</button>
                        <button onClick={() => setEditingProduct(null)} className="rounded-lg border px-4 py-2 text-sm">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{product.emoji}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.price} <span className="line-through text-gray-400">{product.originalPrice}</span></p>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingProduct(product)} className="rounded-lg border px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50">Edit</button>
                        <button onClick={() => deleteProduct(product.id)} className="rounded-lg border px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prompts Tab */}
        {activeTab === "prompts" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Photo Prompts ({prompts.length})</h2>
              <button onClick={addPrompt} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                + Add Prompt Category
              </button>
            </div>
            <div className="space-y-4">
              {prompts.map((prompt) => (
                <div key={prompt.id} className="rounded-xl border bg-white p-4">
                  {editingPrompt?.id === prompt.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input value={editingPrompt.emoji} onChange={(e) => setEditingPrompt({ ...editingPrompt, emoji: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" placeholder="Emoji" />
                        <input value={editingPrompt.title} onChange={(e) => setEditingPrompt({ ...editingPrompt, title: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" placeholder="Title" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Prompts (एउटा line मा एउटा prompt):</p>
                      <textarea
                        value={editingPrompt.prompts.join("\n")}
                        onChange={(e) => setEditingPrompt({ ...editingPrompt, prompts: e.target.value.split("\n").filter((p) => p.trim()) })}
                        className="w-full rounded-lg border px-3 py-2 text-sm"
                        rows={5}
                        placeholder="Each prompt on a new line"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => { setPrompts(prompts.map((p) => p.id === editingPrompt.id ? editingPrompt : p)); setEditingPrompt(null); }} className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white">Save</button>
                        <button onClick={() => setEditingPrompt(null)} className="rounded-lg border px-4 py-2 text-sm">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{prompt.emoji}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{prompt.title}</h3>
                          <p className="text-sm text-gray-500">{prompt.prompts.length} prompts</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingPrompt(prompt)} className="rounded-lg border px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50">Edit</button>
                        <button onClick={() => deletePrompt(prompt.id)} className="rounded-lg border px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold">⚙️ Website Settings</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Website Name</label>
                <input defaultValue="FitSraj" className="mt-1 w-full rounded-lg border px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tagline (Nepali)</label>
                <input defaultValue="AI सिकौँ। Fit बनौँ। आफ्नो भविष्य बनाऔँ।" className="mt-1 w-full rounded-lg border px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
                <input defaultValue="https://youtube.com/@fitsrajofficial" className="mt-1 w-full rounded-lg border px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
                <input defaultValue="https://facebook.com/fitsraj" className="mt-1 w-full rounded-lg border px-4 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">TikTok URL</label>
                <input defaultValue="https://tiktok.com/@fitsraj" className="mt-1 w-full rounded-lg border px-4 py-2 text-sm" />
              </div>
              <button className="rounded-lg bg-highlight px-6 py-2 text-sm font-semibold text-white hover:bg-highlight/90">
                Save Settings
              </button>
            </div>
            <div className="mt-6 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
              <p><strong>Note:</strong> Settings save हुन localStorage मा हुन्छ। Permanent changes को लागि code edit गर्नुपर्छ।</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
