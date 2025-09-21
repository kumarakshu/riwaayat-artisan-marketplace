import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const benefits = [
  "Free to Start, Pay Only When You Earn",
  "Complete Setup in Under 30 Minutes",
  "Works in Hindi, English, and Regional Languages",
  "Mobile-First Design for Smartphone Users",
  "Dedicated Support for Artisans",
]

export function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground bg-[url('/images/artisan-workshop.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-primary/85"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold text-balance">
                Ready to Transform Your Craft into Digital Success?
              </h2>
              <p className="text-xl text-primary-foreground/80 text-pretty">
                Join Thousands of Artisans Who Are Already Using Riwaayat to Grow Their Business Online. Start Your
                Digital Journey Today - It's Free to Begin!
              </p>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary-foreground/80 flex-shrink-0" />
                  <span className="text-primary-foreground/90">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link href="/artisan/register">
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/demo">Watch Demo</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-primary-foreground/10 rounded-2xl p-8 backdrop-blur-sm border border-primary-foreground/20">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-primary-foreground">Quick Stats</h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-foreground">5000+</div>
                    <div className="text-sm text-primary-foreground/80">Active Artisans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-foreground">₹2.5Cr+</div>
                    <div className="text-sm text-primary-foreground/80">Sales Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-foreground">15+</div>
                    <div className="text-sm text-primary-foreground/80">States Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-foreground">4.9★</div>
                    <div className="text-sm text-primary-foreground/80">User Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
