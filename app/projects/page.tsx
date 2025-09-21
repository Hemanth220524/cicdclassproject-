import { Header } from "@/components/layout/header"
import { ProjectFilters } from "@/components/projects/project-filters"
import { ProjectList } from "@/components/projects/project-list"
import { Suspense } from "react"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif mb-2">Find Work</h1>
          <p className="text-muted-foreground">Discover exciting projects from clients worldwide</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ProjectFilters />
            </Suspense>
          </div>
          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading projects...</div>}>
              <ProjectList />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
