import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

// Mock proposals data
const mockProposals = [
  {
    id: 1,
    projectId: 1,
    freelancerId: 1,
    coverLetter: "Hi! I am excited about your e-commerce project...",
    proposedBudget: 4200,
    proposedTimeline: "7 weeks",
    status: "pending",
    createdAt: "2024-03-01T10:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")

    let proposals = mockProposals

    if (projectId) {
      proposals = proposals.filter((p) => p.projectId === Number.parseInt(projectId))
    }

    return NextResponse.json({
      success: true,
      data: proposals,
    })
  } catch (error) {
    console.error("Get proposals error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await AuthService.getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    if (user.userType === "client") {
      return NextResponse.json({ success: false, error: "Only freelancers can submit proposals" }, { status: 403 })
    }

    const proposalData = await request.json()

    const { projectId, coverLetter, proposedBudget, proposedTimeline } = proposalData

    if (!projectId || !coverLetter || !proposedBudget || !proposedTimeline) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already submitted a proposal for this project
    const existingProposal = mockProposals.find(
      (p) => p.projectId === Number.parseInt(projectId) && p.freelancerId === user.id,
    )

    if (existingProposal) {
      return NextResponse.json(
        { success: false, error: "You have already submitted a proposal for this project" },
        { status: 400 },
      )
    }

    const newProposal = {
      id: Math.max(...mockProposals.map((p) => p.id)) + 1,
      projectId: Number.parseInt(projectId),
      freelancerId: user.id,
      coverLetter,
      proposedBudget: Number.parseFloat(proposedBudget),
      proposedTimeline,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    mockProposals.push(newProposal)

    return NextResponse.json({
      success: true,
      data: newProposal,
      message: "Proposal submitted successfully",
    })
  } catch (error) {
    console.error("Create proposal error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
