"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/auth"
import { createArtisanProfile } from "@/lib/firestore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, Mic, MicOff, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

const craftCategories = [
  "Textiles & Handloom",
  "Pottery & Ceramics",
  "Jewelry & Metalwork",
  "Wood Carving",
  "Leather Craft",
  "Block Printing",
  "Embroidery",
  "Painting & Art",
  "Stone Carving",
  "Other",
]

const languages = [
  "Hindi",
  "English",
  "Bengali",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Kannada",
  "Malayalam",
  "Punjabi",
  "Urdu",
  "Other",
]

export function ArtisanRegistration() {
  const [step, setStep] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    craftCategory: "",
    location: "",
    language: "",
    experience: "",
    description: "",
    profileImage: null as File | null,
    consent: false,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    console.log("[v0] Form submission started", { email: formData.email, hasPassword: !!formData.password })

    if (!formData.email || !formData.password) {
      setError("Email and password are required")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      console.log("[v0] Calling signUp function")
      const { user, error: authError } = await signUp(formData.email, formData.password)

      console.log("[v0] SignUp result", { user: !!user, error: authError })

      if (authError) {
        if (authError.includes("already-in-use")) {
          setError(t("alreadyRegistered"))
        } else {
          setError(authError)
        }
        return
      }

      if (user) {
        console.log("[v0] Creating artisan profile for user", user.uid)
        await createArtisanProfile(user.uid, {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          craftCategory: formData.craftCategory,
          location: formData.location,
          language: formData.language,
          experience: Number.parseInt(formData.experience) || 0,
          description: formData.description,
          createdAt: new Date().toISOString(),
          verified: false,
          rating: 0,
          productsCount: 0,
        })

        console.log("[v0] Profile created successfully, showing toast")
        toast({
          title: t("accountCreated"),
          description: t("welcomeToRiwaayat"),
        })

        console.log("[v0] Redirecting to dashboard")
        localStorage.setItem(
          "riwaayat_user",
          JSON.stringify({
            name: formData.name,
            email: formData.email,
            uid: user.uid,
          }),
        )
        router.push("/artisan/dashboard")
      }
    } catch (error: any) {
      console.log("[v0] Error during registration", error)
      setError(error.message || "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

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

        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: "audio/wav" })
          // Here you would typically send the audio to a speech-to-text service
          // For now, we'll simulate the process
          setTimeout(() => {
            const mockTranscript = "मैं एक पारंपरिक कारीगर हूं जो हस्तशिल्प बनाता हूं। मेरे काम में पारंपरिक तकनीकों का उपयोग होता है।"
            handleInputChange("description", formData.description + " " + mockTranscript)
            toast({
              title: "Voice recorded successfully!",
              description: "Your voice has been converted to text and added to the description.",
            })
          }, 1000)

          // Stop all tracks to release microphone
          stream.getTracks().forEach((track) => track.stop())
        }

        setMediaRecorder(recorder)
        setAudioChunks(chunks)
        recorder.start()
        setIsRecording(true)
      } catch (error) {
        console.error("Error accessing microphone:", error)
        toast({
          title: "Microphone Error",
          description: "Could not access microphone. Please check permissions.",
          variant: "destructive",
        })
      }
    } else {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop()
        setIsRecording(false)
        setMediaRecorder(null)
      }
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("backToHome")}
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t("joinRiwaayat")}</CardTitle>
            <CardDescription>{`${t("step")} ${step} ${t("of")} 3: ${t("setUpProfile")}`}</CardDescription>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("basicInfo")}</h3>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                    <div className="font-medium mb-1">{t("registrationError")}</div>
                    <div>{error}</div>
                    {error.includes("alreadyRegistered") && (
                      <div className="mt-2 text-xs">
                        <Link href="/artisan/login" className="text-primary hover:underline">
                          {t("loginHere")}
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">{t("fullName")} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={t("enterFullName")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phoneNumber")} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("emailAddress")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t("password")} *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder={t("createStrongPassword")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">{t("location")} (City, State) *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="e.g., Jaipur, Rajasthan"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("craftDetails")}</h3>

                <div className="space-y-2">
                  <Label>{t("craftCategory")} *</Label>
                  <Select
                    value={formData.craftCategory}
                    onValueChange={(value) => handleInputChange("craftCategory", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectCraftCategory")} />
                    </SelectTrigger>
                    <SelectContent>
                      {craftCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t("preferredLanguage")} *</Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectPreferredLanguage")} />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">{t("yearsOfExperience")}</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    placeholder="e.g., 15"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-image">{t("profilePhoto")}</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{t("clickToUpload")}</p>
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleInputChange("profileImage", e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("tellYourStory")}</h3>
                <p className="text-sm text-muted-foreground">{t("describeCraft")}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description">{t("craftDescription")}</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={toggleRecording}
                      className={isRecording ? "bg-red-50 border-red-200" : ""}
                    >
                      {isRecording ? (
                        <>
                          <MicOff className="h-4 w-4 mr-2" />
                          {t("stopRecording")}
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-2" />
                          {t("voiceRecord")}
                        </>
                      )}
                    </Button>
                  </div>

                  {isRecording && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-700">{t("recording")}</span>
                      </div>
                    </div>
                  )}

                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder={t("tellUsAboutCraft")}
                    rows={6}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => handleInputChange("consent", checked)}
                  />
                  <Label htmlFor="consent" className="text-sm">
                    {t("consentToShare")}
                    <Link href="/terms" className="text-primary hover:underline">
                      {t("termsOfService")}
                    </Link>
                  </Label>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button variant="outline" onClick={handlePrevious} disabled={isLoading}>
                  {t("previous")}
                </Button>
              )}

              <div className="ml-auto">
                {step < 3 ? (
                  <Button onClick={handleNext}>{t("next")}</Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={!formData.consent || isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {t("creatingAccount")}
                      </>
                    ) : (
                      t("createAccount")
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
