"use client";

export default function IndustriesProcess() {
  const steps = [
    "Understanding your industry needs",
    "Custom design & creative planning",
    "Premium material printing",
    "Professional installation & delivery",
  ];

  return (
    <section className="py-24 bg-background text-foreground border-t border-border">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Our Industry Approach
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-card p-8 rounded-2xl border border-border 
              shadow-sm hover:shadow-md transition"
            >
              <div className="text-primary font-bold text-2xl mb-4">
                {i + 1}
              </div>

              <p className="text-muted-foreground">
                {step}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
