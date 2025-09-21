import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Store, QrCode, TrendingUp, Globe, Smartphone } from "lucide-react"

const features = [
  {
    icon: Mic,
    title: "Voice-to-Content AI",
    description:
      "Speak in your language and get professional product descriptions, social media captions, and marketing content instantly.",
  },
  {
    icon: Store,
    title: "Digital Dukan Generator",
    description: "Create beautiful, mobile-optimized online stores in minutes with integrated payment solutions.",
  },
  {
    icon: QrCode,
    title: "StoryTag QR Codes",
    description: "Generate QR codes that tell your craft story - perfect for physical products and exhibitions.",
  },
  {
    icon: TrendingUp,
    title: "Seasonal Trend Insights",
    description: "Get AI-powered suggestions on what to create based on upcoming festivals and market trends.",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Work in Hindi, English, or your regional language. AI translates and adapts content automatically.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Everything works perfectly on your smartphone - no computer needed to run your digital business.",
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 bg-[url('/images/floral-pattern.png')] bg-cover bg-center relative"
    >
      <div className="absolute inset-0 bg-background/85"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">
            Everything You Need to <span className="text-primary">Succeed Online</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            From voice recordings to professional stores, Riwaayat provides all the tools to transform your traditional
            craft into a modern digital business.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
