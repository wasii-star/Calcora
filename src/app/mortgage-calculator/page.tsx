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
import { AdPlaceholder } from "@/components/ad-placeholder";
import { ShareButton } from "@/components/share-button";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MortgagePage() {
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
                    {/* Left Column: Inputs */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Loan Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between font-medium">
                                        <Label>Home Price</Label>
                                        <span className="text-primary">${homePrice.toLocaleString()}</span>
                                    </div>
                                    <Slider value={[homePrice]} min={50000} max={2000000} step={5000} onValueChange={(v) => setHomePrice(v[0])} />
                                </div>

                                <div className="space-y-4 font-medium">
                                    <div className="flex justify-between">
                                        <Label>Down Payment</Label>
                                        <span className="text-primary">${downPayment.toLocaleString()} ({Math.round((downPayment / homePrice) * 100)}%)</span>
                                    </div>
                                    <Slider value={[downPayment]} min={0} max={homePrice} step={1000} onValueChange={(v) => setDownPayment(v[0])} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Interest Rate (%)</Label>
                                        <Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} step="0.1" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Loan Term (Years)</Label>
                                        <Input type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Financial Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Annual Household Income ($)</Label>
                                    <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Monthly Other Debts ($)</Label>
                                    <Input type="number" value={debt} onChange={(e) => setDebt(Number(e.target.value))} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Dynamic Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="md:col-span-2 bg-indigo-600 text-white shadow-xl">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-wider">Estimated Monthly Payment</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-5xl font-bold">${Math.round(results.monthlyTotal).toLocaleString()}</div>
                                    <p className="mt-4 text-xs opacity-70 leading-relaxed font-medium">
                                        Includes Principal, Interest, Property Tax (${Math.round(tax / 12)}), and Home Insurance (${Math.round(insurance / 12)}).
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className={`${results.affordabilityStatus === 'safe' ? 'bg-emerald-600 text-white' :
                                results.affordabilityStatus === 'stretch' ? 'bg-amber-500 text-white' : 'bg-rose-600 text-white'
                                }`}>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-wider">DTI Ratio</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-center">
                                    <div className="text-3xl font-bold">{Math.round(results.dtiRatio)}%</div>
                                    <p className="text-[10px] font-bold uppercase tracking-tighter opacity-80">
                                        {results.affordabilityStatus === 'safe' ? 'Safe Budget' :
                                            results.affordabilityStatus === 'stretch' ? 'Tight Budget' : 'High Risk'}
                                    </p>
                                    {results.affordabilityStatus === 'safe' ? <ShieldCheck className="mx-auto h-8 w-8 mt-2 opacity-50" /> : <ShieldAlert className="mx-auto h-8 w-8 mt-2 opacity-50" />}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Payment Breakdown</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[200px] flex items-center justify-center">
                                    <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Loan Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between text-sm py-2 border-b">
                                        <span className="text-muted-foreground">Loan Amount</span>
                                        <span className="font-bold">${results.loanAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-2 border-b">
                                        <span className="text-muted-foreground">Total Interest Paid</span>
                                        <span className="font-bold text-amber-600">${results.totalInterest.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-2">
                                        <span className="text-muted-foreground">Total Cost of Loan</span>
                                        <span className="font-bold">${results.totalCost.toLocaleString()}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <AdPlaceholder type="rectangle" className="my-8" />

                        <div className="flex gap-4">
                            <ShareButton
                                className="flex-1"
                                title="My Mortgage Affordability on SmartSaverCalc"
                                results={results}
                                calculatorName="Mortgage Calculator"
                                primaryValue={`$${Math.round(results.monthlyTotal).toLocaleString()}/mo`}
                                text={`🏠 I found my dream home budget on SmartSaverCalc! My estimated monthly payment is $${Math.round(results.monthlyTotal).toLocaleString()}. Check yours:`}
                            />
                            <Button size="lg" variant="outline" className="flex-1 rounded-full h-14 font-bold">
                                Download Amortization
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
