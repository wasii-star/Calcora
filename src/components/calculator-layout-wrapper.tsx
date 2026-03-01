"use client";

import React from "react";

interface CalculatorLayoutWrapperProps {
    children: React.ReactNode;
}

export function CalculatorLayoutWrapper({ children }: CalculatorLayoutWrapperProps) {
    return (
        <div className="container mx-auto px-4 sm:px-8 py-8 max-w-7xl">
            {/* Main content area */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Calculator content */}
                <div className="flex-1 min-w-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
