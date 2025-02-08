import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const features = [
  {
    title: "Customizable Templates",
    description: "Choose from a variety of professionally designed templates and customize them to fit your style.",
    icon: "🎨",
  },
  {
    title: "Drag-and-Drop Interface",
    description: "Easily arrange your portfolio with our intuitive drag-and-drop interface.",
    icon: "🖱️",
  },
  {
    title: "Responsive Design",
    description: "Your portfolio will look great on any device, from desktop to mobile.",
    icon: "📱",
  },
  {
    title: "SEO Optimization",
    description: "Built-in SEO tools to help your portfolio rank higher in search results.",
    icon: "🔍",
  },
  {
    title: "Analytics Dashboard",
    description: "Track your portfolio's performance with detailed analytics and insights.",
    icon: "📊",
  },
  {
    title: "Client Proofing",
    description: "Securely share and get approval on your work with built-in client proofing tools.",
    icon: "✅",
  },
]

interface FeaturesPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeaturesPopup({ isOpen, onClose }: FeaturesPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Portflow Features</DialogTitle>
          <DialogDescription>Discover the powerful features that make Portflow stand out.</DialogDescription>
        </DialogHeader>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <div className="grid grid-cols-1 gap-4 py-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="text-3xl">{feature.icon}</div>
              <div>
                <h4 className="text-sm font-semibold">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

