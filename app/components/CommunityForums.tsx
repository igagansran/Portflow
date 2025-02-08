"use client"

import Link from "next/link"
import { useState } from "react"
import { Camera, Image, WrenchIcon } from "lucide-react"

const forumCategories = [
  { id: "photography-tips", name: "Photography Tips", posts: 156, icon: Camera, color: "text-blue-500" },
  { id: "portfolio-feedback", name: "Portfolio Feedback", posts: 89, icon: Image, color: "text-green-500" },
  { id: "technical-support", name: "Technical Support", posts: 234, icon: WrenchIcon, color: "text-red-500" },
]

export default function CommunityForums() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-cherry text-center mb-8">Join Our Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {forumCategories.map((category) => (
            <Link
              key={category.id}
              href={`/forum/${category.id}`}
              className={`bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform ${
                hoveredCategory === category.id ? "scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className={`text-4xl mb-4 ${category.color}`}>
                <category.icon size={48} />
              </div>
              <h3 className="font-semibold text-cherry text-xl mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.posts} posts</p>
              <p className="mt-4 text-cherry font-medium">
                Join the discussion {hoveredCategory === category.id && "→"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

