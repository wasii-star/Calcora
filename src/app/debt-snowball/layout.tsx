import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Debt Snowball Calculator | Get Out of Debt Faster | Calcora",
    description: "Visualize your path to being debt-free. Use the snowball method to pay off credit cards and loans faster. See how extra payments cut years off your timeline.",
    keywords: ["debt snowball calculator", "debt payoff calculator", "get out of debt free", "credit card payoff", "Calcora debt"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Debt Snowball Calculator",
    "description": "Calculate debt payoff timelines using the snowball method.",
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
