import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Search, MessageSquare, Settings, FileText, LucideUser } from "lucide-react"
import Link from "next/link"
import type { User } from "@/lib/types"

interface QuickActionsProps {
  user: User
}

export function QuickActions({ user }: QuickActionsProps) {
  const clientActions = [
    {
      title: "Post a Project",
      description: "Find the perfect freelancer for your next project",
      icon: Plus,
      href: "/projects/new",
      variant: "default" as const,
    },
    {
      title: "Browse Freelancers",
      description: "Discover talented professionals",
      icon: Search,
      href: "/freelancers",
      variant: "outline" as const,
    },
    {
      title: "Messages",
      description: "Chat with your freelancers",
      icon: MessageSquare,
      href: "/messages",
      variant: "outline" as const,
    },
    {
      title: "Account Settings",
      description: "Manage your profile and preferences",
      icon: Settings,
      href: "/settings",
      variant: "outline" as const,
    },
  ]

  const freelancerActions = [
    {
      title: "Find Work",
      description: "Browse available projects",
      icon: Search,
      href: "/projects",
      variant: "default" as const,
    },
    {
      title: "Update Portfolio",
      description: "Showcase your best work",
      icon: FileText,
      href: "/portfolio",
      variant: "outline" as const,
    },
    {
      title: "Messages",
      description: "Chat with your clients",
      icon: MessageSquare,
      href: "/messages",
      variant: "outline" as const,
    },
    {
      title: "Profile Settings",
      description: "Update your professional profile",
      icon: LucideUser,
      href: "/profile",
      variant: "outline" as const,
    },
  ]

  const actions = user.userType === "client" ? clientActions : freelancerActions

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => (
            <Button key={index} variant={action.variant} className="w-full justify-start h-auto p-4" asChild>
              <Link href={action.href}>
                <div className="flex items-start gap-3">
                  <action.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
