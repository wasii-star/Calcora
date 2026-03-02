import { Metadata } from "next";
import FIREClient from "./fire-client";

export const metadata: Metadata = {
    title: "Free FIRE & Early Retirement Calculator 2026 | SmartSaverCalc",
    description: "Plan your financial independence with our FIRE calculator. Project your retirement wealth, calculate your 4% safe withdrawal target, and track early retirement goals.",
    keywords: ["fire calculator", "retirement planning tool", "financial independence calculator", "early retirement calculator", "wealth projection tool 2026"],
};

export default function RetirementPage() {
    return <FIREClient />;
}
