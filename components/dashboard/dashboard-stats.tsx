import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Briefcase, Star, TrendingUp } from "lucide-react"
import type { User } from "@/lib/types"

interface DashboardStatsProps {
  user: User
}

export function DashboardStats({ user }: DashboardStatsProps) {
  // Mock stats based on user type
  const stats =
    user.userType === "client"
      ? [
          {
            title: "Total Spent",
            value: "$12,450",
            change: "+12%",
            icon: DollarSign,
          },
          {
            title: "Active Projects",
            value: "3",
            change: "+1",
            icon: Briefcase,
          },
          {
            title: "Completed Projects",
            value: "18",
            change: "+2",
            icon: Star,
          },
          {
            title: "Success Rate",
            value: "94%",
            change: "+2%",
            icon: TrendingUp,
          },
        ]
      : [
          {
            title: "Total Earned",
            value: "$8,750",
            change: "+18%",
            icon: DollarSign,
          },
          {
            title: "Active Projects",
            value: "2",
            change: "0",
            icon: Briefcase,
          },
          {
            title: "Completed Projects",
            value: "24",
            change: "+3",
            icon: Star,
          },
          {
            title: "Client Rating",
            value: `${user.rating}/5`,
            change: "+0.1",
            icon: TrendingUp,
          },
        ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
