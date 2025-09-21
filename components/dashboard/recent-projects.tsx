import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign, Eye } from "lucide-react"
import Link from "next/link"
import type { User } from "@/lib/types"

interface RecentProjectsProps {
  user: User
}

export function RecentProjects({ user }: RecentProjectsProps) {
  // Mock recent projects based on user type
  const projects =
    user.userType === "client"
      ? [
          {
            id: 1,
            title: "E-commerce Website Development",
            status: "in_progress",
            budget: "$4,200",
            proposals: 12,
            freelancer: "John Doe",
            deadline: "2 weeks",
          },
          {
            id: 2,
            title: "Mobile App UI/UX Design",
            status: "open",
            budget: "$2,000",
            proposals: 8,
            freelancer: null,
            deadline: "3 weeks",
          },
        ]
      : [
          {
            id: 1,
            title: "React Dashboard Development",
            status: "in_progress",
            budget: "$3,500",
            client: "TechCorp Inc.",
            deadline: "1 week",
          },
          {
            id: 2,
            title: "Logo Design for Startup",
            status: "completed",
            budget: "$800",
            client: "StartupXYZ",
            deadline: "Completed",
          },
        ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Open"
      case "in_progress":
        return "In Progress"
      case "completed":
        return "Completed"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
        <CardDescription>
          {user.userType === "client" ? "Your posted projects" : "Projects you're working on"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">{project.title}</h3>
                  <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{project.budget}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{project.deadline}</span>
                  </div>
                  {user.userType === "client" && "proposals" in project && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{project.proposals} proposals</span>
                    </div>
                  )}
                  {user.userType === "freelancer" && "client" in project && <span>Client: {project.client}</span>}
                  {user.userType === "client" && "freelancer" in project && project.freelancer && (
                    <span>Freelancer: {project.freelancer}</span>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/projects/${project.id}`}>View</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
