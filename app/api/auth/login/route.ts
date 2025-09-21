import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    const session = await AuthService.login(email, password)

    if (!session) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      data: {
        user: session.user,
        message: "Login successful",
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
