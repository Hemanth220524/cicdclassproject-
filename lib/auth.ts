// Authentication utilities and session management
import { cookies } from "next/headers"
import type { User } from "./types"
import { getUserById, createUser } from "./database"

export interface AuthSession {
  user: User
  token: string
  expiresAt: string
}

// Mock authentication for demonstration
// In a real app, this would use JWT tokens and proper password hashing
export class AuthService {
  private static readonly SESSION_COOKIE = "freelancer_session"
  private static readonly TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

  static async login(email: string, password: string): Promise<AuthSession | null> {
    // Mock authentication - in real app, verify against database
    const mockUsers = [
      { email: "john.doe@example.com", password: "password123", userId: 1 },
      { email: "jane.smith@example.com", password: "password123", userId: 2 },
      { email: "mike.wilson@example.com", password: "password123", userId: 3 },
    ]

    const authUser = mockUsers.find((u) => u.email === email && u.password === password)
    if (!authUser) return null

    const user = await getUserById(authUser.userId)
    if (!user) return null

    const token = this.generateToken()
    const expiresAt = new Date(Date.now() + this.TOKEN_EXPIRY).toISOString()

    const session: AuthSession = {
      user,
      token,
      expiresAt,
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set(this.SESSION_COOKIE, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: this.TOKEN_EXPIRY / 1000,
    })

    return session
  }

  static async register(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    userType: "client" | "freelancer" | "both"
  }): Promise<AuthSession | null> {
    // Mock registration - in real app, hash password and save to database

    try {
      const newUser = await createUser({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userType: userData.userType,
      })

      const token = this.generateToken()
      const expiresAt = new Date(Date.now() + this.TOKEN_EXPIRY).toISOString()

      const session: AuthSession = {
        user: newUser,
        token,
        expiresAt,
      }

      // Set session cookie
      const cookieStore = await cookies()
      cookieStore.set(this.SESSION_COOKIE, JSON.stringify(session), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: this.TOKEN_EXPIRY / 1000,
      })

      return session
    } catch (error) {
      console.error("Registration error:", error)
      return null
    }
  }

  static async getSession(): Promise<AuthSession | null> {
    try {
      const cookieStore = await cookies()
      const sessionCookie = cookieStore.get(this.SESSION_COOKIE)

      if (!sessionCookie?.value) return null

      const session: AuthSession = JSON.parse(sessionCookie.value)

      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        await this.logout()
        return null
      }

      return session
    } catch (error) {
      console.error("Session error:", error)
      return null
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    const session = await this.getSession()
    return session?.user || null
  }

  static async logout(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.delete(this.SESSION_COOKIE)
  }

  static async requireAuth(): Promise<User> {
    const user = await this.getCurrentUser()
    if (!user) {
      throw new Error("Authentication required")
    }
    return user
  }

  private static generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }
}

// Middleware helper for protected routes
export async function withAuth<T>(handler: (user: User) => Promise<T>): Promise<T> {
  const user = await AuthService.requireAuth()
  return handler(user)
}

export const getUser = AuthService.getCurrentUser

export const requireAuth = AuthService.requireAuth
