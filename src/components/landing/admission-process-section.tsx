import content from '@/lib/content.json';

const { admissionSteps } = content;

export default function AdmissionProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">The 4-Step Admission Journey</h2>
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-border -translate-y-1/2" aria-hidden="true"></div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12">
            {admissionSteps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-background border-2 border-primary text-primary mx-auto mb-4 text-2xl font-bold shadow-md">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 font-headline">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
