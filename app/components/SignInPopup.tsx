"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"

interface SignInPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignInPopup({ isOpen, onClose }: SignInPopupProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/templates" })
    } catch (error) {
      console.error("Error signing in:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in to Get Started</DialogTitle>
          <DialogDescription>Sign in to access all features and create your portfolio.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 pt-4">
          <Button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2"
          >
            <FcGoogle className="w-5 h-5" />
            <span>{isLoading ? "Signing in..." : "Sign in with Google"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

