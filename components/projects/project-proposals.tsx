"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DollarSign, Clock, Star, MessageSquare } from "lucide-react"

interface Proposal {
  id: number
  freelancerId: number
  coverLetter: string
  proposedBudget: number
  proposedTimeline: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
  freelancer?: {
    id: number
    firstName: string
    lastName: string
    profileImage?: string
    rating: number
    totalReviews: number
    location?: string
  }
}

interface ProjectProposalsProps {
  projectId: number
}

export function ProjectProposals({ projectId }: ProjectProposalsProps) {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProposals()
  }, [projectId])

  const fetchProposals = async () => {
    try {
      const response = await fetch(`/api/proposals?projectId=${projectId}`)
      const data = await response.json()

      if (data.success) {
        // Mock freelancer data for proposals
        const proposalsWithFreelancers = data.data.map((proposal: Proposal) => ({
          ...proposal,
          freelancer: {
            id: proposal.freelancerId,
            firstName: "John",
            lastName: "Doe",
            rating: 4.8,
            totalReviews: 24,
            location: "New York, NY",
          },
        }))
        setProposals(proposalsWithFreelancers)
      }
    } catch (error) {
      console.error("Failed to fetch proposals:", error)
    } finally {
      setLoading(false)
    }
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proposals ({proposals.length})</CardTitle>
        <CardDescription>Review proposals from freelancers interested in your project</CardDescription>
      </CardHeader>
      <CardContent>
        {proposals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No proposals yet.</p>
            <p className="text-sm text-muted-foreground">Freelancers will start submitting proposals soon.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={proposal.freelancer?.profileImage || "/placeholder.svg"}
                        alt={proposal.freelancer?.firstName}
                      />
                      <AvatarFallback>
                        {proposal.freelancer?.firstName[0]}
                        {proposal.freelancer?.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">
                        {proposal.freelancer?.firstName} {proposal.freelancer?.lastName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{proposal.freelancer?.rating}/5</span>
                          <span>({proposal.freelancer?.totalReviews} reviews)</span>
                        </div>
                        {proposal.freelancer?.location && <span>• {proposal.freelancer.location}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{getTimeAgo(proposal.createdAt)}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm leading-relaxed">{proposal.coverLetter}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">${proposal.proposedBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{proposal.proposedTimeline}</span>
                    </div>
                  </div>

                  {proposal.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button size="sm">Accept</Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
