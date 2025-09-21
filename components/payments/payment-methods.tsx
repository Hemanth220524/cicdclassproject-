"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Plus, Trash2, SprayCan as Paypal } from "lucide-react"
import { AddPaymentMethodDialog } from "./add-payment-method-dialog"
import type { PaymentMethod } from "@/lib/payment"

export function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)

  useEffect(() => {
    fetchPaymentMethods()
  }, [])

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("/api/payments/methods")
      const data = await response.json()

      if (data.success) {
        setPaymentMethods(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch payment methods:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPaymentMethod = (newMethod: PaymentMethod) => {
    setPaymentMethods((prev) => [...prev, newMethod])
    setShowAddDialog(false)
  }

  const handleRemovePaymentMethod = async (methodId: string) => {
    try {
      const response = await fetch(`/api/payments/methods/${methodId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPaymentMethods((prev) => prev.filter((pm) => pm.id !== methodId))
      }
    } catch (error) {
      console.error("Failed to remove payment method:", error)
    }
  }

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-5 w-5" />
      case "paypal":
        return <Paypal className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  const formatCardNumber = (last4: string, brand: string) => {
    return `•••• •••• •••• ${last4} (${brand.toUpperCase()})`
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
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
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods for secure transactions</CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {paymentMethods.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No payment methods</h3>
              <p className="text-muted-foreground mb-4">Add a payment method to start making secure transactions</p>
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-muted-foreground">{getPaymentMethodIcon(method.type)}</div>
                    <div>
                      <div className="font-medium">
                        {method.type === "card" && method.last4 && method.brand
                          ? formatCardNumber(method.last4, method.brand)
                          : method.type === "paypal"
                            ? "PayPal Account"
                            : "Bank Account"}
                      </div>
                      {method.type === "card" && method.expiryMonth && method.expiryYear && (
                        <div className="text-sm text-muted-foreground">
                          Expires {method.expiryMonth.toString().padStart(2, "0")}/{method.expiryYear}
                        </div>
                      )}
                    </div>
                    {method.isDefault && <Badge variant="secondary">Default</Badge>}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePaymentMethod(method.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddPaymentMethodDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSuccess={handleAddPaymentMethod} />
    </>
  )
}
