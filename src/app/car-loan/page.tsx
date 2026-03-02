import { Metadata } from "next";
import CarLoanClient from "./car-loan-client";

export const metadata: Metadata = {
    title: "Free Auto Loan & Car Payment Calculator 2026 | SmartSaverCalc",
    description: "Calculate your monthly car loan payments. Factor in interest rates, down payments, trade-ins, and sales tax. Get a full breakdown of total car costs for 2026.",
    keywords: ["car loan calculator", "auto loan calculator", "car payment calculator", "monthly auto payment", "car financing tool 2026"],
};

export default function CarLoanPage() {
    return <CarLoanClient />;
}
