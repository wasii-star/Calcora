import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Free Tip Calculator & Bill Splitter 2026 | Calcora",
    description: "Calculate tips and split bills instantly between any number of people. Fast, smart, and free for group dining with Calcora.",
    keywords: ["tip calculator", "bill splitter", "percentage calculator", "dining tip tool", "Calcora tip"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Tip Calculator & Bill Splitter",
    "applicationCategory": "UtilitiesApplication",
    "description": "Quickly calculate tips and split dinner bills between friends.",
    "url": "https://calcora-sandy.vercel.app/tip-calculator",
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
