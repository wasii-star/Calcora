export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl space-y-10">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">Effective Date: February 2026</p>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Data Collection</h2>
                <p className="text-muted-foreground">
                    SmartSaverCalc does not collect, store, or transmit any personal financial information entered into our calculators. All calculations are performed on your local device.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Analytics & Advertising</h2>
                <p className="text-muted-foreground">
                    We use standard, non-personally identifiable monitoring tools (like Google Analytics and AdSense) to understand site traffic and support our free services. These partners may use cookies to serve ads based on your interests.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. Contact</h2>
                <p className="text-muted-foreground">
                    If you have questions about this policy, please contact us at privacy@smartsavercalc.com.
                </p>
            </section>
        </div>
    );
}
