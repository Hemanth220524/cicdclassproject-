"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, DollarSign, Download } from "lucide-react"
import type { PaymentTransaction } from "@/lib/payment"

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      // Mock transaction data
      const mockTransactions: PaymentTransaction[] = [
        {
          id: "txn_1",
          contractId: 1,
          payerId: 2,
          payeeId: 1,
          amount: 4200,
          platformFee: 210,
          netAmount: 3990,
          type: "escrow_deposit",
          status: "completed",
          paymentMethodId: "pm_1",
          transactionId: "pi_1234567890",
          description: "Escrow deposit for E-commerce Website Development",
          createdAt: "2024-03-01T10:00:00Z",
          processedAt: "2024-03-01T10:05:00Z",
        },
        {
          id: "txn_2",
          contractId: 2,
          payerId: 1,
          payeeId: 3,
          amount: 1500,
          platformFee: 75,
          netAmount: 1425,
          type: "milestone_release",
          status: "completed",
          paymentMethodId: "",
          description: "Milestone 1 payment for UI/UX Design",
          createdAt: "2024-02-28T14:30:00Z",
          processedAt: "2024-02-28T14:35:00Z",
        },
        {
          id: "txn_3",
          contractId: 3,
          payerId: 2,
          payeeId: 4,
          amount: 800,
          platformFee: 40,
          netAmount: 760,
          type: "milestone_release",
          status: "processing",
          paymentMethodId: "",
          description: "Final payment for SEO Optimization",
          createdAt: "2024-03-02T09:15:00Z",
        },
      ]

      setTransactions(mockTransactions)
    } catch (error) {
      console.error("Failed to fetch transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "escrow_deposit":
        return <ArrowDownLeft className="h-4 w-4 text-red-600" />
      case "milestone_release":
        return <ArrowUpRight className="h-4 w-4 text-green-600" />
      case "refund":
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />
      default:
        return <DollarSign className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "escrow_deposit":
        return "Escrow Deposit"
      case "milestone_release":
        return "Milestone Payment"
      case "refund":
        return "Refund"
      case "bonus":
        return "Bonus Payment"
      default:
        return type
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded"></div>
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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View all your payment transactions</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
            <p className="text-muted-foreground">
              Your payment history will appear here once you start making transactions
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">{getTransactionIcon(transaction.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{getTypeLabel(transaction.type)}</h3>
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction.createdAt)}
                      {transaction.transactionId && ` • ID: ${transaction.transactionId}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${transaction.amount.toLocaleString()}</div>
                  {transaction.platformFee > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Fee: ${transaction.platformFee.toLocaleString()}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">Net: ${transaction.netAmount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
