export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-3xl space-y-10">
            <h1 className="text-4xl font-bold">Terms of Service</h1>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Use of Tools</h2>
                <p className="text-muted-foreground">
                    Calcora's tools are provided for informational and estimation purposes only. They do not constitute financial, legal, or professional advice. Always consult with a certified professional before making significant life or financial decisions.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Accurate Data</h2>
                <p className="text-muted-foreground">
                    While we strive for 100% accuracy, Calcora is not liable for errors in calculations or data provided by the user.
                </p>
            </section>
        </div>
    );
}
