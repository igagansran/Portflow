"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { CameraIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeaturesPopup from "./FeaturesPopup"
import PricingPopup from "./PricingPopup"
import { useTheme } from "next-themes"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false)
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignIn = () => {
    signIn("google", { callbackUrl: "/" })
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="bg-background text-foreground shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <CameraIcon className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Portflow</span>
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsFeaturesOpen(true)}
              >
                Features
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setIsPricingOpen(true)}
              >
                Pricing
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="text-foreground hover:text-primary transition-colors" asChild>
                <Link href="/showcase">Showcase</Link>
              </Button>
            </li>
            <li>
              {session ? (
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  Sign In
                </Button>
              )}
            </li>
            <li>
              <Button
                variant="ghost"
                className="text-foreground hover:text-primary transition-colors"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </Button>
            </li>
          </ul>
        </div>
      </nav>
      <FeaturesPopup isOpen={isFeaturesOpen} onClose={() => setIsFeaturesOpen(false)} />
      <PricingPopup isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </header>
  )
}

