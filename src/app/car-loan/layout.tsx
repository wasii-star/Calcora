import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Auto Loan Calculator | Monthly Payment & Interest 2026 | Calcora",
    description: "Plan your next car purchase with our free auto loan calculator. Estimate monthly payments, total interest, and financing costs including sales tax.",
    keywords: ["car loan calculator", "auto finance calculator", "monthly car payment", "vehicle loan interest", "Calcora car loan"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Auto Loan Calculator",
    "description": "Calculate monthly car payments and total interest for vehicle loans.",
};

export default function CarLoanLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="json-ld-car"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
