"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Store, CreditCard, Share2, Eye, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

interface StoreConfig {
  storeName: string
  description: string
  theme: string
  primaryColor: string
  categories: string[]
  paymentMethods: string[]
  socialLinks: {
    whatsapp: string
    instagram: string
    facebook: string
  }
}

export function DigitalStoreGenerator() {
  const [storeConfig, setStoreConfig] = useState<StoreConfig>({
    storeName: "",
    description: "",
    theme: "traditional",
    primaryColor: "#f59e0b",
    categories: [],
    paymentMethods: [],
    socialLinks: {
      whatsapp: "",
      instagram: "",
      facebook: "",
    },
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [storeUrl, setStoreUrl] = useState("")
  const { toast } = useToast()
  const { language } = useLanguage()

  const themes = [
    { value: "traditional", label: language === "hi" ? "पारंपरिक" : "Traditional" },
    { value: "modern", label: language === "hi" ? "आधुनिक" : "Modern" },
    { value: "minimal", label: language === "hi" ? "न्यूनतम" : "Minimal" },
    { value: "colorful", label: language === "hi" ? "रंगबिरंगा" : "Colorful" },
  ]

  const availableCategories = [
    "Textiles & Handloom",
    "Jewelry & Metalwork",
    "Pottery & Ceramics",
    "Wood Carving",
    "Leather Goods",
    "Home Decor",
    "Traditional Clothing",
  ]

  const paymentOptions = ["UPI", "PhonePe", "Google Pay", "Paytm", "Bank Transfer", "Cash on Delivery"]

  const generateStore = async () => {
    if (!storeConfig.storeName.trim()) {
      toast({
        title: language === "hi" ? "त्रुटि" : "Error",
        description: language === "hi" ? "कृपया स्टोर का नाम दर्ज करें" : "Please enter store name",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate store generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const generatedUrl = `https://riwaayat.com/store/${storeConfig.storeName.toLowerCase().replace(/\s+/g, "-")}`
    setStoreUrl(generatedUrl)
    setIsGenerating(false)

    toast({
      title: language === "hi" ? "स्टोर तैयार!" : "Store Ready!",
      description:
        language === "hi"
          ? "आपका डिजिटल स्टोर सफलतापूर्वक बनाया गया है"
          : "Your digital store has been created successfully",
    })
  }

  const toggleCategory = (category: string) => {
    setStoreConfig((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const togglePaymentMethod = (method: string) => {
    setStoreConfig((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method],
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold flex items-center justify-center space-x-2">
          <Store className="h-8 w-8 text-primary" />
          <span>{language === "hi" ? "डिजिटल दुकान जेनरेटर" : "Digital Store Generator"}</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          {language === "hi"
            ? "एकीकृत भुगतान समाधान के साथ मिनटों में सुंदर, मोबाइल-अनुकूलित ऑनलाइन स्टोर बनाएं"
            : "Create beautiful, mobile-optimized online stores in minutes with integrated payment solutions"}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "hi" ? "बुनियादी जानकारी" : "Basic Information"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">{language === "hi" ? "स्टोर का नाम" : "Store Name"}</Label>
                <Input
                  id="store-name"
                  placeholder={language === "hi" ? "उदा. राम की हस्तकला" : "e.g. Ram's Handicrafts"}
                  value={storeConfig.storeName}
                  onChange={(e) => setStoreConfig((prev) => ({ ...prev, storeName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{language === "hi" ? "स्टोर विवरण" : "Store Description"}</Label>
                <Textarea
                  id="description"
                  placeholder={language === "hi" ? "अपने स्टोर के बारे में बताएं..." : "Tell about your store..."}
                  value={storeConfig.description}
                  onChange={(e) => setStoreConfig((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>{language === "hi" ? "थीम चुनें" : "Choose Theme"}</Label>
                <Select
                  value={storeConfig.theme}
                  onValueChange={(value) => setStoreConfig((prev) => ({ ...prev, theme: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value}>
                        {theme.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">{language === "hi" ? "मुख्य रंग" : "Primary Color"}</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    id="primary-color"
                    value={storeConfig.primaryColor}
                    onChange={(e) => setStoreConfig((prev) => ({ ...prev, primaryColor: e.target.value }))}
                    className="w-12 h-10 rounded border"
                  />
                  <Input
                    value={storeConfig.primaryColor}
                    onChange={(e) => setStoreConfig((prev) => ({ ...prev, primaryColor: e.target.value }))}
                    placeholder="#f59e0b"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "hi" ? "उत्पाद श्रेणियां" : "Product Categories"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((category) => (
                  <Badge
                    key={category}
                    variant={storeConfig.categories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>{language === "hi" ? "भुगतान विकल्प" : "Payment Options"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {paymentOptions.map((method) => (
                  <Badge
                    key={method}
                    variant={storeConfig.paymentMethods.includes(method) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => togglePaymentMethod(method)}
                  >
                    {method}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "hi" ? "सोशल मीडिया लिंक" : "Social Media Links"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  placeholder="+91 9876543210"
                  value={storeConfig.socialLinks.whatsapp}
                  onChange={(e) =>
                    setStoreConfig((prev) => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, whatsapp: e.target.value },
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  placeholder="@your_handle"
                  value={storeConfig.socialLinks.instagram}
                  onChange={(e) =>
                    setStoreConfig((prev) => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, instagram: e.target.value },
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  placeholder="facebook.com/yourpage"
                  value={storeConfig.socialLinks.facebook}
                  onChange={(e) =>
                    setStoreConfig((prev) => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, facebook: e.target.value },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{language === "hi" ? "स्टोर पूर्वावलोकन" : "Store Preview"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4 text-center space-y-4">
                <div className="w-full h-32 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <Store className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{storeConfig.storeName || "Your Store Name"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {storeConfig.description || "Store description will appear here"}
                  </p>
                </div>
                <div className="flex justify-center space-x-2">
                  {storeConfig.categories.slice(0, 3).map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button size="lg" className="w-full" onClick={generateStore} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {language === "hi" ? "स्टोर बनाया जा रहा है..." : "Creating Store..."}
              </>
            ) : (
              <>
                <Store className="h-4 w-4 mr-2" />
                {language === "hi" ? "स्टोर बनाएं" : "Create Store"}
              </>
            )}
          </Button>

          {storeUrl && (
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Store className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{language === "hi" ? "स्टोर तैयार!" : "Store Ready!"}</h3>
                  <p className="text-sm text-muted-foreground">{storeUrl}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    {language === "hi" ? "देखें" : "Preview"}
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    {language === "hi" ? "साझा करें" : "Share"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
