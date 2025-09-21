import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"
import { PaymentService } from "@/lib/payment"

export async function GET() {
  try {
    const user = await AuthService.getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const paymentMethods = await PaymentService.getPaymentMethods(user.id)

    return NextResponse.json({
      success: true,
      data: paymentMethods,
    })
  } catch (error) {
    console.error("Get payment methods error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await AuthService.getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const paymentData = await request.json()

    const paymentMethod = await PaymentService.addPaymentMethod(user.id, paymentData)

    return NextResponse.json({
      success: true,
      data: paymentMethod,
      message: "Payment method added successfully",
    })
  } catch (error) {
    console.error("Add payment method error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
