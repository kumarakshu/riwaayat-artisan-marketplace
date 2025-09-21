"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mic, MicOff, Upload, Sparkles, Eye, Share2, QrCode, Loader2 } from "lucide-react"
import Link from "next/link"
import { processVoiceToContent, speechToText } from "@/lib/ai-services"

export function CreateProduct() {
  const [isRecording, setIsRecording] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [step, setStep] = useState(1) // 1: Record, 2: Review, 3: Publish
  const [productData, setProductData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    price: "",
    category: "",
    materials: "",
    dimensions: "",
    captions: [] as string[],
    hashtags: [] as string[],
    images: [] as File[],
  })

  const [recordedText, setRecordedText] = useState("")
  const { toast } = useToast()
  const { t } = useLanguage()

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        const chunks: Blob[] = []

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data)
          }
        }

        recorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: "audio/wav" })

          try {
            const transcribedText = await speechToText(audioBlob, "hi")
            setRecordedText(transcribedText)

            toast({
              title: t("success"),
              description: "Voice recorded and converted to text successfully!",
            })

            generateContentFromVoice(audioBlob)
          } catch (error) {
            console.error("Error processing voice:", error)
            toast({
              title: t("error"),
              description: "Error processing voice. Please try again.",
              variant: "destructive",
            })
          }

          stream.getTracks().forEach((track) => track.stop())
        }

        recorder.start()
        setIsRecording(true)
      } catch (error) {
        console.error("Error accessing microphone:", error)
        toast({
          title: t("error"),
          description: "Could not access microphone. Please check permissions.",
          variant: "destructive",
        })
      }
    } else {
      if (isRecording) {
        setIsRecording(false)
      }
    }
  }

  const generateContentFromVoice = async (audioBlob: Blob) => {
    setIsGenerating(true)
    try {
      const result = await processVoiceToContent(audioBlob, "hi")
      setProductData({
        ...productData,
        title: result.title,
        shortDescription: result.shortDescription,
        longDescription: result.longDescription,
        captions: result.captions,
        hashtags: result.hashtags,
        category: result.category,
        price: result.suggestedPrice,
      })
      setStep(2)
    } catch (error) {
      console.error("Error generating content:", error)
      toast({
        title: t("error"),
        description: "Error generating content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateContent = async () => {
    setIsGenerating(true)
    try {
      // Mock audio blob for manual text input
      const mockAudioBlob = new Blob([], { type: "audio/wav" })
      const result = await processVoiceToContent(mockAudioBlob, "hi")
      setProductData({
        ...productData,
        title: result.title,
        shortDescription: result.shortDescription,
        longDescription: result.longDescription,
        captions: result.captions,
        hashtags: result.hashtags,
        category: result.category,
        price: result.suggestedPrice,
      })
      setStep(2)
    } catch (error) {
      console.error("Error generating content:", error)
      toast({
        title: t("error"),
        description: "Error generating content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePublish = () => {
    console.log("Publishing product:", productData)
    setStep(3)
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <QrCode className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Product Published!</h2>
            <p className="text-muted-foreground">
              Your product is now live on your digital store. QR code and sharing links have been generated.
            </p>
            <div className="flex flex-col space-y-2">
              <Button asChild>
                <Link href="/artisan/dashboard">View Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/artisan/create-product">Create Another Product</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/artisan/dashboard"
                className="inline-flex items-center text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            <Badge variant="secondary">Step {step} of 2</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold">Create New Product</h1>
              <p className="text-muted-foreground text-lg">
                Tell us about your craft using voice or text, and our AI will create professional content for you
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Mic className="h-6 w-6 text-primary" />
                  <span>Voice Recording</span>
                </CardTitle>
                <CardDescription>
                  Describe your product in your preferred language. Talk about materials, techniques, colors, and what
                  makes it special.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <Button
                    size="lg"
                    onClick={toggleRecording}
                    className={`w-32 h-32 rounded-full text-lg ${
                      isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : ""
                    }`}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <Loader2 className="h-8 w-8 animate-spin" />
                    ) : isRecording ? (
                      <MicOff className="h-8 w-8" />
                    ) : (
                      <Mic className="h-8 w-8" />
                    )}
                  </Button>

                  <div className="space-y-2">
                    {isGenerating ? (
                      <p className="text-lg font-medium text-primary">AI Is Generating Your Content...</p>
                    ) : isRecording ? (
                      <p className="text-lg font-medium text-red-600">{t("recording")}</p>
                    ) : (
                      <p className="text-lg font-medium">Tap to Record</p>
                    )}

                    <p className="text-sm text-muted-foreground">
                      {isRecording
                        ? "Describe your product details, materials, and story"
                        : 'Example: "Main Banarasi silk saree banata hun, pure silk aur gold zari se..."'}
                    </p>
                  </div>

                  {recordedText && (
                    <div className="bg-muted/50 p-4 rounded-lg text-left">
                      <Label className="text-sm font-medium">Recorded Text:</Label>
                      <p className="text-sm mt-1">{recordedText}</p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-6">
                  <Label htmlFor="manual-input">Or type your description</Label>
                  <Textarea id="manual-input" placeholder="Describe your product here..." rows={4} className="mt-2" />
                  <Button className="mt-4 w-full" onClick={generateContent} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Content...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Content
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold">Review & Edit Content</h1>
              <p className="text-muted-foreground text-lg">
                AI has generated professional content for your product. Review and edit as needed.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Product Title</Label>
                      <Input
                        id="title"
                        value={productData.title}
                        onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="short-desc">Short Description</Label>
                      <Textarea
                        id="short-desc"
                        value={productData.shortDescription}
                        onChange={(e) => setProductData({ ...productData, shortDescription: e.target.value })}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="long-desc">Detailed Description</Label>
                      <Textarea
                        id="long-desc"
                        value={productData.longDescription}
                        onChange={(e) => setProductData({ ...productData, longDescription: e.target.value })}
                        rows={6}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="8500"
                          value={productData.price}
                          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                          value={productData.category}
                          onValueChange={(value) => setProductData({ ...productData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="textiles">Textiles & Handloom</SelectItem>
                            <SelectItem value="jewelry">Jewelry & Metalwork</SelectItem>
                            <SelectItem value="pottery">Pottery & Ceramics</SelectItem>
                            <SelectItem value="woodwork">Wood Carving</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="images">Product Images</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Upload product images (up to 5 images)</p>
                        <Input id="images" type="file" accept="image/*" multiple className="hidden" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Generated Social Media Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Instagram/Facebook Captions</Label>
                      <div className="space-y-3 mt-2">
                        {productData.captions.map((caption, index) => (
                          <div key={index} className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm">{caption}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Hashtags</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {productData.hashtags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preview Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-transparent" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Store Page
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <QrCode className="h-4 w-4 mr-2" />
                      Generate QR Code
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share on WhatsApp
                    </Button>
                  </CardContent>
                </Card>

                <Button size="lg" className="w-full" onClick={handlePublish}>
                  Publish Product
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
