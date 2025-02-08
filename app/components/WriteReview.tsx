"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"

interface WriteReviewProps {
  onReviewSubmitted: () => void
}

export default function WriteReview({ onReviewSubmitted }: WriteReviewProps) {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const { toast } = useToast()
  const { data: session } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session || !session.user) {
      toast({
        title: "Error",
        description: "You must be signed in to submit a review.",
        variant: "destructive",
      })
      return
    }
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role,
          content,
          rating,
          userId: session.user.id,
        }),
      })
      if (response.ok) {
        setShowThankYou(true)
        setTimeout(() => {
          setShowThankYou(false)
          setName("")
          setRole("")
          setContent("")
          setRating(0)
          onReviewSubmitted()
        }, 3000)
      } else {
        throw new Error("Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!session) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-cherry mb-4">Write a Review</h3>
        <p className="text-gray-700">Please sign in to submit a review.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative">
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-cherry mb-2">Thank You!</h3>
              <p className="text-gray-700">Your review has been submitted successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <h3 className="text-2xl font-bold text-cherry mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-700">
            Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 text-gray-800"
          />
        </div>
        <div>
          <Label htmlFor="role" className="text-gray-700">
            Role
          </Label>
          <Input
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="mt-1 text-gray-800"
          />
        </div>
        <div>
          <Label htmlFor="content" className="text-gray-700">
            Your Review
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 text-gray-800"
          />
        </div>
        <div>
          <Label className="text-gray-700">Rating</Label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`focus:outline-none ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                <Star className={`w-6 h-6 ${star <= rating ? "fill-current" : ""}`} />
              </button>
            ))}
          </div>
        </div>
        <Button type="submit" className="w-full bg-cherry text-white hover:bg-cherry-light" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  )
}

