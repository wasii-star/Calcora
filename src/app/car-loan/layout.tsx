import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Free Auto Loan & Car Payment Calculator 2026 | Calcora",
    description: "Calculate monthly car payments and total interest for your next vehicle purchase. Accurate auto loan planning for 2026 with Calcora.",
    keywords: ["car loan calculator", "auto finance calculator", "monthly car payment", "vehicle loan interest", "Calcora car loan"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Auto Loan & Car Payment Calculator",
    "description": "Calculate monthly car payments and total interest for vehicle loans.",
    "url": "https://calcora-sandy.vercel.app/car-loan",
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
