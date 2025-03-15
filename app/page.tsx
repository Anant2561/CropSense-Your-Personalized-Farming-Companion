"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage, LanguageSelector } from "@/components/language-provider"
import { useCrop } from "@/components/crop-context"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addYears } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { indianStates, regionsByState, crops } from "@/app/data/states-and-crops"

export default function Home() {
  const { t, language } = useLanguage()
  const { selectedCrop, setSelectedCrop } = useCrop()
  const router = useRouter()
  const [selectedState, setSelectedState] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)

  const maxDate = addYears(new Date(), 5)

  const handleSubmit = () => {
    if (selectedState && selectedRegion && selectedCrop && date) {
      // In a real app, this would send data to the backend
      // For now, we'll just navigate to the results page with query params
      router.push(
        `/results?state=${selectedState}&region=${selectedRegion}&crop=${selectedCrop}&date=${date.toISOString()}`,
      )
    }
  }

  // Get regions for the selected state or use default regions
  const regions = selectedState ? regionsByState[selectedState] || regionsByState.default : []

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("cropSense")}</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">{t("tagline")}</p>
              <div className="mt-6">
                <LanguageSelector />
              </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-3xl gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("cropSense")}</CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Enter your details to get crop recommendations"
                      : "फसल की सिफारिशें प्राप्त करने के लिए अपना विवरण दर्ज करें"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="state"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("state")}
                    </label>
                    <Select
                      value={selectedState}
                      onValueChange={(value) => {
                        setSelectedState(value)
                        setSelectedRegion("")
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectState")} />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label[language]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="region"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("region")}
                    </label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion} disabled={!selectedState}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectRegion")} />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region.value} value={region.value}>
                            {region.label[language]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="crop"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("crop")}
                    </label>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectCrop")} />
                      </SelectTrigger>
                      <SelectContent>
                        {crops.map((crop) => (
                          <SelectItem key={crop.value} value={crop.value}>
                            {crop.label[language]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="date"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("futureDate")}
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : t("selectDate")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date() || date > maxDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={!selectedState || !selectedRegion || !selectedCrop || !date}
                  >
                    {t("submit")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

