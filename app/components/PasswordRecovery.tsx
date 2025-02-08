"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Playfair_Display, Inter } from "next/font/google"
import { useToast } from "@/components/ui/use-toast"

const playfair = Playfair_Display({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })

export default function PasswordRecovery() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [step, setStep] = useState(1)
  const { toast } = useToast()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (response.ok) {
        toast({
          title: "Success",
          description: "OTP sent to your email address.",
        })
        setStep(2)
      } else {
        throw new Error("Failed to send OTP")
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })
      if (response.ok) {
        toast({
          title: "Success",
          description: "OTP verified successfully.",
        })
        setStep(3)
      } else {
        throw new Error("Invalid OTP")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      toast({
        title: "Error",
        description: "Invalid OTP. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      })
      if (response.ok) {
        toast({
          title: "Success",
          description: "Password reset successfully.",
        })
        // Redirect to login page
        window.location.href = "/login"
      } else {
        throw new Error("Failed to reset password")
      }
    } catch (error) {
      console.error("Error resetting password:", error)
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-[#c79d7f] ${inter.className}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className={`${playfair.className} text-3xl text-center text-[#c58f73]`}>
            Password Recovery
          </CardTitle>
          <CardDescription className="text-center">Reset your Portflow account password</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form onSubmit={handleSendOTP}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6 bg-[#c58f73] hover:bg-[#c79d7f] text-white">
                Send OTP
              </Button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6 bg-[#c58f73] hover:bg-[#c79d7f] text-white">
                Verify OTP
              </Button>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6 bg-[#c58f73] hover:bg-[#c79d7f] text-white">
                Reset Password
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

