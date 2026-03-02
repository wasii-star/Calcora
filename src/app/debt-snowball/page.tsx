import { Metadata } from "next";
import DebtSnowballClient from "./debt-snowball-client";

export const metadata: Metadata = {
    title: "Free Debt Snowball & Payoff Calculator 2026 | SmartSaverCalc",
    description: "Build your plan to become debt-free. Calculate your payoff timeline using the Debt Snowball method. Optimize interest savings and track monthly progress.",
    keywords: ["debt snowball calculator", "debt payoff calculator", "payoff timeline tool", "credit card payoff calculator", "debt reduction plan 2026"],
};

export default function DebtSnowballPage() {
    return <DebtSnowballClient />;
}
