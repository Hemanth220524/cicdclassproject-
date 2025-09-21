// Payment processing and escrow management utilities
// In a real application, this would integrate with Stripe, PayPal, or similar payment processors

export interface PaymentMethod {
  id: string
  type: "card" | "bank" | "paypal"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface EscrowAccount {
  id: string
  contractId: number
  totalAmount: number
  heldAmount: number
  releasedAmount: number
  status: "pending" | "funded" | "released" | "disputed"
  createdAt: string
  updatedAt: string
}

export interface PaymentTransaction {
  id: string
  contractId: number
  payerId: number
  payeeId: number
  amount: number
  platformFee: number
  netAmount: number
  type: "escrow_deposit" | "milestone_release" | "refund" | "bonus"
  status: "pending" | "processing" | "completed" | "failed"
  paymentMethodId: string
  transactionId?: string
  description: string
  createdAt: string
  processedAt?: string
}

export interface Milestone {
  id: string
  contractId: number
  title: string
  description: string
  amount: number
  dueDate: string
  status: "pending" | "in_progress" | "submitted" | "approved" | "paid"
  submittedAt?: string
  approvedAt?: string
  paidAt?: string
}

// Mock payment methods for demonstration
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_1",
    type: "card",
    last4: "4242",
    brand: "visa",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: "pm_2",
    type: "paypal",
    isDefault: false,
  },
]

// Mock escrow accounts
const mockEscrowAccounts: EscrowAccount[] = [
  {
    id: "escrow_1",
    contractId: 1,
    totalAmount: 4200,
    heldAmount: 4200,
    releasedAmount: 0,
    status: "funded",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-01T10:00:00Z",
  },
]

// Mock transactions
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
]

export class PaymentService {
  // Platform fee percentage (5%)
  static readonly PLATFORM_FEE_RATE = 0.05

  static calculatePlatformFee(amount: number): number {
    return Math.round(amount * this.PLATFORM_FEE_RATE * 100) / 100
  }

  static calculateNetAmount(amount: number): number {
    const fee = this.calculatePlatformFee(amount)
    return amount - fee
  }

  // Payment Methods
  static async getPaymentMethods(userId: number): Promise<PaymentMethod[]> {
    // In real app, fetch from payment processor API
    return mockPaymentMethods
  }

  static async addPaymentMethod(userId: number, paymentData: any): Promise<PaymentMethod> {
    // In real app, create payment method with Stripe/PayPal
    const newMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: paymentData.type,
      last4: paymentData.last4,
      brand: paymentData.brand,
      expiryMonth: paymentData.expiryMonth,
      expiryYear: paymentData.expiryYear,
      isDefault: mockPaymentMethods.length === 0,
    }

    mockPaymentMethods.push(newMethod)
    return newMethod
  }

  static async removePaymentMethod(userId: number, paymentMethodId: string): Promise<boolean> {
    // In real app, remove from payment processor
    const index = mockPaymentMethods.findIndex((pm) => pm.id === paymentMethodId)
    if (index > -1) {
      mockPaymentMethods.splice(index, 1)
      return true
    }
    return false
  }

  // Escrow Management
  static async createEscrowAccount(contractId: number, amount: number): Promise<EscrowAccount> {
    const escrowAccount: EscrowAccount = {
      id: `escrow_${Date.now()}`,
      contractId,
      totalAmount: amount,
      heldAmount: amount,
      releasedAmount: 0,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockEscrowAccounts.push(escrowAccount)
    return escrowAccount
  }

  static async fundEscrow(escrowId: string, paymentMethodId: string, amount: number): Promise<PaymentTransaction> {
    // In real app, charge the payment method
    const transaction: PaymentTransaction = {
      id: `txn_${Date.now()}`,
      contractId: 1, // Would get from escrow account
      payerId: 2, // Would get from contract
      payeeId: 1, // Would get from contract
      amount,
      platformFee: this.calculatePlatformFee(amount),
      netAmount: this.calculateNetAmount(amount),
      type: "escrow_deposit",
      status: "processing",
      paymentMethodId,
      description: "Escrow deposit",
      createdAt: new Date().toISOString(),
    }

    // Simulate processing delay
    setTimeout(() => {
      transaction.status = "completed"
      transaction.processedAt = new Date().toISOString()
      transaction.transactionId = `pi_${Math.random().toString(36).substring(7)}`

      // Update escrow status
      const escrow = mockEscrowAccounts.find((e) => e.id === escrowId)
      if (escrow) {
        escrow.status = "funded"
        escrow.updatedAt = new Date().toISOString()
      }
    }, 2000)

    mockTransactions.push(transaction)
    return transaction
  }

  static async releaseMilestonePayment(
    escrowId: string,
    milestoneId: string,
    amount: number,
  ): Promise<PaymentTransaction> {
    const transaction: PaymentTransaction = {
      id: `txn_${Date.now()}`,
      contractId: 1,
      payerId: 2,
      payeeId: 1,
      amount,
      platformFee: this.calculatePlatformFee(amount),
      netAmount: this.calculateNetAmount(amount),
      type: "milestone_release",
      status: "processing",
      paymentMethodId: "",
      description: `Milestone payment release`,
      createdAt: new Date().toISOString(),
    }

    // Simulate processing
    setTimeout(() => {
      transaction.status = "completed"
      transaction.processedAt = new Date().toISOString()

      // Update escrow amounts
      const escrow = mockEscrowAccounts.find((e) => e.id === escrowId)
      if (escrow) {
        escrow.heldAmount -= amount
        escrow.releasedAmount += amount
        escrow.updatedAt = new Date().toISOString()

        if (escrow.heldAmount <= 0) {
          escrow.status = "released"
        }
      }
    }, 1500)

    mockTransactions.push(transaction)
    return transaction
  }

  // Milestone Management
  static async createMilestones(
    contractId: number,
    milestones: Omit<Milestone, "id" | "contractId" | "status">[],
  ): Promise<Milestone[]> {
    const createdMilestones: Milestone[] = milestones.map((milestone) => ({
      ...milestone,
      id: `milestone_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      contractId,
      status: "pending",
    }))

    return createdMilestones
  }

  static async submitMilestone(milestoneId: string): Promise<boolean> {
    // In real app, update milestone status in database
    return true
  }

  static async approveMilestone(milestoneId: string): Promise<boolean> {
    // In real app, update milestone status and trigger payment release
    return true
  }

  // Transaction History
  static async getTransactionHistory(userId: number): Promise<PaymentTransaction[]> {
    return mockTransactions.filter((t) => t.payerId === userId || t.payeeId === userId)
  }

  static async getEscrowAccount(contractId: number): Promise<EscrowAccount | null> {
    return mockEscrowAccounts.find((e) => e.contractId === contractId) || null
  }
}
