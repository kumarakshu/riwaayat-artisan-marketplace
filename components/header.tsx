"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import { useAuthContext } from "@/components/auth-provider"
import { useLanguage } from "@/contexts/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuthContext()
  const { language, setLanguage, t } = useLanguage()

  const handleLogout = async () => {
    await signOut()
  }

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/images/peacock-logo.png" alt="Riwaayat Logo" width={32} height={32} className="h-8 w-8" />
            <span className="text-xl riwaayat-handwritten text-foreground">रिवायत</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("features")}
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("howItWorks")}
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("stories")}
            </Link>
            {!user && (
              <Link
                href="/artisan/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("login")}
              </Link>
            )}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  {language === "en" ? "EN" : "हि"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("hi")}>हिंदी (Hindi)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <>
                <Button variant="outline" asChild>
                  <Link href="/artisan/dashboard">{t("dashboard")}</Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  {t("logout")}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/artisan/login">{t("signIn")}</Link>
                </Button>
                <Button asChild>
                  <Link href="/artisan/register">{t("getStarted")}</Link>
                </Button>
              </>
            )}
          </div>

          <div className="hidden md:flex lg:hidden items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("hi")}>हिंदी</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>EN</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <Button variant="outline" size="sm" asChild>
                <Link href="/artisan/dashboard">{t("dashboard")}</Link>
              </Button>
            ) : (
              <Button size="sm" asChild>
                <Link href="/artisan/register">{t("getStarted")}</Link>
              </Button>
            )}
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-4 pb-6 space-y-3 border-t bg-background/95">
              <Link
                href="#features"
                className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                onClick={handleNavClick}
              >
                {t("features")}
              </Link>
              <Link
                href="#how-it-works"
                className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                onClick={handleNavClick}
              >
                {t("howItWorks")}
              </Link>
              <Link
                href="#testimonials"
                className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                onClick={handleNavClick}
              >
                {t("stories")}
              </Link>

              <div className="px-4 py-2">
                <div className="flex items-center space-x-2 mb-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">{t("language")}</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant={language === "hi" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("hi")}
                    className="flex-1"
                  >
                    हिंदी
                  </Button>
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("en")}
                    className="flex-1"
                  >
                    English
                  </Button>
                </div>
              </div>

              <div className="px-4 pt-4 space-y-3 border-t">
                {user ? (
                  <>
                    <Button variant="outline" className="w-full justify-center bg-transparent" asChild>
                      <Link href="/artisan/dashboard" onClick={handleNavClick}>
                        {t("dashboard")}
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-center"
                      onClick={() => {
                        handleLogout()
                        handleNavClick()
                      }}
                    >
                      {t("logout")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full justify-center bg-transparent" asChild>
                      <Link href="/artisan/login" onClick={handleNavClick}>
                        {t("signIn")}
                      </Link>
                    </Button>
                    <Button className="w-full justify-center" asChild>
                      <Link href="/artisan/register" onClick={handleNavClick}>
                        {t("getStarted")}
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
