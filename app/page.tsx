import { Header } from "@/components/layout/header"
import { Hero } from "@/components/home/hero"
import { FeaturedProjects } from "@/components/home/featured-projects"
import { TopFreelancers } from "@/components/home/top-freelancers"
import { HowItWorks } from "@/components/home/how-it-works"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedProjects />
        <TopFreelancers />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
