"use client"
import { useLanguage } from "@/components/language-provider"
import { useCrop } from "@/components/crop-context"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts"
import { crops } from "@/app/data/states-and-crops"

// Mock data - would be replaced with API responses
const priceData = {
  rice: [
    { month: "Jan", price: 3100 },
    { month: "Feb", price: 3150 },
    { month: "Mar", price: 3200 },
    { month: "Apr", price: 3250 },
    { month: "May", price: 3300 },
    { month: "Jun", price: 3200 },
  ],
  wheat: [
    { month: "Jan", price: 2000 },
    { month: "Feb", price: 2050 },
    { month: "Mar", price: 2100 },
    { month: "Apr", price: 2150 },
    { month: "May", price: 2200 },
    { month: "Jun", price: 2100 },
  ],
  cotton: [
    { month: "Jan", price: 6200 },
    { month: "Feb", price: 6300 },
    { month: "Mar", price: 6400 },
    { month: "Apr", price: 6500 },
    { month: "May", price: 6600 },
    { month: "Jun", price: 6500 },
  ],
  // Default data for any crop not specifically defined
  default: [
    { month: "Jan", price: 2000 },
    { month: "Feb", price: 2050 },
    { month: "Mar", price: 2100 },
    { month: "Apr", price: 2150 },
    { month: "May", price: 2200 },
    { month: "Jun", price: 2150 },
  ],
}

const cropYieldData = [
  { state: "Maharashtra", rice: 35, wheat: 30, cotton: 20, sugarcane: 800, potato: 250, maize: 40, default: 30 },
  { state: "Punjab", rice: 40, wheat: 45, cotton: 15, sugarcane: 750, potato: 220, maize: 45, default: 35 },
  { state: "Karnataka", rice: 38, wheat: 25, cotton: 18, sugarcane: 820, potato: 240, maize: 42, default: 32 },
  { state: "Gujarat", rice: 30, wheat: 28, cotton: 25, sugarcane: 780, potato: 230, maize: 38, default: 28 },
  { state: "UP", rice: 42, wheat: 40, cotton: 12, sugarcane: 850, potato: 260, maize: 48, default: 38 },
]

const stateNames = {
  Maharashtra: { en: "Maharashtra", hi: "महाराष्ट्र" },
  Punjab: { en: "Punjab", hi: "पंजाब" },
  Karnataka: { en: "Karnataka", hi: "कर्नाटक" },
  Gujarat: { en: "Gujarat", hi: "गुजरात" },
  UP: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" },
}

export default function AnalyticsPage() {
  const { t, language } = useLanguage()
  const { selectedCrop, setSelectedCrop } = useCrop()

  // Get price data for the selected crop or use default
  const cropPriceData = priceData[selectedCrop as keyof typeof priceData] || priceData.default

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("analytics")}</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                {language === "en"
                  ? "Analyze crop prices and market trends"
                  : "फसल की कीमतों और बाजार के रुझानों का विश्लेषण करें"}
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-5xl">
              <div className="mb-8">
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="w-[200px]">
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

              <Tabs defaultValue="price">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="price">{language === "en" ? "Price Trends" : "मूल्य प्रवृत्तियां"}</TabsTrigger>
                  <TabsTrigger value="yield">{language === "en" ? "Yield Comparison" : "उपज तुलना"}</TabsTrigger>
                  <TabsTrigger value="forecast">{language === "en" ? "Price Forecast" : "मूल्य पूर्वानुमान"}</TabsTrigger>
                </TabsList>

                <TabsContent value="price" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === "en" ? "Price Trends" : "मूल्य प्रवृत्तियां"}:{" "}
                        {crops.find((c) => c.value === selectedCrop)?.label[language] || selectedCrop}
                      </CardTitle>
                      <CardDescription>
                        {language === "en" ? "Last 6 months price trends" : "पिछले 6 महीनों की मूल्य प्रवृत्तियां"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[320px] w-full mb-12">
                        <ChartContainer
                          config={{
                            price: {
                              label: language === "en" ? "Price (₹ per quintal)" : "मूल्य (₹ प्रति क्विंटल)",
                              color: "hsl(var(--chart-1))",
                            },
                          }}
                        >
                          <LineChart
                            data={cropPriceData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 30,
                              bottom: 20,
                            }}
                          >
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="price" strokeWidth={2} activeDot={{ r: 8 }} />
                          </LineChart>
                        </ChartContainer>
                      </div>

                      <div className="mt-10 space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-medium">
                          {language === "en" ? "Market Insights" : "बाजार अंतर्दृष्टि"}
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <p className="text-sm">
                              {language === "en"
                                ? `${crops.find((c) => c.value === selectedCrop)?.label.en || selectedCrop} prices have ${cropPriceData[5].price > cropPriceData[0].price ? "increased" : "decreased"} over the last 6 months.`
                                : `${crops.find((c) => c.value === selectedCrop)?.label.hi || selectedCrop} की कीमतें पिछले 6 महीनों में ${cropPriceData[5].price > cropPriceData[0].price ? "बढ़ी" : "घटी"} हैं।`}
                            </p>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <p className="text-sm">
                              {language === "en"
                                ? "Price volatility has been moderate with seasonal fluctuations."
                                : "मूल्य अस्थिरता मौसमी उतार-चढ़ाव के साथ मध्यम रही है।"}
                            </p>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <p className="text-sm">
                              {language === "en"
                                ? "Government procurement has stabilized prices in major markets."
                                : "सरकारी खरीद ने कीमतों को स्थिर किया है।"}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="yield" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === "en" ? "Yield Comparison" : "उपज तुलना"}:{" "}
                        {crops.find((c) => c.value === selectedCrop)?.label[language] || selectedCrop}
                      </CardTitle>
                      <CardDescription>
                        {language === "en"
                          ? "Average yield across different states (quintals per hectare)"
                          : "विभिन्न राज्यों में औसत उपज (क्विंटल प्रति हेक्टेयर)"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[320px] w-full mb-12">
                        <ChartContainer
                          config={{
                            [selectedCrop]: {
                              label: crops.find((c) => c.value === selectedCrop)?.label[language] || selectedCrop,
                              color: "hsl(var(--chart-1))",
                            },
                          }}
                        >
                          <BarChart
                            data={cropYieldData.map((data) => ({
                              state: stateNames[data.state as keyof typeof stateNames][language],
                              [selectedCrop]: data[selectedCrop as keyof typeof data] || data.default,
                            }))}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 30,
                              bottom: 20,
                            }}
                          >
                            <XAxis dataKey="state" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey={selectedCrop} fill="hsl(var(--chart-1))" />
                          </BarChart>
                        </ChartContainer>
                      </div>

                      <div className="mt-10 space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-medium">{language === "en" ? "Yield Insights" : "उपज अंतर्दृष्टि"}</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <p className="text-sm">
                              {language === "en"
                                ? `${stateNames["UP"][language]} has the highest yield for ${crops.find((c) => c.value === selectedCrop)?.label[language] || selectedCrop}.`
                                : `${crops.find((c) => c.value === selectedCrop)?.label[language] || selectedCrop} के लिए ${stateNames["UP"][language]} में सबसे अधिक उपज है।`}
                            </p>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <p className="text-sm">
                              {language === "en"
                                ? "Improved irrigation facilities have contributed to higher yields."
                                : "बेहतर सिंचाई सुविधाओं ने उच्च उपज में योगदान दिया है।"}
                            </p>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <p className="text-sm">
                              {language === "en"
                                ? "Use of high-yielding varieties has increased productivity."
                                : "उच्च उपज वाली किस्मों के उपयोग से उत्पादकता बढ़ी है।"}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="forecast" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === "en" ? "Price Forecast" : "मूल्य पूर्वानुमान"}:{" "}
                        {crops.find((c) => c.value === selectedCrop)?.label[language] || selectedCrop}
                      </CardTitle>
                      <CardDescription>
                        {language === "en"
                          ? "Projected price trends for the next 6 months"
                          : "अगले 6 महीनों के लिए अनुमानित मूल्य प्रवृत्तियां"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[320px] w-full mb-12">
                        <ChartContainer
                          config={{
                            price: {
                              label: language === "en" ? "Actual Price" : "वास्तविक मूल्य",
                              color: "hsl(var(--chart-1))",
                            },
                            forecast: {
                              label: language === "en" ? "Forecast Price" : "पूर्वानुमानित मूल्य",
                              color: "hsl(var(--chart-2))",
                            },
                          }}
                        >
                          <AreaChart
                            data={[
                              ...cropPriceData,
                              { month: "Jul", price: null, forecast: cropPriceData[5].price * 1.02 },
                              { month: "Aug", price: null, forecast: cropPriceData[5].price * 1.04 },
                              { month: "Sep", price: null, forecast: cropPriceData[5].price * 1.06 },
                              { month: "Oct", price: null, forecast: cropPriceData[5].price * 1.08 },
                              { month: "Nov", price: null, forecast: cropPriceData[5].price * 1.1 },
                              { month: "Dec", price: null, forecast: cropPriceData[5].price * 1.12 },
                            ]}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 30,
                              bottom: 20,
                            }}
                          >
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area
                              type="monotone"
                              dataKey="price"
                              stroke="hsl(var(--chart-1))"
                              fill="hsl(var(--chart-1) / 0.2)"
                            />
                            <Area
                              type="monotone"
                              dataKey="forecast"
                              stroke="hsl(var(--chart-2))"
                              fill="hsl(var(--chart-2) / 0.2)"
                            />
                          </AreaChart>
                        </ChartContainer>
                      </div>

                      <div className="mt-10 space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-medium">
                          {language === "en" ? "Forecast Insights" : "पूर्वानुमान अंतर्दृष्टि"}
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <p className="text-sm">
                              {language === "en"
                                ? `${crops.find((c) => c.value === selectedCrop)?.label.en || selectedCrop} prices are expected to increase by 12% in the next 6 months.`
                                : `${crops.find((c) => c.value === selectedCrop)?.label.hi || selectedCrop} की कीमतों में अगले 6 महीनों में 12% की वृद्धि होने की उम्मीद है।`}
                            </p>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <p className="text-sm">
                              {language === "en"
                                ? "Seasonal demand will peak during October-November."
                                : "मौसमी मांग अक्टूबर-नवंबर के दौरान चरम पर होगी।"}
                            </p>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <p className="text-sm">
                              {language === "en"
                                ? "International market trends suggest stable export demand."
                                : "अंतरराष्ट्रीय बाजार के रुझान स्थिर निर्यात मांग का संकेत देते हैं।"}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

