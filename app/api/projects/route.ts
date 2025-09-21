import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { getProjects, createProject } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const minBudget = searchParams.get("minBudget")
    const maxBudget = searchParams.get("maxBudget")

    let projects = await getProjects()

    // Apply filters
    if (category && category !== "all") {
      projects = projects.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    }

    if (search) {
      const searchLower = search.toLowerCase()
      projects = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.requiredSkills.some((skill) => skill.toLowerCase().includes(searchLower)),
      )
    }

    if (minBudget) {
      projects = projects.filter((p) => p.budgetMin >= Number.parseInt(minBudget))
    }

    if (maxBudget) {
      projects = projects.filter((p) => p.budgetMax <= Number.parseInt(maxBudget))
    }

    return NextResponse.json({
      success: true,
      data: projects,
    })
  } catch (error) {
    console.error("Get projects error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await AuthService.getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    if (user.userType === "freelancer") {
      return NextResponse.json({ success: false, error: "Only clients can post projects" }, { status: 403 })
    }

    const projectData = await request.json()

    const {
      title,
      description,
      category,
      budgetMin,
      budgetMax,
      projectType,
      durationEstimate,
      priority,
      deadline,
      requiredSkills,
    } = projectData

    if (!title || !description || !category || !budgetMin || !budgetMax || !projectType || !requiredSkills) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const project = await createProject({
      clientId: user.id,
      title,
      description,
      category,
      budgetMin: Number.parseFloat(budgetMin),
      budgetMax: Number.parseFloat(budgetMax),
      projectType,
      durationEstimate: durationEstimate || "",
      status: "open",
      priority: priority || "medium",
      deadline,
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [],
    })

    return NextResponse.json({
      success: true,
      data: project,
      message: "Project created successfully",
    })
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
