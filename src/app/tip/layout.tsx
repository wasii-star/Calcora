import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Tip Calculator & Bill Splitter | Quick Percentage Tool | Calcora",
    description: "Quickly calculate tips and split bills between any number of people. Fast, beautiful, and perfect for dining out or group expenses.",
    keywords: ["tip calculator", "bill splitter", "percentage calculator", "dining tip tool", "Calcora tip"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Tip & Bill Splitter",
    "applicationCategory": "UtilitiesApplication",
    "description": "Quickly calculate tips and split dinner bills between friends.",
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
