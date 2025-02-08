import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Reviews from "./components/Reviews"
import CommunityForums from "./components/CommunityForums"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cherry">
      <Header />
      <Hero />
      <Features />
      <Reviews />
      <CommunityForums />
      <FAQ />
      <Footer />
    </div>
  )
}

