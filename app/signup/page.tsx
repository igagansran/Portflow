"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Playfair_Display, Inter } from "next/font/google"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

const playfair = Playfair_Display({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (response.ok) {
        toast({
          title: "Success",
          description: "Account created successfully. Please log in.",
        })
        router.push("/login")
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error("Signup error:", error)
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-[#c79d7f] ${inter.className}`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className={`${playfair.className} text-3xl text-center text-[#c58f73]`}>Create Account</CardTitle>
          <CardDescription className="text-center">Sign up for your Portflow account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
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
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6 bg-[#c58f73] hover:bg-[#c79d7f] text-white">
              Sign Up
            </Button>
          </form>
          <div className="mt-4">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            >
              <FcGoogle className="mr-2" />
              Sign up with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login" className="text-sm text-[#c58f73] hover:underline">
            Already have an account? Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

