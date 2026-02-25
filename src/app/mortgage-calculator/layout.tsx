import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Free Mortgage Affordability & Payment Calculator 2026 | Calcora",
    description: "Calculate home affordability and monthly mortgage payments. See how interest rates affect your budget with Calcora's free 2026 mortgage tool.",
    keywords: ["mortgage calculator", "home affordability", "monthly mortgage payment", "DTI ratio calculator", "Calcora mortgage"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Mortgage Affordability & Payment Calculator",
    "description": "Calculate home affordability and monthly mortgage payments based on income, debt, and interest rates.",
    "url": "https://calcora-sandy.vercel.app/mortgage-calculator",
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
