"use client";

import React, { useState, useEffect } from "react";
import { Activity, Info, Share2, ArrowLeft, User, Ruler, Weight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateBMI } from "@/lib/calculations";
import { ShareButton } from "@/components/share-button";
import { CalculatorLayoutWrapper } from "@/components/calculator-layout-wrapper";
import { SeoSchema } from "@/components/seo-schema";

export default function BMIClient() {
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
            <SeoSchema
                name="Free BMI & Daily Calorie Calculator 2026"
                description="Determine your healthy weight and daily calorie target. Includes BMI classification, TDEE calculation, and health guides for 2026."
                url="https://smartsavercalc.com/bmi-calories"
            />
            <div className="container mx-auto px-4 py-12 max-w-5xl">
                <Link href="/" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-muted-foreground hover:text-pink-600 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                <div className="flex items-center gap-3 mb-10 text-pink-600">
                    <div className="p-2 bg-pink-50 rounded-lg">
                        <Activity className="h-8 w-8" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Free BMI & Daily Calorie Calculator 2026</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="border-2">
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
                                    <select className="w-full p-2 border rounded-md shadow-sm bg-background" value={activity} onChange={(e) => setActivity(Number(e.target.value))}>
                                        <option value={1.2}>Sedentary (Little to no exercise)</option>
                                        <option value={1.375}>Light Active (1-3 days/week)</option>
                                        <option value={1.55}>Moderately Active (3-5 days/week)</option>
                                        <option value={1.725}>Very Active (6-7 days/week)</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-7 space-y-6">
                        <Card className="bg-pink-600 text-white shadow-xl shadow-pink-500/20 border-0">
                            <CardHeader className="pb-2"><CardTitle className="text-sm opacity-80 uppercase tracking-wider">Body Mass Index (BMI)</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-6xl font-bold">{results.bmi}</div>
                                <div className="mt-4 px-4 py-1.5 bg-white/20 rounded-full w-fit text-sm font-bold uppercase tracking-widest border border-white/20">
                                    {results.bmi < 18.5 ? 'Underweight' : results.bmi < 25 ? 'Normal weight' : results.bmi < 30 ? 'Overweight' : 'Obese'}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-pink-100">
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground uppercase tracking-widest">Maintenance Calories (TDEE)</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold text-pink-600">{results.tdee.toLocaleString()} <span className="text-lg font-normal text-muted-foreground">kcal / day</span></div>
                                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                                    TDEE (Total Daily Energy Expenditure) is the average number of calories you burn per day. Consumption below this number results in weight loss.
                                </p>
                            </CardContent>
                            <CardFooter className="bg-pink-50/50 flex gap-4 py-4 text-xs font-semibold uppercase tracking-tight text-pink-700">
                                <span>Weight Loss: {Math.round(results.tdee - 500)} kcal</span>
                                <span>Weight Gain: {Math.round(results.tdee + 500)} kcal</span>
                            </CardFooter>
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

                {/* SEO Content Section */}
                <div className="mt-24 pt-12 border-t space-y-16">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">How to Interpret Your BMI in 2026</h2>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            The **Body Mass Index (BMI)** is a simplified ratio of your weight and height used to categorize health status. While it doesn't measure body fat percentage directly, it remains a standard screening tool in 2026 for assessing potential health risks associated with weight.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="p-8 bg-pink-50 rounded-3xl space-y-3">
                                <h3 className="font-bold text-xl text-pink-700">Healthy Range (18.5 - 24.9)</h3>
                                <p className="text-sm text-pink-800/80 leading-relaxed">
                                    Falling within this range suggests you have a healthy weight relative to your height, which minimizes risks for chronic diseases like Type 2 diabetes and hypertension.
                                </p>
                            </div>
                            <div className="p-8 bg-blue-50 rounded-3xl space-y-3">
                                <h3 className="font-bold text-xl text-blue-700">Beyond BMI: Body Comp</h3>
                                <p className="text-sm text-blue-800/80 leading-relaxed">
                                    Remember that BMI can be misleading for athletes with high muscle mass. Always combine these results with measurements like waist circumference for a better health picture.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8 pb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-center">Health & Weight FAQ</h2>
                        <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-lg">
                                    What is the "500 Calorie Rule" for weight loss?
                                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    To lose roughly 1 pound (0.5kg) per week, the general recommendation is to eat 500 calories less than your TDEE daily. This creates a sustainable weekly deficit of 3,500 calories.
                                </p>
                            </details>
                            <details className="group border-2 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                                <summary className="flex items-center justify-between font-bold text-lg">
                                    How often should I recalculate my BMI?
                                    <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    You should recalculate whenever your body weight changes by more than 5 lbs (2kg). As you lose weight, your TDEE also drops, meaning you may need a new calorie target to continue progress.
                                </p>
                            </details>
                        </div>
                    </section>
                </div>
            </div>
        </CalculatorLayoutWrapper>
    );
}
