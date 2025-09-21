"use client"

import { useState, useEffect } from "react"
import { type User, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          setUser(user)
          setLoading(false)
          setError(null)
        },
        (error) => {
          console.error("[v0] Firebase auth error:", error)
          setError(error.message)
          setLoading(false)
        },
      )

      return () => unsubscribe()
    } catch (error: any) {
      console.error("[v0] Firebase initialization error:", error)
      setError("Firebase configuration error. Please check your API keys.")
      setLoading(false)
    }
  }, [])

  return { user, loading, error }
}
