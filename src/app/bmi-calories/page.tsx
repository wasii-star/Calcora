"use client";

import React, { useState, useEffect } from "react";
import { Activity, Info, Share2, ArrowLeft, User, Ruler, Weight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateBMI } from "@/lib/calculations";
import { ShareButton } from "@/components/share-button";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";

export default function BMIPage() {
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(175);
    const [age, setAge] = useState(25);
    const [sex, setSex] = useState<'m' | 'f'>('m');
    const [activity, setActivity] = useState(1.375); // Light active

    const [results, setResults] = useState<any>(null);

    useEffect(() => {
        setResults(calculateBMI(weight, height, age, sex, activity));
    }, [weight, height, age, sex, activity]);

    if (!results) return null;

    return (
        <CalculatorLayoutWrapper>
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Dashboard</Link>

                <div className="flex items-center gap-3 mb-10 text-pink-600">
                    <Activity className="h-8 w-8" />
                    <h1 className="text-4xl font-bold tracking-tight">Free BMI & Daily Calorie Calculator 2026</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Your Profile</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label>Weight (kg)</Label><Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} /></div>
                                    <div className="space-y-2"><Label>Height (cm)</Label><Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label>Age</Label><Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} /></div>
                                    <div className="space-y-2">
                                        <Label>Sex</Label>
                                        <Tabs value={sex} onValueChange={(v: any) => setSex(v)}>
                                            <TabsList className="grid w-full grid-cols-2">
                                                <TabsTrigger value="m">Male</TabsTrigger>
                                                <TabsTrigger value="f">Female</TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Activity Level</Label>
                                    <select className="w-full p-2 border rounded-md shadow-sm" value={activity} onChange={(e) => setActivity(Number(e.target.value))}>
                                        <option value={1.2}>Sedentary (Little to no exercise)</option>
                                        <option value={1.375}>Light Active (1-3 days/week)</option>
                                        <option value={1.55}>Moderately Active (3-5 days/week)</option>
                                        <option value={1.725}>Very Active (6-7 days/week)</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-pink-600 text-white shadow-xl">
                            <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase tracking-wider">Body Mass Index</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-6xl font-bold">{results.bmi}</div>
                                <div className="mt-4 px-3 py-1 bg-white/20 rounded-full w-fit text-xs font-bold uppercase tracking-widest">
                                    {results.bmi < 18.5 ? 'Underweight' : results.bmi < 25 ? 'Normal' : results.bmi < 30 ? 'Overweight' : 'Obese'}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-pink-100">
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground uppercase tracking-widest">Daily Calorie Target (TDEE)</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold text-pink-600">{results.tdee.toLocaleString()} <span className="text-lg font-normal text-muted-foreground">kcal / day</span></div>
                                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">This is the average number of calories you burn per day. Eat this amount to maintain your current weight.</p>
                            </CardContent>
                        </Card>

                        <div className="flex gap-4 mt-8">
                            <ShareButton
                                className="flex-1"
                                title="My Health Profile on SmartSaverCalc"
                                results={results}
                                calculatorName="BMI & Calories"
                                primaryValue={`BMI: ${results.bmi}`}
                                text={`💪 My BMI is ${results.bmi} and my daily calorie target is ${results.tdee.toLocaleString()}! Calculate yours on SmartSaverCalc:`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
