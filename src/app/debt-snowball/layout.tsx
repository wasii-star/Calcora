import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Free Debt Snowball & Payoff Calculator 2026 | SmartSaverCalc",
    description: "Visualize your path to being debt-free using the snowball method. Calculate payoff timelines for credit cards and loans with SmartSaverCalc.",
    keywords: ["debt snowball calculator", "debt payoff calculator", "get out of debt free", "credit card payoff", "SmartSaverCalc debt"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Debt Snowball & Payoff Calculator",
    "description": "Calculate debt payoff timelines using the snowball method.",
    "url": "https://smartsavercalc.com/debt-snowball",
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
