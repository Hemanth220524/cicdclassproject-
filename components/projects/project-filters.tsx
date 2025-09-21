"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter } from "lucide-react"

const categories = [
  "All Categories",
  "Web Development",
  "Mobile Development",
  "Design",
  "Writing",
  "Marketing",
  "Data Science",
  "DevOps",
]

const projectTypes = [
  { id: "fixed", label: "Fixed Price" },
  { id: "hourly", label: "Hourly Rate" },
]

const experienceLevels = [
  { id: "entry", label: "Entry Level" },
  { id: "intermediate", label: "Intermediate" },
  { id: "expert", label: "Expert" },
]

export function ProjectFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "All Categories",
    minBudget: searchParams.get("minBudget") || "",
    maxBudget: searchParams.get("maxBudget") || "",
    projectType: searchParams.get("projectType") || "",
    experienceLevel: searchParams.get("experienceLevel") || "",
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "All Categories") {
        params.set(key, value)
      }
    })

    router.push(`/projects?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "All Categories",
      minBudget: "",
      maxBudget: "",
      projectType: "",
      experienceLevel: "",
    })
    router.push("/projects")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search">Search Projects</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="search"
              placeholder="Search by title, skills..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger>
              <SelectValue />
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
          <Label>Budget Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={filters.minBudget}
              onChange={(e) => handleFilterChange("minBudget", e.target.value)}
            />
            <Input
              placeholder="Max"
              type="number"
              value={filters.maxBudget}
              onChange={(e) => handleFilterChange("maxBudget", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Project Type</Label>
          {projectTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={filters.projectType === type.id}
                onCheckedChange={(checked) => handleFilterChange("projectType", checked ? type.id : "")}
              />
              <Label htmlFor={type.id} className="text-sm font-normal">
                {type.label}
              </Label>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Label>Experience Level</Label>
          {experienceLevels.map((level) => (
            <div key={level.id} className="flex items-center space-x-2">
              <Checkbox
                id={level.id}
                checked={filters.experienceLevel === level.id}
                onCheckedChange={(checked) => handleFilterChange("experienceLevel", checked ? level.id : "")}
              />
              <Label htmlFor={level.id} className="text-sm font-normal">
                {level.label}
              </Label>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
          <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
