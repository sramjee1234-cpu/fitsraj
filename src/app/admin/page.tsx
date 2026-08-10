"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  emoji: string;
  price: string;
  originalPrice: string;
  category: string;
  description: string;
  link: string;
  image?: string;
}

interface PhotoPrompt {
  id: number;
  title: string;
  emoji: string;
  prompts: string[];
  image?: string;
}

const defaultProducts: Product[] = [
  { id: 1, name: "Organic Ashwagandha Powder", emoji: "🌿", price: "Rs. 850", originalPrice: "Rs. 1,200", category: "Ayurvedic", description: "तनाव कम गर्न।", link: "https://hamrobazaar.com" },
  { id: 2, name: "Multivitamin Tablets", emoji: "💊", price: "Rs. 1,450", originalPrice: "Rs. 2,000", category: "Supplement", description: "दैनिक भिटामिन।", link: "https://hamrobazaar.com" },
  { id: 3, name: "Protein Powder", emoji: "🥤", price: "Rs. 2,500", originalPrice: "Rs. 3,500", category: "Fitness", description: "मासपेशी बनाउन।", link: "https://hamrobazaar.com" },
];

const defaultPrompts: PhotoPrompt[] = [
  { id: 1, title: "Nature Photography", emoji: "🏔️", prompts: ["Mountain landscape, ultra realistic, 8K", "Cherry blossom trees, dreamy lighting", "Northern lights, vivid colors"] },
  { id: 2, title: "Portrait Photography", emoji: "👨‍🎨", prompts: ["Professional portrait, neon city lights", "Creative portrait, cyberpunk aesthetic", "Elegant portrait, Vogue style"] },
];

function ImageUpload({ currentImage, emoji, onUpload, onRemove }: { currentImage?: string; emoji: string; onUpload: (img: string) => void; onRemove: () => void }) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const max = 400;
        let w = img.width, h = img.height;
        if (w > max || h > max) {
          if (w > h) { h = (h / w) * max; w = max; } else { w = (w / h) * max; h = max; }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          onUpload(canvas.toDataURL("image/jpeg", 0.7));
        }
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
        {currentImage ? <img src={currentImage} alt="" className="h-full w-full object-cover" /> : <span className="text-3xl">{emoji}</span>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">📷 Photo Upload</label>
        <input type="file" accept="image/*" onChange={handleFile} className="mt-1 text-sm" />
        {currentImage && <button onClick={onRemove} className="mt-1 text-xs text-red-500">Remove Image</button>}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "prompts">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [prompts, setPrompts] = useState<PhotoPrompt[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingPrompt, setEditingPrompt] = useState<PhotoPrompt | null>(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sp = localStorage.getItem("fitsraj_products");
    const sr = localStorage.getItem("fitsraj_prompts");
    if (sp) setProducts(JSON.parse(sp));
    else setProducts(defaultProducts);
    if (sr) setPrompts(JSON.parse(sr));
    else setPrompts(defaultPrompts);
  }, []);

  const handleLogin = () => {
    if (password === "fitsraj2026") setIsAuthenticated(true);
    else alert("Password galat छ!");
  };

  const saveChanges = () => {
    localStorage.setItem("fitsraj_products", JSON.stringify(products));
    localStorage.setItem("fitsraj_prompts", JSON.stringify(prompts));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addProduct = () => {
    setProducts([...products, { id: Date.now(), name: "New Product", emoji: "📦", price: "Rs. 0", originalPrice: "Rs. 0", category: "General", description: "Description", link: "https://hamrobazaar.com" }]);
  };

  const deleteProduct = (id: number) => {
    if (confirm("Delete गर्ने?")) setProducts(products.filter((p) => p.id !== id));
  };

  const addPrompt = () => {
    setPrompts([...prompts, { id: Date.now(), title: "New Category", emoji: "📸", prompts: ["Your prompt here"] }]);
  };

  const deletePrompt = (id: number) => {
    if (confirm("Delete गर्ने?")) setPrompts(prompts.filter((p) => p.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-center text-2xl font-bold text-gray-900">🔒 Admin Panel</h1>
          <p className="mt-2 text-center text-sm text-gray-500">Password आवश्यक छ</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="Password..." className="mt-6 w-full rounded-xl border px-4 py-3 text-sm focus:border-pink-500 focus:outline-none" />
          <button onClick={handleLogin} className="mt-4 w-full rounded-xl bg-pink-600 px-4 py-3 text-sm font-semibold text-white hover:bg-pink-700">Login</button>
          <p className="mt-4 text-center text-xs text-gray-400">Default: fitsraj2026</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold">🔧 Admin Panel</h1>
          <div className="flex gap-3 items-center">
            {saved && <span className="text-sm text-green-600 font-medium">✅ Saved!</span>}
            <button onClick={saveChanges} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">💾 Save</button>
            <Link href="/" className="rounded-lg border px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">← Website</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex gap-2">
          <button onClick={() => setActiveTab("products")} className={`rounded-lg px-4 py-2 text-sm font-medium ${activeTab === "products" ? "bg-pink-600 text-white" : "bg-white text-gray-600 border"}`}>🏥 Products ({products.length})</button>
          <button onClick={() => setActiveTab("prompts")} className={`rounded-lg px-4 py-2 text-sm font-medium ${activeTab === "prompts" ? "bg-purple-600 text-white" : "bg-white text-gray-600 border"}`}>📸 Prompts ({prompts.length})</button>
        </div>

        {activeTab === "products" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Health Products</h2>
              <button onClick={addProduct} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">+ Add Product</button>
            </div>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="rounded-xl border bg-white p-4">
                  {editingProduct?.id === product.id ? (
                    <div className="space-y-3">
                      <ImageUpload currentImage={editingProduct.image} emoji={editingProduct.emoji} onUpload={(img) => setEditingProduct({ ...editingProduct, image: img })} onRemove={() => setEditingProduct({ ...editingProduct, image: undefined })} />
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
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 overflow-hidden">
                          {product.image ? <img src={product.image} alt="" className="h-full w-full object-cover" /> : <span className="text-2xl">{product.emoji}</span>}
                        </div>
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

        {activeTab === "prompts" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Photo Prompts</h2>
              <button onClick={addPrompt} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">+ Add Prompt</button>
            </div>
            <div className="space-y-4">
              {prompts.map((prompt) => (
                <div key={prompt.id} className="rounded-xl border bg-white p-4">
                  {editingPrompt?.id === prompt.id ? (
                    <div className="space-y-3">
                      <ImageUpload currentImage={editingPrompt.image} emoji={editingPrompt.emoji} onUpload={(img) => setEditingPrompt({ ...editingPrompt, image: img })} onRemove={() => setEditingPrompt({ ...editingPrompt, image: undefined })} />
                      <div className="grid grid-cols-2 gap-3">
                        <input value={editingPrompt.emoji} onChange={(e) => setEditingPrompt({ ...editingPrompt, emoji: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" placeholder="Emoji" />
                        <input value={editingPrompt.title} onChange={(e) => setEditingPrompt({ ...editingPrompt, title: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" placeholder="Title" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Prompts (one per line):</p>
                      <textarea value={editingPrompt.prompts.join("\n")} onChange={(e) => setEditingPrompt({ ...editingPrompt, prompts: e.target.value.split("\n").filter((p) => p.trim()) })} className="w-full rounded-lg border px-3 py-2 text-sm" rows={5} />
                      <div className="flex gap-2">
                        <button onClick={() => { setPrompts(prompts.map((p) => p.id === editingPrompt.id ? editingPrompt : p)); setEditingPrompt(null); }} className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white">Save</button>
                        <button onClick={() => setEditingPrompt(null)} className="rounded-lg border px-4 py-2 text-sm">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 overflow-hidden">
                          {prompt.image ? <img src={prompt.image} alt="" className="h-full w-full object-cover" /> : <span className="text-2xl">{prompt.emoji}</span>}
                        </div>
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
      </div>
    </div>
  );
}
