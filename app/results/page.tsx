"use client"

import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useCrop } from "@/components/crop-context"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { indianStates, regionsByState, crops } from "@/app/data/states-and-crops"

// Mock data - would be replaced with API responses
const mockRecommendations = {
  "maharashtra-pune-rice": {
    recommendedCrop: { en: "Basmati Rice", hi: "बासमती चावल" },
    predictedPrice: "₹3,500 per quintal",
    confidence: "85%",
    alternativeCrops: [
      { name: { en: "Wheat", hi: "गेहूं" }, price: "₹2,200 per quintal" },
      { name: { en: "Soybean", hi: "सोयाबीन" }, price: "₹4,100 per quintal" },
    ],
  },
  "maharashtra-pune-wheat": {
    recommendedCrop: { en: "Durum Wheat", hi: "डुरम गेहूं" },
    predictedPrice: "₹2,800 per quintal",
    confidence: "78%",
    alternativeCrops: [
      { name: { en: "Barley", hi: "जौ" }, price: "₹1,900 per quintal" },
      { name: { en: "Chickpea", hi: "चना" }, price: "₹5,200 per quintal" },
    ],
  },
  "punjab-amritsar-wheat": {
    recommendedCrop: { en: "HD-2967 Wheat", hi: "एचडी-2967 गेहूं" },
    predictedPrice: "₹2,100 per quintal",
    confidence: "92%",
    alternativeCrops: [
      { name: { en: "Mustard", hi: "सरसों" }, price: "₹5,500 per quintal" },
      { name: { en: "Potato", hi: "आलू" }, price: "₹1,200 per quintal" },
    ],
  },
  // Default fallback
  default: {
    recommendedCrop: { en: "Mixed Cropping", hi: "मिश्रित खेती" },
    predictedPrice: "₹2,500 per quintal",
    confidence: "65%",
    alternativeCrops: [
      { name: { en: "Pulses", hi: "दालें" }, price: "₹6,000 per quintal" },
      { name: { en: "Oilseeds", hi: "तिलहन" }, price: "₹4,500 per quintal" },
    ],
  },
}

export default function ResultsPage() {
  const { t, language } = useLanguage()
  const { selectedCrop, setSelectedCrop } = useCrop()
  const searchParams = useSearchParams()

  const state = searchParams.get("state") || ""
  const region = searchParams.get("region") || ""
  const crop = searchParams.get("crop") || ""
  const dateParam = searchParams.get("date") || ""

  // Update the global crop context when the page loads
  useEffect(() => {
    if (crop) {
      setSelectedCrop(crop)
    }
  }, [crop, setSelectedCrop])

  const date = dateParam ? new Date(dateParam) : new Date()

  // Get the recommendation based on the parameters
  const key = `${state}-${region}-${crop}`
  const recommendation = mockRecommendations[key as keyof typeof mockRecommendations] || mockRecommendations.default

  // Find the state and region labels
  const stateObj = indianStates.find((s) => s.value === state)
  const stateLabel = stateObj?.label[language] || state

  const regions = state && regionsByState[state] ? regionsByState[state] : regionsByState.default
  const regionObj = regions.find((r) => r.value === region)
  const regionLabel = regionObj?.label[language] || region

  const cropObj = crops.find((c) => c.value === crop)
  const cropLabel = cropObj?.label[language] || crop

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {language === "en" ? "Back to Home" : "होम पर वापस जाएं"}
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t("recommendedCrop")}</CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? `Based on your selection for ${stateLabel}, ${regionLabel} on ${format(date, "PPP")}`
                      : `${stateLabel}, ${regionLabel} के लिए ${format(date, "PPP")} पर आपके चयन के आधार पर`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-muted p-6 text-center">
                    <h3 className="text-2xl font-bold">{recommendation.recommendedCrop[language]}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {language === "en" ? "Confidence Score:" : "विश्वास स्कोर:"} {recommendation.confidence}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium">{language === "en" ? "Your Selection:" : "आपका चयन:"}</h4>
                    <ul className="grid gap-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">{t("state")}:</span>
                        <span>{stateLabel}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">{t("region")}:</span>
                        <span>{regionLabel}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">{t("crop")}:</span>
                        <span>{cropLabel}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">{t("futureDate")}:</span>
                        <span>{format(date, "PPP")}</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("predictedPrice")}</CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Estimated market price for the recommended crop"
                      : "अनुशंसित फसल के लिए अनुमानित बाजार मूल्य"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-muted p-6 text-center">
                    <h3 className="text-3xl font-bold">{recommendation.predictedPrice}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {language === "en" ? "Estimated for" : "के लिए अनुमानित"} {format(date, "MMMM yyyy")}
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium">{language === "en" ? "Alternative Crops:" : "वैकल्पिक फसलें:"}</h4>
                    <ul className="space-y-2">
                      {recommendation.alternativeCrops.map((alt, index) => (
                        <li key={index} className="flex justify-between rounded-md border p-3">
                          <span>{alt.name[language]}</span>
                          <span className="font-medium">{alt.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/learning">
                      {language === "en" ? "Learn how to grow this crop" : "इस फसल को उगाने का तरीका जानें"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

