"use client";

import React, { useState, useEffect } from "react";
import {
    Home,
    Info,
    Share2,
    TrendingUp,
    Zap,
    ArrowLeft,
    DollarSign,
    ShieldAlert,
    ShieldCheck,
    Calculator
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateMortgage, MortgageResult } from "@/lib/calculations";
import { ShareButton } from "@/components/share-button";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";
import { SeoSchema } from "@/components/seo-schema";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MortgageClient() {
    // Inputs
    const [homePrice, setHomePrice] = useState(450000);
    const [downPayment, setDownPayment] = useState(90000);
    const [term, setTerm] = useState(30);
    const [rate, setRate] = useState(6.5);
    const [tax, setTax] = useState(5000);
    const [insurance, setInsurance] = useState(1200);
    const [income, setIncome] = useState(120000);
    const [debt, setDebt] = useState(500);

    const [results, setResults] = useState<MortgageResult | null>(null);

    useEffect(() => {
        const res = calculateMortgage({
            homePrice,
            downPayment,
            loanTerm: term,
            interestRate: rate,
            propertyTax: tax,
            homeInsurance: insurance,
            monthlyDebt: debt,
            annualIncome: income
        });
        setResults(res);
    }, [homePrice, downPayment, term, rate, tax, insurance, income, debt]);

    const chartData = {
        labels: ['Principal & Interest', 'Tax', 'Insurance'],
        datasets: [
            {
                data: [
                    results?.monthlyPrincipalInterest || 0,
                    tax / 12,
                    insurance / 12,
                ],
                backgroundColor: [
                    'rgba(79, 70, 229, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                ],
            },
        ],
    };

    if (!results) return null;

    return (
        <CalculatorLayoutWrapper>
            <SeoSchema
                name="Mortgage Affordability & Payment Calculator 2026"
                description="Calculate your monthly mortgage payments, DTI ratio, and total interest for 2026. Free, accurate, and private tool for home buyers."
                url="https://smartsavercalc.com/mortgage-calculator"
            />
            <div className="max-w-6xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="flex flex-col gap-4 mb-12">
                    <div className="flex items-center gap-3">
                        <div className="p-2 h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600">
                            <Home className="h-6 w-6" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Free Mortgage Affordability & Payment Calculator 2026</h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        Get a professional-grade breakdown of your monthly payments and see if your dream home fits your 2026 budget goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* ... (existing columns) ... */}
                </div>

                {/* SEO Content Section */}
                <div className="mt-24 pt-12 border-t space-y-16">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">How to Calculate Mortgage Affordability in 2026</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            Understanding how much home you can afford is the most critical step in the home-buying process. Our 2026 mortgage calculator uses the standard <strong>Debt-to-Income (DTI) ratio</strong> model favored by traditional lenders.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="p-6 bg-muted/50 rounded-2xl space-y-3">
                                <h3 className="font-bold text-xl text-primary">The 28/36 Rule</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Most financial experts recommend that your mortgage payment should not exceed 28% of your gross monthly income, and your total debt payments shouldn't exceed 36%.
                                </p>
                            </div>
                            <div className="p-6 bg-muted/50 rounded-2xl space-y-3">
                                <h3 className="font-bold text-xl text-primary">Impact of Down Payments</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Aiming for a 20% down payment helps you avoid Private Mortgage Insurance (PMI) and lowers your monthly interest expense significantly.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8">
                        <h2 className="text-3xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="rounded-[2rem] border-2">
                                <CardHeader>
                                    <CardTitle>What interest rate should I use?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    Rates in 2026 vary based on credit score. Check with local lenders, but 6.0% to 7.0% is a common benchmark for planning.
                                </CardContent>
                            </Card>
                            <Card className="rounded-[2rem] border-2">
                                <CardHeader>
                                    <CardTitle>Are property taxes included?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    Yes! We include estimated property taxes and home insurance so you get the "True Monthly Cost" (PITI).
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
