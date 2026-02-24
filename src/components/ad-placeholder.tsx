"use client";

import React from "react";

interface AdPlaceholderProps {
    type: "billboard" | "sidebar" | "content";
    className?: string;
}

export function AdPlaceholder({ type, className = "" }: AdPlaceholderProps) {
    const dimensions = {
        billboard: "min-h-[90px] w-full max-w-[728px]",
        sidebar: "min-h-[250px] w-full max-w-[300px]",
        content: "min-h-[250px] w-full max-w-[336px]",
    };

    const labels = {
        billboard: "728x90 Billboard Placeholder",
        sidebar: "300x250 Sidebar Placeholder",
        content: "336x280 In-Content Placeholder",
    };

    return (
        <div className={`mx-auto flex items-center justify-center bg-muted/30 border border-dashed rounded-lg p-4 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold ${dimensions[type]} ${className}`}>
            {/* 
          GOOGLE ADSENSE INTEGRATION:
          Replace this entire div with your AdSense auto-ads or unit code.
          Example:
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
      */}
            {labels[type]}
        </div>
    );
}
