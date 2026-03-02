"use client";

import React, { useState, useEffect } from "react";
import { Wallet, Info, Share2, TrendingUp, ArrowLeft, DollarSign, Calculator, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateCarLoan, CarLoanResult } from "@/lib/calculations";
import { ShareButton } from "@/components/share-button";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";
import { SeoSchema } from "@/components/seo-schema";

export default function CarLoanClient() {
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
            <SeoSchema
                name="Free Auto Loan & Car Payment Calculator 2026"
                description="Calculate monthly car payments, total interest, and loan breakdowns. Factor in trade-ins, down payments, and sales tax with 2026 interest rates."
                url="https://smartsavercalc.com/car-loan"
            />
            <div className="max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                        <Wallet className="h-6 w-6" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Free Auto Loan & Car Payment Calculator 2026</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-2">
                        <CardHeader><CardTitle>Vehicle & Loan Details</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Vehicle Price ($)</Label>
                                <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                            </div>
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
                        <Card className="bg-emerald-600 text-white shadow-xl shadow-emerald-500/20 border-0">
                            <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase tracking-wider">Monthly Payment</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-6xl font-bold">${Math.round(results.monthlyPayment).toLocaleString()}</div>
                                <p className="mt-4 text-sm opacity-70">Estimated monthly payment for {term} months.</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-emerald-50">
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground uppercase tracking-widest">Loan Breakdown</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between py-2 border-b"><span>Amount Financed</span><span className="font-bold">${results.totalPrincipal.toLocaleString()}</span></div>
                                <div className="flex justify-between py-2 border-b"><span>Total Interest</span><span className="font-bold text-amber-600">${Math.round(results.totalInterest).toLocaleString()}</span></div>
                                <div className="flex justify-between py-2"><span>Total Cost of Car</span><span className="font-bold">${Math.round(results.totalCost).toLocaleString()}</span></div>
                            </CardContent>
                        </Card>

                        <div className="flex gap-4 mt-8">
                            <ShareButton
                                className="flex-1"
                                title="My Car Loan Payment on SmartSaverCalc"
                                results={results}
                                calculatorName="Car Loan Calculator"
                                primaryValue={`$${Math.round(results.monthlyPayment).toLocaleString()}/mo`}
                                text={`🏎️ Just used SmartSaverCalc to plan my car loan! My estimated monthly payment is $${Math.round(results.monthlyPayment).toLocaleString()}. Check it out:`}
                            />
                            <Button size="lg" variant="outline" className="flex-1 rounded-full h-14 font-bold">
                                View Full Table
                            </Button>
                        </div>
                    </div>
                </div>

                {/* SEO Content Section */}
                <div className="mt-24 pt-12 border-t space-y-16">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">Car Financing Tips for 2026</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            Buying a car in 2026 requires understanding how interest rates and loan terms affect your total cost. With the average car loan term extending to 72 months, staying informed about your monthly obligations is critical for your financial health.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="p-8 bg-emerald-50 rounded-3xl space-y-3">
                                <h3 className="font-bold text-xl text-emerald-700">The 20/4/10 Rule</h3>
                                <p className="text-sm text-emerald-800/80 leading-relaxed">
                                    Aim for a **20% down payment**, a loan term of no more than **4 years**, and keep your total car expenses under **10% of your gross income**.
                                </p>
                            </div>
                            <div className="p-8 bg-amber-50 rounded-3xl space-y-3">
                                <h3 className="font-bold text-xl text-amber-700">Watch the Interest</h3>
                                <p className="text-sm text-amber-800/80 leading-relaxed">
                                    A 1% difference in interest rates can save you thousands over the life of the loan. Always check with credit unions for the best rates in 2026.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8 pb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-center">Auto Loan FAQ</h2>
                        <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-lg">
                                    How does a trade-in affect my loan?
                                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    A trade-in acts exactly like a down payment. It reduces the total amount you need to borrow, which lowers both your monthly payment and the total interest you'll pay over time.
                                </p>
                            </details>
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-lg">
                                    Is a 72-month loan a good idea?
                                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    While it lowers monthly payments, a longer term means you pay significantly more in total interest. It also increases the risk of being "underwater"—owing more than the car is worth.
                                </p>
                            </details>
                        </div>
                    </section>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
