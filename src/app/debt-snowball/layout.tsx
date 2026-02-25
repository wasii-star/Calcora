import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Free Debt Snowball & Payoff Calculator 2026 | Calcora",
    description: "Visualize your path to being debt-free using the snowball method. Calculate payoff timelines for credit cards and loans with Calcora.",
    keywords: ["debt snowball calculator", "debt payoff calculator", "get out of debt free", "credit card payoff", "Calcora debt"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Debt Snowball & Payoff Calculator",
    "description": "Calculate debt payoff timelines using the snowball method.",
    "url": "https://calcora-sandy.vercel.app/debt-snowball",
};

export default function DebtLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="json-ld-debt"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
