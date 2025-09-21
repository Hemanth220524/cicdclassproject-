// Database connection and query utilities
// This would typically connect to MySQL, but for demo purposes we'll use mock data

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  userType: "client" | "freelancer" | "both"
  profileImage?: string
  bio?: string
  location?: string
  hourlyRate?: number
  rating: number
  totalReviews: number
  verified: boolean
  createdAt: string
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
  requiredSkills: string[]
  proposalsCount: number
  viewsCount: number
  createdAt: string
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
  createdAt: string
  freelancer?: User
  project?: Project
}

export interface Skill {
  id: number
  name: string
  category: string
}

export interface PortfolioItem {
  id: number
  userId: number
  title: string
  description: string
  category: string
  technologies: string[]
  projectUrl?: string
  isFeatured: boolean
  displayOrder: number
}

// Mock data for demonstration
export const mockUsers: User[] = [
  {
    id: 1,
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    userType: "freelancer",
    bio: "Full-stack developer with 5+ years of experience in React and Node.js",
    location: "New York, NY",
    hourlyRate: 75,
    rating: 4.8,
    totalReviews: 24,
    verified: true,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    userType: "client",
    bio: "Tech startup founder looking for talented developers",
    location: "San Francisco, CA",
    rating: 4.9,
    totalReviews: 12,
    verified: true,
    createdAt: "2024-02-01T10:00:00Z",
  },
  {
    id: 3,
    email: "mike.wilson@example.com",
    firstName: "Mike",
    lastName: "Wilson",
    userType: "freelancer",
    bio: "UI/UX Designer specializing in modern web applications",
    location: "Austin, TX",
    hourlyRate: 65,
    rating: 4.7,
    totalReviews: 18,
    verified: true,
    createdAt: "2024-01-20T10:00:00Z",
  },
]

export const mockProjects: Project[] = [
  {
    id: 1,
    clientId: 2,
    title: "E-commerce Website Development",
    description:
      "Need a modern e-commerce website built with React and Node.js. Should include user authentication, product catalog, shopping cart, and payment integration.",
    category: "Web Development",
    budgetMin: 3000,
    budgetMax: 5000,
    projectType: "fixed",
    durationEstimate: "6-8 weeks",
    status: "open",
    priority: "high",
    requiredSkills: ["React", "Node.js", "JavaScript", "MySQL"],
    proposalsCount: 12,
    viewsCount: 156,
    createdAt: "2024-03-01T10:00:00Z",
  },
  {
    id: 2,
    clientId: 2,
    title: "Mobile App UI/UX Design",
    description:
      "Looking for a talented designer to create modern and intuitive UI/UX for our fitness tracking mobile app.",
    category: "Design",
    budgetMin: 1500,
    budgetMax: 2500,
    projectType: "fixed",
    durationEstimate: "3-4 weeks",
    status: "open",
    priority: "medium",
    requiredSkills: ["UI/UX Design", "Mobile App Development"],
    proposalsCount: 8,
    viewsCount: 89,
    createdAt: "2024-03-05T10:00:00Z",
  },
]

export const mockSkills: Skill[] = [
  { id: 1, name: "JavaScript", category: "Programming" },
  { id: 2, name: "React", category: "Frontend" },
  { id: 3, name: "Node.js", category: "Backend" },
  { id: 4, name: "Python", category: "Programming" },
  { id: 5, name: "UI/UX Design", category: "Design" },
  { id: 6, name: "Digital Marketing", category: "Marketing" },
]

// Database query functions (would connect to actual MySQL database)
export async function getUsers(): Promise<User[]> {
  return mockUsers
}

export async function getUserById(id: number): Promise<User | null> {
  return mockUsers.find((user) => user.id === id) || null
}

export async function getProjects(): Promise<Project[]> {
  return mockProjects.map((project) => ({
    ...project,
    client: mockUsers.find((user) => user.id === project.clientId),
  }))
}

export async function getProjectById(id: number): Promise<Project | null> {
  const project = mockProjects.find((p) => p.id === id)
  if (!project) return null

  return {
    ...project,
    client: mockUsers.find((user) => user.id === project.clientId),
  }
}

export async function getSkills(): Promise<Skill[]> {
  return mockSkills
}

export async function createProject(
  projectData: Omit<Project, "id" | "createdAt" | "proposalsCount" | "viewsCount">,
): Promise<Project> {
  const newProject: Project = {
    ...projectData,
    id: Math.max(...mockProjects.map((p) => p.id)) + 1,
    proposalsCount: 0,
    viewsCount: 0,
    createdAt: new Date().toISOString(),
  }

  mockProjects.push(newProject)
  return newProject
}

export async function createUser(
  userData: Omit<User, "id" | "createdAt" | "rating" | "totalReviews" | "verified">,
): Promise<User> {
  const newUser: User = {
    ...userData,
    id: Math.max(...mockUsers.map((u) => u.id)) + 1,
    rating: 0,
    totalReviews: 0,
    verified: false,
    createdAt: new Date().toISOString(),
  }

  mockUsers.push(newUser)
  return newUser
}

export async function query(sql: string, params: any[] = []): Promise<any[]> {
  // Mock implementation for demonstration
  // In a real app, this would execute SQL queries against MySQL
  console.log("Mock query:", sql, params)

  // Return mock data based on query patterns
  if (sql.includes("SELECT") && sql.includes("users")) {
    return mockUsers
  }

  if (sql.includes("SELECT") && sql.includes("projects")) {
    return mockProjects
  }

  if (sql.includes("INSERT")) {
    return [{ insertId: Math.floor(Math.random() * 1000) + 1 }]
  }

  if (sql.includes("UPDATE") || sql.includes("DELETE")) {
    return [{ affectedRows: 1 }]
  }

  return []
}

export async function connectDatabase(): Promise<void> {
  // Mock connection for demonstration
  // In a real app, this would establish MySQL connection
  console.log("Mock database connection established")
}
