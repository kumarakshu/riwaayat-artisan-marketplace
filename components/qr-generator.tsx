"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { QrCode, Download, Share2, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateProductQR } from "@/lib/ai-services"

interface QRGeneratorProps {
  productId?: string
  productName?: string
  storyText?: string
}

export function QRGenerator({ productId, productName, storyText }: QRGeneratorProps) {
  const [customStory, setCustomStory] = useState(storyText || "")
  const [qrUrl, setQrUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateQR = async () => {
    setIsGenerating(true)

    // Simulate QR generation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const storeUrl = "https://riwaayat.com/store/artisan123"
    const qrCodeUrl = generateProductQR(productId || "sample", storeUrl)
    setQrUrl(qrCodeUrl)
    setIsGenerating(false)

    toast({
      title: "QR Code Generated!",
      description: "Your StoryTag QR code is ready to use.",
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrUrl)
    toast({
      title: "Copied!",
      description: "QR code URL copied to clipboard.",
    })
  }

  const downloadQR = () => {
    const link = document.createElement("a")
    link.href = qrUrl
    link.download = `${productName || "product"}-qr-code.png`
    link.click()
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <QrCode className="h-6 w-6 text-primary" />
          <span>StoryTag QR Generator</span>
        </CardTitle>
        <CardDescription>
          Create QR codes that tell your craft story - perfect for physical products and exhibitions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input id="product-name" placeholder="Enter product name" defaultValue={productName} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="story-text">Craft Story (Optional)</Label>
            <Textarea
              id="story-text"
              placeholder="Tell the story behind your craft - materials, techniques, inspiration..."
              value={customStory}
              onChange={(e) => setCustomStory(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <Button onClick={generateQR} disabled={isGenerating} className="w-full">
          {isGenerating ? "Generating QR Code..." : "Generate StoryTag QR"}
        </Button>

        {qrUrl && (
          <div className="space-y-4">
            <div className="text-center">
              <img src={qrUrl || "/placeholder.svg"} alt="Generated QR Code" className="mx-auto border rounded-lg" />
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={downloadQR} className="flex-1 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" onClick={copyToClipboard} className="flex-1 bg-transparent">
                <Copy className="h-4 w-4 mr-2" />
                Copy URL
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
