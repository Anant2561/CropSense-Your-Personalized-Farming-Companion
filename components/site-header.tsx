"use client"

import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { useLanguage } from "@/components/language-provider"

export function SiteHeader() {
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <h1 className="hidden font-bold sm:inline-block">{t("cropSense")}</h1>
          <MainNav />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

