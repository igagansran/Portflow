"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import DemoInstructions from "./DemoInstructions"
import SignInPopup from "./SignInPopup"

export default function Hero() {
  const [isDemoInstructionsOpen, setIsDemoInstructionsOpen] = useState(false)
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false)
  const { data: session } = useSession()

  const handleGetStarted = () => {
    if (session) {
      // If user is signed in, navigate to templates page
      window.location.href = "/templates"
    } else {
      // If user is not signed in, open sign-in popup
      setIsSignInPopupOpen(true)
    }
  }

  return (
    <div className="relative bg-cherry text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-cherry sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Your photography,</span>{" "}
                <span className="block text-baby-pink xl:inline">beautifully showcased</span>
              </h1>
              <p className="mt-3 text-base text-baby-pink sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Create stunning portfolios in minutes with Portflow - the ultimate platform for photographers to
                showcase their work and attract clients.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={handleGetStarted}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-cherry bg-baby-pink hover:bg-baby-pink-dark md:py-4 md:text-lg md:px-10"
                  >
                    {session ? "Get started" : "Sign in to get started"}
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => setIsDemoInstructionsOpen(true)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-baby-pink bg-cherry-light hover:bg-cherry md:py-4 md:text-lg md:px-10"
                  >
                    View demo
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <DemoInstructions isOpen={isDemoInstructionsOpen} onClose={() => setIsDemoInstructionsOpen(false)} />
      <SignInPopup isOpen={isSignInPopupOpen} onClose={() => setIsSignInPopupOpen(false)} />
    </div>
  )
}

