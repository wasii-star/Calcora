import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Mortgage Affordability & Payment Calculator 2026 | Calcora",
    description: "Find out exactly how much home you can afford. Calculate monthly payments, interest, and debt-to-income ratios with our free mortgage calculator updated for 2026 rates.",
    keywords: ["mortgage calculator", "home affordability", "monthly mortgage payment", "DTI ratio calculator", "Calcora mortgage"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Mortgage Affordability Calculator",
    "description": "Calculate home affordability and monthly mortgage payments based on income, debt, and interest rates.",
};

export default function MortgageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="json-ld-mortgage"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
