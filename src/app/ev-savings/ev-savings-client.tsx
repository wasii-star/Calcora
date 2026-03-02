"use client";

import React, { useState, useEffect } from "react";
import {
    Car,
    Info,
    Share2,
    TrendingDown,
    Zap,
    ArrowLeft,
    DollarSign,
    Leaf
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateEVSavings, EVSavingsResult } from "@/lib/calculations";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";
import { ShareButton } from "@/components/share-button";
import { SeoSchema } from "@/components/seo-schema";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function EVSavingsClient() {
    // Inputs
    const [miles, setMiles] = useState(12000);
    const [gasPrice, setGasPrice] = useState(3.49);
    const [electricPrice, setElectricPrice] = useState(0.16);
    const [mpg, setMpg] = useState(25);
    const [evEfficiency, setEvEfficiency] = useState(30); // 30 kWh / 100mi
    const [years, setYears] = useState(5);
    const [maintenance, setMaintenance] = useState(500);

    const [results, setResults] = useState<EVSavingsResult | null>(null);

    useEffect(() => {
        const res = calculateEVSavings({
            annualMiles: miles,
            gasPrice: gasPrice,
            electricityPrice: electricPrice,
            gasMPG: mpg,
            evEfficiency: evEfficiency,
            ownershipYears: years,
            maintenanceSavingsPerYear: maintenance
        });
        setResults(res);
    }, [miles, gasPrice, electricPrice, mpg, evEfficiency, years, maintenance]);

    const chartData = {
        labels: ['Annual Fuel/Power Cost'],
        datasets: [
            {
                label: 'Gas Car',
                data: [results?.gasCostYear || 0],
                backgroundColor: 'rgba(239, 68, 68, 0.6)',
            },
            {
                label: 'Electric Car',
                data: [results?.evCostYear || 0],
                backgroundColor: 'rgba(34, 197, 94, 0.6)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: any) => '$' + value,
                }
            }
        }
    };

    if (!results) return null;

    return (
        <CalculatorLayoutWrapper>
            <SeoSchema
                name="EV vs Gas Savings Calculator 2026"
                description="Compare electric vehicle costs vs gasoline cars. Calculate 5-year savings, CO2 reduction, and fuel costs with real-world 2026 data."
                url="https://smartsavercalc.com/ev-savings"
            />
            <div className="max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="flex flex-col gap-4 mb-12">
                    <div className="flex items-center gap-3">
                        <div className="p-2 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Car className="h-6 w-6" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Free EV vs Gas Savings Calculator 2026</h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        See your 5-year and lifetime savings by switching to electric. Our 2026 data model accounts for real-world efficiency and fuel prices.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* ... (existing columns) ... */}
                </div>

                {/* SEO Content Section */}
                <div className="mt-24 pt-12 border-t space-y-16">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Are EVs Cheaper Than Gas Cars in 2026?</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            The short answer is **yes**, for most drivers. While electric vehicles often have a higher upfront cost, the "Total Cost of Ownership" (TCO) is significantly lower due to cheaper "fuel" (electricity) and minimal maintenance requirements.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="p-6 bg-muted/30 rounded-2xl space-y-2">
                                <h3 className="font-bold text-emerald-600">Fuel Savings</h3>
                                <p className="text-sm">Electricity is consistently 60-70% cheaper than gasoline on a per-mile basis.</p>
                            </div>
                            <div className="p-6 bg-muted/30 rounded-2xl space-y-2">
                                <h3 className="font-bold text-emerald-600">No Oil Changes</h3>
                                <p className="text-sm">EVs have fewer moving parts, meaning no oil changes, spark plugs, or timing belts.</p>
                            </div>
                            <div className="p-6 bg-muted/30 rounded-2xl space-y-2">
                                <h3 className="font-bold text-emerald-600">Brake Longevity</h3>
                                <p className="text-sm">Regenerative braking means your physical brake pads can last twice as long as a gas car.</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8">
                        <h2 className="text-3xl font-bold tracking-tight">EV Cost FAQ</h2>
                        <div className="space-y-4">
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer" open>
                                <summary className="flex items-center justify-between font-bold text-xl">
                                    How much does it cost to charge an EV at home?
                                    <span className="transition group-open:rotate-180">+</span>
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    In 2026, the average US home electricity rate is roughly $0.16 per kWh. For a standard EV, a full charge costs between $10 and $15, providing about 250-300 miles of range.
                                </p>
                            </details>
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-xl">
                                    Do cold climates affect EV savings?
                                    <span className="transition group-open:rotate-180">+</span>
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    Extreme cold can reduce EV range by 20-30%, which slightly increases the cost per mile. However, even in winter, EVs remain significantly cheaper to operate than gas vehicles.
                                </p>
                            </details>
                        </div>
                    </section>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
