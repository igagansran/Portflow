"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"

// Import all template styles
import basicStyles from "../../styles/templates/basic.module.css"
import proStyles from "../../styles/templates/pro.module.css"

const templateStyles = {
  basic: basicStyles,
  pro: proStyles,
}

// Mock data for the portfolio
const portfolioImages = [
  "/portfolio/image1.jpg",
  "/portfolio/image2.jpg",
  "/portfolio/image3.jpg",
  "/portfolio/image4.jpg",
  "/portfolio/image5.jpg",
  "/portfolio/image6.jpg",
]

export default function PortfolioPage() {
  const searchParams = useSearchParams()
  const [selectedTemplate, setSelectedTemplate] = useState("basic")

  useEffect(() => {
    const template = searchParams.get("template")
    if (template && template in templateStyles) {
      setSelectedTemplate(template)
    }
  }, [searchParams])

  const styles = templateStyles[selectedTemplate as keyof typeof templateStyles]

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="text-4xl font-bold text-cherry mb-4">Your Portfolio</h1>
        <p className="text-xl text-gray-600">Showcasing your best work</p>
      </header>
      <div className={styles.gallery}>
        {portfolioImages.map((src, index) => (
          <Image
            key={index}
            src={src || "/placeholder.svg"}
            alt={`Portfolio image ${index + 1}`}
            width={400}
            height={300}
            className={styles.image}
          />
        ))}
      </div>
    </div>
  )
}

