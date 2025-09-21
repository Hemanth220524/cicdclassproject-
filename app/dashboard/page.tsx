import { redirect } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { Header } from "@/components/layout/header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentProjects } from "@/components/dashboard/recent-projects"
import { RecentProposals } from "@/components/dashboard/recent-proposals"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default async function DashboardPage() {
  const user = await AuthService.getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif mb-2">Welcome back, {user.firstName}!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your {user.userType === "client" ? "projects" : "freelance work"} today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DashboardStats user={user} />
            <RecentProjects user={user} />
            <RecentProposals user={user} />
          </div>
          <div>
            <QuickActions user={user} />
          </div>
        </div>
      </main>
    </div>
  )
}
