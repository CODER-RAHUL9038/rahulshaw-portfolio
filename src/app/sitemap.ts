import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rahul-shaw-ai-portfolio.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split(".")[0] + "Z",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
