import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface PricingPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function PricingPopup({ isOpen, onClose }: PricingPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Premium Features Coming Soon!</DialogTitle>
          <DialogDescription>
            We're working hard to bring you premium features and more design integrations.
          </DialogDescription>
        </DialogHeader>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-2">Stay tuned for:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Advanced customization options</li>
            <li>Expanded template library</li>
            <li>Priority support</li>
            <li>Collaboration tools</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Plus, we're creating a marketplace for Figma designers to sell their portfolio templates!
          </p>
        </div>
        <Button className="w-full" onClick={onClose}>
          Got it, thanks!
        </Button>
      </DialogContent>
    </Dialog>
  )
}

