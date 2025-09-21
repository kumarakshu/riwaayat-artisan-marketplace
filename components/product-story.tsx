"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, ShoppingCart, Share2, MapPin, Clock, Heart, Star } from "lucide-react"
import Link from "next/link"

// Mock data - in real app, this would come from API
const storyData = {
  product: {
    id: "1",
    name: "Handwoven Banarasi Silk Saree",
    price: 8500,
    originalPrice: 10000,
    images: [
      "/banarasi-silk-saree-detailed-view.jpg",
      "/banarasi-silk-saree-pattern-close-up.jpg",
      "/banarasi-silk-saree-gold-zari-work.jpg",
    ],
    rating: 4.8,
    reviews: 23,
  },
  artisan: {
    name: "Priya Sharma",
    craft: "Block Print Artist",
    location: "Jaipur, Rajasthan",
    experience: "15 years",
    profileImage: "/indian-woman-artisan-smiling.jpg",
    storeUrl: "/store/priya-sharma",
  },
  story: {
    title: "The Art of Banarasi Silk Weaving",
    videoUrl: "/artisan-weaving-silk-saree-traditional-loom.jpg",
    duration: "3:45",
    transcript: `Namaste! Main Priya Sharma hun, aur main Varanasi mein rehti hun. Mere parivaar mein 3 generations se Banarasi silk saree banane ka kaam hota aa raha hai. 

Ye saree jo aap dekh rahe hain, isme pure mulberry silk use kiya gaya hai aur real gold zari ka kaam hai. Har saree banane mein 15-20 din lagते हैं क्योंकि हर motif hand se weave करना पड़ता है।

Humara traditional pit loom use karte hain, jo hamare dada ji ke time se chala aa raha hai. Ye Mughal designs hain jo centuries purane hain - paisley, floral motifs, aur intricate borders.

Is saree ki khaasiyat ye hai ki iska silk bilkul pure hai, aur zari work mein real gold thread use kiya gaya hai. Ye perfect hai weddings aur special occasions ke liye.`,
    craftProcess: [
      "Silk thread preparation and dyeing",
      "Setting up the traditional pit loom",
      "Creating the base weave structure",
      "Adding intricate zari work by hand",
      "Final finishing and quality check",
    ],
    materials: ["100% Pure Mulberry Silk", "Real Gold Zari Thread", "Natural Dyes", "Traditional Pit Loom"],
    timeToMake: "15-20 days",
    uniqueFeatures: [
      "Hand-woven on traditional pit loom",
      "Authentic Mughal-inspired motifs",
      "Real gold zari work",
      "Passed down through 3 generations",
    ],
  },
}

interface ProductStoryProps {
  productId: string
}

export function ProductStory({ productId }: ProductStoryProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: storyData.story.title,
        text: `Discover the story behind this beautiful ${storyData.product.name}`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
            <Button size="sm" variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Story
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="space-y-6 mb-12">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-2">
              Craft Story
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-balance">{storyData.story.title}</h1>
            <p className="text-xl text-muted-foreground">
              Discover the tradition and craftsmanship behind this beautiful {storyData.product.name.toLowerCase()}
            </p>
          </div>

          {/* Video Section */}
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-muted">
              <img
                src={storyData.story.videoUrl || "/placeholder.svg"}
                alt="Artisan at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button size="lg" className="rounded-full w-16 h-16">
                  <Play className="h-6 w-6 ml-1" />
                </Button>
              </div>
              <Badge className="absolute bottom-4 right-4 bg-black/50">
                <Clock className="h-3 w-3 mr-1" />
                {storyData.story.duration}
              </Badge>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Artisan Profile */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={storyData.artisan.profileImage || "/placeholder.svg"}
                    alt={storyData.artisan.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{storyData.artisan.name}</h3>
                    <p className="text-muted-foreground">{storyData.artisan.craft}</p>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{storyData.artisan.location}</span>
                      <span>•</span>
                      <span>{storyData.artisan.experience} experience</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={storyData.artisan.storeUrl}>Visit {storyData.artisan.name}'s Store</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Story Transcript */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">The Artisan's Story</h3>
                <div className="prose prose-sm max-w-none">
                  {storyData.story.transcript.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Craft Process */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Craft Process</h3>
                <div className="space-y-3">
                  {storyData.story.craftProcess.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Materials & Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Materials Used</h3>
                  <ul className="space-y-2">
                    {storyData.story.materials.map((material, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{material}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Unique Features</h3>
                  <ul className="space-y-2">
                    {storyData.story.uniqueFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <img
                  src={storyData.product.images[0] || "/placeholder.svg"}
                  alt={storyData.product.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />

                <div className="space-y-2">
                  <h4 className="font-semibold line-clamp-2">{storyData.product.name}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">
                      {storyData.product.rating} ({storyData.product.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">₹{storyData.product.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{storyData.product.originalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2">
                  <Button className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>

                <div className="pt-4 border-t text-center">
                  <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Handcrafted in {storyData.story.timeToMake}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
