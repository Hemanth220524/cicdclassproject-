import { type NextRequest, NextResponse } from "next/server"
import { getProjectById } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const projectId = Number.parseInt(params.id)

    if (isNaN(projectId)) {
      return NextResponse.json({ success: false, error: "Invalid project ID" }, { status: 400 })
    }

    const project = await getProjectById(projectId)

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("Get project error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
