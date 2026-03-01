import {
  Car,
  Home as HomeIcon,
  Sun,
  Wallet,
  TrendingUp,
  BarChart3,
  Activity,
  Calculator,
  CheckCircle2,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InstallPrompt } from "@/components/install-prompt";

const calculators = [
  {
    title: "EV Savings",
    description: "Compare EV vs Gas costs and see your total 5-year savings.",
    icon: Car,
    href: "/ev-savings",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Mortgage",
    description: "Calculate affordability and monthly payments with interest.",
    icon: HomeIcon,
    href: "/mortgage-calculator",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Solar ROI",
    description: "See your payback years and 20-year energy savings.",
    icon: Sun,
    href: "/solar-roi",
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    title: "Car Loan",
    description: "Plan your auto financing with accurate monthly breakdowns.",
    icon: Wallet,
    href: "/car-loan",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "FIRE / Retirement",
    description: "Track your path to financial independence and retirement.",
    icon: TrendingUp,
    href: "/fire-retirement",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    title: "Debt Snowball",
    description: "Visualize your path to becoming debt-free faster.",
    icon: BarChart3,
    href: "/debt-snowball",
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    title: "BMI & Calories",
    description: "Calculate BMI and daily calorie needs for a healthy life.",
    icon: Activity,
    href: "/bmi-calories",
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  {
    title: "Tip & Percent",
    description: "Quickly calculate tips and percentages for everyday use.",
    icon: Calculator,
    href: "/tip-calculator",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-36 overflow-hidden bg-gradient-to-br from-[#0A2540] to-[#1E3A8A] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(79,70,229,0.15)_0%,transparent_100%)] opacity-30" />
        <div className="container mx-auto px-4 sm:px-8 text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-emerald-100">Live for 2026: Professional Accuracy Guaranteed</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-[1.05]">
            Free 2026 Calculators <br className="hidden md:block" /> That Save You Real Money
          </h1>
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-indigo-100/80 leading-relaxed font-light">
            Modern, fast, and 100% free professional-grade tools.
            Scale your financial future with zero tracking and total privacy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Button size="lg" className="h-16 px-10 text-lg rounded-full shadow-2xl shadow-emerald-500/30 bg-emerald-500 hover:bg-emerald-600 text-white border-0 transition-all hover:scale-105" asChild>
              <Link href="/ev-savings">Try EV Savings Now →</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-lg rounded-full border-white/20 hover:bg-white/10 text-white backdrop-blur transition-all" asChild>
              <Link href="#calculators">Explore All Tools</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section id="calculators" className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Financial & Life Tools</h2>
            <p className="text-muted-foreground">Select a calculator to get started with live data and charts.</p>
          </div>
          <div className="bg-muted px-4 py-2 rounded-lg text-sm font-medium border">
            8 Calculators Available
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {calculators.map((calc) => (
            <Link key={calc.title} href={calc.href} className="group">
              <Card className="h-full border-2 transition-all duration-300 hover:border-primary hover:shadow-[0_20px_50_rgba(79,70,229,0.15)] hover:scale-105 rounded-[2rem] overflow-hidden">
                <CardHeader className="space-y-6 p-8">
                  <div className={`p-4 w-fit rounded-2xl ${calc.color} transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-sm`}>
                    <calc.icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold tracking-tight">{calc.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-base leading-relaxed">
                      {calc.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="flex items-center text-sm font-bold text-primary uppercase tracking-widest">
                    Launch Tool
                    <Zap className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Why SmartSaverCalc Section */}
      <section className="bg-muted/50 py-24 border-y">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight">Why use SmartSaverCalc?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We built SmartSaverCalc to be the most beautiful and accurate toolset on the web.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-background border shadow-sm space-y-4 transition-all hover:shadow-lg">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Privacy First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your data stays in your browser. We don't track your calculations or sell your information. 100% private.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-background border shadow-sm space-y-4 transition-all hover:shadow-lg">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Verified Accuracy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our formulas are updated for 2026. We use the latest energy prices, tax credits, and market trends.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-background border shadow-sm space-y-4 transition-all hover:shadow-lg">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Blazing Fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built with Next.js 15 for instant loading. Get results as you type with zero delay or page reloads.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
