import { Metadata } from "next";
import TipClient from "./tip-client";

export const metadata: Metadata = {
    title: "Free Tip Calculator & Bill Splitter 2026 | SmartSaverCalc",
    description: "Quickly calculate tips and split bills with friends. Professional tip suggestions, custom percentages, and per-person breakdowns for 2026.",
    keywords: ["tip calculator", "bill splitter", "restaurant tip tool", "gratuity calculator", "dining etiquette 2026"],
};

export default function TipPage() {
    return <TipClient />;
}
