import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fitsraj.com";

  const routes = [
    "",
    "/ai-learning",
    "/ai-tools",
    "/free-ebooks",
    "/free-courses",
    "/fitness",
    "/trading",
    "/podcast",
    "/ai-ghar-dailo",
    "/about",
    "/contact",
    "/news",
    "/chat-me",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
