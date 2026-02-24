"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, Plus, Trash2, ArrowLeft, Zap, DollarSign } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateDebtPayoff } from "@/lib/calculations";
import { AdPlaceholder } from "@/components/ad-placeholder";

export default function DebtSnowballPage() {
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
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Dashboard</Link>

            <div className="flex items-center gap-3 mb-10 text-rose-600">
                <BarChart3 className="h-8 w-8" />
                <h1 className="text-4xl font-bold tracking-tight">Debt Snowball Payoff</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-rose-600 text-white">
                    <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase">Time to Debt Free</CardTitle></CardHeader>
                    <CardContent><div className="text-6xl font-bold">{results.months} <span className="text-2xl opacity-70 cursor-default">Months</span></div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground uppercase tracking-widest">Snowball Extra Payment</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-4 items-center">
                            <DollarSign className="text-rose-600" />
                            <Input type="number" value={extra} onChange={(e) => setExtra(Number(e.target.value))} className="text-2xl font-bold h-12" />
                        </div>
                        <p className="text-xs text-muted-foreground">Every dollar extra cuts significant time and interest.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Your Debts</h2>
                    <Button onClick={addDebt} variant="outline" size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add Debt</Button>
                </div>
                {debts.map((debt, i) => (
                    <Card key={i} className="hover:border-rose-200 transition-colors">
                        <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                            <div className="space-y-1"><Label>Debt Name</Label><Input value={debt.name} onChange={(e) => {
                                const newDebts = [...debts];
                                newDebts[i].name = e.target.value;
                                setDebts(newDebts);
                            }} /></div>
                            <div className="space-y-1"><Label>Balance ($)</Label><Input type="number" value={debt.balance} onChange={(e) => {
                                const newDebts = [...debts];
                                newDebts[i].balance = Number(e.target.value);
                                setDebts(newDebts);
                            }} /></div>
                            <div className="space-y-1"><Label>Min Payment ($)</Label><Input type="number" value={debt.minPayment} onChange={(e) => {
                                const newDebts = [...debts];
                                newDebts[i].minPayment = Number(e.target.value);
                                setDebts(newDebts);
                            }} /></div>
                            <Button variant="ghost" size="icon" onClick={() => removeDebt(i)} className="text-muted-foreground hover:text-rose-600 ml-auto"><Trash2 className="h-4 w-4" /></Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <AdPlaceholder type="billboard" className="mt-20" />
        </div>
    );
}
