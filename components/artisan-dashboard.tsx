"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/components/auth-provider"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Mic,
  Store,
  QrCode,
  TrendingUp,
  Eye,
  Share2,
  IndianRupee,
  Package,
  BarChart3,
  LogOut,
} from "lucide-react"
import Link from "next/link"

// Mock data
const stats = {
  totalProducts: 12,
  totalSales: 45600,
  storeViews: 1250,
  qrScans: 89,
}

const recentProducts = [
  {
    id: 1,
    name: "Handwoven Banarasi Silk Saree",
    status: "published",
    views: 156,
    sales: 3,
    price: 8500,
  },
  {
    id: 2,
    name: "Traditional Block Print Dupatta",
    status: "draft",
    views: 0,
    sales: 0,
    price: 1200,
  },
  {
    id: 3,
    name: "Embroidered Cushion Covers Set",
    status: "published",
    views: 89,
    sales: 7,
    price: 2400,
  },
]

const trendInsights = [
  {
    category: "Festive Wear",
    trend: "up",
    message: "Diwali season approaching - create more traditional sarees and lehengas",
    confidence: 85,
  },
  {
    category: "Home Decor",
    trend: "up",
    message: "Winter home decor items are trending - focus on warm colors",
    confidence: 72,
  },
]

export function ArtisanDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user, loading, signOut } = useAuthContext()
  const { t } = useLanguage()
  const router = useRouter()
  const [userData, setUserData] = useState({
    name: "Guest User",
    email: "",
    storeUrl: "guest-user",
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/artisan/login")
      return
    }

    if (user) {
      const storedUser = localStorage.getItem("riwaayat_user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUserData({
          name: parsedUser.name || user.displayName || "User",
          email: parsedUser.email || user.email || "",
          storeUrl: (parsedUser.name || user.displayName || "user").toLowerCase().replace(/\s+/g, "-"),
        })
      } else {
        setUserData({
          name: user.displayName || "User",
          email: user.email || "",
          storeUrl: (user.displayName || "user").toLowerCase().replace(/\s+/g, "-"),
        })
      }
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>{t("loading")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[url('/images/textile-texture.jpg')] bg-cover bg-fixed">
      <div className="absolute inset-0 bg-background/95"></div>
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold text-primary">
                Riwaayat
              </Link>
              <Badge variant="secondary">Artisan Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/artisan/store-generator">
                    <Store className="h-4 w-4 mr-2" />
                    Store Generator
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/artisan/qr-generator">
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Generator
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/artisan/trends">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trends
                  </Link>
                </Button>
              </div>
              <Button size="sm" asChild>
                <Link href="/artisan/create-product">
                  <Plus className="h-4 w-4 mr-2" />
                  {t("createProduct")}
                </Link>
              </Button>
              <Button size="sm" variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                {t("logout")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {t("welcomeBack")}, {userData.name}!
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your craft business</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="store">My Store</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="tools">AI Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{stats.totalSales.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Store Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.storeViews}</div>
                  <p className="text-xs text-muted-foreground">+8% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">QR Scans</CardTitle>
                  <QrCode className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.qrScans}</div>
                  <p className="text-xs text-muted-foreground">+12 this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Products */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Products</CardTitle>
                <CardDescription>Your latest product listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{product.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>₹{product.price.toLocaleString()}</span>
                          <span>{product.views} views</span>
                          <span>{product.sales} sales</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={product.status === "published" ? "default" : "secondary"}>
                          {product.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{t("yourProducts")}</h2>
              <Button asChild>
                <Link href="/artisan/create-product">
                  <Plus className="h-4 w-4 mr-2" />
                  {t("createNewProduct")}
                </Link>
              </Button>
            </div>

            <div className="grid gap-6">
              {recentProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <IndianRupee className="h-4 w-4 mr-1" />
                            {product.price.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {product.views} views
                          </span>
                          <span className="flex items-center">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            {product.sales} sales
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={product.status === "published" ? "default" : "secondary"}>
                          {product.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <QrCode className="h-4 w-4 mr-2" />
                          QR Code
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="store" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("yourDigitalStore")}</CardTitle>
                <CardDescription>{t("manageYourOnlinePresence")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{t("storeUrl")}</h4>
                    <p className="text-sm text-muted-foreground">riwaayat.com/store/{userData.storeUrl}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      {t("preview")}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      {t("share")}
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t("storePerformance")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">{t("totalViews")}</span>
                          <span className="font-medium">1,250</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">{t("uniqueVisitors")}</span>
                          <span className="font-medium">892</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">{t("conversionRate")}</span>
                          <span className="font-medium">3.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t("quickActions")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button className="w-full bg-transparent" variant="outline">
                        <Store className="h-4 w-4 mr-2" />
                        {t("customizeStore")}
                      </Button>
                      <Button className="w-full bg-transparent" variant="outline">
                        <QrCode className="h-4 w-4 mr-2" />
                        {t("generateStoreQR")}
                      </Button>
                      <Button className="w-full bg-transparent" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        {t("viewAnalytics")}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("aiPoweredMarketInsights")}</CardTitle>
                <CardDescription>{t("personalizedRecommendations")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendInsights.map((insight, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <h4 className="font-medium">{insight.category}</h4>
                      </div>
                      <Badge variant="secondary">
                        {insight.confidence}% {t("confidence")}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.message}</p>
                  </div>
                ))}

                <div className="pt-4">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Mic className="h-4 w-4 mr-2" />
                    {t("getMoreAISuggestions")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
                <Link href="/artisan/create-product">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Mic className="h-6 w-6 text-primary" />
                      <span>Voice-to-Content AI</span>
                    </CardTitle>
                    <CardDescription>
                      Speak in your language and get professional product descriptions instantly
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Transform your voice into compelling product stories and social media content
                    </p>
                  </CardContent>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
                <Link href="/artisan/store-generator">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Store className="h-6 w-6 text-primary" />
                      <span>Digital Store Generator</span>
                    </CardTitle>
                    <CardDescription>
                      Create beautiful online stores in minutes with payment integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Mobile-optimized stores with integrated payment solutions
                    </p>
                  </CardContent>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
                <Link href="/artisan/qr-generator">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <QrCode className="h-6 w-6 text-primary" />
                      <span>StoryTag QR Codes</span>
                    </CardTitle>
                    <CardDescription>Generate QR codes that tell your craft story</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Perfect for physical products and exhibitions</p>
                  </CardContent>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
                <Link href="/artisan/trends">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      <span>Seasonal Trend Insights</span>
                    </CardTitle>
                    <CardDescription>AI-powered suggestions based on upcoming festivals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Get market trends and product recommendations</p>
                  </CardContent>
                </Link>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">🌐</span>
                    <span>Multi-language Support</span>
                  </CardTitle>
                  <CardDescription>Work in Hindi, English, or your regional language</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">AI translates and adapts content automatically</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">📱</span>
                    <span>Mobile-First Design</span>
                  </CardTitle>
                  <CardDescription>Everything works perfectly on your smartphone</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">No computer needed to run your digital business</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
