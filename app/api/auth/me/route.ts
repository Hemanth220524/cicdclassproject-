import { NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function GET() {
  try {
    const user = await AuthService.getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      data: { user },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
