"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type UserRole = "guest" | "member" | "premium" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<boolean>
  isAdmin: boolean
  isMember: boolean
  isPremium: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: "admin-1",
    email: "yos@scopesolutions.co.th",
    name: "Yos Admin",
    password: "admin123",
    role: "admin",
    avatar: "/images/team-office.jpg",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "member-1",
    email: "member@test.com",
    name: "Test Member",
    password: "member123",
    role: "member",
    createdAt: new Date("2024-06-01"),
  },
  {
    id: "premium-1",
    email: "premium@test.com",
    name: "Premium User",
    password: "premium123",
    role: "premium",
    createdAt: new Date("2024-03-01"),
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for saved session
    const savedUser = localStorage.getItem("scope_user")
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser)
        setUser({ ...parsed, createdAt: new Date(parsed.createdAt) })
      } catch {
        localStorage.removeItem("scope_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const foundUser = mockUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("scope_user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("scope_user")
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Check if email exists
    if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setIsLoading(false)
      return false
    }
    
    // Create new user (in real app, this would be an API call)
    const newUser: User = {
      id: `member-${Date.now()}`,
      email,
      name,
      role: "member",
      createdAt: new Date(),
    }
    
    setUser(newUser)
    localStorage.setItem("scope_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        isAdmin: user?.role === "admin",
        isMember: user?.role === "member" || user?.role === "premium" || user?.role === "admin",
        isPremium: user?.role === "premium" || user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
