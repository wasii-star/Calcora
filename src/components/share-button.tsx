"use client";

import React from "react";
import { Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ShareButtonProps {
    title: string;
    text: string;
    url?: string;
    className?: string;
}

export function ShareButton({ title, text, url, className = "" }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: shareUrl,
                });
            } catch (err) {
                console.error("Error sharing:", err);
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
    };

    return (
        <Button
            onClick={handleShare}
            className={`rounded-full gap-3 shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105 h-14 px-8 text-lg font-bold ${className}`}
        >
            {copied ? <Check className="h-6 w-6 animate-in zoom-in" /> : <Share2 className="h-6 w-6" />}
            {copied ? "Savings Copied!" : "Share My Savings"}
        </Button>
    );
}
