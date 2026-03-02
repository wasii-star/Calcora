import { Metadata } from "next";
import SolarROIClient from "./solar-roi-client";

export const metadata: Metadata = {
    title: "Solar ROI & Energy Savings Calculator 2026 | SmartSaverCalc",
    description: "Calculate your solar payback period and 20-year net savings. Estimate installation costs, tax credits, and utility bill offsets with 2026 data.",
    keywords: ["solar roi calculator", "solar payback period", "solar panel savings", "energy cost calculator", "solar tax credit 2026"],
};

export default function SolarROIPage() {
    return <SolarROIClient />;
}
