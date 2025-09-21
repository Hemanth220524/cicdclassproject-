import { type NextRequest, NextResponse } from "next/server"
import { getUser } from "@/lib/auth"
import { query } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get("conversation_id")
    const projectId = searchParams.get("project_id")

    if (conversationId) {
      // Get messages for a specific conversation
      const messages = await query(
        `
        SELECT m.*, 
               sender.name as sender_name, sender.avatar_url as sender_avatar,
               recipient.name as recipient_name, recipient.avatar_url as recipient_avatar
        FROM messages m
        JOIN users sender ON m.sender_id = sender.id
        JOIN users recipient ON m.recipient_id = recipient.id
        WHERE m.conversation_id = ?
        ORDER BY m.created_at ASC
      `,
        [conversationId],
      )

      return NextResponse.json({ messages })
    } else {
      // Get all conversations for the user
      const conversations = await query(
        `
        SELECT DISTINCT 
          CASE 
            WHEN m.sender_id = ? THEN m.recipient_id 
            ELSE m.sender_id 
          END as other_user_id,
          CASE 
            WHEN m.sender_id = ? THEN recipient.name 
            ELSE sender.name 
          END as other_user_name,
          CASE 
            WHEN m.sender_id = ? THEN recipient.avatar_url 
            ELSE sender.avatar_url 
          END as other_user_avatar,
          m.project_id,
          p.title as project_title,
          MAX(m.created_at) as last_message_time,
          (SELECT content FROM messages WHERE conversation_id = m.conversation_id ORDER BY created_at DESC LIMIT 1) as last_message,
          m.conversation_id
        FROM messages m
        JOIN users sender ON m.sender_id = sender.id
        JOIN users recipient ON m.recipient_id = recipient.id
        LEFT JOIN projects p ON m.project_id = p.id
        WHERE m.sender_id = ? OR m.recipient_id = ?
        GROUP BY m.conversation_id, other_user_id, other_user_name, other_user_avatar, m.project_id, p.title
        ORDER BY last_message_time DESC
      `,
        [user.id, user.id, user.id, user.id, user.id],
      )

      return NextResponse.json({ conversations })
    }
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { recipient_id, content, project_id, message_type = "text" } = await request.json()

    if (!recipient_id || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate conversation ID if it doesn't exist
    const conversationId = `${Math.min(user.id, recipient_id)}_${Math.max(user.id, recipient_id)}_${project_id || "general"}`

    const result = await query(
      `
      INSERT INTO messages (sender_id, recipient_id, content, project_id, message_type, conversation_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `,
      [user.id, recipient_id, content, project_id, message_type, conversationId],
    )

    const messageId = result.insertId

    // Get the created message with user details
    const message = await query(
      `
      SELECT m.*, 
             sender.name as sender_name, sender.avatar_url as sender_avatar,
             recipient.name as recipient_name, recipient.avatar_url as recipient_avatar
      FROM messages m
      JOIN users sender ON m.sender_id = sender.id
      JOIN users recipient ON m.recipient_id = recipient.id
      WHERE m.id = ?
    `,
      [messageId],
    )

    return NextResponse.json({ message: message[0] })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
