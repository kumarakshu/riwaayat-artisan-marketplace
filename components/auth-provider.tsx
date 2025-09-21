"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useAuth } from "@/hooks/use-auth"
import type { User } from "firebase/auth"
import { logout } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signOut: async () => {},
})

export const useAuthContext = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading, error } = useAuth()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true)

      // Store user data in localStorage when authenticated
      if (user) {
        const userData = {
          name: user.displayName || "User",
          email: user.email,
          uid: user.uid,
        }
        localStorage.setItem("riwaayat_user", JSON.stringify(userData))
      } else {
        // Clear localStorage when not authenticated
        localStorage.removeItem("riwaayat_user")
      }
    }
  }, [user, loading])

  const handleSignOut = async () => {
    try {
      await logout()
      localStorage.removeItem("riwaayat_user")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Configuration Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-2">
            Please ensure all Firebase environment variables are properly set:
          </p>
          <ul className="text-xs text-gray-400 text-left">
            <li>• NEXT_PUBLIC_FIREBASE_API_KEY</li>
            <li>• NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</li>
            <li>• NEXT_PUBLIC_FIREBASE_PROJECT_ID</li>
            <li>• NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</li>
            <li>• NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</li>
            <li>• NEXT_PUBLIC_FIREBASE_APP_ID</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading: loading || !isInitialized, error, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  )
}
