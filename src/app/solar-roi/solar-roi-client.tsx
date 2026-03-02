"use client";

import React, { useState, useEffect } from "react";
import { Sun, Info, Share2, TrendingUp, ArrowLeft, DollarSign, Zap, BarChart3, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateSolar, SolarResult } from "@/lib/calculations";
import { ShareButton } from "@/components/share-button";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";
import { SeoSchema } from "@/components/seo-schema";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SolarROIClient() {
    const [cost, setCost] = useState(25000);
    const [bill, setBill] = useState(1800);
    const [offset, setOffset] = useState(100);
    const [credit, setCredit] = useState(30);
    const [increase, setIncrease] = useState(3);

    const [results, setResults] = useState<SolarResult | null>(null);

    useEffect(() => {
        setResults(calculateSolar({ systemCost: cost, annualBill: bill, percentageOffset: offset, taxCreditPercent: credit, electricRateIncrease: increase }));
    }, [cost, bill, offset, credit, increase]);

    const chartData = {
        labels: results?.yearByYear.map(d => `Yr ${d.year}`) || [],
        datasets: [{
            label: 'Cumulative Savings ($)',
            data: results?.yearByYear.map(d => d.cumulative) || [],
            borderColor: 'rgba(245, 158, 11, 1)',
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            fill: true,
            tension: 0.4,
        }],
    };

    if (!results) return null;

    return (
        <CalculatorLayoutWrapper>
            <SeoSchema
                name="Solar ROI & Energy Savings Calculator 2026"
                description="Maximize your solar investment. Calculate payback period, 20-year savings, and tax credit benefits with current 2026 data."
                url="https://smartsavercalc.com/solar-roi"
            />
            <div className="max-w-6xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="flex flex-col gap-4 mb-12">
                    <div className="flex items-center gap-3">
                        <div className="p-2 h-10 w-10 flex items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                            <Sun className="h-6 w-6" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Free Solar ROI & Energy Savings Calculator 2026</h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl">Estimate your solar payback period and long-term utility savings in seconds. Updated for 2026 tax incentives.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="border-2">
                            <CardHeader><CardTitle>System Details</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between font-medium"><Label>Total System Cost</Label><span className="text-orange-600">${cost.toLocaleString()}</span></div>
                                    <Slider value={[cost]} min={5000} max={100000} step={1000} onValueChange={(v) => setCost(v[0])} />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between font-medium"><Label>Annual Electric Bill</Label><span className="text-orange-600">${bill.toLocaleString()}</span></div>
                                    <Slider value={[bill]} min={500} max={10000} step={100} onValueChange={(v) => setBill(v[0])} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label>Tax Credit (%)</Label><Input type="number" value={credit} onChange={(e) => setCredit(Number(e.target.value))} /></div>
                                    <div className="space-y-2"><Label>Bill Offset (%)</Label><Input type="number" value={offset} onChange={(e) => setOffset(Number(e.target.value))} /></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-7 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="bg-orange-600 text-white shadow-xl shadow-orange-500/20 border-0">
                                <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase tracking-wider">Payback Period</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="text-5xl font-bold">{results.paybackYears} Years</div>
                                    <p className="mt-2 text-xs opacity-90 font-medium">Break-even at year {results.paybackYears}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 border-0">
                                <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase tracking-wider">20-Year Savings</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold">${Math.round(results.life20Savings).toLocaleString()}</div>
                                    <p className="mt-2 text-xs opacity-90 font-medium">Net profit after system cost</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="border-2">
                            <CardHeader><CardTitle>Savings Projection</CardTitle></CardHeader>
                            <CardContent className="h-[300px]">
                                <Line data={chartData} options={{ maintainAspectRatio: false, scales: { y: { ticks: { callback: (v) => '$' + v } } } }} />
                            </CardContent>
                            <CardFooter className="pt-4 border-t text-sm text-muted-foreground">
                                Cumulative savings includes the initial investment cost. Positive values represent net profit.
                            </CardFooter>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            <ShareButton
                                title="My Solar ROI on SmartSaverCalc"
                                results={results}
                                calculatorName="Solar ROI"
                                primaryValue={`${results.paybackYears} Year Payback`}
                                text={`☀️ My solar payback is only ${results.paybackYears} years! SmartSaverCalc shows I'll save $${Math.round(results.life20Savings).toLocaleString()} in 20 years. Check yours:`}
                            />
                            <Button size="lg" variant="outline" className="rounded-full h-14 font-bold">
                                Get Installation Tips
                            </Button>
                        </div>
                    </div>
                </div>

                {/* SEO Content Section */}
                <div className="mt-24 pt-12 border-t space-y-16">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Understanding Solar ROI in 2026</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            Solar energy continues to be one of the best financial investments for homeowners. In 2026, with the extension of the **Federal Investment Tax Credit (ITC)** and rising utility rates, the average payback period for a residential system has dropped to under 8 years.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="p-8 bg-orange-50 rounded-3xl space-y-3">
                                <h3 className="font-bold text-xl text-orange-700">The 30% Tax Credit</h3>
                                <p className="text-sm text-orange-800/80 leading-relaxed">
                                    The federal government allows you to deduct 30% of your total solar installation cost from your federal taxes. This is a direct credit, not just a deduction.
                                </p>
                            </div>
                            <div className="p-8 bg-emerald-50 rounded-3xl space-y-3">
                                <h3 className="font-bold text-xl text-emerald-700">Utility Inflation Shield</h3>
                                <p className="text-sm text-emerald-800/80 leading-relaxed">
                                    Average electricity rates rise by 3-5% annually. Solar lock in your power price at $0.00 for 25+ years, protecting you from future inflation.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8 pb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-center">Solar Energy FAQ</h2>
                        <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-lg">
                                    How is "Payback Period" calculated?
                                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    We divide your net system cost (after tax credits) by your annual electricity savings. We also factor in a 3% annual utility rate increase to provide a more realistic 20-year projection.
                                </p>
                            </details>
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-lg">
                                    Does solar increase home value?
                                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    Yes. Studies show that homes with solar panels sell for about 4% more on average. Additionally, solar is often exempt from property tax increases in many states.
                                </p>
                            </details>
                        </div>
                    </section>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
