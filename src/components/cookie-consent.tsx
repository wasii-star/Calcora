"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("calcora-cookie-consent");
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("calcora-cookie-consent", "accepted");
        setVisible(false);

        // Grant analytics consent if gtag is available
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag("consent", "update", {
                analytics_storage: "granted",
            });
        }
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in slide-in-from-bottom-4 duration-500">
            <div className="container mx-auto max-w-3xl">
                <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border bg-background/95 backdrop-blur-xl shadow-2xl px-6 py-4">
                    <div className="flex items-center gap-3 flex-1">
                        <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                        <p className="text-sm text-muted-foreground">
                            We use cookies and ads to keep Calcora free. Your calculator data never leaves your browser.
                        </p>
                    </div>
                    <Button
                        onClick={acceptCookies}
                        size="sm"
                        className="rounded-full px-6 shadow-lg shadow-primary/20 whitespace-nowrap"
                    >
                        Accept
                    </Button>
                </div>
            </div>
        </div>
    );
}
