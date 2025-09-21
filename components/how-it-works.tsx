import { Card, CardContent } from "@/components/ui/card"
import { Mic, Sparkles, Store, Share2 } from "lucide-react"

const steps = [
  {
    icon: Mic,
    title: "Record Your Story",
    description:
      "Simply speak about your craft in your preferred language. Describe your products, materials, and techniques.",
    step: "01",
  },
  {
    icon: Sparkles,
    title: "AI Creates Content",
    description:
      "Our AI generates professional product descriptions, social media captions, and marketing content in seconds.",
    step: "02",
  },
  {
    icon: Store,
    title: "Build Your Store",
    description: "Get a beautiful, mobile-optimized digital store with payment integration and inventory management.",
    step: "03",
  },
  {
    icon: Share2,
    title: "Share & Sell",
    description:
      "Use QR codes, social media, and WhatsApp to share your products and stories with customers worldwide.",
    step: "04",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 bg-[url('/images/textile-texture.jpg')] bg-cover bg-center relative"
    >
      <div className="absolute inset-0 bg-background/90"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">
            From Voice to <span className="text-primary">Digital Success</span> in 4 Simple Steps
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            No technical skills required. Just your voice, your craft, and your passion.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 sm:p-8 text-center space-y-4">
                  <div className="relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
