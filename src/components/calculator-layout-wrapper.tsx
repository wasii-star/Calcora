"use client";

import React from "react";
import { AdPlaceholder } from "@/components/ad-placeholder";

interface CalculatorLayoutWrapperProps {
    children: React.ReactNode;
}

export function CalculatorLayoutWrapper({ children }: CalculatorLayoutWrapperProps) {
    return (
        <div className="container mx-auto px-4 sm:px-8 py-8 max-w-7xl">
            {/* Leaderboard Ad at top of every calculator page */}
            <div className="mb-8">
                <AdPlaceholder type="leaderboard" />
            </div>

            {/* Main content area with sidebar */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Calculator content */}
                <div className="flex-1 min-w-0">
                    {children}
                </div>

                {/* Skyscraper Sidebar — desktop only */}
                <aside className="hidden lg:flex flex-col gap-8 w-[200px] shrink-0 items-center pt-4">
                    <AdPlaceholder type="skyscraper" />
                </aside>
            </div>
        </div>
    );
}
