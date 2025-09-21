"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    features: "Features",
    howItWorks: "How It Works",
    stories: "Stories",
    login: "Login",
    signIn: "Sign In",
    getStarted: "Get Started",

    // Dashboard
    welcomeBack: "Welcome back",
    dashboard: "Dashboard",
    createProduct: "Create Product",
    myProducts: "My Products",
    orders: "Orders",
    analytics: "Analytics",
    profile: "Profile",
    logout: "Logout",

    // Auth
    alreadyRegistered: "This email is already registered. Please login.",
    accountCreated: "Account created successfully!",
    welcomeToRiwaayat: "Welcome to Riwaayat. You can now create your digital store.",

    // Recording
    recording: "Recording... Speak now!",
    tapToRecord: "Tap to start recording",
    stopRecording: "Stop Recording",
    voiceRecord: "Voice Record",

    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
  },
  hi: {
    // Header
    features: "विशेषताएं",
    howItWorks: "कैसे काम करता है",
    stories: "कहानियां",
    login: "लॉगिन",
    signIn: "साइन इन",
    getStarted: "शुरू करें",

    // Dashboard
    welcomeBack: "वापस स्वागत है",
    dashboard: "डैशबोर्ड",
    createProduct: "उत्पाद बनाएं",
    myProducts: "मेरे उत्पाद",
    orders: "ऑर्डर",
    analytics: "विश्लेषण",
    profile: "प्रोफ़ाइल",
    logout: "लॉगआउट",

    // Auth
    alreadyRegistered: "यह ईमेल पहले से पंजीकृत है। कृपया लॉगिन करें।",
    accountCreated: "खाता सफलतापूर्वक बनाया गया!",
    welcomeToRiwaayat: "Riwaayat में आपका स्वागत है। अब आप अपना डिजिटल स्टोर बना सकते हैं।",

    // Recording
    recording: "रिकॉर्डिंग... अब बोलें!",
    tapToRecord: "रिकॉर्डिंग शुरू करने के लिए टैप करें",
    stopRecording: "रिकॉर्डिंग बंद करें",
    voiceRecord: "आवाज़ रिकॉर्ड करें",

    // Common
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

export const useLanguage = () => useContext(LanguageContext)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("riwaayat_language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("riwaayat_language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
