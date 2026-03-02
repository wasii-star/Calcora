import { Metadata } from "next";
import EVSavingsClient from "./ev-savings-client";

export const metadata: Metadata = {
    title: "EV vs Gas Savings Calculator 2026 | SmartSaverCalc",
    description: "Compare electric vehicle costs vs gasoline cars. Calculate 5-year savings, CO2 reduction, and fuel costs with real-world 2026 data.",
    keywords: ["EV savings calculator", "electric vs gas car cost", "EV cost comparison", "fuel savings calculator", "Tesla savings calculator"],
};

export default function EVSavingsPage() {
    return <EVSavingsClient />;
}
