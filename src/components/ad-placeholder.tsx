"use client";

import React, { useEffect, useRef } from "react";

interface AdPlaceholderProps {
    type: "leaderboard" | "rectangle" | "skyscraper";
    className?: string;
}

export function AdPlaceholder({ type, className = "" }: AdPlaceholderProps) {
    const adRef = useRef<HTMLDivElement>(null);
    const pushed = useRef(false);

    const config = {
        leaderboard: {
            style: { display: "inline-block", width: "728px", height: "90px" } as React.CSSProperties,
            wrapper: "min-h-[90px] w-full max-w-[728px]",
        },
        rectangle: {
            style: { display: "inline-block", width: "300px", height: "250px" } as React.CSSProperties,
            wrapper: "min-h-[250px] w-full max-w-[300px]",
        },
        skyscraper: {
            style: { display: "inline-block", width: "160px", height: "600px" } as React.CSSProperties,
            wrapper: "min-h-[600px] w-full max-w-[160px]",
        },
    };

    const { style, wrapper } = config[type];

    useEffect(() => {
        if (pushed.current) return;
        try {
            if (typeof window !== "undefined" && (window as any).adsbygoogle) {
                (window as any).adsbygoogle.push({});
                pushed.current = true;
            }
        } catch (e) {
            console.error("AdSense push error:", e);
        }
    }, []);

    return (
        <div className={`mx-auto ${className}`}>
            <div
                ref={adRef}
                className={`flex items-center justify-center ${wrapper}`}
                role="complementary"
                aria-label="Advertisement"
            >
                {/* ADSENSE AD UNIT */}
                <ins
                    className="adsbygoogle"
                    style={style}
                    data-ad-client="ca-pub-4485720965165895"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        </div>
    );
}
