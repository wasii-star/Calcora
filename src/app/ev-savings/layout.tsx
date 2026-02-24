import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Free EV Savings Calculator 2026 | Calculate Gas vs Electric Costs | Calcora",
    description: "Calculate how much you can save by switching to an electric vehicle. Compare gas prices, MPG, and electricity rates to see your 5-year and lifetime savings with Calcora's smart EV calculator.",
    keywords: ["EV savings calculator", "gas vs electric cost", "electric car savings", "EV fuel cost calculator", "Calcora"],
    openGraph: {
        title: "EV vs Gas Savings Calculator | Calcora",
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
