"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, DollarSign, Clock } from "lucide-react"
import type { EscrowAccount } from "@/lib/payment"

export function EscrowAccounts() {
  const [escrowAccounts, setEscrowAccounts] = useState<EscrowAccount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEscrowAccounts()
  }, [])

  const fetchEscrowAccounts = async () => {
    try {
      // Mock escrow data
      const mockEscrowAccounts: EscrowAccount[] = [
        {
          id: "escrow_1",
          contractId: 1,
          totalAmount: 4200,
          heldAmount: 2100,
          releasedAmount: 2100,
          status: "funded",
          createdAt: "2024-03-01T10:00:00Z",
          updatedAt: "2024-03-01T10:00:00Z",
        },
        {
          id: "escrow_2",
          contractId: 2,
          totalAmount: 2000,
          heldAmount: 2000,
          releasedAmount: 0,
          status: "funded",
          createdAt: "2024-02-28T14:30:00Z",
          updatedAt: "2024-02-28T14:30:00Z",
        },
      ]

      setEscrowAccounts(mockEscrowAccounts)
    } catch (error) {
      console.error("Failed to fetch escrow accounts:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "funded":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "released":
        return "bg-blue-100 text-blue-800"
      case "disputed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateProgress = (released: number, total: number) => {
    return (released / total) * 100
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Escrow Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Escrow Accounts
        </CardTitle>
        <CardDescription>Secure payment protection for your projects</CardDescription>
      </CardHeader>
      <CardContent>
        {escrowAccounts.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No escrow accounts</h3>
            <p className="text-muted-foreground text-sm">
              Escrow accounts will appear here when you start projects with milestone payments
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {escrowAccounts.map((escrow) => (
              <div key={escrow.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Contract #{escrow.contractId}</h3>
                    <Badge className={getStatusColor(escrow.status)}>{escrow.status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{formatDate(escrow.createdAt)}</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-medium">${escrow.totalAmount.toLocaleString()}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        ${escrow.releasedAmount.toLocaleString()} / ${escrow.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={calculateProgress(escrow.releasedAmount, escrow.totalAmount)} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-muted-foreground">Held</div>
                        <div className="font-medium">${escrow.heldAmount.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-muted-foreground">Released</div>
                        <div className="font-medium">${escrow.releasedAmount.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  {escrow.status === "funded" && escrow.heldAmount > 0 && (
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View Milestones
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
