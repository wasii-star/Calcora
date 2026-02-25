import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "Free BMI & Daily Calorie Calculator 2026 | Calcora",
    description: "Calculate your BMI and daily calorie needs (TDEE). Get accurate targets for weight maintenance or loss with Calcora's 2026 health tools.",
    keywords: ["bmi calculator", "calorie needs calculator", "tdee calculator", "health tracker", "Calcora bmi"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BMI & Daily Calorie Calculator",
    "applicationCategory": "HealthApplication",
    "description": "Calculate Body Mass Index and daily calorie requirements.",
    "url": "https://calcora-sandy.vercel.app/bmi-calories",
};

export default function BMILayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Script
                id="json-ld-bmi"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
