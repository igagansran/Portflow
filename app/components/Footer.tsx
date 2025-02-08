import { Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="https://instagram.com/igagansran"
            className="text-baby-pink hover:text-baby-pink-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/gagandeep-singh-28929b1b2/"
            className="text-baby-pink hover:text-baby-pink-dark"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-baby-pink">&copy; 2023 Portflow, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

