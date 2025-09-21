import { redirect } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { Header } from "@/components/layout/header"
import { ProjectForm } from "@/components/projects/project-form"

export default async function NewProjectPage() {
  const user = await AuthService.getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  if (user.userType === "freelancer") {
    redirect("/projects")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-serif mb-2">Post a New Project</h1>
            <p className="text-muted-foreground">Describe your project and find the perfect freelancer</p>
          </div>
          <ProjectForm />
        </div>
      </main>
    </div>
  )
}
