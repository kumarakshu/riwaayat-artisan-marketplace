"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, ShoppingCart, Star, MapPin, Phone, Mail, QrCode, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data - in real app, this would come from API
const artisanData = {
  name: "Priya Sharma",
  craft: "Block Print Artist",
  location: "Jaipur, Rajasthan",
  experience: "15 years",
  rating: 4.9,
  totalReviews: 127,
  bio: "I am a third-generation block print artist from Jaipur. My family has been practicing this traditional art form for over 60 years. I specialize in natural dyes and traditional Rajasthani motifs.",
  phone: "+91 98765 43210",
  email: "priya.sharma@example.com",
  profileImage: "/indian-woman-artisan-smiling.jpg",
  coverImage: "/traditional-indian-textile-workshop.jpg",
}

const products = [
  {
    id: 1,
    name: "Handwoven Banarasi Silk Saree",
    price: 8500,
    originalPrice: 10000,
    image: "/banarasi-silk-saree-traditional.jpg",
    rating: 4.8,
    reviews: 23,
    isNew: true,
  },
  {
    id: 2,
    name: "Traditional Block Print Dupatta",
    price: 1200,
    originalPrice: 1500,
    image: "/block-print-dupatta-traditional.jpg",
    rating: 4.9,
    reviews: 15,
    isNew: false,
  },
  {
    id: 3,
    name: "Embroidered Cushion Covers Set",
    price: 2400,
    originalPrice: 3000,
    image: "/embroidered-cushion-covers-indian.jpg",
    rating: 4.7,
    reviews: 31,
    isNew: false,
  },
  {
    id: 4,
    name: "Hand-painted Ceramic Vase",
    price: 1800,
    originalPrice: 2200,
    image: "/hand-painted-ceramic-vase-indian.jpg",
    rating: 4.6,
    reviews: 12,
    isNew: true,
  },
]

interface ArtisanStoreProps {
  artisanSlug: string
}

export function ArtisanStore({ artisanSlug }: ArtisanStoreProps) {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${artisanData.name}'s Craft Store`,
        text: `Check out authentic handmade crafts by ${artisanData.name}`,
        url: window.location.href,
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
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
              Back to Riwaayat
            </Link>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share Store
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={artisanData.coverImage || "/placeholder.svg"}
          alt="Artisan workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Artisan Profile */}
        <div className="relative -mt-16 mb-8">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={artisanData.profileImage || "/placeholder.svg"}
                alt={artisanData.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-background"
              />

              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{artisanData.name}</h1>
                  <Badge variant="secondary">{artisanData.craft}</Badge>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{artisanData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>
                      {artisanData.rating} ({artisanData.totalReviews} reviews)
                    </span>
                  </div>
                  <span>{artisanData.experience} experience</span>
                </div>

                <p className="text-muted-foreground max-w-2xl">{artisanData.bio}</p>

                <div className="flex items-center space-x-4 pt-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline">
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Handcrafted Products</h2>
            <p className="text-muted-foreground">{products.length} products available</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isNew && <Badge className="absolute top-2 left-2">New</Badge>}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </Badge>
                  </div>

                  <Button className="w-full" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="mt-12 p-6 bg-muted/30">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Love These Crafts?</h3>
            <p className="text-muted-foreground">
              Get in touch with {artisanData.name} for custom orders or bulk purchases
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
