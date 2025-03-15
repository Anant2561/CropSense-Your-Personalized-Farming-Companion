"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

type Language = "en" | "hi"

type Translations = {
  [key: string]: {
    en: string
    hi: string
  }
}

// Add all translations here
const translations: Translations = {
  // Navigation
  home: { en: "Home", hi: "होम" },
  learning: { en: "Learning", hi: "शिक्षा" },
  analytics: { en: "Analytics", hi: "विश्लेषण" },

  // Form labels
  state: { en: "State", hi: "राज्य" },
  region: { en: "Region", hi: "क्षेत्र" },
  crop: { en: "Crop", hi: "फसल" },
  futureDate: { en: "Future Date", hi: "भविष्य की तारीख" },
  submit: { en: "Get Recommendations", hi: "सिफारिशें प्राप्त करें" },

  // Results
  recommendedCrop: { en: "Recommended Crop", hi: "अनुशंसित फसल" },
  predictedPrice: { en: "Predicted Price", hi: "अनुमानित मूल्य" },

  // Learning section
  howToGrow: { en: "How to Grow", hi: "कैसे उगाएं" },
  currentPrice: { en: "Current Market Price", hi: "वर्तमान बाजार मूल्य" },
  potentialProfit: { en: "Potential Profit", hi: "संभावित लाभ" },

  // Analytics
  priceTrends: { en: "Price Trends", hi: "मूल्य प्रवृत्तियां" },
  lastSixMonths: { en: "Last 6 Months", hi: "पिछले 6 महीने" },

  // Language
  language: { en: "Language", hi: "भाषा" },
  english: { en: "English", hi: "अंग्रेज़ी" },
  hindi: { en: "Hindi", hi: "हिंदी" },

  // Page titles
  cropSense: { en: "CropSense", hi: "क्रॉपसेंस" },
  tagline: { en: "Your Personalized Farming Companion", hi: "आपका व्यक्तिगत कृषि साथी" },
  marketInsights: { en: "Market Insights", hi: "बाजार अंतर्दृष्टि" },

  // Placeholders
  selectState: { en: "Select State", hi: "राज्य चुनें" },
  selectRegion: { en: "Select Region", hi: "क्षेत्र चुनें" },
  selectCrop: { en: "Select Crop", hi: "फसल चुनें" },
  selectDate: { en: "Select Date", hi: "तारीख चुनें" },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage whenever it changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    return key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Add a more prominent language selector function
export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">{t("language")}:</span>
      <div className="flex gap-2">
        <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
          English
        </Button>
        <Button variant={language === "hi" ? "default" : "outline"} size="sm" onClick={() => setLanguage("hi")}>
          हिंदी
        </Button>
      </div>
    </div>
  )
}

