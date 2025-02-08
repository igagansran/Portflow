import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface DemoInstructionsProps {
  isOpen: boolean
  onClose: () => void
}

export default function DemoInstructions({ isOpen, onClose }: DemoInstructionsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white text-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cherry">Portflow Demo Instructions</DialogTitle>
          <DialogDescription className="text-gray-600">
            Follow these steps to explore Portflow's features
          </DialogDescription>
        </DialogHeader>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <div className="py-4">
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click on "Get Started" to view available templates</li>
            <li>Choose a template that suits your style</li>
            <li>Customize your portfolio by adding your own images and text</li>
            <li>Explore the drag-and-drop interface to rearrange elements</li>
            <li>Preview your portfolio to see how it looks</li>
            <li>Visit the "Showcase" page to see examples from other users</li>
            <li>Check out the "Community Forums" to connect with other photographers</li>
          </ol>
          <p className="mt-4 text-sm text-gray-600">
            Feel free to explore all features and don't hesitate to reach out if you have any questions!
          </p>
        </div>
        <Button className="w-full bg-cherry text-white hover:bg-cherry-light" onClick={onClose}>
          Start Demo
        </Button>
      </DialogContent>
    </Dialog>
  )
}

