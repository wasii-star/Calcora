import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Free FIRE & Early Retirement Calculator 2026 | Financial Independence Tracker | Calcora",
    description: "Calculate your path to financial independence and early retirement (FIRE). Track savings and investment returns with Calcora.",
    keywords: ["retirement calculator", "FIRE calculator", "financial independence", "retirement savings tracker", "Calcora FIRE"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "FIRE & Early Retirement Calculator",
    "description": "Calculate age and savings required to reach financial independence (FIRE).",
    "url": "https://calcora-sandy.vercel.app/fire-retirement",
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
