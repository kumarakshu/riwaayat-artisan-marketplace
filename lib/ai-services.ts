"use client"

// AI Services for Voice-to-Content and other AI features
export interface VoiceToContentResult {
  title: string
  shortDescription: string
  longDescription: string
  captions: string[]
  hashtags: string[]
  category: string
  suggestedPrice: string
}

export interface SeasonalTrend {
  festival: string
  products: string[]
  colors: string[]
  materials: string[]
  description: string
  demand: "high" | "medium" | "low"
}

// Mock AI service for voice-to-content conversion
export async function processVoiceToContent(
  audioBlob: Blob,
  language: "hi" | "en" = "hi",
): Promise<VoiceToContentResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock responses based on language
  const responses = {
    hi: {
      title: "हस्तनिर्मित बनारसी सिल्क साड़ी - पारंपरिक मोतिफ्स के साथ",
      shortDescription: "100% शुद्ध सिल्क साड़ी जटिल सोने की जरी के काम के साथ, वाराणसी में हाथ से बुनी गई",
      longDescription:
        "यह उत्कृष्ट बनारसी सिल्क साड़ी पारंपरिक भारतीय शिल्पकारी की एक कृति है। पारंपरिक गड्ढे करघों पर 100% शुद्ध मलबेरी सिल्क धागों और असली सोने की जरी का उपयोग करके हाथ से बुनी गई। साड़ी में क्लासिक मुगल-प्रेरित फूलों के रूपांकन और पैस्ले डिज़ाइन हैं जो पीढ़ियों से चले आ रहे हैं।",
      captions: [
        "बनारसी सिल्क, हाथ से बुना — हर पल्लू में कहानी है। वाराणसी की 400 साल पुरानी परंपरा। #BanarasiSilk #HandwovenSaree",
        "ताज़ा हस्तनिर्मित बनारसी साड़ी तैयार! शुद्ध सिल्क सोने की जरी के काम के साथ। विवरण के लिए DM करें। #BanarasiSaree",
        "हमारे करघों से आपकी अलमारी तक — प्रेम और परंपरा के साथ तैयार की गई प्रामाणिक बनारसी सिल्क साड़ियां। #HandmadeSaree",
      ],
      hashtags: [
        "#BanarasiSilk",
        "#HandwovenSaree",
        "#TraditionalCraft",
        "#SilkSaree",
        "#IndianTextiles",
        "#WeddingSaree",
        "#Handmade",
        "#Varanasi",
      ],
      category: "textiles",
      suggestedPrice: "8500",
    },
    en: {
      title: "Handwoven Banarasi Silk Saree with Traditional Motifs",
      shortDescription: "100% pure silk saree with intricate gold zari work, handwoven in Varanasi",
      longDescription:
        "This exquisite Banarasi silk saree is a masterpiece of traditional Indian craftsmanship. Handwoven on traditional pit looms using 100% pure mulberry silk threads and real gold zari. The saree features classic Mughal-inspired floral motifs and paisley designs that have been passed down through generations.",
      captions: [
        "Banarasi silk, handwoven — every pallu tells a story. 400-year-old tradition from Varanasi. #BanarasiSilk #HandwovenSaree",
        "Fresh handwoven Banarasi saree ready! Pure silk with gold zari work. DM for details and pricing. #BanarasiSaree",
        "From our looms to your wardrobe — authentic Banarasi silk sarees crafted with love and tradition. #HandmadeSaree",
      ],
      hashtags: [
        "#BanarasiSilk",
        "#HandwovenSaree",
        "#TraditionalCraft",
        "#SilkSaree",
        "#IndianTextiles",
        "#WeddingSaree",
        "#Handmade",
        "#Varanasi",
      ],
      category: "textiles",
      suggestedPrice: "8500",
    },
  }

  return responses[language]
}

// Mock speech-to-text service
export async function speechToText(audioBlob: Blob, language: "hi" | "en" = "hi"): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const mockTranscripts = {
    hi: [
      "मैं एक सुंदर बनारसी साड़ी बनाता हूं जो पारंपरिक तकनीक से बनी है। इसमें शुद्ध रेशम और सोने की जरी का काम है।",
      "यह लकड़ी का हस्तशिल्प मेरे दादाजी से सीखी हुई कला है। हर टुकड़ा हाथ से तराशा जाता है।",
      "मैं रंगबिरंगे कपड़े बनाता हूं जो हमारी संस्कृति को दर्शाते हैं। हर डिज़ाइन में एक कहानी है।",
    ],
    en: [
      "I create beautiful Banarasi sarees using traditional techniques. They are made with pure silk and gold zari work.",
      "This wooden handicraft is an art I learned from my grandfather. Every piece is hand-carved.",
      "I make colorful fabrics that reflect our culture. Every design has a story.",
    ],
  }

  const transcripts = mockTranscripts[language]
  return transcripts[Math.floor(Math.random() * transcripts.length)]
}

// Get seasonal trends and suggestions
export async function getSeasonalTrends(): Promise<SeasonalTrend[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      festival: "Diwali",
      products: ["Diyas", "Rangoli Stencils", "Decorative Lights", "Gift Boxes"],
      colors: ["Gold", "Red", "Orange", "Yellow"],
      materials: ["Clay", "Brass", "Silk", "Cotton"],
      description: "Festival of lights brings high demand for traditional decorative items",
      demand: "high",
    },
    {
      festival: "Holi",
      products: ["Natural Colors", "Water Guns", "Festive Clothing", "Sweets Packaging"],
      colors: ["Bright Pink", "Yellow", "Green", "Blue"],
      materials: ["Natural Dyes", "Cotton", "Bamboo"],
      description: "Spring festival creates demand for colorful and eco-friendly products",
      demand: "high",
    },
    {
      festival: "Raksha Bandhan",
      products: ["Rakhis", "Gift Wrapping", "Sweet Boxes", "Decorative Plates"],
      colors: ["Red", "Gold", "Silver", "Pink"],
      materials: ["Silk Thread", "Beads", "Metal", "Paper"],
      description: "Brother-sister festival drives demand for handmade rakhis and gift items",
      demand: "medium",
    },
  ]
}

// Generate QR code for product
export function generateProductQR(productId: string, storeUrl: string): string {
  // In a real implementation, this would use a QR code library
  const productUrl = `${storeUrl}/product/${productId}`
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(productUrl)}`
}

// Generate store URL for artisan
export function generateStoreUrl(artisanId: string): string {
  return `https://riwaayat.com/store/${artisanId}`
}
