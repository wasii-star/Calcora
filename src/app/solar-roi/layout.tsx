import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Solar Panel ROI & Payback Calculator | Utility Savings 2026 | Calcora",
    description: "Calculate your solar panel payback period and 20-year ROI. Account for tax credits, bill offsets, and utility rate increases with Calcora's solar calculator.",
    keywords: ["solar roi calculator", "solar payback period", "solar panel savings", "renewable energy roi", "Calcora solar"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Solar ROI Calculator",
    "description": "Calculate solar panel payback periods and long-term energy savings.",
};

export default function SolarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="json-ld-solar"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
