import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, DollarSign, Eye, MapPin, Calendar, Star, CheckCircle } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectDetailsProps {
  project: Project
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const formatBudget = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{project.category}</Badge>
              <Badge className={getPriorityColor(project.priority)}>{project.priority} priority</Badge>
            </div>
            <span className="text-sm text-muted-foreground">Posted {getTimeAgo(project.createdAt)}</span>
          </div>
          <CardTitle className="text-2xl font-serif">{project.title}</CardTitle>
          <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{formatBudget(project.budgetMin, project.budgetMax)}</div>
                  <div className="text-sm text-muted-foreground">
                    {project.projectType === "fixed" ? "Fixed Price" : "Hourly Rate"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{project.durationEstimate}</div>
                  <div className="text-sm text-muted-foreground">Project Duration</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{project.viewsCount} views</div>
                  <div className="text-sm text-muted-foreground">Project Interest</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{project.proposalsCount} proposals</div>
                  <div className="text-sm text-muted-foreground">Received</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {project.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {project.client && (
        <Card>
          <CardHeader>
            <CardTitle>About the Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={project.client.profileImage || "/placeholder.svg"} alt={project.client.firstName} />
                <AvatarFallback>
                  {project.client.firstName[0]}
                  {project.client.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">
                    {project.client.firstName} {project.client.lastName}
                  </h3>
                  {project.client.verified && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{project.client.rating}/5</span>
                    <span>({project.client.totalReviews} reviews)</span>
                  </div>
                  {project.client.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{project.client.location}</span>
                    </div>
                  )}
                </div>

                {project.client.bio && <p className="text-sm text-muted-foreground">{project.client.bio}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
