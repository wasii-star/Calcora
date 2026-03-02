import { Metadata } from "next";
import BMIClient from "./bmi-client";

export const metadata: Metadata = {
    title: "Free BMI & Daily Calorie Calculator 2026 | SmartSaverCalc",
    description: "Calculate your Body Mass Index (BMI) and daily maintenance calories (TDEE). Free health tool for weight loss, maintenance, and gain in 2026.",
    keywords: ["bmi calculator", "calorie calculator", "daily calorie target", "tdee calculator", "weight loss calculator"],
};

export default function BMIPage() {
    return <BMIClient />;
}
