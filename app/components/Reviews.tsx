"use client"

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import WriteReview from "./WriteReview"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"

interface Review {
  _id: string
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
  userId: string
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const { toast } = useToast()
  const { data: session } = useSession()

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch("/api/reviews")
      if (!response.ok) throw new Error("Failed to fetch reviews")
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error("Error fetching reviews:", error)
    }
  }, [])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete review")
      }
      toast({
        title: "Success",
        description: "Review deleted successfully.",
      })
      fetchReviews()
    } catch (error) {
      console.error("Error deleting review:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete review. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReviewSubmitted = () => {
    fetchReviews()
    setCurrentIndex(0) // Reset to the first review after a new submission
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-cherry text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative overflow-hidden h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full h-full"
              >
                {reviews[currentIndex] && (
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Image
                            src={reviews[currentIndex].avatar || "/placeholder.svg"}
                            alt={reviews[currentIndex].name}
                            width={48}
                            height={48}
                            className="rounded-full mr-4"
                          />
                          <div>
                            <h3 className="font-semibold text-cherry">{reviews[currentIndex].name}</h3>
                            <p className="text-gray-600 text-sm">{reviews[currentIndex].role}</p>
                          </div>
                        </div>
                        {session && session.user && session.user.id === reviews[currentIndex].userId && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(reviews[currentIndex]._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                      <p className="text-gray-700 mb-4">{reviews[currentIndex].content}</p>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= reviews[currentIndex].rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md" onClick={handlePrev}>
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md" onClick={handleNext}>
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
          <WriteReview onReviewSubmitted={handleReviewSubmitted} />
        </div>
      </div>
    </section>
  )
}

export default Reviews

