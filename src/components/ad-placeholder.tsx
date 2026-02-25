"use client";

import React from "react";

interface AdPlaceholderProps {
    type: "leaderboard" | "rectangle" | "skyscraper";
    className?: string;
}

export function AdPlaceholder({ type, className = "" }: AdPlaceholderProps) {
    const config = {
        leaderboard: {
            size: "728×90",
            desktop: "min-h-[90px] w-full max-w-[728px]",
            label: "Leaderboard Ad",
        },
        rectangle: {
            size: "300×250",
            desktop: "min-h-[250px] w-full max-w-[300px]",
            label: "Rectangle Ad",
        },
        skyscraper: {
            size: "160×600",
            desktop: "min-h-[600px] w-full max-w-[160px]",
            label: "Skyscraper Ad",
        },
    };

    const { size, desktop, label } = config[type];

    return (
        <div className={`mx-auto ${className}`}>
            {/* ADSENSE PLACEHOLDER - PASTE CODE HERE */}
            <div
                className={`flex items-center justify-center rounded-xl border border-dashed border-border/50 bg-muted/20 p-4 text-[10px] text-muted-foreground/60 uppercase tracking-[0.15em] font-medium select-none ${desktop}`}
                role="complementary"
                aria-label="Advertisement"
            >
                <span className="text-center leading-relaxed">
                    {label}<br />
                    <span className="text-[9px] opacity-60">{size}</span>
                </span>
            </div>
        </div>
    );
}
