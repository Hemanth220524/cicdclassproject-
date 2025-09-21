import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { PaymentService } from "@/lib/payment"

export async function POST(request: NextRequest) {
  try {
    const user = await AuthService.getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const { escrowId, milestoneId, amount } = await request.json()

    if (!escrowId || !milestoneId || !amount) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const transaction = await PaymentService.releaseMilestonePayment(escrowId, milestoneId, amount)

    return NextResponse.json({
      success: true,
      data: transaction,
      message: "Payment released successfully",
    })
  } catch (error) {
    console.error("Release payment error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
