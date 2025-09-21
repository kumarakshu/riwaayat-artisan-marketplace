import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    craft: "Block Print Artist, Rajasthan",
    content:
      "Riwaayat ne meri zindagi badal di! Ab main apne products ko duniya bhar mein bech sakti hun. Voice recording se content banana itna aasan hai।",
    rating: 5,
    image: "/indian-woman-artisan-smiling.png",
  },
  {
    name: "Ravi Kumar",
    craft: "Pottery Artisan, Gujarat",
    content:
      "Pehle main sirf local market mein bechta tha. Ab mere paas online store hai aur QR codes se customers meri story jan sakte hain।",
    rating: 5,
    image: "/indian-male-potter-working.png",
  },
  {
    name: "Meera Devi",
    craft: "Handloom Weaver, West Bengal",
    content:
      "AI ne mere liye itne achhe product descriptions banaye ki sales 300% badh gayi. Technology ka sahi istemal hai ye।",
    rating: 5,
    image: "/bengali-woman-weaver-traditional.png",
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 bg-[url('/images/craft-tools.jpg')] bg-cover bg-center relative"
    >
      <div className="absolute inset-0 bg-background/90"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-balance">
            Success Stories from <span className="text-primary">Our Artisans</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Real artisans, real results. See how Riwaayat is transforming traditional crafts into digital success
            stories.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary" />
                  ))}
                </div>

                <blockquote className="text-base sm:text-lg leading-relaxed italic">"{testimonial.content}"</blockquote>

                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{testimonial.craft}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
