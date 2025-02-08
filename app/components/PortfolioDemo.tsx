"use client"

import { useState } from "react"
import Image from "next/image"

export default function PortfolioDemo() {
  const [images, setImages] = useState<string[]>([])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-cherry text-center mb-8">Create Your Portfolio in Seconds</h2>
        <div
          className="border-4 border-dashed border-cherry rounded-lg p-12 text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {images.length === 0 ? (
            <p className="text-gray-500">Drag and drop your images here</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-w-1 aspect-h-1">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Uploaded image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

