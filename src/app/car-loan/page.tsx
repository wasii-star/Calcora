"use client";

import React, { useState, useEffect } from "react";
import { Wallet, Info, Share2, TrendingDown, ArrowLeft, DollarSign, Calculator } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateCarLoan, CarLoanResult } from "@/lib/calculations";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { ShareButton } from "@/components/share-button";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";

export default function CarLoanPage() {
    const [price, setPrice] = useState(35000);
    const [down, setDown] = useState(5000);
    const [trade, setTrade] = useState(2000);
    const [rate, setRate] = useState(5.9);
    const [term, setTerm] = useState(60);
    const [tax, setTax] = useState(7);

    const [results, setResults] = useState<CarLoanResult | null>(null);

    useEffect(() => {
        setResults(calculateCarLoan({ vehiclePrice: price, downPayment: down, tradeIn: trade, interestRate: rate, loanTerm: term, salesTax: tax }));
    }, [price, down, trade, rate, term, tax]);

    if (!results) return null;

    return (
        <CalculatorLayoutWrapper>
            <div className="max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Back</Link>

                <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600"><Wallet className="h-6 w-6" /></div>
                    <h1 className="text-4xl font-bold tracking-tight">Free Auto Loan & Car Payment Calculator 2026</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader><CardTitle>Vehicle & Loan</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2"><Label>Vehicle Price ($)</Label><Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Down Payment</Label><Input type="number" value={down} onChange={(e) => setDown(Number(e.target.value))} /></div>
                                <div className="space-y-2"><Label>Trade-In Value</Label><Input type="number" value={trade} onChange={(e) => setTrade(Number(e.target.value))} /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Interest Rate (%)</Label><Input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} step="0.1" /></div>
                                <div className="space-y-2"><Label>Term (Months)</Label><Input type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} /></div>
                            </div>
                            <div className="space-y-2"><Label>Sales Tax (%)</Label><Input type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))} /></div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="bg-emerald-600 text-white shadow-xl">
                            <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase tracking-wider">Monthly Payment</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-6xl font-bold">${Math.round(results.monthlyPayment).toLocaleString()}</div>
                                <p className="mt-4 text-sm opacity-70">Estimated monthly payment for {term} months.</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle className="text-base">Breakdown</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between py-2 border-b"><span>Amount Financed</span><span className="font-bold">${results.totalPrincipal.toLocaleString()}</span></div>
                                <div className="flex justify-between py-2 border-b"><span>Total Interest</span><span className="font-bold text-amber-600">${Math.round(results.totalInterest).toLocaleString()}</span></div>
                                <div className="flex justify-between py-2"><span>Total Payment</span><span className="font-bold">${Math.round(results.totalCost).toLocaleString()}</span></div>
                            </CardContent>
                        </Card>
                        <AdPlaceholder type="rectangle" className="mt-8" />

                        <div className="flex gap-4 mt-8">
                            <ShareButton
                                className="flex-1"
                                title="My Car Loan Payment on Calcora"
                                text={`🏎️ Just used Calcora to plan my car loan! My estimated monthly payment is $${Math.round(results.monthlyPayment).toLocaleString()}. Check it out:`}
                            />
                            <Button size="lg" variant="outline" className="flex-1 rounded-full h-14 font-bold">
                                View Full Table
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
