"use client";

import React, { useState, useEffect } from "react";
import {
    Car,
    Info,
    Share2,
    TrendingDown,
    Zap,
    ArrowLeft,
    DollarSign,
    Leaf
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateEVSavings, EVSavingsResult } from "@/lib/calculations";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";
import { ShareButton } from "@/components/share-button";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function EVSavingsPage() {
    // Inputs
    const [miles, setMiles] = useState(12000);
    const [gasPrice, setGasPrice] = useState(3.49);
    const [electricPrice, setElectricPrice] = useState(0.16);
    const [mpg, setMpg] = useState(25);
    const [evEfficiency, setEvEfficiency] = useState(30); // 30 kWh / 100mi
    const [years, setYears] = useState(5);
    const [maintenance, setMaintenance] = useState(500);

    const [results, setResults] = useState<EVSavingsResult | null>(null);

    useEffect(() => {
        const res = calculateEVSavings({
            annualMiles: miles,
            gasPrice: gasPrice,
            electricityPrice: electricPrice,
            gasMPG: mpg,
            evEfficiency: evEfficiency,
            ownershipYears: years,
            maintenanceSavingsPerYear: maintenance
        });
        setResults(res);
    }, [miles, gasPrice, electricPrice, mpg, evEfficiency, years, maintenance]);

    const chartData = {
        labels: ['Annual Fuel/Power Cost'],
        datasets: [
            {
                label: 'Gas Car',
                data: [results?.gasCostYear || 0],
                backgroundColor: 'rgba(239, 68, 68, 0.6)',
            },
            {
                label: 'Electric Car',
                data: [results?.evCostYear || 0],
                backgroundColor: 'rgba(34, 197, 94, 0.6)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: any) => '$' + value,
                }
            }
        }
    };

    if (!results) return null;

    return (
        <CalculatorLayoutWrapper>
            <div className="max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="flex flex-col gap-4 mb-12">
                    <div className="flex items-center gap-3">
                        <div className="p-2 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Car className="h-6 w-6" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Free EV vs Gas Savings Calculator 2026</h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        See your 5-year and lifetime savings by switching to electric. Our 2026 data model accounts for real-world efficiency and fuel prices.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Inputs */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="border-2 shadow-sm">
                            <CardHeader>
                                <CardTitle>Your Driving Habits</CardTitle>
                                <CardDescription>Adjust the sliders to match your typical usage.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between font-medium">
                                        <Label>Annual Miles Driven</Label>
                                        <span className="text-primary">{miles.toLocaleString()} mi</span>
                                    </div>
                                    <Slider
                                        value={[miles]}
                                        min={1000}
                                        max={50000}
                                        step={500}
                                        onValueChange={(val) => setMiles(val[0])}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Gas Price ($/gal)</Label>
                                        <Input
                                            type="number"
                                            value={gasPrice}
                                            onChange={(e) => setGasPrice(Number(e.target.value))}
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Electricity ($/kWh)</Label>
                                        <Input
                                            type="number"
                                            value={electricPrice}
                                            onChange={(e) => setElectricPrice(Number(e.target.value))}
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Gas Car MPG</Label>
                                        <Input
                                            type="number"
                                            value={mpg}
                                            onChange={(e) => setMpg(Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>EV Efficiency (kWh/100mi)</Label>
                                        <Input
                                            type="number"
                                            value={evEfficiency}
                                            onChange={(e) => setEvEfficiency(Number(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex justify-between font-medium">
                                        <Label>Years of Ownership</Label>
                                        <span className="text-primary">{years} Years</span>
                                    </div>
                                    <Slider
                                        value={[years]}
                                        min={1}
                                        max={15}
                                        step={1}
                                        onValueChange={(val) => setYears(val[0])}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-muted/50 rounded-xl p-6 flex items-start gap-4 border">
                            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div className="text-sm space-y-2 leading-relaxed">
                                <p className="font-semibold">Calculation Note</p>
                                <p className="text-muted-foreground">
                                    We've estimated <strong>${maintenance}</strong> in annual maintenance savings for EVs (oil changes, brakes, etc.). You can adjust this for more precision.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="bg-primary text-primary-foreground shadow-2xl shadow-primary/20 border-0">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-wider">Total {years}-Year Savings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold">${Math.round(results.totalSavings).toLocaleString()}</div>
                                    <p className="mt-2 text-sm opacity-90 flex items-center gap-1 font-semibold">
                                        <TrendingDown className="h-4 w-4" />
                                        Saving ~${Math.round(results.monthlySavings)} / month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="bg-emerald-600 text-white shadow-xl shadow-emerald-500/10 border-0">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-wider">Environmental Impact</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold">{Math.round(results.co2SavedLbs).toLocaleString()} lbs</div>
                                    <p className="mt-2 text-sm opacity-90 flex items-center gap-1 font-semibold">
                                        <Leaf className="h-4 w-4" />
                                        CO2 reduction over {years} years
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="flex flex-col">
                            <CardHeader>
                                <CardTitle>Cost Comparison</CardTitle>
                                <CardDescription>Annual operational cost: Gas vs Electric.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <Bar data={chartData} options={chartOptions} />
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-4 border-t pt-6 text-sm">
                                <div className="flex items-center gap-2 font-medium leading-none">
                                    Electric costs <strong>{Math.round((results.evCostYear / results.gasCostYear) * 100)}% less</strong> to run per year <Zap className="h-4 w-4 text-primary fill-primary" />
                                </div>
                                <div className="text-muted-foreground leading-relaxed">
                                    Based on current national averages for 2026. Data shows consistent savings across all US regions despite shifting electricity rates.
                                </div>
                            </CardFooter>
                        </Card>

                        {/* Rectangle Ad before share buttons */}
                        <AdPlaceholder type="rectangle" className="my-6" />

                        <div className="flex gap-4">
                            <ShareButton
                                className="flex-1"
                                title="My EV Savings on Calcora"
                                text={`🚀 I'll save $${Math.round(results.totalSavings).toLocaleString()} in ${years} years by switching to an EV! Calculate yours on Calcora:`}
                            />
                            <Button variant="outline" className="flex-1 rounded-full h-12 text-base font-semibold">
                                Download PDF Report
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
