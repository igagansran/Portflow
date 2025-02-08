"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"

const templates = [
  {
    id: 1,
    name: "Minimal Portfolio",
    isPremium: false,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-sfv4SbrX2MMA8RtY4R8hua8s76x3Ba.png",
    style: "minimal",
    description: "A clean, modern portfolio template perfect for photographers and creatives.",
  },
  {
    id: 2,
    name: "Pro Gallery",
    isPremium: true,
    image: "/templates/pro.jpg",
    style: "pro",
    description: "Advanced portfolio template with premium features and layouts.",
  },
]

export default function TemplatesPage() {
  const router = useRouter()

  const handleTemplateSelection = (templateStyle: string, isPremium: boolean) => {
    if (isPremium) {
      router.push("/templates/pro")
    } else {
      router.push(`/templates/${templateStyle}`)
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#c79d7f] text-white px-4 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Choose Your Template</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col">
              <div className="relative h-48 sm:h-56 md:h-64">
                <Image src={template.image || "/placeholder.svg"} alt={template.name} layout="fill" objectFit="cover" />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#c58f73] mb-2">{template.name}</h2>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                </div>
                <div>
                  {template.isPremium ? (
                    <p className="text-[#c58f73] mb-2">Premium Template</p>
                  ) : (
                    <p className="text-green-600 mb-2">Free Template</p>
                  )}
                  <button
                    className="w-full bg-[#c58f73] text-white px-4 py-2 rounded hover:bg-[#c79d7f] transition-colors"
                    onClick={() => handleTemplateSelection(template.style, template.isPremium)}
                  >
                    {template.isPremium ? "Upgrade to Use" : "Use Template"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

