import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, DollarSign } from "lucide-react"
import Link from "next/link"

const topFreelancers = [
  {
    id: 1,
    name: "John Doe",
    title: "Full-Stack Developer",
    location: "New York, NY",
    rating: 4.8,
    reviews: 24,
    hourlyRate: 75,
    skills: ["React", "Node.js", "JavaScript", "Python"],
    avatar: "/professional-developer.png",
    verified: true,
    completedProjects: 45,
  },
  {
    id: 2,
    name: "Mike Wilson",
    title: "UI/UX Designer",
    location: "Austin, TX",
    rating: 4.7,
    reviews: 18,
    hourlyRate: 65,
    skills: ["UI/UX Design", "Figma", "Adobe XD", "Prototyping"],
    avatar: "/ui-designer.jpg",
    verified: true,
    completedProjects: 32,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    title: "Digital Marketing Expert",
    location: "Los Angeles, CA",
    rating: 4.6,
    reviews: 31,
    hourlyRate: 55,
    skills: ["SEO", "Content Marketing", "Social Media", "Analytics"],
    avatar: "/marketing-expert.png",
    verified: true,
    completedProjects: 67,
  },
  {
    id: 4,
    name: "Alex Brown",
    title: "Python Developer",
    location: "Seattle, WA",
    rating: 4.9,
    reviews: 15,
    hourlyRate: 85,
    skills: ["Python", "Django", "Machine Learning", "AI"],
    avatar: "/python-developer.png",
    verified: true,
    completedProjects: 28,
  },
]

export function TopFreelancers() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif">Top Freelancers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Work with verified professionals who deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {topFreelancers.map((freelancer) => (
            <Card key={freelancer.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Avatar className="h-20 w-20 mx-auto mb-3">
                    <AvatarImage src={freelancer.avatar || "/placeholder.svg"} alt={freelancer.name} />
                    <AvatarFallback className="text-lg">
                      {freelancer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{freelancer.name}</h3>
                  <p className="text-muted-foreground">{freelancer.title}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{freelancer.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({freelancer.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{freelancer.location}</span>
                  </div>

                  <div className="flex items-center justify-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">${freelancer.hourlyRate}/hr</span>
                  </div>

                  <div className="flex flex-wrap gap-1 justify-center">
                    {freelancer.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {freelancer.skills.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{freelancer.skills.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    {freelancer.completedProjects} projects completed
                  </div>

                  <Button className="w-full" asChild>
                    <Link href={`/freelancers/${freelancer.id}`}>View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/freelancers">View All Freelancers</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
