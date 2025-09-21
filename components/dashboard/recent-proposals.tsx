import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Clock } from "lucide-react"
import Link from "next/link"
import type { User } from "@/lib/types"

interface RecentProposalsProps {
  user: User
}

export function RecentProposals({ user }: RecentProposalsProps) {
  // Only show proposals for freelancers
  if (user.userType === "client") {
    return null
  }

  // Mock recent proposals
  const proposals = [
    {
      id: 1,
      projectTitle: "WordPress Website Redesign",
      status: "pending",
      proposedBudget: "$2,500",
      timeline: "4 weeks",
      client: "DesignCo",
      submittedAt: "2 days ago",
    },
    {
      id: 2,
      projectTitle: "Python Data Analysis Script",
      status: "accepted",
      proposedBudget: "$1,200",
      timeline: "2 weeks",
      client: "DataTech",
      submittedAt: "1 week ago",
    },
    {
      id: 3,
      projectTitle: "Social Media Graphics",
      status: "rejected",
      proposedBudget: "$600",
      timeline: "1 week",
      client: "SocialBuzz",
      submittedAt: "3 days ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "accepted":
        return "Accepted"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Proposals</CardTitle>
        <CardDescription>Your latest project proposals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">{proposal.projectTitle}</h3>
                  <Badge className={getStatusColor(proposal.status)}>{getStatusText(proposal.status)}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{proposal.proposedBudget}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{proposal.timeline}</span>
                  </div>
                  <span>Client: {proposal.client}</span>
                  <span>{proposal.submittedAt}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/proposals/${proposal.id}`}>View</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <Link href="/proposals">View All Proposals</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
