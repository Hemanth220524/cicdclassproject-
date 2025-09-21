import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, Users, Briefcase } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6 font-serif">
            Find the Perfect <span className="text-secondary">Freelancer</span> for Your Project
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Connect with skilled professionals worldwide. Post your project, review proposals, and hire the best talent
            for your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search for services..." className="pl-10" />
            </div>
            <Button size="lg" className="px-8">
              Search
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" asChild>
              <Link href="/register">Hire Freelancers</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Find Work</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">2M+ Freelancers</h3>
              <p className="text-sm text-muted-foreground">Skilled professionals ready to work</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">500K+ Projects</h3>
              <p className="text-sm text-muted-foreground">Successfully completed worldwide</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">4.9/5 Rating</h3>
              <p className="text-sm text-muted-foreground">Average client satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
