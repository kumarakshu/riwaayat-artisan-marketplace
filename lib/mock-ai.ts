// Mock AI functions for demo purposes
export const generateContentFromVoice = async (transcript: string) => {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const templates = [
    {
      title: "Handcrafted Clay Pottery",
      description:
        "This beautiful clay pot is made using traditional techniques passed down through generations. Each piece is unique and reflects the artisan's skill and cultural heritage.",
      tags: ["handmade", "pottery", "traditional", "eco-friendly", "cultural"],
    },
    {
      title: "Traditional Wooden Handicraft",
      description:
        "Exquisite wooden craft showcasing intricate carving work. Made from sustainable wood sources using age-old techniques that preserve our cultural traditions.",
      tags: ["wooden", "carved", "traditional", "sustainable", "handcrafted"],
    },
    {
      title: "Artisan Textile Creation",
      description:
        "Beautiful handwoven textile featuring traditional patterns and vibrant colors. Each thread tells a story of our rich cultural heritage and skilled craftsmanship.",
      tags: ["textile", "handwoven", "colorful", "traditional", "heritage"],
    },
  ]

  const randomTemplate = templates[Math.floor(Math.random() * templates.length)]

  return {
    success: true,
    content: randomTemplate,
  }
}

export const speechToText = async (audioBlob: Blob) => {
  // Mock speech to text conversion
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const mockTranscripts = [
    "Main ek sundar mitti ka bartan banata hun jo traditional technique se bana hai",
    "Ye wooden handicraft mere dada ji se sikhi hui kala hai jo bahut purani hai",
    "Main colorful kapde banta hun jo hamare culture ko represent karta hai",
  ]

  const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)]

  return {
    success: true,
    transcript: randomTranscript,
  }
}
