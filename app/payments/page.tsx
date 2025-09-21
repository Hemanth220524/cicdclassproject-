import { redirect } from "next/navigation"
import { AuthService } from "@/lib/auth"
import { Header } from "@/components/layout/header"
import { PaymentMethods } from "@/components/payments/payment-methods"
import { TransactionHistory } from "@/components/payments/transaction-history"
import { EscrowAccounts } from "@/components/payments/escrow-accounts"

export default async function PaymentsPage() {
  const user = await AuthService.getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif mb-2">Payments & Billing</h1>
          <p className="text-muted-foreground">
            Manage your payment methods, view transactions, and track escrow accounts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PaymentMethods />
            <TransactionHistory />
          </div>
          <div>
            <EscrowAccounts />
          </div>
        </div>
      </main>
    </div>
  )
}
