import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Free Solar ROI & Energy Savings Calculator 2026 | Calcora",
    description: "Calculate your solar panel payback period and 20-year energy savings. Fast and accurate solar ROI tool for 2026.",
    keywords: ["solar roi calculator", "solar payback period", "solar panel savings", "renewable energy roi", "Calcora solar"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Solar ROI & Energy Savings Calculator",
    "description": "Calculate solar panel payback periods and long-term energy savings.",
    "url": "https://calcora-sandy.vercel.app/solar-roi",
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
