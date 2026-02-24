import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "FIRE & Retirement Calculator | Financial Independence Tracker | Calcora",
    description: "Calculate your path to early retirement. Track your savings, expected returns, and find out when you'll reach financial independence (FIRE) with our smart calculator.",
    keywords: ["retirement calculator", "FIRE calculator", "financial independence", "retirement savings tracker", "Calcora FIRE"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "FIRE / Retirement Calculator",
    "description": "Calculate age and savings required to reach financial independence (FIRE).",
};

export default function FIRELayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="json-ld-fire"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
