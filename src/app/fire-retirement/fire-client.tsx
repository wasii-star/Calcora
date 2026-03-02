"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Info, Share2, ArrowLeft, DollarSign, Zap, Target, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateRetirement } from "@/lib/calculations";
import { ShareButton } from "@/components/share-button";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";
import { SeoSchema } from "@/components/seo-schema";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function FIREClient() {
    const [age, setAge] = useState(30);
    const [retireAge, setRetireAge] = useState(65);
    const [savings, setSavings] = useState(50000);
    const [monthly, setMonthly] = useState(1000);
    const [returnRate, setReturnRate] = useState(7);
    const [spend, setSpend] = useState(60000);

    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        setResults(calculateRetirement({ currentAge: age, retireAge, currentSavings: savings, monthlyContribution: monthly, expectedReturn: returnRate, annualSpend: spend, inflation: 3 }));
    }, [age, retireAge, savings, monthly, returnRate, spend]);

    const chartData = {
        labels: results?.history.map((h: any) => `Age ${h.age}`) || [],
        datasets: [{
            label: 'Balance ($)',
            data: results?.history.map((h: any) => h.balance) || [],
            borderColor: 'rgba(139, 92, 246, 1)',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            fill: true,
            tension: 0.4,
        }],
    };

    if (!results) return null;

    return (
        <CalculatorLayoutWrapper>
            <SeoSchema
                name="Free FIRE & Early Retirement Calculator 2026"
                description="Determine when you can reach financial independence. Calculate your net worth projection and FIRE goal based on spending and 2026 market returns."
                url="https://smartsavercalc.com/fire-retirement"
            />
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-violet-600 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600"><TrendingUp className="h-6 w-6" /></div>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Free FIRE & Early Retirement Calculator 2026</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="border-2">
                            <CardHeader><CardTitle>Wealth Parameters</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between font-medium"><Label>Retirement Age Target</Label><span className="text-violet-600 font-bold">{retireAge}</span></div>
                                    <Slider value={[retireAge]} min={age + 1} max={90} step={1} onValueChange={(v) => setRetireAge(v[0])} />
                                </div>
                                <div className="space-y-2"><Label>Monthly Contribution ($)</Label><Input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} /></div>
                                <div className="space-y-2"><Label>Desired Annual Retirement Spend ($)</Label><Input type="number" value={spend} onChange={(e) => setSpend(Number(e.target.value))} /></div>
                                <div className="space-y-2"><Label>Expected Annual Return (%)</Label><Input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} step="0.1" /></div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="bg-violet-600 text-white shadow-xl shadow-violet-500/20 border-0">
                                <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase tracking-wider">Projected Portfolio</CardTitle></CardHeader>
                                <CardContent><div className="text-5xl font-bold">${Math.round(results.finalBalance).toLocaleString()}</div></CardContent>
                            </Card>
                            <Card className={results.isFIRE ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 border-0' : 'bg-muted border border-violet-100'}>
                                <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase tracking-wider">FIRE Goal Tracker</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{results.isFIRE ? 'Goal Achieved!' : 'Growth Stage...'}</div>
                                    <p className="mt-2 text-xs font-medium">Target: ${Math.round(results.targetFIRE).toLocaleString()} ({Math.round((results.finalBalance / results.targetFIRE) * 100)}%)</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="border-2">
                            <CardHeader><CardTitle>Wealth Accumulation Chart</CardTitle></CardHeader>
                            <CardContent className="h-[300px]"><Line data={chartData} options={{ maintainAspectRatio: false, scales: { y: { ticks: { callback: (v) => '$' + v } } } }} /></CardContent>
                        </Card>

                        <div className="flex gap-4">
                            <ShareButton
                                className="flex-1"
                                title="My FIRE Goal on SmartSaverCalc"
                                results={results}
                                calculatorName="FIRE Retirement"
                                primaryValue={`$${Math.round(results.finalBalance).toLocaleString()}`}
                                text={`🔥 I'm on track to retire with $${Math.round(results.finalBalance).toLocaleString()}! SmartSaverCalc shows I've hit ${Math.round((results.finalBalance / results.targetFIRE) * 100)}% of my FIRE goal. Check yours:`}
                            />
                            <Button size="lg" variant="outline" className="flex-1 rounded-full h-14 font-bold">
                                Analyze Tax Strategies
                            </Button>
                        </div>
                    </div>
                </div>

                {/* SEO Content Section */}
                <div className="mt-24 pt-12 border-t space-y-16">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">The 2026 Guide to Early Retirement (FIRE)</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            Financial Independence, Retire Early (FIRE) is a movement focused on extreme savings and investment. In 2026, reaching FIRE is about more than just numbers—it's about optimizing your spending and understanding the **4% Rule** in a changing economy.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="p-8 bg-violet-50 rounded-3xl space-y-3">
                                <h3 className="font-bold text-xl text-violet-700">The 4% Rule</h3>
                                <p className="text-sm text-violet-800/80 leading-relaxed">
                                    The "Safe Withdrawal Rate" suggests you can withdraw 4% of your total portfolio annually without running out of money for at least 30 years. This calculator helps you find the principal needed to support your target spending.
                                </p>
                            </div>
                            <div className="p-8 bg-emerald-50 rounded-3xl space-y-3">
                                <h3 className="font-bold text-xl text-emerald-700">Compound Interest Power</h3>
                                <p className="text-sm text-emerald-800/80 leading-relaxed">
                                    By starting your FIRE journey early, every dollar invested today is worth significantly more in 20 years. Consistent monthly contributions are the key to building a sustainable nest egg.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8 pb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-center">Retirement Planning FAQ</h2>
                        <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-lg">
                                    What is a FIRE Target?
                                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    Your FIRE target is typically calculated by multiplying your expected annual expenses by 25. For example, if you plan to spend $60,000 per year, your target portfolio would be $1.5 million.
                                </p>
                            </details>
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-lg">
                                    Should I factor in inflation?
                                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    Yes. This calculator assumes a 3% annual inflation rate. This ensures that the ${spend} you want to spend in retirement has the same purchasing power as that amount today.
                                </p>
                            </details>
                        </div>
                    </section>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
