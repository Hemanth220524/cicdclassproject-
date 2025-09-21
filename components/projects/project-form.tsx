"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, X } from "lucide-react"

const categories = [
  "Web Development",
  "Mobile Development",
  "Design",
  "Writing",
  "Marketing",
  "Data Science",
  "DevOps",
  "Other",
]

const commonSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "PHP",
  "Java",
  "C++",
  "UI/UX Design",
  "Graphic Design",
  "Logo Design",
  "Figma",
  "Adobe XD",
  "Content Writing",
  "Copywriting",
  "SEO",
  "Digital Marketing",
  "Data Analysis",
  "Machine Learning",
  "SQL",
  "MongoDB",
  "WordPress",
  "Shopify",
  "E-commerce",
  "Mobile Apps",
]

export function ProjectForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    budgetMin: "",
    budgetMax: "",
    projectType: "",
    durationEstimate: "",
    priority: "medium",
    deadline: "",
  })
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [customSkill, setCustomSkill] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (selectedSkills.length === 0) {
      setError("Please select at least one required skill")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          requiredSkills: selectedSkills,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/projects/${data.data.id}`)
      } else {
        setError(data.error || "Failed to create project")
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

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills((prev) => [...prev, skill])
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill))
  }

  const addCustomSkill = () => {
    if (customSkill.trim()) {
      addSkill(customSkill.trim())
      setCustomSkill("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>
          Provide detailed information about your project to attract the right freelancers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="e.g., Build a modern e-commerce website"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project in detail, including requirements, goals, and any specific preferences..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
              disabled={isLoading}
              rows={6}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Project Type</Label>
              <Select
                value={formData.projectType}
                onValueChange={(value) => handleInputChange("projectType", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                  <SelectItem value="hourly">Hourly Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budgetMin">Minimum Budget ($)</Label>
              <Input
                id="budgetMin"
                type="number"
                placeholder="1000"
                value={formData.budgetMin}
                onChange={(e) => handleInputChange("budgetMin", e.target.value)}
                required
                disabled={isLoading}
                min="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budgetMax">Maximum Budget ($)</Label>
              <Input
                id="budgetMax"
                type="number"
                placeholder="5000"
                value={formData.budgetMax}
                onChange={(e) => handleInputChange("budgetMax", e.target.value)}
                required
                disabled={isLoading}
                min="1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="durationEstimate">Estimated Duration</Label>
              <Input
                id="durationEstimate"
                placeholder="e.g., 2-3 weeks, 1 month"
                value={formData.durationEstimate}
                onChange={(e) => handleInputChange("durationEstimate", e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange("priority", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline (Optional)</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => handleInputChange("deadline", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-4">
            <Label>Required Skills</Label>

            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm">Popular Skills</Label>
              <div className="flex flex-wrap gap-2">
                {commonSkills
                  .filter((skill) => !selectedSkills.includes(skill))
                  .slice(0, 12)
                  .map((skill) => (
                    <Button
                      key={skill}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(skill)}
                      disabled={isLoading}
                    >
                      + {skill}
                    </Button>
                  ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add custom skill"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addCustomSkill()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={addCustomSkill}
                disabled={isLoading || !customSkill.trim()}
              >
                Add
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Project...
              </>
            ) : (
              "Post Project"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
