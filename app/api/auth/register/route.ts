import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, userType } = await request.json()

    if (!email || !password || !firstName || !lastName || !userType) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    if (!["client", "freelancer", "both"].includes(userType)) {
      return NextResponse.json({ success: false, error: "Invalid user type" }, { status: 400 })
    }

    const session = await AuthService.register({
      email,
      password,
      firstName,
      lastName,
      userType,
    })

    if (!session) {
      return NextResponse.json({ success: false, error: "Registration failed" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: {
        user: session.user,
        message: "Registration successful",
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
