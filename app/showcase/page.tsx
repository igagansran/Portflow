"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const initialPortfolios = [
  { id: 1, name: "John Doe", title: "Nature Photographer", image: "/portfolios/john-doe.jpg" },
  { id: 2, name: "Jane Smith", title: "Portrait Artist", image: "/portfolios/jane-smith.jpg" },
  { id: 3, name: "Mike Johnson", title: "Wedding Photographer", image: "/portfolios/mike-johnson.jpg" },
]

export default function ShowcasePage() {
  const [portfolios, setPortfolios] = useState(initialPortfolios)
  const [newPortfolio, setNewPortfolio] = useState({ name: "", title: "", image: null as File | null })
  const [suggestion, setSuggestion] = useState("")
  const { toast } = useToast()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPortfolio({ ...newPortfolio, image: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPortfolio.name && newPortfolio.title && newPortfolio.image) {
      const newId = Math.max(...portfolios.map((p) => p.id)) + 1
      setPortfolios([
        ...portfolios,
        {
          id: newId,
          name: newPortfolio.name,
          title: newPortfolio.title,
          image: URL.createObjectURL(newPortfolio.image),
        },
      ])
      setNewPortfolio({ name: "", title: "", image: null })
      toast({
        title: "Portfolio Added",
        description: "Your portfolio has been successfully added to the showcase.",
      })
    }
  }

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (suggestion) {
      // Here you would typically send the suggestion to your backend
      console.log("Suggestion submitted:", suggestion)
      setSuggestion("")
      toast({
        title: "Thank You!",
        description: "Your suggestion has been submitted successfully.",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-cherry mb-8">User Portfolios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="border rounded-lg overflow-hidden shadow-lg">
            <Image
              src={portfolio.image || "/placeholder.svg"}
              alt={portfolio.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-cherry">{portfolio.name}</h2>
              <p className="text-gray-600 mt-2">{portfolio.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold text-cherry mb-4">Add Your Portfolio</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={newPortfolio.name}
            onChange={(e) => setNewPortfolio({ ...newPortfolio, name: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="Your Title"
            value={newPortfolio.title}
            onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
            required
          />
          <Input type="file" accept="image/*" onChange={handleImageChange} required />
          <Button type="submit">Add Portfolio</Button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-cherry mb-4">Suggest an Improvement</h2>
        <form onSubmit={handleSuggestionSubmit} className="space-y-4">
          <Textarea
            placeholder="Your suggestion for improving Portflow..."
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            required
          />
          <Button type="submit">Submit Suggestion</Button>
        </form>
      </div>
    </div>
  )
}

