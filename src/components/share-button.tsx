"use client";

import React, { useRef, useState } from "react";
import { Share2, Copy, Check, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
    title: string;
    text: string;
    url?: string;
    className?: string;
    results?: Record<string, any>;
    calculatorName?: string;
    primaryValue?: string;
}

export function ShareButton({ title, text, url, className = "", results, calculatorName, primaryValue }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    const generateImage = (): Promise<Blob | null> => {
        return new Promise((resolve) => {
            const canvas = document.createElement("canvas");
            canvas.width = 1200;
            canvas.height = 630;
            const ctx = canvas.getContext("2d");
            if (!ctx) return resolve(null);

            // Background
            const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
            gradient.addColorStop(0, "#0A2540");
            gradient.addColorStop(1, "#1E3A8A");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1200, 630);

            // Logo/Title
            ctx.fillStyle = "white";
            ctx.font = "bold 80px sans-serif";
            ctx.fillText("SmartSaverCalc", 80, 120);

            ctx.font = "40px sans-serif";
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
            ctx.fillText(calculatorName || "Smart Life Tool", 80, 180);

            // Divider
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(80, 240);
            ctx.lineTo(1120, 240);
            ctx.stroke();

            // Main Results
            ctx.fillStyle = "white";
            ctx.font = "bold 120px sans-serif";
            // Priority: primaryValue > results logic
            let displayResult = primaryValue || "";
            if (!displayResult && results) {
                if (results.savings) displayResult = `$${Math.round(results.savings).toLocaleString()}`;
                else if (results.monthlyPayment) displayResult = `$${Math.round(results.monthlyPayment).toLocaleString()}/mo`;
                else if (results.bmi) displayResult = `BMI: ${results.bmi}`;
            }

            ctx.fillText(displayResult, 80, 420);

            ctx.font = "40px sans-serif";
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.fillText(text.split("!")[0] + "!", 80, 500);

            // Footer
            ctx.font = "bold 30px sans-serif";
            ctx.fillStyle = "rgba(52, 211, 153, 1)"; // emerald-400
            ctx.fillText("Calculate yours at SmartSaverCalc.com", 80, 570);

            canvas.toBlob((blob) => resolve(blob), "image/png");
        });
    };

    const handleShare = async () => {
        setIsGenerating(true);
        const imageBlob = await generateImage();

        if (navigator.share && imageBlob) {
            try {
                const file = new File([imageBlob], "smartsavercalc-results.png", { type: "image/png" });
                await navigator.share({
                    title: title,
                    text: text,
                    url: shareUrl,
                    files: [file],
                });
            } catch (err) {
                console.error("Error sharing with file:", err);
                // Fallback to text only
                try {
                    await navigator.share({ title, text, url: shareUrl });
                } catch (innerErr) {
                    console.error("Text sharing failed:", innerErr);
                }
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(`${text}\n\nCheck it out here: ${shareUrl}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy:", err);
            }
        }
        setIsGenerating(false);
    };

    return (
        <Button
            onClick={handleShare}
            disabled={isGenerating}
            className={`rounded-full gap-3 shadow-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105 h-16 px-10 text-xl font-bold ${className}`}
        >
            {isGenerating ? (
                <Loader2 className="h-6 w-6 animate-spin" />
            ) : copied ? (
                <Check className="h-6 w-6 animate-in zoom-in" />
            ) : (
                <Share2 className="h-6 w-6" />
            )}
            {isGenerating ? "Creating Card..." : copied ? "Savings Copied!" : "Share My Savings"}
        </Button>
    );
}
