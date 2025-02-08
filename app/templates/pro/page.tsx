import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProGalleryComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c79d7f]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Pro Gallery Coming Soon!</h1>
        <p className="text-xl text-white mb-8">We're working hard to bring you our premium template. Stay tuned!</p>
        <Button asChild>
          <Link href="/templates" className="bg-white text-[#c58f73] hover:bg-gray-100">
            Back to Templates
          </Link>
        </Button>
      </div>
    </div>
  )
}

