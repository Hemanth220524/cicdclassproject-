"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, DollarSign, Clock, CheckCircle } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProposalFormProps {
  project: Project
}

export function ProposalForm({ project }: ProposalFormProps) {
  const [formData, setFormData] = useState({
    coverLetter: "",
    proposedBudget: "",
    proposedTimeline: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project.id,
          ...formData,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setError(data.error || "Failed to submit proposal")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (success) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="text-green-600 mb-4">
            <CheckCircle className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Proposal Submitted!</h3>
          <p className="text-muted-foreground">
            Your proposal has been sent to the client. You'll be redirected to your dashboard.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a Proposal</CardTitle>
        <CardDescription>Send your proposal to the client for this project</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              placeholder="Explain why you're the perfect fit for this project..."
              value={formData.coverLetter}
              onChange={(e) => handleInputChange("coverLetter", e.target.value)}
              required
              disabled={isLoading}
              rows={6}
            />
            <p className="text-xs text-muted-foreground">
              Describe your relevant experience and approach to this project
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="proposedBudget">Your Bid</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="proposedBudget"
                type="number"
                placeholder="Enter your bid amount"
                value={formData.proposedBudget}
                onChange={(e) => handleInputChange("proposedBudget", e.target.value)}
                required
                disabled={isLoading}
                className="pl-10"
                min="1"
                step="0.01"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Client budget: ${project.budgetMin.toLocaleString()} - ${project.budgetMax.toLocaleString()}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="proposedTimeline">Delivery Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="proposedTimeline"
                placeholder="e.g., 2 weeks, 1 month"
                value={formData.proposedTimeline}
                onChange={(e) => handleInputChange("proposedTimeline", e.target.value)}
                required
                disabled={isLoading}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">How long will it take you to complete this project?</p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Proposal"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
