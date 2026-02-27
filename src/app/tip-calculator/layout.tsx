import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Free Tip Calculator & Bill Splitter 2026 | SmartSaverCalc",
    description: "Calculate tips and split bills instantly between any number of people. Fast, smart, and free for group dining with SmartSaverCalc.",
    keywords: ["tip calculator", "bill splitter", "percentage calculator", "dining tip tool", "SmartSaverCalc tip"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Tip Calculator & Bill Splitter",
    "applicationCategory": "UtilitiesApplication",
    "description": "Quickly calculate tips and split dinner bills between friends.",
    "url": "https://smartsavercalc.com/tip-calculator",
};

export default function TipLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="json-ld-tip"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
