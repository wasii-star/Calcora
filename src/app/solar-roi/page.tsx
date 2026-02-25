"use client";

import React, { useState, useEffect } from "react";
import { Sun, Info, Share2, TrendingUp, ArrowLeft, DollarSign, Zap, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateSolar, SolarResult } from "@/lib/calculations";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";
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

export default function SolarROIPage() {
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
                        <h1 className="text-4xl font-bold tracking-tight">Solar Panel ROI & Payback</h1>
                    </div>
                    <p className="text-lg text-muted-foreground">Estimate your solar payback period and long-term utility savings in seconds.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 space-y-6">
                        <Card>
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
                            <Card className="bg-orange-600 text-white">
                                <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase">Payback Period</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="text-5xl font-bold">{results.paybackYears} Years</div>
                                    <p className="mt-2 text-xs opacity-80 font-medium">Break-even at year {results.paybackYears}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-emerald-600 text-white">
                                <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase">20-Year Savings</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold">${Math.round(results.life20Savings).toLocaleString()}</div>
                                    <p className="mt-2 text-xs opacity-80 font-medium">Net profit after system cost</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader><CardTitle>Savings Projection</CardTitle></CardHeader>
                            <CardContent className="h-[300px]">
                                <Line data={chartData} options={{ maintainAspectRatio: false, scales: { y: { ticks: { callback: (v) => '$' + v } } } }} />
                            </CardContent>
                        </Card>
                        <AdPlaceholder type="rectangle" className="mt-6" />
                    </div>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
