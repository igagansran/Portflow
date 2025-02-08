"use client"

import { useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { useDropzone } from "react-dropzone"

// Import all template styles
import basicStyles from "../../styles/templates/basic.module.css"
import proStyles from "../../styles/templates/pro.module.css"

const templateStyles = {
  basic: basicStyles,
  pro: proStyles,
}

export default function CreatePortfolioPage() {
  const searchParams = useSearchParams()
  const [selectedTemplate] = useState(searchParams.get("template") || "basic")
  const [images, setImages] = useState<string[]>([])
  const [texts, setTexts] = useState<string[]>(["", "", "", ""])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        setImages((prevImages) => [...prevImages, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 4,
  })

  const handleTextChange = (index: number, value: string) => {
    const newTexts = [...texts]
    newTexts[index] = value
    setTexts(newTexts)
  }

  const styles = templateStyles[selectedTemplate as keyof typeof templateStyles]

  return (
    <div className={`${styles.container} p-4`}>
      <h1 className="text-3xl font-bold text-cherry mb-8">Create Your Portfolio</h1>

      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8 text-center">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the images here ...</p>
        ) : (
          <p>Drag 'n' drop up to 4 images here, or click to select files</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="relative">
            {images[index] ? (
              <Image
                src={images[index] || "/placeholder.svg"}
                alt={`Uploaded image ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">Image {index + 1}</span>
              </div>
            )}
            <textarea
              value={texts[index]}
              onChange={(e) => handleTextChange(index, e.target.value)}
              placeholder={`Enter text for image ${index + 1}`}
              className="mt-2 w-full p-2 border rounded"
              rows={3}
            />
          </div>
        ))}
      </div>

      <button className="bg-cherry text-white px-6 py-3 rounded hover:bg-cherry-light transition-colors">
        Save Portfolio
      </button>
    </div>
  )
}

