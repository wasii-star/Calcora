"use client";

import React, { useState, useEffect } from "react";
import { Calculator, DollarSign, Users, ArrowLeft, Zap, Share2, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateTip } from "@/lib/calculations";
import { ShareButton } from "@/components/share-button";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";
import { SeoSchema } from "@/components/seo-schema";

export default function TipClient() {
    const [bill, setBill] = useState(50);
    const [tip, setTip] = useState(15);
    const [people, setPeople] = useState(1);

    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        setResults(calculateTip(bill, tip, people));
    }, [bill, tip, people]);

    if (!results) return null;

    return (
        <CalculatorLayoutWrapper>
            <SeoSchema
                name="Free Tip Calculator & Bill Splitter 2026"
                description="Easily calculate tips and split bills with friends. Professional tip suggestions, custom percentages, and per-person breakdowns for 2026 dining."
                url="https://smartsavercalc.com/tip-calculator"
            />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-amber-600 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="flex items-center gap-3 mb-10 text-amber-600">
                    <div className="p-2 bg-amber-50 rounded-lg">
                        <Calculator className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Free Tip Calculator & Bill Splitter 2026</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-2">
                        <CardHeader><CardTitle>The Bill Details</CardTitle></CardHeader>
                        <CardContent className="space-y-8">
                            <div className="space-y-3">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Bill Amount ($)</Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">$</div>
                                    <Input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))} className="text-3xl font-extrabold h-16 pl-10 border-2" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tip Percentage (%)</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[10, 15, 18, 20].map((p) => (
                                        <Button key={p} variant={tip === p ? 'default' : 'outline'} onClick={() => setTip(p)} className="rounded-2xl h-12 font-bold text-lg border-2 shadow-sm transition-all hover:scale-105">{p}%</Button>
                                    ))}
                                </div>
                                <div className="relative mt-2">
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">%</div>
                                    <Input type="number" value={tip} onChange={(e) => setTip(Number(e.target.value))} className="h-12 border-2 pr-10" placeholder="Enter custom tip" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Split Between People</Label>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center border-2">
                                        <Users className="text-muted-foreground h-6 w-6" />
                                    </div>
                                    <Input type="number" value={people} onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))} className="h-12 text-xl font-bold border-2" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="bg-amber-500 text-white shadow-xl shadow-amber-500/20 text-center py-10 border-0 flex flex-col items-center">
                            <CardContent className="space-y-4">
                                <p className="text-sm opacity-90 uppercase tracking-[0.2em] font-black">Total Per Person</p>
                                <div className="text-7xl font-black">${results.perPerson.toFixed(2)}</div>
                                <div className="h-px w-24 bg-white/20 mx-auto my-4" />
                                <p className="text-sm opacity-80 font-medium">Total Check: ${results.totalAmount.toFixed(2)}</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-amber-100 bg-amber-50/30">
                            <CardHeader className="pb-2"><CardTitle className="text-xs font-black text-amber-700 uppercase text-center tracking-widest">Calculated Tip Amount</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-4xl font-extrabold text-center text-amber-600">${results.tipAmount.toFixed(2)}</div>
                                <p className="text-[10px] text-center text-amber-800/60 uppercase font-bold mt-2 tracking-tighter">Total Added Gratuity</p>
                            </CardContent>
                        </Card>

                        <div className="pt-4 flex justify-center">
                            <ShareButton
                                className="w-full h-14 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
                                title="Split the bill with SmartSaverCalc"
                                results={results}
                                calculatorName="Tip Calculator"
                                primaryValue={`$${results.perPerson.toFixed(2)} ea`}
                                text={`💸 Total per person: $${results.perPerson.toFixed(2)}. Calculated instantly with SmartSaverCalc:`}
                            />
                        </div>
                    </div>
                </div>

                {/* SEO Content Section */}
                <div className="mt-24 pt-12 border-t space-y-16">
                    <section className="space-y-6 text-center">
                        <h2 className="text-3xl font-bold tracking-tight">Etiquette: How much should you tip in 2026?</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
                            Tipping standards have evolved. While the base gratuity remains around 15%, many service professionals in 2026 appreciate 18-20% for excellent service. Use this tool to ensure you're always fair and accurate.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="p-6 bg-gray-50 rounded-2xl border-2">
                                <h3 className="font-bold text-gray-700">15% Standard</h3>
                                <p className="text-xs mt-2 text-muted-foreground">Good for casual dining and standard service.</p>
                            </div>
                            <div className="p-6 bg-amber-50 rounded-2xl border-2 border-amber-100">
                                <h3 className="font-bold text-amber-700 underline decoration-amber-200">18% Professional</h3>
                                <p className="text-xs mt-2 text-amber-800/80">The current 2026 benchmark for quality sit-down service.</p>
                            </div>
                            <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-100">
                                <h3 className="font-bold text-emerald-700 text-lg">20%+ Exceptional</h3>
                                <p className="text-xs mt-2 text-emerald-800/80">Recognizing above-and-beyond care and hospitality.</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8 pb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-center">Dining Math FAQ</h2>
                        <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-lg">
                                    Should I tip on tax?
                                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    Standard etiquette suggests tipping on the pre-tax subtotal. However, many modern POS systems calculate the percentage based on the final total. This tool allows you to input either amount and adjust the percentage as you see fit.
                                </p>
                            </details>
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-lg">
                                    How do I split a bill fairly?
                                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    The easiest way is an even split. Simply enter the final bill, add your desired tip, and enter the number of people. Our "Total Per Person" display handles the rounding for you.
                                </p>
                            </details>
                        </div>
                    </section>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
