import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign, Eye } from "lucide-react"
import Link from "next/link"

const featuredProjects = [
  {
    id: 1,
    title: "E-commerce Website Development",
    description:
      "Need a modern e-commerce website built with React and Node.js. Should include user authentication, product catalog, shopping cart, and payment integration.",
    category: "Web Development",
    budget: "$3,000 - $5,000",
    duration: "6-8 weeks",
    proposals: 12,
    views: 156,
    skills: ["React", "Node.js", "JavaScript", "MySQL"],
    client: "TechStart Inc.",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Mobile App UI/UX Design",
    description:
      "Looking for a talented designer to create modern and intuitive UI/UX for our fitness tracking mobile app.",
    category: "Design",
    budget: "$1,500 - $2,500",
    duration: "3-4 weeks",
    proposals: 8,
    views: 89,
    skills: ["UI/UX Design", "Mobile App Development"],
    client: "FitLife Co.",
    posted: "1 day ago",
  },
  {
    id: 3,
    title: "SEO Optimization for Website",
    description:
      "Need comprehensive SEO optimization for our business website to improve search rankings and organic traffic.",
    category: "Marketing",
    budget: "$800 - $1,200",
    duration: "2-3 weeks",
    proposals: 15,
    views: 203,
    skills: ["SEO", "Digital Marketing"],
    client: "GrowBiz Ltd.",
    posted: "3 days ago",
  },
]

export function FeaturedProjects() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover exciting opportunities from top clients worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary">{project.category}</Badge>
                  <span className="text-sm text-muted-foreground">{project.posted}</span>
                </div>
                <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                <CardDescription className="line-clamp-3">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{project.budget}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{project.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {project.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>by {project.client}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{project.views}</span>
                      </div>
                      <span>{project.proposals} proposals</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href={`/projects/${project.id}`}>View Project</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
