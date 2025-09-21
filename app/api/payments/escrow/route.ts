import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { PaymentService } from "@/lib/payment"

export async function POST(request: NextRequest) {
  try {
    const user = await AuthService.getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const { contractId, amount, paymentMethodId } = await request.json()

    if (!contractId || !amount || !paymentMethodId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create escrow account
    const escrowAccount = await PaymentService.createEscrowAccount(contractId, amount)

    // Fund the escrow
    const transaction = await PaymentService.fundEscrow(escrowAccount.id, paymentMethodId, amount)

    return NextResponse.json({
      success: true,
      data: {
        escrowAccount,
        transaction,
      },
      message: "Escrow funded successfully",
    })
  } catch (error) {
    console.error("Fund escrow error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
