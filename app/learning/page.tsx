"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCrop } from "@/components/crop-context"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { crops } from "@/app/data/states-and-crops"

// Mock data - would be replaced with API responses
const cropData = {
  rice: {
    name: { en: "Rice", hi: "चावल" },
    currentPrice: "₹3,200 per quintal",
    growingSteps: [
      {
        title: { en: "Land Preparation", hi: "भूमि तैयारी" },
        description: {
          en: "Prepare the land by plowing and leveling. Rice requires a flat surface for even water distribution. For best results, plow the field 2-3 times to a depth of 15-20 cm. After plowing, puddle the soil to create a fine, smooth surface. Add organic matter like farmyard manure (10-15 tons/hectare) before the final plowing to improve soil fertility and structure.",
          hi: "जमीन को जोतकर और समतल करके तैयार करें। चावल को समान पानी वितरण के लिए एक समतल सतह की आवश्यकता होती है। सर्वोत्तम परिणामों के लिए, खेत को 15-20 सेमी की गहराई तक 2-3 बार जोतें। जुताई के बाद, मिट्टी को कीचड़ बनाकर एक अच्छी, चिकनी सतह बनाएं। अंतिम जुताई से पहले फार्मयार्ड खाद (10-15 टन/हेक्टेयर) जैसे जैविक पदार्थ जोड़ें ताकि मिट्टी की उर्वरता और संरचना में सुधार हो।",
        },
        tips: {
          en: [
            "Ensure proper drainage to prevent waterlogging",
            "Level the field with a laser leveler for uniform water distribution",
            "Apply lime if soil pH is below 5.5 to neutralize acidity",
          ],
          hi: [
            "जलभराव को रोकने के लिए उचित जल निकासी सुनिश्चित करें",
            "समान जल वितरण के लिए लेजर लेवलर से खेत को समतल करें",
            "यदि मिट्टी का पीएच 5.5 से कम है तो अम्लता को निष्प्रभावित करने के लिए चूना लगाएं",
          ],
        },
      },
      {
        title: { en: "Seed Selection", hi: "बीज चयन" },
        description: {
          en: "Choose high-quality seeds suitable for your region. Pre-soak seeds for 24 hours before sowing. Select certified seeds with 80% or higher germination rate. For lowland areas, choose varieties like IR-36, IR-64, or Swarna. For upland areas, varieties like Vandana or Anjali are suitable. Treat seeds with fungicides like Carbendazim (2g/kg of seed) to protect against seed-borne diseases.",
          hi: "अपने क्षेत्र के लिए उपयुक्त उच्च गुणवत्ता वाले बीजों का चयन करें। बुवाई से पहले बीजों को 24 घंटे तक भिगोएं। 80% या उससे अधिक अंकुरण दर वाले प्रमाणित बीजों का चयन करें। निचले इलाकों के लिए, IR-36, IR-64, या स्वर्णा जैसी किस्मों का चयन करें। ऊपरी क्षेत्रों के लिए, वंदना या अंजलि जैसी किस्में उपयुक्त हैं। बीज जनित रोगों से बचाव के लिए बीजों को कार्बेन्डाजिम (2 ग्राम/किलो बीज) जैसे कवकनाशकों से उपचारित करें।",
        },
        tips: {
          en: [
            "Use seeds that are less than 2 years old for better germination",
            "For direct seeding, use 60-80 kg seeds per hectare",
            "For transplanting method, use 40-50 kg seeds per hectare for nursery",
          ],
          hi: [
            "बेहतर अंकुरण के लिए 2 साल से कम पुराने बीजों का उपयोग करें",
            "सीधी बुवाई के लिए, प्रति हेक्टेयर 60-80 किलो बीज का उपयोग करें",
            "रोपाई विधि के लिए, नर्सरी के लिए प्रति हेक्टेयर 40-50 किलो बीज का उपयोग करें",
          ],
        },
      },
      {
        title: { en: "Transplanting", hi: "रोपाई" },
        description: {
          en: "Transplant seedlings when they are 20-25 days old. Maintain 20cm spacing between rows and 15cm between plants. For mechanical transplanting, use a rice transplanter machine which ensures uniform spacing and depth. Transplant during evening hours to reduce transplanting shock. Ensure 2-3 seedlings per hill for optimal yield. After transplanting, maintain a water level of 2-3 cm for the first week.",
          hi: "जब रोपे 20-25 दिन के हो जाएं तो उनकी रोपाई करें। पंक्तियों के बीच 20 सेमी और पौधों के बीच 15 सेमी की दूरी बनाए रखें। मशीनी रोपाई के लिए, धान रोपाई मशीन का उपयोग करें जो समान अंतराल और गहराई सुनिश्चित करती है। रोपाई के झटके को कम करने के लिए शाम के समय रोपाई करें। इष्टतम उपज के लिए प्रति स्थान 2-3 रोपे सुनिश्चित करें। रोपाई के बाद, पहले सप्ताह के लिए 2-3 सेमी पानी का स्तर बनाए रखें।",
        },
        tips: {
          en: [
            "Apply a basal dose of fertilizer one day before transplanting",
            "Transplant in lines for easier weeding and better crop management",
            "Ensure the roots are properly inserted into the soil during transplanting",
          ],
          hi: [
            "रोपाई से एक दिन पहले उर्वरक की आधार खुराक लगाएं",
            "आसान निराई और बेहतर फसल प्रबंधन के लिए पंक्तियों में रोपाई करें",
            "रोपाई के दौरान जड़ों को मिट्टी में ठीक से डालना सुनिश्चित करें",
          ],
        },
      },
      {
        title: { en: "Water Management", hi: "जल प्रबंधन" },
        description: {
          en: "Maintain 2-5cm of standing water in the field throughout the growing period. Drain the field 10 days before harvesting. Critical stages for irrigation are tillering, panicle initiation, and grain filling. Practice alternate wetting and drying (AWD) to save water - allow the field to dry until hairline cracks appear, then re-flood. Use field water tubes to monitor water levels below the soil surface.",
          hi: "पूरे विकास अवधि के दौरान खेत में 2-5 सेमी खड़े पानी को बनाए रखें। कटाई से 10 दिन पहले खेत से पानी निकाल दें। सिंचाई के लिए महत्वपूर्ण चरण टिलरिंग, पैनिकल इनिशिएशन और दाना भरने के हैं। पानी बचाने के लिए वैकल्पिक गीला करना और सुखाना (AWD) का अभ्यास करें - बालों जैसी दरारें दिखाई देने तक खेत को सूखने दें, फिर पुनः भरें। मिट्टी की सतह के नीचे पानी के स्तर की निगरानी के लिए फील्ड वाटर ट्यूब का उपयोग करें।",
        },
        tips: {
          en: [
            "Maintain higher water levels during flowering stage (5-7 cm)",
            "Drain water periodically to prevent buildup of toxic substances",
            "Install proper bunds around the field to retain water",
          ],
          hi: [
            "फूल आने के चरण के दौरान अधिक पानी का स्तर (5-7 सेमी) बनाए रखें",
            "विषाक्त पदार्थों के निर्माण को रोकने के लिए समय-समय पर पानी निकालें",
            "पानी रोकने के लिए खेत के चारों ओर उचित बांध बनाएं",
          ],
        },
      },
      {
        title: { en: "Nutrient Management", hi: "पोषक तत्व प्रबंधन" },
        description: {
          en: "Apply balanced fertilizers based on soil test recommendations. Typically, rice requires NPK in the ratio of 120:60:60 kg/ha. Apply nitrogen in three splits: 50% as basal dose, 25% at tillering stage, and 25% at panicle initiation. Use leaf color charts to determine nitrogen needs. Apply micronutrients like zinc sulfate (25 kg/ha) if deficiency symptoms appear.",
          hi: "मिट्टी परीक्षण सिफारिशों के आधार पर संतुलित उर्वरक लागू करें। आमतौर पर, चावल को 120:60:60 किग्रा/हेक्टेयर के अनुपात में NPK की आवश्यकता होती है। नाइट्रोजन को तीन भागों में लागू करें: 50% आधार खुराक के रूप में, 25% टिलरिंग चरण पर, और 25% पैनिकल इनिशिएशन पर। नाइट्रोजन की जरूरतों को निर्धारित करने के लिए पत्ती के रंग के चार्ट का उपयोग करें। यदि कमी के लक्षण दिखाई दें तो जिंक सल्फेट (25 किग्रा/हेक्टेयर) जैसे सूक्ष्म पोषक तत्व लागू करें।",
        },
        tips: {
          en: [
            "Use organic manures like compost or vermicompost to improve soil health",
            "Apply potassium during panicle initiation stage for better grain filling",
            "Incorporate crop residues after harvest to recycle nutrients",
          ],
          hi: [
            "मिट्टी के स्वास्थ्य में सुधार के लिए कंपोस्ट या वर्मीकंपोस्ट जैसे जैविक खादों का उपयोग करें",
            "बेहतर दाना भरने के लिए पैनिकल इनिशिएशन चरण के दौरान पोटेशियम लागू करें",
            "पोषक तत्वों को रीसायकल करने के लिए कटाई के बाद फसल अवशेषों को शामिल करें",
          ],
        },
      },
      {
        title: { en: "Pest and Disease Management", hi: "कीट और रोग प्रबंधन" },
        description: {
          en: "Monitor fields regularly for pests like stem borer, leaf folder, and brown planthopper. Use integrated pest management (IPM) practices. For diseases like blast, sheath blight, and bacterial leaf blight, use resistant varieties and appropriate fungicides. Maintain field hygiene by removing weeds and crop residues that harbor pests and diseases.",
          hi: "स्टेम बोरर, लीफ फोल्डर और ब्राउन प्लांटहॉपर जैसे कीटों के लिए नियमित रूप से खेतों की निगरानी करें। एकीकृत कीट प्रबंधन (IPM) प्रथाओं का उपयोग करें। ब्लास्ट, शीथ ब्लाइट और बैक्टीरियल लीफ ब्लाइट जैसे रोगों के लिए, प्रतिरोधी किस्मों और उपयुक्त कवकनाशकों का उपयोग करें। कीटों और रोगों को पनाह देने वाले खरपतवारों और फसल अवशेषों को हटाकर खेत की स्वच्छता बनाए रखें।",
        },
        tips: {
          en: [
            "Use pheromone traps (5-10 per hectare) to monitor and control stem borers",
            "Release natural enemies like Trichogramma to control leaf folder",
            "Drain fields periodically to control certain pests and diseases",
          ],
          hi: [
            "स्टेम बोरर की निगरानी और नियंत्रण के लिए फेरोमोन ट्रैप (5-10 प्रति हेक्टेयर) का उपयोग करें",
            "लीफ फोल्डर को नियंत्रित करने के लिए ट्राइकोग्रामा जैसे प्राकृतिक शत्रुओं को छोड़ें",
            "कुछ कीटों और रोगों को नियंत्रित करने के लिए समय-समय पर खेतों से पानी निकालें",
          ],
        },
      },
      {
        title: { en: "Harvesting", hi: "कटाई" },
        description: {
          en: "Harvest when 80% of the grains turn golden yellow. Use manual or mechanical methods as available. For mechanical harvesting, use a combine harvester which cuts, threshes, and cleans the grain in one operation. Harvest at the right moisture content (20-22%) to minimize losses. After harvesting, dry the grains to 14% moisture content for safe storage.",
          hi: "जब 80% दाने सुनहरे पीले हो जाएं तो कटाई करें। उपलब्धता के अनुसार मैनुअल या मशीनी विधियों का उपयोग करें। मशीनी कटाई के लिए, कंबाइन हार्वेस्टर का उपयोग करें जो एक ही ऑपरेशन में अनाज को काटता, थ्रेश करता और साफ करता है। नुकसान को कम करने के लिए सही नमी सामग्री (20-22%) पर कटाई करें। कटाई के बाद, सुरक्षित भंडारण के लिए अनाज को 14% नमी सामग्री तक सुखाएं।",
        },
        tips: {
          en: [
            "Harvest during morning hours to reduce shattering losses",
            "Ensure proper adjustment of combine harvester to minimize grain breakage",
            "Clean the harvesting equipment thoroughly to prevent mixing of varieties",
          ],
          hi: [
            "बिखरने के नुकसान को कम करने के लिए सुबह के समय कटाई करें",
            "अनाज के टूटने को कम करने के लिए कंबाइन हार्वेस्टर का उचित समायोजन सुनिश्चित करें",
            "किस्मों के मिश्रण को रोकने के लिए कटाई उपकरण को अच्छी तरह से साफ करें",
          ],
        },
      },
      {
        title: { en: "Post-Harvest Management", hi: "कटाई के बाद प्रबंधन" },
        description: {
          en: "Dry the harvested grains properly to reduce moisture content to 12-14% for storage. Clean the grains to remove impurities. Store in clean, dry, and well-ventilated containers or warehouses. Protect from pests using proper storage techniques. For seed purpose, maintain moisture content below 12% and store in cool, dry conditions.",
          hi: "भंडारण के लिए नमी की मात्रा को 12-14% तक कम करने के लिए कटे हुए अनाज को ठीक से सुखाएं। अशुद्धियों को हटाने के लिए अनाज को साफ करें। साफ, सूखे और अच्छी तरह हवादार कंटेनरों या गोदामों में स्टोर करें। उचित भंडारण तकनीकों का उपयोग करके कीटों से बचाएं। बीज के उद्देश्य के लिए, नमी की मात्रा 12% से नीचे बनाए रखें और ठंडी, सूखी परिस्थितियों में स्टोर करें।",
        },
        tips: {
          en: [
            "Use hermetically sealed bags for long-term storage",
            "Monitor stored grain regularly for insect infestation and moisture",
            "Maintain proper documentation of stored grain for quality control",
          ],
          hi: [
            "लंबे समय तक भंडारण के लिए हर्मेटिकली सील्ड बैग का उपयोग करें",
            "कीट संक्रमण और नमी के लिए नियमित रूप से संग्रहीत अनाज की निगरानी करें",
            "गुणवत्ता नियंत्रण के लिए संग्रहीत अनाज का उचित दस्तावेजीकरण बनाए रखें",
          ],
        },
      },
    ],
    inputs: {
      seeds: { cost: 2000, unit: "per hectare" },
      fertilizer: { cost: 5000, unit: "per hectare" },
      labor: { cost: 15000, unit: "per hectare" },
      irrigation: { cost: 3000, unit: "per hectare" },
      pesticides: { cost: 2500, unit: "per hectare" },
      harvesting: { cost: 4000, unit: "per hectare" },
    },
    yield: { min: 40, max: 60, unit: "quintals per hectare" },
  },
  wheat: {
    name: { en: "Wheat", hi: "गेहूं" },
    currentPrice: "₹2,100 per quintal",
    growingSteps: [
      {
        title: { en: "Land Preparation", hi: "भूमि तैयारी" },
        description: {
          en: "Prepare a fine tilth by plowing the land 2-3 times to a depth of 15-20 cm. Ensure good drainage. Break clods and level the field for uniform germination. Apply well-decomposed farmyard manure (10-15 tons/hectare) during the last plowing to improve soil fertility and structure. For saline or alkaline soils, apply gypsum or elemental sulfur as recommended based on soil tests.",
          hi: "15-20 सेमी की गहराई तक जमीन को 2-3 बार जोतकर एक अच्छी मिट्टी तैयार करें। अच्छे जल निकासी सुनिश्चित करें। समान अंकुरण के लिए ढेलों को तोड़ें और खेत को समतल करें। मिट्टी की उर्वरता और संरचना में सुधार के लिए अंतिम जुताई के दौरान अच्छी तरह से विघटित फार्मयार्ड खाद (10-15 टन/हेक्टेयर) लागू करें। लवणीय या क्षारीय मिट्टी के लिए, मिट्टी परीक्षणों के आधार पर अनुशंसित जिप्सम या एलिमेंटल सल्फर लागू करें।",
        },
        tips: {
          en: [
            "Deep plowing helps in better root development and moisture conservation",
            "Use laser land leveler for precise leveling and water management",
            "Incorporate crop residues to improve soil organic matter content",
          ],
          hi: [
            "गहरी जुताई बेहतर जड़ विकास और नमी संरक्षण में मदद करती है",
            "सटीक समतलीकरण और जल प्रबंधन के लिए लेजर लैंड लेवलर का उपयोग करें",
            "मिट्टी के जैविक पदार्थ की मात्रा में सुधार के लिए फसल अवशेषों को शामिल करें",
          ],
        },
      },
      {
        title: { en: "Sowing", hi: "बुवाई" },
        description: {
          en: "Sow seeds in rows 20cm apart at a depth of 5cm. The best time is mid-November to early December. Use seed rate of 100-125 kg/ha for timely sowing and 125-150 kg/ha for late sowing. Treat seeds with fungicides like Carbendazim (2g/kg of seed) or Thiram (3g/kg of seed) to protect against seed-borne diseases. For areas prone to termite attack, treat seeds with Chlorpyriphos 20 EC (4ml/kg of seed).",
          hi: "बीजों को 20 सेमी की दूरी पर 5 सेमी की गहराई पर पंक्तियों में बोएं। सबसे अच्छा समय मध्य नवंबर से दिसंबर की शुरुआत है। समय पर बुवाई के लिए 100-125 किग्रा/हेक्टेयर और देर से बुवाई के लिए 125-150 किग्रा/हेक्टेयर बीज दर का उपयोग करें। बीज जनित रोगों से बचाव के लिए बीजों को कार्बेन्डाजिम (2 ग्राम/किलो बीज) या थिरम (3 ग्राम/किलो बीज) जैसे कवकनाशकों से उपचारित करें। दीमक के हमले के लिए प्रवण क्षेत्रों के लिए, बीजों को क्लोरपाइरिफॉस 20 ईसी (4 मिली/किलो बीज) से उपचारित करें।",
        },
        tips: {
          en: [
            "Use seed drill for uniform sowing depth and spacing",
            "For irrigated conditions, sow in east-west direction to maximize sunlight",
            "In rainfed areas, sow across the slope to prevent soil erosion",
          ],
          hi: [
            "समान बुवाई गहराई और अंतराल के लिए सीड ड्रिल का उपयोग करें",
            "सिंचित परिस्थितियों के लिए, धूप को अधिकतम करने के लिए पूर्व-पश्चिम दिशा में बोएं",
            "वर्षा सिंचित क्षेत्रों में, मिट्टी के कटाव को रोकने के लिए ढलान के आर-पार बोएं",
          ],
        },
      },
      {
        title: { en: "Irrigation", hi: "सिंचाई" },
        description: {
          en: "First irrigation after 21 days of sowing. Total 4-5 irrigations are required during the entire crop cycle. Critical stages for irrigation are crown root initiation (21-25 days after sowing), tillering (45-50 days), jointing (60-65 days), flowering (85-90 days), and grain filling (105-110 days). Avoid water stress during these critical stages. Use sprinkler irrigation in areas with water scarcity for better water use efficiency.",
          hi: "बुवाई के 21 दिन बाद पहली सिंचाई। पूरे फसल चक्र के दौरान कुल 4-5 सिंचाई की आवश्यकता होती है। सिंचाई के लिए महत्वपूर्ण चरण क्राउन रूट इनिशिएशन (बुवाई के 21-25 दिन बाद), टिलरिंग (45-50 दिन), जॉइंटिंग (60-65 दिन), फूल आना (85-90 दिन), और दाना भरना (105-110 दिन) हैं। इन महत्वपूर्ण चरणों के दौरान पानी के तनाव से बचें। बेहतर जल उपयोग दक्षता के लिए पानी की कमी वाले क्षेत्रों में स्प्रिंकलर सिंचाई का उपयोग करें।",
        },
        tips: {
          en: [
            "Irrigate during evening hours to reduce evaporation losses",
            "Monitor soil moisture using tensiometers or moisture meters",
            "Apply light irrigation if frost is expected during flowering stage",
          ],
          hi: [
            "वाष्पीकरण हानि को कम करने के लिए शाम के समय सिंचाई करें",
            "टेंसिओमीटर या मॉइस्चर मीटर का उपयोग करके मिट्टी की नमी की निगरानी करें",
            "फूल आने के चरण के दौरान पाले की संभावना होने पर हल्की सिंचाई करें",
          ],
        },
      },
      {
        title: { en: "Fertilizer Application", hi: "उर्वरक अनुप्रयोग" },
        description: {
          en: "Apply NPK in the ratio of 120:60:40 kg per hectare. Apply half nitrogen and full phosphorus and potassium as basal dose at the time of sowing. Apply remaining nitrogen in two equal splits: first at first irrigation (21-25 days after sowing) and second at the time of second irrigation (45-50 days after sowing). For micronutrients, apply zinc sulfate (25 kg/ha) if deficiency is observed. In areas with sulfur deficiency, apply gypsum (200 kg/ha) or elemental sulfur (20 kg/ha).",
          hi: "प्रति हेक्टेयर 120:60:40 किग्रा के अनुपात में NPK लागू करें। बुवाई के समय आधार खुराक के रूप में आधा नाइट्रोजन और पूरा फॉस्फोरस और पोटेशियम लागू करें। शेष नाइट्रोजन को दो बराबर भागों में लागू करें: पहला पहली सिंचाई पर (बुवाई के 21-25 दिन बाद) और दूसरा दूसरी सिंचाई के समय (बुवाई के 45-50 दिन बाद)। सूक्ष्म पोषक तत्वों के लिए, यदि कमी देखी जाती है तो जिंक सल्फेट (25 किग्रा/हेक्टेयर) लागू करें। सल्फर की कमी वाले क्षेत्रों में, जिप्सम (200 किग्रा/हेक्टेयर) या एलिमेंटल सल्फर (20 किग्रा/हेक्टेयर) लागू करें।",
        },
        tips: {
          en: [
            "Use soil test-based fertilizer recommendations for optimal results",
            "Apply nitrogen through urea, phosphorus through DAP, and potassium through MOP",
            "Foliar spray of 2% urea during grain filling stage can increase protein content",
          ],
          hi: [
            "इष्टतम परिणामों के लिए मिट्टी परीक्षण आधारित उर्वरक सिफारिशों का उपयोग करें",
            "यूरिया के माध्यम से नाइट्रोजन, DAP के माध्यम से फॉस्फोरस, और MOP के माध्यम से पोटेशियम लागू करें",
            "दाना भरने के चरण के दौरान 2% यूरिया का पर्णीय छिड़काव प्रोटीन सामग्री को बढ़ा सकता है",
          ],
        },
      },
      {
        title: { en: "Weed Management", hi: "खरपतवार प्रबंधन" },
        description: {
          en: "Control weeds through pre-emergence and post-emergence herbicides. Apply Pendimethalin (1.0 kg a.i./ha) as pre-emergence herbicide within 2-3 days of sowing. For post-emergence weed control, apply Sulfosulfuron (25 g a.i./ha) or Clodinafop (60 g a.i./ha) at 30-35 days after sowing. For broad-spectrum weed control, use a tank mix of Sulfosulfuron and Metsulfuron (25 g + 4 g a.i./ha). Supplement chemical control with manual weeding if necessary.",
          hi: "प्री-इमरजेंस और पोस्ट-इमरजेंस शाकनाशियों के माध्यम से खरपतवारों को नियंत्रित करें। बुवाई के 2-3 दिनों के भीतर प्री-इमरजेंस शाकनाशी के रूप में पेंडीमेथालिन (1.0 किग्रा a.i./हेक्टेयर) लागू करें। पोस्ट-इमरजेंस खरपतवार नियंत्रण के लिए, बुवाई के 30-35 दिनों बाद सल्फोसल्फ्यूरॉन (25 ग्राम a.i./हेक्टेयर) या क्लोडिनाफॉप (60 ग्राम a.i./हेक्टेयर) लागू करें। व्यापक स्पेक्ट्रम खरपतवार नियंत्रण के लिए, सल्फोसल्फ्यूरॉन और मेट्सल्फ्यूरॉन (25 ग्राम + 4 ग्राम a.i./हेक्टेयर) के टैंक मिश्रण का उपयोग करें। यदि आवश्यक हो तो रासायनिक नियंत्रण के साथ मैनुअल निराई का पूरक करें।",
        },
        tips: {
          en: [
            "Calibrate sprayers properly for uniform application of herbicides",
            "Apply herbicides when soil moisture is adequate for better efficacy",
            "Use flat fan or flood jet nozzles for herbicide application",
          ],
          hi: [
            "शाकनाशियों के समान अनुप्रयोग के लिए स्प्रेयर को ठीक से कैलिब्रेट करें",
            "बेहतर प्रभावकारिता के लिए जब मिट्टी की नमी पर्याप्त हो तब शाकनाशी लागू करें",
            "शाकनाशी अनुप्रयोग के लिए फ्लैट फैन या फ्लड जेट नोजल का उपयोग करें",
          ],
        },
      },
      {
        title: { en: "Harvesting", hi: "कटाई" },
        description: {
          en: "Harvest when the crop turns golden and grain hardens. Usually 120-150 days after sowing, depending on the variety and climate. The moisture content of grains should be around 20-25% at the time of harvesting. For mechanical harvesting, use a combine harvester adjusted properly to minimize grain losses. For manual harvesting, cut the crop close to the ground level using sickles. Threshing can be done using a thresher or by traditional methods.",
          hi: "जब फसल सुनहरी हो जाए और अनाज कड़ा हो जाए तो कटाई करें। आमतौर पर बुवाई के 120-150 दिन बाद, किस्म और जलवायु के आधार पर। कटाई के समय अनाज की नमी सामग्री लगभग 20-25% होनी चाहिए। मशीनी कटाई के लिए, अनाज के नुकसान को कम करने के लिए ठीक से समायोजित कंबाइन हार्वेस्टर का उपयोग करें। मैनुअल कटाई के लिए, दरांती का उपयोग करके फसल को जमीन के स्तर के करीब काटें। थ्रेशिंग थ्रेशर का उपयोग करके या पारंपरिक तरीकों से की जा सकती है।",
        },
        tips: {
          en: [
            "Harvest during morning hours to reduce shattering losses",
            "Adjust combine harvester settings based on crop condition and variety",
            "Clean harvesting equipment thoroughly between different varieties",
          ],
          hi: [
            "बिखरने के नुकसान को कम करने के लिए सुबह के समय कटाई करें",
            "फसल की स्थिति और किस्म के आधार पर कंबाइन हार्वेस्टर सेटिंग्स को समायोजित करें",
            "विभिन्न किस्मों के बीच कटाई उपकरण को अच्छी तरह से साफ करें",
          ],
        },
      },
      {
        title: { en: "Post-Harvest Management", hi: "कटाई के बाद प्रबंधन" },
        description: {
          en: "Dry the harvested grains properly to reduce moisture content to 12-14% for safe storage. Clean the grains to remove impurities, broken grains, and foreign matter. Store in clean, dry, and well-ventilated warehouses or bins. Protect from storage pests using proper fumigation or by mixing neem leaves. For seed purpose, maintain moisture content below 12% and store in cool, dry conditions.",
          hi: "सुरक्षित भंडारण के लिए नमी की मात्रा को 12-14% तक कम करने के लिए कटे हुए अनाज को ठीक से सुखाएं। अशुद्धियों, टूटे हुए अनाज और विदेशी पदार्थों को हटाने के लिए अनाज को साफ करें। साफ, सूखे और अच्छी तरह हवादार गोदामों या बिन में स्टोर करें। उचित फ्यूमिगेशन का उपयोग करके या नीम के पत्तों को मिलाकर भंडारण कीटों से बचाएं। बीज के उद्देश्य के लिए, नमी की मात्रा 12% से नीचे बनाए रखें और ठंडी, सूखी परिस्थितियों में स्टोर करें।",
        },
        tips: {
          en: [
            "Use moisture meters to check grain moisture before storage",
            "Store grain in jute bags or hermetically sealed bags for better preservation",
            "Maintain proper documentation of stored grain for quality control",
          ],
          hi: [
            "भंडारण से पहले अनाज की नमी की जांच के लिए मॉइस्चर मीटर का उपयोग करें",
            "बेहतर संरक्षण के लिए अनाज को जूट के बोरों या हर्मेटिकली सील्ड बैग में स्टोर करें",
            "गुणवत्ता नियंत्रण के लिए संग्रहीत अनाज का उचित दस्तावेजीकरण बनाए रखें",
          ],
        },
      },
    ],
    inputs: {
      seeds: { cost: 1500, unit: "per hectare" },
      fertilizer: { cost: 4000, unit: "per hectare" },
      labor: { cost: 10000, unit: "per hectare" },
      irrigation: { cost: 2500, unit: "per hectare" },
      pesticides: { cost: 1500, unit: "per hectare" },
      harvesting: { cost: 3500, unit: "per hectare" },
    },
    yield: { min: 35, max: 50, unit: "quintals per hectare" },
  },
  // Default data for any crop not specifically defined
  default: {
    name: { en: "Generic Crop", hi: "सामान्य फसल" },
    currentPrice: "₹2,000 per quintal",
    growingSteps: [
      {
        title: { en: "Land Preparation", hi: "भूमि तैयारी" },
        description: {
          en: "Prepare the land by plowing and leveling. Add organic matter for better results. Ensure proper drainage to prevent waterlogging. Test soil pH and nutrient levels before planting to determine fertilizer requirements. Apply lime if soil is acidic or gypsum if soil is alkaline to adjust pH to optimal levels for crop growth.",
          hi: "जमीन को जोतकर और समतल करके तैयार करें। बेहतर परिणामों के लिए जैविक पदार्थ जोड़ें। जलभराव को रोकने के लिए उचित जल निकासी सुनिश्चित करें। उर्वरक आवश्यकताओं को निर्धारित करने के लिए रोपण से पहले मिट्टी के पीएच और पोषक तत्व स्तरों का परीक्षण करें। यदि मिट्टी अम्लीय है तो चूना या यदि मिट्टी क्षारीय है तो जिप्सम लगाएं ताकि फसल विकास के लिए इष्टतम स्तर पर पीएच को समायोजित किया जा सके।",
        },
        tips: {
          en: [
            "Deep plowing helps in better root development",
            "Apply well-decomposed farmyard manure (10-15 tons/hectare)",
            "Level the field properly for uniform irrigation",
          ],
          hi: [
            "गहरी जुताई बेहतर जड़ विकास में मदद करती है",
            "अच्छी तरह से विघटित फार्मयार्ड खाद (10-15 टन/हेक्टेयर) लागू करें",
            "समान सिंचाई के लिए खेत को ठीक से समतल करें",
          ],
        },
      },
      {
        title: { en: "Sowing/Planting", hi: "बुवाई/रोपण" },
        description: {
          en: "Follow recommended spacing and depth for the specific crop variety. Use quality seeds or planting material from reliable sources. Treat seeds with appropriate fungicides and insecticides before sowing to protect against soil-borne diseases and pests. Consider climate and seasonal conditions when deciding the planting time.",
          hi: "विशिष्ट फसल किस्म के लिए अनुशंसित अंतराल और गहराई का पालन करें। विश्वसनीय स्रोतों से गुणवत्ता वाले बीज या रोपण सामग्री का उपयोग करें। मिट्टी जनित रोगों और कीटों से बचाव के लिए बुवाई से पहले बीजों को उपयुक्त कवकनाशकों और कीटनाशकों से उपचारित करें। रोपण समय का निर्णय लेते समय जलवायु और मौसमी परिस्थितियों पर विचार करें।",
        },
        tips: {
          en: [
            "Use seed drill for uniform sowing",
            "Maintain recommended plant population for optimal yield",
            "Consider intercropping with compatible crops for better land utilization",
          ],
          hi: [
            "समान बुवाई के लिए सीड ड्रिल का उपयोग करें",
            "इष्टतम उपज के लिए अनुशंसित पौधों की संख्या बनाए रखें",
            "बेहतर भूमि उपयोग के लिए संगत फसलों के साथ अंतर-फसल पर विचार करें",
          ],
        },
      },
      {
        title: { en: "Irrigation", hi: "सिंचाई" },
        description: {
          en: "Provide adequate water based on crop requirements and growth stage. Critical stages for irrigation are germination, flowering, and grain/fruit development. Use efficient irrigation methods like drip or sprinkler irrigation where appropriate to conserve water. Monitor soil moisture regularly and irrigate accordingly.",
          hi: "फसल की आवश्यकताओं और विकास चरण के आधार पर पर्याप्त पानी प्रदान करें। सिंचाई के लिए महत्वपूर्ण चरण अंकुरण, फूल आना और दाना/फल विकास हैं। पानी के संरक्षण के लिए जहां उपयुक्त हो ड्रिप या स्प्रिंकलर सिंचाई जैसे कुशल सिंचाई विधियों का उपयोग करें। मिट्टी की नमी की नियमित रूप से निगरानी करें और तदनुसार सिंचाई करें।",
        },
        tips: {
          en: [
            "Irrigate during evening or early morning to reduce evaporation losses",
            "Avoid over-irrigation which can lead to waterlogging and disease problems",
            "Use mulching to conserve soil moisture in dry areas",
          ],
          hi: [
            "वाष्पीकरण हानि को कम करने के लिए शाम या सुबह जल्दी सिंचाई करें",
            "अति-सिंचाई से बचें जो जलभराव और रोग समस्याओं का कारण बन सकती है",
            "सूखे क्षेत्रों में मिट्टी की नमी को संरक्षित करने के लिए मल्चिंग का उपयोग करें",
          ],
        },
      },
      {
        title: { en: "Nutrient Management", hi: "पोषक तत्व प्रबंधन" },
        description: {
          en: "Apply balanced fertilizers based on soil test recommendations. Use organic manures like compost, vermicompost, or farmyard manure to improve soil health. Apply nitrogen in split doses for better utilization by plants. Use micronutrients if deficiency symptoms appear or based on soil test recommendations.",
          hi: "मिट्टी परीक्षण सिफारिशों के आधार पर संतुलित उर्वरक लागू करें। मिट्टी के स्वास्थ्य में सुधार के लिए कंपोस्ट, वर्मीकंपोस्ट या फार्मयार्ड खाद जैसे जैविक खादों का उपयोग करें। पौधों द्वारा बेहतर उपयोग के लिए नाइट्रोजन को विभाजित खुराक में लागू करें। यदि कमी के लक्षण दिखाई दें या मिट्टी परीक्षण सिफारिशों के आधार पर सूक्ष्म पोषक तत्वों का उपयोग करें।",
        },
        tips: {
          en: [
            "Use biofertilizers to enhance nutrient availability",
            "Apply foliar sprays for quick correction of nutrient deficiencies",
            "Practice crop rotation to maintain soil fertility",
          ],
          hi: [
            "पोषक तत्व उपलब्धता बढ़ाने के लिए जैव उर्वरकों का उपयोग करें",
            "पोषक तत्वों की कमियों के त्वरित सुधार के लिए पर्णीय छिड़काव लागू करें",
            "मिट्टी की उर्वरता बनाए रखने के लिए फसल चक्र का अभ्यास करें",
          ],
        },
      },
      {
        title: { en: "Pest and Disease Management", hi: "कीट और रोग प्रबंधन" },
        description: {
          en: "Monitor crops regularly for pest and disease incidence. Use integrated pest management (IPM) practices combining cultural, biological, and chemical methods. Apply pesticides judiciously and follow recommended doses and safety precautions. Use disease-resistant varieties where available.",
          hi: "कीट और रोग घटना के लिए नियमित रूप से फसलों की निगरानी करें। सांस्कृतिक, जैविक और रासायनिक विधियों को जोड़ने वाले एकीकृत कीट प्रबंधन (IPM) प्रथाओं का उपयोग करें। कीटनाशकों का विवेकपूर्ण उपयोग करें और अनुशंसित खुराक और सुरक्षा सावधानियों का पालन करें। जहां उपलब्ध हो रोग-प्रतिरोधी किस्मों का उपयोग करें।",
        },
        tips: {
          en: [
            "Use pheromone traps for monitoring pest populations",
            "Release natural enemies like Trichogramma for biological control",
            "Practice crop rotation to break pest and disease cycles",
          ],
          hi: [
            "कीट आबादी की निगरानी के लिए फेरोमोन ट्रैप का उपयोग करें",
            "जैविक नियंत्रण के लिए ट्राइकोग्रामा जैसे प्राकृतिक शत्रुओं को छोड़ें",
            "कीट और रोग चक्रों को तोड़ने के लिए फसल चक्र का अभ्यास करें",
          ],
        },
      },
      {
        title: { en: "Harvesting", hi: "कटाई" },
        description: {
          en: "Harvest at the right maturity stage for optimal yield and quality. Use appropriate harvesting methods and equipment based on crop type. Minimize post-harvest losses by proper handling. For grain crops, harvest at the right moisture content to prevent quality deterioration.",
          hi: "इष्टतम उपज और गुणवत्ता के लिए सही परिपक्वता चरण पर कटाई करें। फसल प्रकार के आधार पर उपयुक्त कटाई विधियों और उपकरणों का उपयोग करें। उचित हैंडलिंग द्वारा कटाई के बाद के नुकसान को कम करें। अनाज फसलों के लिए, गुणवत्ता गिरावट को रोकने के लिए सही नमी सामग्री पर कटाई करें।",
        },
        tips: {
          en: [
            "Harvest during cool hours of the day to reduce moisture loss",
            "Use clean and well-maintained harvesting equipment",
            "Sort and grade produce immediately after harvesting for better market value",
          ],
          hi: [
            "नमी हानि को कम करने के लिए दिन के ठंडे घंटों के दौरान कटाई करें",
            "साफ और अच्छी तरह से बनाए रखे गए कटाई उपकरणों का उपयोग करें",
            "बेहतर बाजार मूल्य के लिए कटाई के तुरंत बाद उपज को छांटें और ग्रेड करें",
          ],
        },
      },
    ],
    inputs: {
      seeds: { cost: 2000, unit: "per hectare" },
      fertilizer: { cost: 5000, unit: "per hectare" },
      labor: { cost: 15000, unit: "per hectare" },
      irrigation: { cost: 3000, unit: "per hectare" },
      pesticides: { cost: 2500, unit: "per hectare" },
      harvesting: { cost: 4000, unit: "per hectare" },
    },
    yield: { min: 30, max: 50, unit: "quintals per hectare" },
  },
}

export default function LearningPage() {
  const { t, language } = useLanguage()
  const { selectedCrop, setSelectedCrop } = useCrop()
  const [landArea, setLandArea] = useState("1")

  const crop = cropData[selectedCrop as keyof typeof cropData] || cropData.default

  // Calculate potential profit
  const areaInHectares = Number.parseFloat(landArea) || 0
  const totalCost = Object.values(crop.inputs).reduce((sum, input) => sum + input.cost, 0) * areaInHectares
  const minYield = crop.yield.min * areaInHectares
  const maxYield = crop.yield.max * areaInHectares
  const pricePerQuintal = Number.parseInt(crop.currentPrice.replace(/[^\d]/g, ""))
  const minRevenue = minYield * pricePerQuintal
  const maxRevenue = maxYield * pricePerQuintal
  const minProfit = minRevenue - totalCost
  const maxProfit = maxRevenue - totalCost

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("learning")}</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                {language === "en"
                  ? "Learn how to grow different crops and calculate potential profits"
                  : "विभिन्न फसलों को उगाने का तरीका जानें और संभावित लाभ की गणना करें"}
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-5xl">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <Label htmlFor="crop-select">{t("selectCrop")}</Label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder={t("selectCrop")} />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map((cropItem) => (
                        <SelectItem key={cropItem.value} value={cropItem.value}>
                          {cropItem.label[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="land-area">{language === "en" ? "Land Area (Hectares)" : "भूमि क्षेत्र (हेक्टेयर)"}</Label>
                    <Input
                      id="land-area"
                      type="number"
                      value={landArea}
                      onChange={(e) => setLandArea(e.target.value)}
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              <Tabs defaultValue="growing">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="growing">{t("howToGrow")}</TabsTrigger>
                  <TabsTrigger value="market">{t("currentPrice")}</TabsTrigger>
                  <TabsTrigger value="profit">{t("potentialProfit")}</TabsTrigger>
                </TabsList>

                <TabsContent value="growing" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{crop.name[language]}</CardTitle>
                      <CardDescription>
                        {language === "en"
                          ? "Step-by-step guide to growing this crop"
                          : "इस फसल को उगाने के लिए चरण-दर-चरण मार्गदर्शिका"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="flex justify-center">
                          <Image
                            src={`/placeholder.svg?height=300&width=600&text=${crop.name[language]}`}
                            alt={crop.name[language]}
                            width={600}
                            height={300}
                            className="rounded-lg object-cover"
                          />
                        </div>

                        <div className="space-y-8">
                          {crop.growingSteps.map((step, index) => (
                            <div key={index} className="space-y-4">
                              <h3 className="text-xl font-medium">
                                {index + 1}. {step.title[language]}
                              </h3>
                              <p className="text-muted-foreground">{step.description[language]}</p>

                              {step.tips && (
                                <div className="mt-4 rounded-lg bg-muted p-4">
                                  <h4 className="mb-2 font-medium">{language === "en" ? "Pro Tips:" : "प्रो टिप्स:"}</h4>
                                  <ul className="space-y-1 text-sm">
                                    {step.tips[language].map((tip, tipIndex) => (
                                      <li key={tipIndex} className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>{tip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="market" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Market Information" : "बाजार जानकारी"}</CardTitle>
                      <CardDescription>
                        {language === "en" ? "Current market prices and trends" : "वर्तमान बाजार मूल्य और रुझान"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="rounded-lg bg-muted p-6 text-center">
                          <h3 className="text-3xl font-bold">{crop.currentPrice}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {language === "en" ? "Current Market Price" : "वर्तमान बाजार मूल्य"}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">{language === "en" ? "Price Trends" : "मूल्य प्रवृत्तियां"}</h3>
                          <div className="h-[300px] w-full bg-muted flex items-center justify-center">
                            <p className="text-muted-foreground">
                              {language === "en"
                                ? "Price trend chart will be displayed here"
                                : "मूल्य प्रवृत्ति चार्ट यहां प्रदर्शित किया जाएगा"}
                            </p>
                          </div>

                          <div className="grid gap-2">
                            <h4 className="font-medium">{language === "en" ? "Market Insights" : "बाजार अंतर्दृष्टि"}</h4>
                            <ul className="grid gap-2 text-sm">
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                {language === "en"
                                  ? `Expected to ${pricePerQuintal > 2000 ? "increase" : "decrease"} by 5-10% in the next quarter`
                                  : `अगली तिमाही में 5-10% ${pricePerQuintal > 2000 ? "बढ़ने" : "घटने"} की उम्मीद है`}
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                {language === "en"
                                  ? "Demand is seasonally higher during festival months"
                                  : "त्योहार के महीनों के दौरान मांग मौसमी रूप से अधिक होती है"}
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                {language === "en"
                                  ? "Government MSP is ₹1,940 per quintal for this crop"
                                  : "इस फसल के लिए सरकारी MSP ₹1,940 प्रति क्विंटल है"}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="profit" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Profit Calculator" : "लाभ कैलकुलेटर"}</CardTitle>
                      <CardDescription>
                        {language === "en"
                          ? `Calculate potential profit for ${landArea} hectare(s)`
                          : `${landArea} हेक्टेयर के लिए संभावित लाभ की गणना करें`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">
                                {language === "en" ? "Input Costs" : "इनपुट लागत"}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {Object.entries(crop.inputs).map(([key, input]) => (
                                  <li key={key} className="flex justify-between text-sm">
                                    <span className="capitalize">{key}</span>
                                    <span>₹{(input.cost * areaInHectares).toLocaleString()}</span>
                                  </li>
                                ))}
                                <li className="flex justify-between font-bold pt-2 border-t">
                                  <span>{language === "en" ? "Total Cost" : "कुल लागत"}</span>
                                  <span>₹{totalCost.toLocaleString()}</span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">
                                {language === "en" ? "Expected Revenue" : "अपेक्षित राजस्व"}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="text-sm font-medium mb-2">
                                    {language === "en" ? "Expected Yield" : "अपेक्षित उपज"}
                                  </h4>
                                  <p className="text-sm">
                                    {minYield.toLocaleString()} - {maxYield.toLocaleString()} {crop.yield.unit}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="text-sm font-medium mb-2">
                                    {language === "en" ? "Current Price" : "वर्तमान मूल्य"}
                                  </h4>
                                  <p className="text-sm">{crop.currentPrice}</p>
                                </div>

                                <div className="pt-2 border-t">
                                  <h4 className="text-sm font-medium mb-2">
                                    {language === "en" ? "Total Revenue" : "कुल राजस्व"}
                                  </h4>
                                  <p className="text-sm">
                                    ₹{minRevenue.toLocaleString()} - ₹{maxRevenue.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card className="bg-muted">
                          <CardHeader>
                            <CardTitle>{language === "en" ? "Potential Profit" : "संभावित लाभ"}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-center">
                              <h3 className="text-3xl font-bold">
                                ₹{minProfit.toLocaleString()} - ₹{maxProfit.toLocaleString()}
                              </h3>
                              <p className="mt-2 text-sm text-muted-foreground">
                                {language === "en"
                                  ? `For ${landArea} hectare(s) of ${crop.name[language]}`
                                  : `${crop.name[language]} के ${landArea} हेक्टेयर के लिए`}
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            {language === "en" ? "Recommendations" : "सिफारिशें"}
                          </h3>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <p className="text-sm">
                                {language === "en"
                                  ? `Use high-quality seeds to maximize yield potential.`
                                  : `उपज क्षमता को अधिकतम करने के लिए उच्च गुणवत्ता वाले बीजों का उपयोग करें।`}
                              </p>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <p className="text-sm">
                                {language === "en"
                                  ? `Consider crop insurance to protect against weather uncertainties.`
                                  : `मौसम की अनिश्चितताओं से बचाव के लिए फसल बीमा पर विचार करें।`}
                              </p>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <p className="text-sm">
                                {language === "en"
                                  ? `Explore direct marketing to consumers for better prices.`
                                  : `बेहतर कीमतों के लिए उपभोक्ताओं को सीधे मार्केटिंग का पता लगाएं।`}
                              </p>
                            </li>
                          </ul>
                        </div>
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

