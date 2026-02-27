export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold tracking-tight">About SmartSaverCalc</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    The world's most beautiful and trustworthy calculation suite, built for 2026.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Our Mission</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Math shouldn't be ugly or complicated. We built SmartSaverCalc to provide users in the US and beyond with professional-grade tools for life's biggest decisions—without the clutter of traditional calculator sites.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Privacy First</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Unlike other platforms, SmartSaverCalc processes all calculations locally in your browser. We don't store your personal financial data, ensuring 100% privacy for your mortgage, retirement, or debt plans.
                    </p>
                </div>
            </div>

            <div className="bg-muted/50 p-10 rounded-3xl border text-center space-y-6">
                <h2 className="text-3xl font-bold">Free Forever</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    We believe high-quality tools should be accessible to everyone. SmartSaverCalc is supported by non-intrusive advertisements, allowing us to keep our suite 100% free for all users.
                </p>
            </div>
        </div>
    );
}
