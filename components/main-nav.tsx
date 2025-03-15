"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  const { t, language, setLanguage } = useLanguage()

  const routes = [
    {
      href: "/",
      label: t("home"),
      active: pathname === "/",
    },
    {
      href: "/learning",
      label: t("learning"),
      active: pathname === "/learning",
    },
    {
      href: "/analytics",
      label: t("analytics"),
      active: pathname === "/analytics",
    },
  ]

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLanguage("en")}>
            {t("english")} {language === "en" && "✓"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage("hi")}>
            {t("hindi")} {language === "hi" && "✓"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

