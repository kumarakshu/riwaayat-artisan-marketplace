import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, Store, QrCode } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-[url('/images/traditional-patterns.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-background/90"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Transform Your <span className="text-primary">Craft</span> into Digital{" "}
                <span className="text-secondary">Success</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                Riwaayat empowers Indian artisans with AI-driven tools to create stunning digital stores, generate
                compelling content, and share their craft stories with the world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/artisan/register">
                  Start Your Digital Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Voice to Content</span>
              </div>
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Digital Store</span>
              </div>
              <div className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Story QR Tags</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-card rounded-2xl p-8 shadow-2xl border">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Mic className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Voice Recording</h3>
                    <p className="text-sm text-muted-foreground">Describe Your Craft in Your Language</p>
                  </div>
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-primary rounded-full animate-pulse"></div>
                </div>

                <div className="space-y-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm font-medium">Generated Product Title:</p>
                    <p className="text-sm text-muted-foreground">
                      "Handwoven Banarasi Silk Saree with Traditional Motifs"
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm font-medium">Social Media Caption:</p>
                    <p className="text-sm text-muted-foreground">
                      "Crafted with love in Varanasi, each thread tells a story of tradition..."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
