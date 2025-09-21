import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { ProjectDetails } from "@/components/projects/project-details"
import { ProposalForm } from "@/components/projects/proposal-form"
import { ProjectProposals } from "@/components/projects/project-proposals"
import { AuthService } from "@/lib/auth"
import { getProjectById } from "@/lib/database"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projectId = Number.parseInt(params.id)

  if (isNaN(projectId)) {
    notFound()
  }

  const project = await getProjectById(projectId)

  if (!project) {
    notFound()
  }

  const user = await AuthService.getCurrentUser()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProjectDetails project={project} />
            {user?.userType === "client" && user.id === project.clientId && <ProjectProposals projectId={project.id} />}
          </div>
          <div>
            {user ? (
              user.userType === "freelancer" ? (
                <ProposalForm project={project} />
              ) : user.id === project.clientId ? (
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Your Project</h3>
                  <p className="text-sm text-muted-foreground">
                    This is your project. You can view proposals from freelancers below.
                  </p>
                </div>
              ) : (
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Client View</h3>
                  <p className="text-sm text-muted-foreground">Switch to freelancer mode to submit proposals.</p>
                </div>
              )
            ) : (
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Sign in to Apply</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create an account to submit proposals for this project.
                </p>
                <a href="/register" className="text-primary hover:underline">
                  Sign up now
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
