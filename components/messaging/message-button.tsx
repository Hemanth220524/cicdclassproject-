"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface MessageButtonProps {
  recipientId: number
  recipientName: string
  projectId?: number
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
}

export function MessageButton({
  recipientId,
  recipientName,
  projectId,
  variant = "outline",
  size = "sm",
}: MessageButtonProps) {
  const router = useRouter()

  const handleMessage = () => {
    // Generate conversation ID
    const conversationId = `${Math.min(1, recipientId)}_${Math.max(1, recipientId)}_${projectId || "general"}`
    router.push(`/messages?conversation=${conversationId}`)
  }

  return (
    <Button variant={variant} size={size} onClick={handleMessage} className="flex items-center gap-2">
      <MessageCircle className="h-4 w-4" />
      Message {recipientName}
    </Button>
  )
}
