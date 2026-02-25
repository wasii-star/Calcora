import { MetadataRoute } from "next";

const BASE_URL = "https://calcora-sandy.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        "",
        "/ev-savings",
        "/mortgage-affordability",
        "/solar-roi",
        "/car-loan",
        "/fire",
        "/debt-snowball",
        "/bmi",
        "/tip",
        "/about",
        "/privacy",
        "/terms",
    ];

    return routes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route.startsWith("/about") || route.startsWith("/privacy") || route.startsWith("/terms") ? 0.3 : 0.8,
    }));
}
