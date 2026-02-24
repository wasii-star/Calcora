import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Calculator } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Calcora | Smart Life Calculators for 2026",
  description: "Modern, fast, and private calculators for EV savings, mortgages, retirement, health, and more. 100% free and mobile-ready.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Calcora",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
              <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <Calculator className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Calcora
                </span>
              </Link>
              <div className="flex items-center gap-4">
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                  <Link href="/#calculators" className="text-muted-foreground transition-colors hover:text-primary">
                    Calculators
                  </Link>
                  <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">
                    About
                  </Link>
                </nav>
                <div className="h-4 w-px bg-border hidden md:block" />
                <ModeToggle />
              </div>
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t bg-muted/30">
            <div className="container mx-auto py-12 px-4 sm:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4 col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    <span className="font-bold text-lg">Calcora</span>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                    Calcora helps you make smarter life and money decisions in seconds. Our professional-grade tools are accurate, free, and built for your privacy.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Tools</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/ev-savings" className="hover:text-primary transition-colors">EV Savings</Link></li>
                    <li><Link href="/mortgage-affordability" className="hover:text-primary transition-colors">Mortgage</Link></li>
                    <li><Link href="/solar-roi" className="hover:text-primary transition-colors">Solar ROI</Link></li>
                    <li><Link href="/fire" className="hover:text-primary transition-colors">Retirement</Link></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">Legal</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                <p>&copy; 2026 Calcora. All rights reserved.</p>
                <p>Designed for Vercel • US Market Priority</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
