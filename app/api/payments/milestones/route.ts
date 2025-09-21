import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { PaymentService } from "@/lib/payment"

export async function POST(request: NextRequest) {
  try {
    const user = await AuthService.getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const { contractId, milestones } = await request.json()

    if (!contractId || !milestones || !Array.isArray(milestones)) {
      return NextResponse.json({ success: false, error: "Invalid milestone data" }, { status: 400 })
    }

    const createdMilestones = await PaymentService.createMilestones(contractId, milestones)

    return NextResponse.json({
      success: true,
      data: createdMilestones,
      message: "Milestones created successfully",
    })
  } catch (error) {
    console.error("Create milestones error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
