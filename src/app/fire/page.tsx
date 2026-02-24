"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Info, Share2, ArrowLeft, DollarSign, Zap, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateRetirement } from "@/lib/calculations";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function RetirementPage() {
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
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Dashboard</Link>

            <div className="flex items-center gap-3 mb-10">
                <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600"><TrendingUp className="h-6 w-6" /></div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">Retirement & FIRE Forecast</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Your Numbers</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between font-medium"><Label>Retirement Age</Label><span className="text-violet-600">{retireAge}</span></div>
                                <Slider value={[retireAge]} min={age + 1} max={90} step={1} onValueChange={(v) => setRetireAge(v[0])} />
                            </div>
                            <div className="space-y-2"><Label>Monthly Contribution ($)</Label><Input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} /></div>
                            <div className="space-y-2"><Label>Annual Spending in Retirement ($)</Label><Input type="number" value={spend} onChange={(e) => setSpend(Number(e.target.value))} /></div>
                            <div className="space-y-2"><Label>Expected Return (%)</Label><Input type="number" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} step="0.1" /></div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-violet-600 text-white">
                            <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase">Projected Net Worth</CardTitle></CardHeader>
                            <CardContent><div className="text-5xl font-bold">${Math.round(results.finalBalance).toLocaleString()}</div></CardContent>
                        </Card>
                        <Card className={results.isFIRE ? 'bg-emerald-600 text-white' : 'bg-muted border'}>
                            <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase">FIRE Goal (${Math.round(results.targetFIRE).toLocaleString()})</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{results.isFIRE ? 'Goal Achieved!' : 'Keep Saving...'}</div>
                                <p className="mt-2 text-xs">{Math.round((results.finalBalance / results.targetFIRE) * 100)}% of your target</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader><CardTitle>Wealth Projection</CardTitle></CardHeader>
                        <CardContent className="h-[300px]"><Line data={chartData} options={{ maintainAspectRatio: false }} /></CardContent>
                    </Card>
                    <AdPlaceholder type="content" className="mt-8" />
                </div>
            </div>
        </div>
    );
}
