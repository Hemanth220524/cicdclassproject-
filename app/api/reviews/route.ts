import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import { query } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("user_id")
    const projectId = searchParams.get("project_id")

    let reviews
    if (userId) {
      // Get reviews for a specific user
      reviews = await query(
        `
        SELECT r.*, 
               reviewer.name as reviewer_name, reviewer.avatar_url as reviewer_avatar,
               p.title as project_title
        FROM reviews r
        JOIN users reviewer ON r.reviewer_id = reviewer.id
        LEFT JOIN projects p ON r.project_id = p.id
        WHERE r.reviewee_id = ?
        ORDER BY r.created_at DESC
      `,
        [userId],
      )
    } else if (projectId) {
      // Get reviews for a specific project
      reviews = await query(
        `
        SELECT r.*, 
               reviewer.name as reviewer_name, reviewer.avatar_url as reviewer_avatar,
               reviewee.name as reviewee_name, reviewee.avatar_url as reviewee_avatar,
               p.title as project_title
        FROM reviews r
        JOIN users reviewer ON r.reviewer_id = reviewer.id
        JOIN users reviewee ON r.reviewee_id = reviewee.id
        LEFT JOIN projects p ON r.project_id = p.id
        WHERE r.project_id = ?
        ORDER BY r.created_at DESC
      `,
        [projectId],
      )
    } else {
      return NextResponse.json({ error: "user_id or project_id required" }, { status: 400 })
    }

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {
      reviewee_id,
      project_id,
      overall_rating,
      skills_rating,
      communication_rating,
      quality_rating,
      timeliness_rating,
      comment,
    } = await request.json()

    if (!reviewee_id || !project_id || !overall_rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user has already reviewed this person for this project
    const existingReview = await query(
      `
      SELECT id FROM reviews 
      WHERE reviewer_id = ? AND reviewee_id = ? AND project_id = ?
    `,
      [user.id, reviewee_id, project_id],
    )

    if (existingReview.length > 0) {
      return NextResponse.json({ error: "You have already reviewed this person for this project" }, { status: 400 })
    }

    // Verify the user is involved in the project
    const projectInvolvement = await query(
      `
      SELECT id FROM projects 
      WHERE id = ? AND (client_id = ? OR id IN (
        SELECT project_id FROM proposals WHERE freelancer_id = ? AND status = 'accepted'
      ))
    `,
      [project_id, user.id, user.id],
    )

    if (projectInvolvement.length === 0) {
      return NextResponse.json({ error: "You are not involved in this project" }, { status: 403 })
    }

    const result = await query(
      `
      INSERT INTO reviews (
        reviewer_id, reviewee_id, project_id, overall_rating, 
        skills_rating, communication_rating, quality_rating, timeliness_rating, 
        comment, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `,
      [
        user.id,
        reviewee_id,
        project_id,
        overall_rating,
        skills_rating,
        communication_rating,
        quality_rating,
        timeliness_rating,
        comment,
      ],
    )

    // Update user's average rating
    await query(
      `
      UPDATE users 
      SET rating = (
        SELECT AVG(overall_rating) FROM reviews WHERE reviewee_id = ?
      )
      WHERE id = ?
    `,
      [reviewee_id, reviewee_id],
    )

    return NextResponse.json({ success: true, reviewId: result.insertId })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
