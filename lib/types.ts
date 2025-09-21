// TypeScript type definitions for the freelancer marketplace

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  userType: "client" | "freelancer" | "both"
  profileImage?: string
  bio?: string
  location?: string
  phone?: string
  website?: string
  hourlyRate?: number
  availability?: "available" | "busy" | "unavailable"
  totalEarnings?: number
  totalSpent?: number
  rating: number
  totalReviews: number
  verified: boolean
  createdAt: string
  updatedAt?: string
}

export interface Project {
  id: number
  clientId: number
  title: string
  description: string
  category: string
  budgetMin: number
  budgetMax: number
  projectType: "fixed" | "hourly"
  durationEstimate: string
  status: "draft" | "open" | "in_progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "urgent"
  deadline?: string
  attachments?: string[]
  requiredSkills: string[]
  proposalsCount: number
  viewsCount: number
  createdAt: string
  updatedAt?: string
  client?: User
}

export interface Proposal {
  id: number
  projectId: number
  freelancerId: number
  coverLetter: string
  proposedBudget: number
  proposedTimeline: string
  status: "pending" | "accepted" | "rejected" | "withdrawn"
  attachments?: string[]
  createdAt: string
  updatedAt?: string
  freelancer?: User
  project?: Project
}

export interface Contract {
  id: number
  projectId: number
  clientId: number
  freelancerId: number
  proposalId: number
  title: string
  description?: string
  budget: number
  paymentType: "fixed" | "hourly"
  hourlyRate?: number
  status: "active" | "completed" | "cancelled" | "disputed"
  startDate?: string
  endDate?: string
  milestones?: Milestone[]
  terms?: string
  createdAt: string
  updatedAt?: string
}

export interface Milestone {
  id: number
  title: string
  description: string
  amount: number
  dueDate: string
  status: "pending" | "in_progress" | "completed" | "approved"
}

export interface Message {
  id: number
  senderId: number
  recipientId: number
  projectId?: number
  contractId?: number
  subject?: string
  content: string
  attachments?: string[]
  isRead: boolean
  messageType: "direct" | "project" | "system"
  createdAt: string
  sender?: User
  recipient?: User
}

export interface Review {
  id: number
  contractId: number
  reviewerId: number
  revieweeId: number
  rating: number
  title?: string
  comment?: string
  skillsRating?: number
  communicationRating?: number
  qualityRating?: number
  timelinessRating?: number
  isPublic: boolean
  createdAt: string
  reviewer?: User
  reviewee?: User
}

export interface Payment {
  id: number
  contractId: number
  payerId: number
  payeeId: number
  amount: number
  platformFee: number
  netAmount: number
  paymentMethod?: string
  transactionId?: string
  status: "pending" | "processing" | "completed" | "failed" | "refunded"
  paymentType: "milestone" | "hourly" | "bonus" | "refund"
  description?: string
  processedAt?: string
  createdAt: string
}

export interface Skill {
  id: number
  name: string
  category: string
  createdAt: string
}

export interface UserSkill {
  id: number
  userId: number
  skillId: number
  proficiencyLevel: "beginner" | "intermediate" | "advanced" | "expert"
  yearsExperience: number
  skill?: Skill
}

export interface PortfolioItem {
  id: number
  userId: number
  title: string
  description?: string
  category?: string
  technologies: string[]
  images?: string[]
  projectUrl?: string
  githubUrl?: string
  completionDate?: string
  isFeatured: boolean
  displayOrder: number
  createdAt: string
  updatedAt?: string
}

export interface Notification {
  id: number
  userId: number
  title: string
  message: string
  type: "project" | "proposal" | "payment" | "message" | "review" | "system"
  relatedId?: number
  isRead: boolean
  actionUrl?: string
  createdAt: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form types
export interface ProjectFormData {
  title: string
  description: string
  category: string
  budgetMin: number
  budgetMax: number
  projectType: "fixed" | "hourly"
  durationEstimate: string
  priority: "low" | "medium" | "high" | "urgent"
  deadline?: string
  requiredSkills: string[]
}

export interface ProposalFormData {
  coverLetter: string
  proposedBudget: number
  proposedTimeline: string
  attachments?: File[]
}

export interface UserProfileFormData {
  firstName: string
  lastName: string
  bio?: string
  location?: string
  phone?: string
  website?: string
  hourlyRate?: number
  availability?: "available" | "busy" | "unavailable"
}
