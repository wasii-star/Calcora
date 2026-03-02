"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, Plus, Trash2, ArrowLeft, Zap, DollarSign, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateDebtPayoff } from "@/lib/calculations";
import { ShareButton } from "@/components/share-button";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";
import { SeoSchema } from "@/components/seo-schema";

export default function DebtSnowballClient() {
    const [debts, setDebts] = useState([
        { name: "Credit Card", balance: 5000, interest: 24, minPayment: 150 },
        { name: "Auto Loan", balance: 12000, interest: 6, minPayment: 350 },
    ]);
    const [extra, setExtra] = useState(200);
    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        setResults(calculateDebtPayoff(debts, extra));
    }, [debts, extra]);

    const addDebt = () => setDebts([...debts, { name: "New Debt", balance: 1000, interest: 10, minPayment: 50 }]);
    const removeDebt = (index: number) => setDebts(debts.filter((_, i) => i !== index));

    if (!results) return null;

    return (
        <CalculatorLayoutWrapper>
            <SeoSchema
                name="Free Debt Snowball & Payoff Calculator 2026"
                description="Eliminate debt faster using the Debt Snowball method. Calculate your payoff timeline, interest savings, and debt-free date with 2026 strategies."
                url="https://smartsavercalc.com/debt-snowball"
            />
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-rose-600 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="flex items-center gap-3 mb-10 text-rose-600">
                    <div className="p-2 bg-rose-50 rounded-lg">
                        <BarChart3 className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Free Debt Snowball & Payoff Calculator 2026</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                    <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="bg-rose-600 text-white shadow-xl shadow-rose-500/20 border-0">
                            <CardHeader className="pb-2 text-center md:text-left"><CardTitle className="text-sm opacity-80 uppercase tracking-wider">Time to Debt Free</CardTitle></CardHeader>
                            <CardContent className="text-center md:text-left">
                                <div className="text-6xl font-bold">{results.months} <span className="text-2xl opacity-70">Months</span></div>
                                <p className="mt-4 text-sm opacity-80 leading-relaxed font-medium">Estimated date: {new Date(new Date().setMonth(new Date().getMonth() + results.months)).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-rose-100">
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground uppercase tracking-widest">Monthly Snowball Extra</CardTitle></CardHeader>
                            <CardContent className="space-y-4 pt-4">
                                <div className="flex gap-4 items-center">
                                    <div className="h-12 w-12 rounded-xl bg-rose-50 flex items-center justify-center">
                                        <DollarSign className="text-rose-600 h-6 w-6" />
                                    </div>
                                    <Input type="number" value={extra} onChange={(e) => setExtra(Number(e.target.value))} className="text-2xl font-bold h-14 border-2 focus-visible:ring-rose-500" />
                                </div>
                                <p className="text-xs text-muted-foreground font-medium leading-relaxed">Increasing this amount by even $50 can shave years off your payoff timeline.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border-2 border-dashed">
                        <h2 className="text-2xl font-bold px-2">Your Debts</h2>
                        <Button onClick={addDebt} variant="default" size="lg" className="gap-2 rounded-full bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-500/20">
                            <Plus className="h-5 w-5" /> Add Debt Item
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {debts.map((debt, i) => (
                            <Card key={i} className="hover:border-rose-300 transition-all hover:shadow-md rounded-[1.5rem] border-2">
                                <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-4 gap-6 items-end">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase text-muted-foreground tracking-tighter">Debt Name</Label>
                                        <Input value={debt.name} className="font-bold h-12" onChange={(e) => {
                                            const newDebts = [...debts];
                                            newDebts[i].name = e.target.value;
                                            setDebts(newDebts);
                                        }} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase text-muted-foreground tracking-tighter">Balance ($)</Label>
                                        <Input type="number" value={debt.balance} className="font-bold h-12" onChange={(e) => {
                                            const newDebts = [...debts];
                                            newDebts[i].balance = Number(e.target.value);
                                            setDebts(newDebts);
                                        }} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase text-muted-foreground tracking-tighter">Interest (%)</Label>
                                        <Input type="number" value={debt.interest} className="font-bold h-12" onChange={(e) => {
                                            const newDebts = [...debts];
                                            newDebts[i].interest = Number(e.target.value);
                                            setDebts(newDebts);
                                        }} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="space-y-2 flex-1">
                                            <Label className="text-xs font-bold uppercase text-muted-foreground tracking-tighter">Min Payment ($)</Label>
                                            <Input type="number" value={debt.minPayment} className="font-bold h-12" onChange={(e) => {
                                                const newDebts = [...debts];
                                                newDebts[i].minPayment = Number(e.target.value);
                                                setDebts(newDebts);
                                            }} />
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => removeDebt(i)} className="text-muted-foreground hover:text-rose-600 hover:bg-rose-50 mt-6 h-12 w-12 rounded-xl border">
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 mt-16 justify-center">
                    <ShareButton
                        className="max-w-md w-full h-14 text-lg"
                        title="My Debt Payoff Timeline on SmartSaverCalc"
                        results={results}
                        calculatorName="Debt Snowball"
                        primaryValue={`${results.months} Months`}
                        text={`📉 I'll be debt-free in just ${results.months} months using the snowball method! See your payoff timeline on SmartSaverCalc:`}
                    />
                </div>

                {/* SEO Content Section */}
                <div className="mt-24 pt-12 border-t space-y-16">
                    <section className="space-y-6 text-center md:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">Snowball vs Avalanche: Which is better?</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg max-w-4xl">
                            The **Debt Snowball method** is a debt-reduction strategy where you pay off debts in order of smallest to largest balance. This builds psychological momentum as you see debts disappear quickly, keeping you motivated to reach the finish line in 2026.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="p-8 bg-rose-50 rounded-3xl space-y-3">
                                <h3 className="font-bold text-xl text-rose-700 underline decoration-rose-200 underline-offset-4">Snowball (Psychology)</h3>
                                <p className="text-sm text-rose-800/80 leading-relaxed font-medium">
                                    Focuses on early wins by clearing small tabs first. According to Harvard research, this is more likely to lead to long-term success because it builds a "habit of winning."
                                </p>
                            </div>
                            <div className="p-8 bg-blue-50 rounded-3xl space-y-3">
                                <h3 className="font-bold text-xl text-blue-700 underline decoration-blue-200 underline-offset-4">Avalanche (Mathematics)</h3>
                                <p className="text-sm text-blue-800/80 leading-relaxed font-medium">
                                    Focuses on paying high-interest debt first. Mathematically, this saves the most money in interest, but can take longer to see the first debt completely cleared.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8 pb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-center">Debt Management FAQ</h2>
                        <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-lg">
                                    Why ignore interest rates in Snowball?
                                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    The Snowball method prioritizes human behavior over pure math. By clearing a small balance, you gain the confidence to stick with the plan. The difference in total interest is often negligible compared to the cost of giving up because the plan felt too slow.
                                </p>
                            </details>
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-lg">
                                    What is the "Snowball Effect"?
                                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    When the smallest debt is paid off, you take the entire payment amount (min payment + extra) and roll it into the next smallest debt. Like a snowball rolling downhill, your payments get larger and more powerful over time.
                                </p>
                            </details>
                        </div>
                    </section>
                </div>
            </div>
        </CalculatorLayoutWrapper >
    );
}
