"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type CropContextType = {
  selectedCrop: string
  setSelectedCrop: (crop: string) => void
}

const CropContext = createContext<CropContextType | undefined>(undefined)

export function CropProvider({ children }: { children: ReactNode }) {
  const [selectedCrop, setSelectedCrop] = useState("rice")

  return <CropContext.Provider value={{ selectedCrop, setSelectedCrop }}>{children}</CropContext.Provider>
}

export function useCrop() {
  const context = useContext(CropContext)
  if (context === undefined) {
    throw new Error("useCrop must be used within a CropProvider")
  }
  return context
}

