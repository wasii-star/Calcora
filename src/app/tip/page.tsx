"use client";

import React, { useState, useEffect } from "react";
import { Calculator, DollarSign, Users, ArrowLeft, Zap, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateTip } from "@/lib/calculations";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";

export default function TipPage() {
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
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Dashboard</Link>

                <div className="flex items-center gap-3 mb-10 text-amber-600">
                    <Calculator className="h-8 w-8" />
                    <h1 className="text-4xl font-bold tracking-tight">Tip & Bill Splitter</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader><CardTitle>The Bill</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Total Bill Amount ($)</Label>
                                <Input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))} className="text-xl font-bold" />
                            </div>
                            <div className="space-y-2">
                                <Label>Tip Percentage (%)</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[10, 15, 18, 20].map((p) => (
                                        <Button key={p} variant={tip === p ? 'default' : 'outline'} onClick={() => setTip(p)} className="rounded-xl">{p}%</Button>
                                    ))}
                                </div>
                                <Input type="number" value={tip} onChange={(e) => setTip(Number(e.target.value))} className="mt-2" placeholder="Custom Tip" />
                            </div>
                            <div className="space-y-2">
                                <Label>Split Between People</Label>
                                <div className="flex items-center gap-4">
                                    <Users className="text-muted-foreground h-5 w-5" />
                                    <Input type="number" value={people} onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="bg-amber-500 text-white shadow-xl shadow-amber-500/20 text-center py-8">
                            <CardContent className="space-y-2">
                                <p className="text-sm opacity-80 uppercase tracking-widest font-bold">Total Per Person</p>
                                <div className="text-6xl font-bold">${results.perPerson.toFixed(2)}</div>
                                <p className="text-xs opacity-70">Total Check: ${results.totalAmount.toFixed(2)}</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-amber-100">
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground uppercase text-center tracking-widest">Tip Amount</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-center text-amber-600">${results.tipAmount.toFixed(2)}</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <AdPlaceholder type="rectangle" className="mt-12" />

                {/* Sharing mockup footer */}
                <div className="mt-20 text-center space-y-4">
                    <Button variant="ghost" className="rounded-full gap-2 text-muted-foreground">
                        <Share2 className="h-4 w-4" /> Share with group
                    </Button>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
