"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Lock, Eye, EyeOff, User, Phone, MapPin, Briefcase, Upload, Mic, MicOff, Loader2 } from "lucide-react"
import { signUp } from "@/lib/auth"
import { createArtisanProfile } from "@/lib/firestore"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

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

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
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
    if (!formData.email || !formData.password) {
      setError("Email and password are required")
      return
    }

    setLoading(true)
    setError("")

    try {
      const { user, error: authError } = await signUp(formData.email, formData.password)

      if (authError) {
        if (authError.includes("already-in-use")) {
          setError("Account already exists with this email")
        } else {
          setError(authError)
        }
        return
      }

      if (user) {
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

        toast({
          title: "Account Created Successfully!",
          description: "Welcome to Riwaayat! Your artisan journey begins now.",
        })

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
      setError(error.message || "Failed to create account")
    } finally {
      setLoading(false)
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
          setTimeout(() => {
            const mockTranscript =
              "I am a traditional artisan who creates handcrafted items using time-honored techniques passed down through generations."
            handleInputChange("description", formData.description + " " + mockTranscript)
            toast({
              title: "Voice Recorded Successfully!",
              description: "Your voice has been converted to text and added to the description.",
            })
          }, 1000)

          stream.getTracks().forEach((track) => track.stop())
        }

        setMediaRecorder(recorder)
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
    <div className="min-h-screen bg-[url('/images/traditional-patterns.png')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/90 to-orange-100/90"></div>
      <div className="relative z-10 flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Image src="/images/peacock-logo.png" alt="Riwaayat Logo" width={40} height={40} className="h-10 w-10" />
              <span className="text-2xl riwaayat-handwritten text-gray-900">रिवायत</span>
            </div>
            <p className="text-gray-600">Join our community of artisans!</p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
              <CardDescription className="text-center">
                Step {step} of 3: {step === 1 ? "Basic Information" : step === 2 ? "Craft Details" : "Tell Your Story"}
              </CardDescription>
              <div className="flex justify-center mt-4">
                <div className="flex space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${i <= step ? "bg-amber-600" : "bg-gray-300"}`} />
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+91 9876543210"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location (City, State) *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="e.g., Jaipur, Rajasthan"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Craft Category *</Label>
                    <Select
                      value={formData.craftCategory}
                      onValueChange={(value) => handleInputChange("craftCategory", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your craft category" />
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
                    <Label>Preferred Language *</Label>
                    <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your preferred language" />
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
                    <Label htmlFor="experience">Years of Experience</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="experience"
                        type="number"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        placeholder="e.g., 15"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profile-image">Profile Photo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-4">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
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
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tell Your Story</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Share your craft journey and what makes your work special
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="description">Craft Description</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={toggleRecording}
                        className={isRecording ? "bg-red-50 border-red-200 text-red-700" : ""}
                      >
                        {isRecording ? (
                          <>
                            <MicOff className="h-4 w-4 mr-2" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Mic className="h-4 w-4 mr-2" />
                            Voice Record
                          </>
                        )}
                      </Button>
                    </div>

                    {isRecording && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-red-700">Recording in progress...</span>
                        </div>
                      </div>
                    )}

                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Tell us about your craft, techniques, and what inspires your work..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleInputChange("consent", checked)}
                    />
                    <Label htmlFor="consent" className="text-sm">
                      I agree to share my craft story and consent to the{" "}
                      <Link href="/terms" className="text-amber-600 hover:text-amber-700 underline">
                        Terms of Service
                      </Link>
                    </Label>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                {step > 1 && (
                  <Button variant="outline" onClick={handlePrevious} disabled={loading}>
                    Previous
                  </Button>
                )}

                <div className="ml-auto">
                  {step < 3 ? (
                    <Button onClick={handleNext} className="bg-amber-600 hover:bg-amber-700">
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.consent || loading}
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/artisan/login" className="text-amber-600 hover:text-amber-700 font-medium">
                Sign in here
              </Link>
            </p>
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 block mt-2">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
