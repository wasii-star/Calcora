import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Free EV vs Gas Savings Calculator 2026 | SmartSaverCalc",
    description: "Calculate exactly how much you can save by switching from gas to an electric vehicle. Compare 5-year savings, charging costs, and MPG with SmartSaverCalc's smart EV calculator.",
    keywords: ["EV savings calculator", "gas vs electric cost", "electric car savings", "EV fuel cost calculator", "SmartSaverCalc"],
    openGraph: {
        title: "Free EV vs Gas Savings Calculator 2026 | SmartSaverCalc",
        description: "See your 5-year savings by switching to electric. Smart, fast, and 100% free.",
        type: "website",
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EV vs Gas Savings Calculator",
    "operatingSystem": "All",
    "applicationCategory": "FinanceApplication",
    "description": "Calculate 5-year and lifetime savings when switching from a gasoline vehicle to an electric vehicle.",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
};

export default function EVSavingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="json-ld-ev"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
