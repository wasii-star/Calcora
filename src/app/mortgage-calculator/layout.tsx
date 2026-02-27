import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Free Mortgage Affordability & Payment Calculator 2026 | SmartSaverCalc",
    description: "Calculate home affordability and monthly mortgage payments. See how interest rates affect your budget with SmartSaverCalc's free 2026 mortgage tool.",
    keywords: ["mortgage calculator", "home affordability", "monthly mortgage payment", "DTI ratio calculator", "SmartSaverCalc mortgage"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Mortgage Affordability & Payment Calculator",
    "description": "Calculate home affordability and monthly mortgage payments based on income, debt, and interest rates.",
    "url": "https://smartsavercalc.com/mortgage-calculator",
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
