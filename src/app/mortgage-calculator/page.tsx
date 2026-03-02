import { Metadata } from "next";
import MortgageClient from "./mortgage-client";

export const metadata: Metadata = {
    title: "Mortgage Affordability & Payment Calculator 2026 | SmartSaverCalc",
    description: "Calculate your monthly mortgage payments, DTI ratio, and total interest for 2026. Free, accurate, and private tool for home buyers.",
    keywords: ["mortgage calculator", "affordability calculator", "home loan payment", "DTI ratio calculator", "2026 mortgage rates"],
};

export default function MortgagePage() {
    return <MortgageClient />;
}
