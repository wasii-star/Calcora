import { Metadata } from "next";

import Script from "next/script";

export const metadata: Metadata = {
    title: "BMI & Daily Calorie Needs Calculator | Health Tracker | Calcora",
    description: "Calculate your Body Mass Index (BMI) and Total Daily Energy Expenditure (TDEE). Get accurate calorie targets for weight maintenance or loss based on your profile.",
    keywords: ["bmi calculator", "calorie needs calculator", "tdee calculator", "health tracker", "Calcora bmi"],
};

const jsonLd = {
    "@context": "https://schema.org",
    "@id": "https://calcora.com/bmi",
    "@type": "SoftwareApplication",
    "name": "BMI & Calorie Calculator",
    "applicationCategory": "HealthApplication",
    "description": "Calculate Body Mass Index and daily calorie requirements.",
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
